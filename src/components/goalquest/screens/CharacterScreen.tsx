import React, { useEffect, useRef, useState } from "react";

import { CLASS_PATHS, CLASS_TO_PATH } from "../../../game/data";
import { goalQuestAssets, goalQuestCharacters, useGoalQuestStore } from "../../../stores/goalQuestStore";

const resolvePublicAsset = (assetPath: string | undefined) => {
  if (!assetPath) return "";
  return assetPath.replace(/^\/+/, "./");
};

const classAccents: Record<number, string> = {
  1: "#b779ff",
  2: "#4dff91",
  3: "#72f1b8",
  4: "#54d6b5",
  5: "#e4d85f",
  6: "#b6d98a",
  7: "#8f7cff",
  8: "#46c7e8"
};

const classPerks: Record<number, Array<{ icon: string; label: string; tone: string }>> = {
  1: [
    { icon: "✦", label: "Deep Focus", tone: "cyan" },
    { icon: "◆", label: "High MP", tone: "purple" },
    { icon: "◎", label: "Clarity Path", tone: "green" }
  ],
  2: [
    { icon: "✚", label: "High Defense", tone: "cyan" },
    { icon: "♛", label: "Boss Ready", tone: "purple" },
    { icon: "♥", label: "Beginner Friendly", tone: "green" }
  ],
  3: [
    { icon: "♥", label: "Energy Recovery", tone: "green" },
    { icon: "✦", label: "Sustained Growth", tone: "cyan" },
    { icon: "☼", label: "Self-Care", tone: "purple" }
  ],
  4: [
    { icon: "⬟", label: "Highest HP", tone: "green" },
    { icon: "✚", label: "Resilient", tone: "cyan" },
    { icon: "◆", label: "Pressure Proof", tone: "purple" }
  ],
  5: [
    { icon: "➶", label: "Precision", tone: "cyan" },
    { icon: "✦", label: "Distraction Killer", tone: "green" },
    { icon: "◎", label: "Focus Path", tone: "purple" }
  ],
  6: [
    { icon: "☼", label: "Balanced", tone: "green" },
    { icon: "♥", label: "Supportive", tone: "cyan" },
    { icon: "✦", label: "Steady Growth", tone: "purple" }
  ],
  7: [
    { icon: "✦", label: "Agile", tone: "purple" },
    { icon: "➤", label: "Fast Tasks", tone: "cyan" },
    { icon: "◎", label: "Flow Ready", tone: "green" }
  ],
  8: [
    { icon: "⚗", label: "High MP", tone: "cyan" },
    { icon: "◆", label: "Habit Change", tone: "green" },
    { icon: "✦", label: "Experimental", tone: "purple" }
  ]
};

const pathForCharacter = (characterId: number) => {
  const pathKey = CLASS_TO_PATH[characterId];
  return CLASS_PATHS[pathKey];
};

const wrapIndex = (index: number) => {
  const total = goalQuestCharacters.length;
  return (index + total) % total;
};

