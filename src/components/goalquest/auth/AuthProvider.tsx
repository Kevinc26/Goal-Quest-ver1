import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
  getInitialSession,
  isSupabaseConfigured,
  refreshSession,
  sendPasswordRecovery,
  signInWithPassword,
  signOutSession,
  signUpWithPassword,
  updatePassword,
  type SignUpResult,
  type SupabaseSession
} from "../../../lib/supabaseClient";

type AuthContextValue = {
  configured: boolean;
  loading: boolean;
  session: SupabaseSession | null;
  recoveryMode: boolean;
  signIn: (email: string, password: string) => Promise<SupabaseSession>;
  signUp: (displayName: string, email: string, password: string) => Promise<SignUpResult>;
  sendRecovery: (email: string) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
  signOut: () => Promise<void>;
  leaveRecoveryMode: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function GoalQuestAuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [recoveryMode, setRecoveryMode] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    void getInitialSession()
      .then((result) => {
        if (cancelled) {
          return;
        }
        setSession(result.session);
        setRecoveryMode(result.recoveryMode);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!session?.refresh_token) {
      return;
    }

    const refreshInMs = Math.max(15_000, session.expires_at * 1000 - Date.now() - 60_000);
    const timer = window.setTimeout(() => {
      void refreshSession(session.refresh_token)
        .then(setSession)
        .catch(() => setSession(null));
    }, refreshInMs);

    return () => window.clearTimeout(timer);
  }, [session]);

  const signIn = useCallback(async (email: string, password: string) => {
    const nextSession = await signInWithPassword(email, password);
    setSession(nextSession);
    setRecoveryMode(false);
    return nextSession;
  }, []);

  const signUp = useCallback(async (displayName: string, email: string, password: string) => {
    const result = await signUpWithPassword(displayName, email, password);
    if (result.session) {
      setSession(result.session);
      setRecoveryMode(false);
    }
    return result;
  }, []);

  const sendRecovery = useCallback(async (email: string) => {
    await sendPasswordRecovery(email);
  }, []);

  const changePassword = useCallback(async (password: string) => {
    if (!session?.access_token) {
      throw new Error("Your recovery session expired. Request a new password reset link.");
    }

    await updatePassword(session.access_token, password);
    setRecoveryMode(false);
  }, [session]);

  const signOut = useCallback(async () => {
    await signOutSession(session);
    setSession(null);
    setRecoveryMode(false);
  }, [session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      configured: isSupabaseConfigured,
      loading,
      session,
      recoveryMode,
      signIn,
      signUp,
      sendRecovery,
      changePassword,
      signOut,
      leaveRecoveryMode: () => setRecoveryMode(false)
    }),
    [loading, session, recoveryMode, signIn, signUp, sendRecovery, changePassword, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useGoalQuestAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useGoalQuestAuth must be used inside GoalQuestAuthProvider");
  }
  return context;
}
