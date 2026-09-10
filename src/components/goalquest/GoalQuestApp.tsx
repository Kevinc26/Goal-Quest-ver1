import React, { useEffect, useState } from "react";

import { bootstrapGoalQuestCloud, startGoalQuestCloudSync } from "../../lib/cloudSave";
import { localDateKey, trackQuestEvent } from "../../lib/questEvents";
import { useGoalQuestStore } from "../../stores/goalQuestStore";
import AuthScreen from "./auth/AuthScreen";
import { GoalQuestAuthProvider, useGoalQuestAuth } from "./auth/AuthProvider";
import AerilCompanion from "./effects/AerilCompanion";
import CorruptionVisuals from "./effects/CorruptionVisuals";
import ParticleBackground from "./effects/ParticleBackground";
import RetentionDirector from "./effects/RetentionDirector";
import RetentionTelemetry from "./effects/RetentionTelemetry";
import { onboardingScreens } from "./onboardingData";
import MusicToggleButton from "./overlays/MusicToggleButton";
import NotificationLayer from "./overlays/NotificationLayer";
import OnboardingOverlay from "./overlays/OnboardingOverlay";
import RetentionJourneyPanel from "./overlays/RetentionJourneyPanel";
import TaskModal from "./overlays/TaskModal";
import ScreenRouter from "./ScreenRouter";

function GoalQuestExperience() {
  const initGame = useGoalQuestStore((state) => state.initGame);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const isBootstrapped = useGoalQuestStore((state) => state.isBootstrapped);
  const character = useGoalQuestStore((state) => state.character);
  const auth = useGoalQuestAuth();

  const [onboardingStep, setOnboardingStep] = useState<number | null>(null);
  const [cloudReady, setCloudReady] = useState(!auth.configured);
  const [cloudError, setCloudError] = useState<string | null>(null);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (!auth.configured) {
      setCloudReady(true);
      return;
    }

    if (!auth.session) {
      setCloudReady(false);
      setCloudError(null);
      return;
    }

    let active = true;
    let stopSync: (() => void) | null = null;
    setCloudReady(false);
    setCloudError(null);

    void bootstrapGoalQuestCloud(auth.session)
      .then(() => {
        if (!active) {
          return;
        }
        stopSync = startGoalQuestCloudSync(auth.session!);
        setCloudReady(true);
      })
      .catch((error) => {
        console.error("GoalQuest cloud bootstrap failed", error);
        if (active) {
          setCloudError(error instanceof Error ? error.message : "Cloud save is temporarily unavailable.");
          // The game can still run using the local Zustand save if Supabase is temporarily unavailable.
          setCloudReady(true);
        }
      });

    return () => {
      active = false;
      stopSync?.();
    };
  }, [auth.configured, auth.session?.access_token]);

  const accountKey = auth.session?.user.id ?? "local";

  useEffect(() => {
    if (!isBootstrapped || auth.loading || (auth.configured && !auth.session) || !cloudReady) {
      return;
    }

    // Existing cloud heroes should go directly to their home screen on a new device.
    if (character) {
      return;
    }

    const seen = window.localStorage.getItem(`goalquest_onboarding_seen_${accountKey}`) === "true";
    if (!seen) {
      setOnboardingStep(0);
    }
  }, [isBootstrapped, auth.loading, auth.configured, auth.session, cloudReady, character, accountKey]);

  const closeOnboarding = (goToCharacters: boolean) => {
    window.localStorage.setItem(`goalquest_onboarding_seen_${accountKey}`, "true");
    setOnboardingStep(null);

    if (auth.session) {
      void trackQuestEvent(auth.session, {
        eventType: "onboarding_completed",
        source: "system",
        metadata: { localDate: localDateKey(), choseClassNext: goToCharacters }
      }).catch((error) => console.warn("GoalQuest onboarding analytics failed", error));
    }

    if (goToCharacters) {
      setScreen("characters");
    }
  };

  const showAuth = auth.configured && !auth.loading && (!auth.session || auth.recoveryMode);
  const showLoading = auth.loading || (!showAuth && (!isBootstrapped || (auth.configured && Boolean(auth.session) && !cloudReady)));

  if (showAuth) {
    return (
      <>
        <ParticleBackground />
        <div id="game-container" className="auth-game-container">
          <AuthScreen />
        </div>
      </>
    );
  }

  return (
    <>
      <RetentionTelemetry enabled={!auth.loading && cloudReady} session={auth.session} />
      <RetentionDirector enabled={!auth.loading && cloudReady && !showLoading} session={auth.session} />

      {!showLoading ? (
        <>
          <ParticleBackground />
          <CorruptionVisuals />
        </>
      ) : null}

      {showLoading ? (
        <div id="loading-screen">
          <div className="loading-spinner" />
          <h2 style={{ color: "var(--primary)", marginTop: "20px" }}>GOALQUEST RPG</h2>
          <p style={{ color: "var(--warning)", marginTop: "10px" }}>
            {auth.configured && auth.session ? "Syncing your adventure..." : "Loading adventure..."}
          </p>
        </div>
      ) : null}

      {!showLoading ? (
        <div id="game-container">
          <ScreenRouter />
        </div>
      ) : null}

      {!showLoading ? (
        <>
          <TaskModal />
          <NotificationLayer />
          <MusicToggleButton />
          <AerilCompanion />
          <RetentionJourneyPanel />
        </>
      ) : null}

      {!showLoading && cloudError ? (
        <div className="cloud-sync-warning" role="status">
          <span>☁</span>
          <span>LOCAL MODE · CLOUD RETRY ON NEXT SIGN IN</span>
        </div>
      ) : null}

      {!showLoading && onboardingStep !== null ? (
        <OnboardingOverlay
          step={onboardingStep}
          onNext={() =>
            setOnboardingStep((value) =>
              value === null ? 0 : Math.min(onboardingScreens.length - 1, value + 1)
            )
          }
          onSkip={() => closeOnboarding(false)}
          onStart={() => closeOnboarding(true)}
        />
      ) : null}
    </>
  );
}

export default function GoalQuestApp() {
  return (
    <GoalQuestAuthProvider>
      <GoalQuestExperience />
    </GoalQuestAuthProvider>
  );
}