export default function CharacterScreen() {
  const selectedCharacter = useGoalQuestStore((state) => state.character);
  const stats = useGoalQuestStore((state) => state.stats);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const selectCharacter = useGoalQuestStore((state) => state.selectCharacter);
  const touchStartX = useRef<number | null>(null);

  const initialIndex = Math.max(
    0,
    goalQuestCharacters.findIndex((character) => character.id === selectedCharacter?.id)
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    if (!selectedCharacter) return;
    const nextIndex = goalQuestCharacters.findIndex((character) => character.id === selectedCharacter.id);
    if (nextIndex >= 0) setActiveIndex(nextIndex);
  }, [selectedCharacter?.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) => wrapIndex(current - 1));
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => wrapIndex(current + 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeCharacter = goalQuestCharacters[activeIndex];
  const activePath = pathForCharacter(activeCharacter.id);
  const activeAccent = classAccents[activeCharacter.id] ?? activeCharacter.color;
  const activeImageSrc = resolvePublicAsset(goalQuestAssets.classes[activeCharacter.id]);
  const perks = classPerks[activeCharacter.id] ?? [];

  const moveBy = (direction: number) => {
    setActiveIndex((current) => wrapIndex(current + direction));
  };

  const confirmCharacter = () => {
    selectCharacter(activeCharacter.id);
    setScreen("journey");
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 45) return;
    moveBy(delta > 0 ? -1 : 1);
  };

  const renderPreview = (offset: -2 | -1 | 1 | 2) => {
    const index = wrapIndex(activeIndex + offset);
    const character = goalQuestCharacters[index];
    const accent = classAccents[character.id] ?? character.color;
    const imageSrc = resolvePublicAsset(goalQuestAssets.classes[character.id]);
    const near = Math.abs(offset) === 1;

    return (
      <button
        key={`${character.id}-${offset}`}
        type="button"
        className={`character-portal-preview character-portal-preview--${offset < 0 ? "left" : "right"} character-portal-preview--${near ? "near" : "far"}`}
        onClick={() => setActiveIndex(index)}
        aria-label={`Select ${character.name}`}
        style={{
          "--preview-accent": accent,
          "--preview-offset": String(offset)
        } as React.CSSProperties}
      >
        <span className="character-portal-preview-glow" aria-hidden="true" />
        <img
          className={`character-portal-preview-sprite ${character.id === 3 ? "character-select-sprite--blend" : ""}`}
          src={imageSrc}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />
        <span className="character-portal-preview-name">{character.name}</span>
      </button>
    );
  };

  return (
    <div
      className="game-screen active character-select-screen character-portal-screen"
      style={{ "--class-accent": activeAccent } as React.CSSProperties}
    >
      <div className="character-portal-stars" aria-hidden="true">
        <span /><span /><span /><span /><span /><span /><span /><span />
      </div>

      <button type="button" className="character-portal-back" onClick={() => setScreen("start")} aria-label="Back">
        <i className="fas fa-arrow-left" aria-hidden="true" />
      </button>

      <header className="character-portal-header">
        <h1>GOALQUEST</h1>
        <div className="character-portal-subtitle"><span />Choose your hero<span /></div>
      </header>

      <main className="character-portal-layout">
        <aside className="character-portal-info" aria-live="polite">
          <div className="character-portal-info-kicker">LV. {stats.level} <b>•</b> {activeCharacter.name}</div>
          <h2>{activePath?.name ?? "PATH OF THE ADVENTURER"}</h2>
          <div className="character-portal-divider"><span>◆</span></div>
          <p>{activePath?.description ?? activeCharacter.description}</p>

          <div className="character-portal-perks">
            {perks.map((perk) => (
              <div key={perk.label} className={`character-portal-perk character-portal-perk--${perk.tone}`}>
                <span className="character-portal-perk-icon" aria-hidden="true">{perk.icon}</span>
                <span>{perk.label}</span>
              </div>
            ))}
          </div>

          <div className="character-portal-numbers" aria-label={`${activeCharacter.name} base stats`}>
            <span><small>HP</small><strong>{activeCharacter.hp}</strong></span>
            <span><small>MP</small><strong>{activeCharacter.mp}</strong></span>
          </div>
        </aside>

        <section
          className="character-portal-carousel"
          aria-label="Character carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button type="button" className="character-portal-arrow character-portal-arrow--left" onClick={() => moveBy(-1)} aria-label="Previous hero">
            ‹
          </button>

          <div className="character-portal-stage">
            {renderPreview(-2)}
            {renderPreview(-1)}

            <article className="character-portal-active" aria-live="polite">
              <div className="character-portal-ring character-portal-ring--outer" aria-hidden="true" />
              <div className="character-portal-ring character-portal-ring--inner" aria-hidden="true" />
              <div className="character-portal-burst" aria-hidden="true" />
              <span className="character-portal-rune character-portal-rune--one" aria-hidden="true">✦</span>
              <span className="character-portal-rune character-portal-rune--two" aria-hidden="true">◆</span>
              <span className="character-portal-rune character-portal-rune--three" aria-hidden="true">✧</span>
              <img
                className={`character-portal-main-sprite ${activeCharacter.id === 3 ? "character-select-sprite--blend" : ""}`}
                src={activeImageSrc}
                alt={`${activeCharacter.name} class`}
                loading="eager"
                decoding="async"
              />
              <div className="character-portal-platform" aria-hidden="true"><span /></div>
            </article>

            {renderPreview(1)}
            {renderPreview(2)}
          </div>

          <button type="button" className="character-portal-arrow character-portal-arrow--right" onClick={() => moveBy(1)} aria-label="Next hero">
            ›
          </button>

          <nav className="character-portrait-rail" aria-label="Choose hero">
            {goalQuestCharacters.map((character, index) => {
              const imageSrc = resolvePublicAsset(goalQuestAssets.classes[character.id]);
              const accent = classAccents[character.id] ?? character.color;
              const isActive = index === activeIndex;
              return (
                <button
                  key={character.id}
                  type="button"
                  className={isActive ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${character.name}`}
                  aria-current={isActive ? "true" : undefined}
                  style={{ "--portrait-accent": accent } as React.CSSProperties}
                >
                  {isActive ? <span className="character-portrait-crown" aria-hidden="true">♛</span> : null}
                  <img className={character.id === 3 ? "character-select-sprite--blend" : ""} src={imageSrc} alt="" aria-hidden="true" />
                </button>
              );
            })}
          </nav>
        </section>
      </main>

      <section className="character-portal-actions">
        <button type="button" className="character-portal-primary" onClick={confirmCharacter}>
          <i className="fas fa-play" aria-hidden="true" />
          <span>{selectedCharacter?.id === activeCharacter.id ? "CONTINUE WITH THIS HERO" : "CHOOSE THIS HERO"}</span>
        </button>
        <button type="button" className="character-portal-compare" onClick={() => setCompareOpen((open) => !open)} aria-expanded={compareOpen}>
          <i className="fas fa-scale-balanced" aria-hidden="true" />
          <span>{compareOpen ? "HIDE COMPARISON" : "COMPARE CLASSES"}</span>
        </button>
      </section>

      {compareOpen ? (
        <section className="character-compare-panel" aria-label="Class comparison">
          {goalQuestCharacters.map((character, index) => {
            const path = pathForCharacter(character.id);
            return (
              <button key={character.id} type="button" className={index === activeIndex ? "active" : ""} onClick={() => setActiveIndex(index)}>
                <strong>{character.name}</strong>
                <span>{path?.name.replace("PATH OF ", "") ?? "ADVENTURER"}</span>
                <small>HP {character.hp} · MP {character.mp}</small>
              </button>
            );
          })}
        </section>
      ) : null}

      <p className="character-portal-help"><span>◆</span> Swipe or use arrows to explore all 8 classes <span>◆</span></p>
    </div>
  );
}
