const isLocalHost = () => {
  if (typeof window === "undefined") return false;
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
};

export const isBossLabEnabled = () => {
  if (typeof window === "undefined") return false;

  const requested = new URLSearchParams(window.location.search).get("bosslab") === "1";
  if (!requested) return false;

  // Boss Lab is intentionally disabled in normal production builds. It can be
  // enabled only for local development or an explicitly configured QA/Preview
  // environment with PUBLIC_ENABLE_BOSS_LAB=true.
  const qaEnabled = import.meta.env.PUBLIC_ENABLE_BOSS_LAB === "true";
  return import.meta.env.DEV || isLocalHost() || qaEnabled;
};
