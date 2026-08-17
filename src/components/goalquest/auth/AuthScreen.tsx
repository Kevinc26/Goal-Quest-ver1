import React, { useEffect, useMemo, useState } from "react";

import { goalQuestAssets } from "../../../stores/goalQuestStore";
import { publicAssetPath } from "../utils";
import { useGoalQuestAuth } from "./AuthProvider";

type AuthMode = "signin" | "signup" | "forgot" | "reset";

const friendlyError = (message: string) => {
  const value = message.toLowerCase();
  if (value.includes("invalid login") || value.includes("invalid credentials")) {
    return "The email or password is incorrect.";
  }
  if (value.includes("email not confirmed")) {
    return "Confirm your email first, then return to GoalQuest.";
  }
  if (value.includes("already registered") || value.includes("already been registered")) {
    return "An adventurer already exists with that email.";
  }
  return message;
};

export default function AuthScreen() {
  const auth = useGoalQuestAuth();
  const [mode, setMode] = useState<AuthMode>(auth.recoveryMode ? "reset" : "signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (auth.recoveryMode) {
      setMode("reset");
    }
  }, [auth.recoveryMode]);

  const heroSrc = publicAssetPath(goalQuestAssets.classes[2]);
  const heading = useMemo(() => {
    if (mode === "signup") return "CREATE YOUR HERO";
    if (mode === "forgot") return "RECOVER YOUR PATH";
    if (mode === "reset") return "FORGE A NEW PASSCODE";
    return "WELCOME BACK, ADVENTURER";
  }, [mode]);

  const clearFeedback = () => {
    setError(null);
    setNotice(null);
  };

  const switchMode = (next: AuthMode) => {
    clearFeedback();
    setPassword("");
    setConfirmPassword("");
    setMode(next);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearFeedback();
    setBusy(true);

    try {
      if (mode === "signin") {
        await auth.signIn(email.trim(), password);
        return;
      }

      if (mode === "signup") {
        if (displayName.trim().length < 2) {
          throw new Error("Choose an adventurer name with at least 2 characters.");
        }
        if (password.length < 8) {
          throw new Error("Use at least 8 characters for your password.");
        }
        if (password !== confirmPassword) {
          throw new Error("The passwords do not match.");
        }

        const result = await auth.signUp(displayName.trim(), email.trim(), password);
        if (!result.session) {
          setNotice("Your hero has been created. Check your inbox to confirm the email, then return here to sign in.");
          setPassword("");
          setConfirmPassword("");
        }
        return;
      }

      if (mode === "forgot") {
        await auth.sendRecovery(email.trim());
        setNotice("Recovery portal opened. Check your inbox for the password reset link.");
        return;
      }

      if (password.length < 8) {
        throw new Error("Use at least 8 characters for your new password.");
      }
      if (password !== confirmPassword) {
        throw new Error("The passwords do not match.");
      }

      await auth.changePassword(password);
      setNotice("Passcode reforged. Your adventure is ready.");
      setPassword("");
      setConfirmPassword("");
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Something went wrong. Try again.";
      setError(friendlyError(message));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-shell" aria-label="GoalQuest account access">
      <header className="auth-brand">
        <div className="auth-brand-rune" aria-hidden="true">◆</div>
        <h1>GOALQUEST</h1>
        <p>Turn your goals into an adventure</p>
      </header>

      <section className="auth-layout">
        <div className="auth-portal-column" aria-hidden="true">
          <div className="auth-portal-scene">
            <span className="auth-portal-aura" />
            <span className="auth-portal-ring auth-portal-ring--outer" />
            <span className="auth-portal-ring auth-portal-ring--inner" />
            <span className="auth-floating-rune auth-floating-rune--one">✦</span>
            <span className="auth-floating-rune auth-floating-rune--two">◆</span>
            <span className="auth-floating-rune auth-floating-rune--three">✧</span>
            <img src={heroSrc} alt="" className="auth-hero" />
            <span className="auth-hero-platform" />
          </div>
          <div className="auth-cloud-promise">
            <span className="auth-cloud-icon">☁</span>
            <div>
              <strong>YOUR JOURNEY FOLLOWS YOU</strong>
              <small>Sign in to sync your hero, XP, quests and gear across devices.</small>
            </div>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <span className="auth-eyebrow">
            {mode === "signup" ? "NEW ADVENTURER" : mode === "forgot" ? "ACCOUNT RECOVERY" : mode === "reset" ? "RECOVERY COMPLETE" : "RETURNING ADVENTURER"}
          </span>
          <h2>{heading}</h2>
          <p className="auth-card-copy">
            {mode === "signup"
              ? "Create an account and begin a journey that persists beyond this device."
              : mode === "forgot"
                ? "Enter the email linked to your adventure and we will send a recovery link."
                : mode === "reset"
                  ? "Choose a new password to reopen your path."
                  : "Enter the realm and continue exactly where your hero left off."}
          </p>

          {mode === "signup" ? (
            <label className="auth-field">
              <span>ADVENTURER NAME</span>
              <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Your hero name"
                autoComplete="nickname"
                required
              />
            </label>
          ) : null}

          {mode !== "reset" ? (
            <label className="auth-field">
              <span>EMAIL</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="adventurer@email.com"
                autoComplete="email"
                required
              />
            </label>
          ) : null}

          {mode !== "forgot" ? (
            <label className="auth-field">
              <span>{mode === "reset" ? "NEW PASSWORD" : "PASSWORD"}</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••••"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                minLength={mode === "signin" ? undefined : 8}
                required
              />
            </label>
          ) : null}

          {mode === "signup" || mode === "reset" ? (
            <label className="auth-field">
              <span>CONFIRM PASSWORD</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••••••"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>
          ) : null}

          {error ? <div className="auth-message auth-message--error">⚠ {error}</div> : null}
          {notice ? <div className="auth-message auth-message--success">✦ {notice}</div> : null}

          <button type="submit" className="auth-primary" disabled={busy}>
            <span>{busy ? "OPENING PORTAL..." : mode === "signup" ? "BEGIN YOUR JOURNEY" : mode === "forgot" ? "SEND RECOVERY LINK" : mode === "reset" ? "SAVE NEW PASSWORD" : "ENTER THE REALM"}</span>
            <span aria-hidden="true">›</span>
          </button>

          {mode === "signin" ? (
            <button type="button" className="auth-link" onClick={() => switchMode("forgot")}>
              Forgot password?
            </button>
          ) : null}

          <div className="auth-divider"><span>◆</span></div>

          {mode === "signin" ? (
            <button type="button" className="auth-secondary" onClick={() => switchMode("signup")}>
              CREATE NEW HERO
            </button>
          ) : (
            <button
              type="button"
              className="auth-secondary"
              onClick={() => {
                auth.leaveRecoveryMode();
                switchMode("signin");
              }}
            >
              ← BACK TO SIGN IN
            </button>
          )}

          <p className="auth-fineprint">Secure account access powered by Supabase Auth. Your password is never stored by GoalQuest.</p>
        </form>
      </section>

      <footer className="auth-footer">© 2026 GOALQUEST · CLOUD SAVE READY</footer>
    </main>
  );
}
