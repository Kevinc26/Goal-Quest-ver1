import React from "react";

import type { JourneyMode } from "../../../game/journeyMode";
import { setJourneyMode } from "../../../game/journeyMode";
import { useGoalQuestStore } from "../../../stores/goalQuestStore";

type JourneyOption = {
  id: JourneyMode;
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  nextScreen: "world" | "daily" | "start";
};

const OPTIONS: JourneyOption[] = [
  {
    id: "adventure",
    icon: "🗺️",
    eyebrow: "STORY PATH",
    title: "THE 8-MAP ADVENTURE",
    description: "Follow GoalQuest's guided campaign, clear each region, and defeat the bosses waiting at the end of the path.",
    bullets: ["8 regions to conquer", "Guided missions", "Boss battles and world progression"],
    cta: "ENTER THE ADVENTURE",
    nextScreen: "world"
  },
  {
    id: "custom",
    icon: "⚒️",
    eyebrow: "YOUR LIFE, YOUR QUESTS",
    title: "CREATE MY OWN QUESTS",
    description: "Turn the things you actually need to do into quests and earn XP for completing your real-world goals.",
    bullets: ["Create your own tasks", "Check-off or timer quests", "Earn XP and grow your hero"],
    cta: "FORGE MY FIRST QUEST",
    nextScreen: "daily"
  },
  {
    id: "hybrid",
    icon: "⚔️",
    eyebrow: "FULL EXPERIENCE",
    title: "I WANT BOTH",
    description: "Play the 8-map adventure while also turning your personal goals into quests. Both paths strengthen the same hero.",
    bullets: ["Story adventure + personal quests", "One shared XP progression", "Choose what matters each day"],
    cta: "BEGIN THE FULL JOURNEY",
    nextScreen: "start"
  }
];

export default function JourneyModeScreen() {
  const character = useGoalQuestStore((state) => state.character);
  const setScreen = useGoalQuestStore((state) => state.setScreen);

  const chooseMode = (option: JourneyOption) => {
    setJourneyMode(option.id);
    setScreen(option.nextScreen);
  };

  return (
    <div className="game-screen active journey-mode-screen">
      <button type="button" className="journey-mode-back" onClick={() => setScreen("characters")}>
        <span aria-hidden="true">←</span>
        <span>BACK</span>
      </button>

      <header className="journey-mode-header">
        <div className="journey-mode-kicker">YOUR ADVENTURE. YOUR RULES.</div>
        <h2>HOW DO YOU WANT TO PLAY?</h2>
        <p>
          {character ? `${character.name}, choose what will drive your journey.` : "Choose what will drive your journey."}
          <br />You can change this later.
        </p>
      </header>

      <section className="journey-mode-grid" aria-label="Choose how to play GoalQuest">
        {OPTIONS.map((option) => (
          <article key={option.id} className={`journey-mode-card journey-mode-card--${option.id}`}>
            {option.id === "hybrid" ? <div className="journey-mode-recommended">RECOMMENDED</div> : null}
            <div className="journey-mode-icon" aria-hidden="true">{option.icon}</div>
            <div className="journey-mode-eyebrow">{option.eyebrow}</div>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
            <ul>
              {option.bullets.map((bullet) => (
                <li key={bullet}><span aria-hidden="true">✦</span>{bullet}</li>
              ))}
            </ul>
            <button type="button" className="journey-mode-cta" onClick={() => chooseMode(option)}>
              <span>{option.cta}</span>
              <span aria-hidden="true">›</span>
            </button>
          </article>
        ))}
      </section>

      <div className="journey-mode-note">
        <span aria-hidden="true">★</span>
        Every completed quest feeds the same hero progression, XP, levels, and rewards.
      </div>
    </div>
  );
}
