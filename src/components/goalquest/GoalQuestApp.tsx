import React, { useEffect, useMemo, useState } from "react";

import CorruptionVisuals from "./effects/CorruptionVisuals";
import ParticleBackground from "./effects/ParticleBackground";
import AerilCompanion from "./effects/AerilCompanion";
import { onboardingScreens } from "./onboardingData";
import MusicToggleButton from "./overlays/MusicToggleButton";
import NotificationLayer from "./overlays/NotificationLayer";
import OnboardingOverlay from "./overlays/OnboardingOverlay";
import TaskModal from "./overlays/TaskModal";
import ScreenRouter from "./ScreenRouter";
import { useGoalQuestStore } from "../../stores/goalQuestStore";

export default function GoalQuestApp() {
  const initGame = useGoalQuestStore((state) => state.initGame);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const isBootstrapped = useGoalQuestStore((state) => state.isBootstrapped);

  const [showLoading, setShowLoading] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState<number | null>(null);

  useEffect(() => {
    const loadingTimeout = window.setTimeout(() => {
      setShowLoading(false);
      initGame();
    }, 1500);

    return () => {
      window.clearTimeout(loadingTimeout);
    };
  }, [initGame]);

  useEffect(() => {
    if (showLoading || !isBootstrapped) {
      return;
    }

    const seen = window.localStorage.getItem("goalquest_onboarding_seen") === "true";
    if (!seen) {
      setOnboardingStep(0);
    }
  }, [showLoading, isBootstrapped]);

  const closeOnboarding = (goToCharacters: boolean) => {
    window.localStorage.setItem("goalquest_onboarding_seen", "true");
    setOnboardingStep(null);

    if (goToCharacters) {
      setScreen("characters");
    }
  };

  const feedbackLink = useMemo(
    () =>
      "https://docs.google.com/forms/d/e/1FAIpQLSddZHn0fSLOE05UlB1SfzmgHjOTHwzEfnkaH0oi36x8EQBYpg/viewform?usp=dialog",
    []
  );

  return (
    <>
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
          <p style={{ color: "var(--warning)", marginTop: "10px" }}>Cargando aventura...</p>
        </div>
      ) : null}

      <div id="game-container">
        <ScreenRouter />
      </div>

      {!showLoading ? (
        <>
          <TaskModal />
          <NotificationLayer />
          <MusicToggleButton />
          <AerilCompanion />
          <a href={feedbackLink} target="_blank" rel="noopener noreferrer" className="feedback-button">
            📝 Feedback
          </a>
        </>
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
