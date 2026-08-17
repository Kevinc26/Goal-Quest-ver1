export type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  user: SupabaseUser;
};

export type SignUpResult = {
  user: SupabaseUser | null;
  session: SupabaseSession | null;
};

type AuthPayload = Record<string, unknown> & {
  user?: SupabaseUser | null;
  session?: Record<string, unknown> | null;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  expires_at?: number;
};

const SESSION_KEY = "goalquest_supabase_session_v1";

const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL ?? "").trim().replace(/\/$/, "");
const publishableKey = (import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "").trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && publishableKey);

const safeJson = async (response: Response) => {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

const getErrorMessage = (payload: unknown, fallback: string) => {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const message = record.msg ?? record.message ?? record.error_description ?? record.error;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  return fallback;
};

const requireConfiguration = () => {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured yet. Add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  }
};

const makeHeaders = (accessToken?: string, extra?: HeadersInit) => {
  const headers = new Headers(extra);
  headers.set("apikey", publishableKey);
  headers.set("Content-Type", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return headers;
};

export const supabaseFetch = async <T>(
  path: string,
  options: RequestInit & { accessToken?: string } = {}
): Promise<T> => {
  requireConfiguration();

  const { accessToken, ...requestOptions } = options;
  const response = await fetch(`${supabaseUrl}${path}`, {
    ...requestOptions,
    headers: makeHeaders(accessToken, requestOptions.headers)
  });

  const payload = await safeJson(response);
  if (!response.ok) {
    throw new Error(getErrorMessage(payload, `Supabase request failed (${response.status})`));
  }

  return payload as T;
};

const normalizeSession = (payload: AuthPayload | null): SupabaseSession | null => {
  if (!payload) {
    return null;
  }

  const candidate = (payload.session && typeof payload.session === "object" ? payload.session : payload) as AuthPayload;
  if (!candidate.access_token || !candidate.refresh_token) {
    return null;
  }

  const expiresIn = Number(candidate.expires_in ?? 3600);
  const expiresAt = Number(candidate.expires_at ?? Math.floor(Date.now() / 1000) + expiresIn);
  const user = (candidate.user ?? payload.user) as SupabaseUser | null | undefined;

  if (!user?.id) {
    return null;
  }

  return {
    access_token: String(candidate.access_token),
    refresh_token: String(candidate.refresh_token),
    token_type: String(candidate.token_type ?? "bearer"),
    expires_in: expiresIn,
    expires_at: expiresAt,
    user
  };
};

export const saveSession = (session: SupabaseSession | null) => {
  if (typeof window === "undefined") {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

const readStoredSession = (): SupabaseSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as SupabaseSession;
    return parsed?.access_token && parsed?.refresh_token && parsed?.user?.id ? parsed : null;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

const getRedirectUrl = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.origin}${window.location.pathname}`;
};

const parseCallbackSession = () => {
  if (typeof window === "undefined" || !window.location.hash) {
    return { session: null as SupabaseSession | null, recoveryMode: false };
  }

  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const type = params.get("type");

  if (!accessToken || !refreshToken) {
    return { session: null as SupabaseSession | null, recoveryMode: type === "recovery" };
  }

  const expiresIn = Number(params.get("expires_in") ?? 3600);
  const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;

  return {
    session: {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: params.get("token_type") ?? "bearer",
      expires_in: expiresIn,
      expires_at: expiresAt,
      user: { id: "pending" }
    },
    recoveryMode: type === "recovery"
  };
};

export const getCurrentUser = async (accessToken: string): Promise<SupabaseUser> =>
  supabaseFetch<SupabaseUser>("/auth/v1/user", {
    method: "GET",
    accessToken
  });

export const refreshSession = async (refreshToken: string): Promise<SupabaseSession> => {
  const payload = await supabaseFetch<AuthPayload>("/auth/v1/token?grant_type=refresh_token", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken })
  });

  const session = normalizeSession(payload);
  if (!session) {
    throw new Error("Supabase returned an invalid refreshed session.");
  }

  saveSession(session);
  return session;
};

export const getInitialSession = async () => {
  if (!isSupabaseConfigured) {
    return { session: null as SupabaseSession | null, recoveryMode: false };
  }

  const callback = parseCallbackSession();
  if (callback.session) {
    try {
      const user = await getCurrentUser(callback.session.access_token);
      const session = { ...callback.session, user };
      saveSession(session);
      window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`);
      return { session, recoveryMode: callback.recoveryMode };
    } catch {
      saveSession(null);
    }
  }

  const stored = readStoredSession();
  if (!stored) {
    return { session: null as SupabaseSession | null, recoveryMode: callback.recoveryMode };
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const session = stored.expires_at <= now + 60 ? await refreshSession(stored.refresh_token) : stored;
    const user = await getCurrentUser(session.access_token);
    const verified = { ...session, user };
    saveSession(verified);
    return { session: verified, recoveryMode: callback.recoveryMode };
  } catch {
    saveSession(null);
    return { session: null as SupabaseSession | null, recoveryMode: callback.recoveryMode };
  }
};

export const signInWithPassword = async (email: string, password: string) => {
  const payload = await supabaseFetch<AuthPayload>("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  const session = normalizeSession(payload);
  if (!session) {
    throw new Error("Supabase did not return a valid session.");
  }

  saveSession(session);
  return session;
};

export const signUpWithPassword = async (
  displayName: string,
  email: string,
  password: string
): Promise<SignUpResult> => {
  const redirectTo = encodeURIComponent(getRedirectUrl());
  const payload = await supabaseFetch<AuthPayload>(`/auth/v1/signup?redirect_to=${redirectTo}`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      data: {
        display_name: displayName
      }
    })
  });

  const session = normalizeSession(payload);
  if (session) {
    saveSession(session);
  }

  return {
    user: (payload.user as SupabaseUser | null | undefined) ?? session?.user ?? null,
    session
  };
};

export const sendPasswordRecovery = async (email: string) => {
  const redirectTo = encodeURIComponent(getRedirectUrl());
  await supabaseFetch(`/auth/v1/recover?redirect_to=${redirectTo}`, {
    method: "POST",
    body: JSON.stringify({ email })
  });
};

export const updatePassword = async (accessToken: string, password: string) => {
  await supabaseFetch("/auth/v1/user", {
    method: "PUT",
    accessToken,
    body: JSON.stringify({ password })
  });
};

export const signOutSession = async (session: SupabaseSession | null) => {
  if (session?.access_token) {
    try {
      await supabaseFetch("/auth/v1/logout", {
        method: "POST",
        accessToken: session.access_token
      });
    } catch {
      // Local sign-out still happens when the network is unavailable.
    }
  }

  saveSession(null);
};
