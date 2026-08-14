import React from "react";

import { onboardingScreens } from "../onboardingData";

export default function OnboardingOverlay({
  step,
  onNext,
  onSkip,
  onStart
}: {
  step: number;
  onNext: () => void;
  onSkip: () => void;
  onStart: () => void;
}) {
  const screen = onboardingScreens[step];

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-container">
        <div className="onboarding-icon">{screen.icon}</div>
        <h1 className="onboarding-title">{screen.title}</h1>
        <div className="onboarding-text">{screen.text}</div>

        <div className="onboarding-progress">
          {onboardingScreens.map((item, index) => (
            <div key={`${item.title}-${index}`} className={`onboarding-dot ${index === step ? "active" : ""}`} />
          ))}
        </div>

        {step < onboardingScreens.length - 1 ? (
          <>
            <button type="button" className="onboarding-button" onClick={onNext}>
              CONTINUE
            </button>
            <button
              type="button"
              className="onboarding-skip"
              onClick={onSkip}
              style={{ background: "transparent", border: "none", padding: 0, fontFamily: "inherit" }}
            >
              Skip introduction
            </button>
          </>
        ) : (
          <button type="button" className="onboarding-button" onClick={onStart}>
            CHOOSE MY CLASS
          </button>
        )}
      </div>
    </div>
  );
}
