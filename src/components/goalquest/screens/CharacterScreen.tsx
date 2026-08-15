import React, { useEffect, useRef, useState } from "react";

import { CLASS_PATHS, CLASS_TO_PATH } from "../../../game/data";
import { goalQuestAssets, goalQuestCharacters, useGoalQuestStore } from "../../../stores/goalQuestStore";

const resolvePublicAsset = (assetPath: string | undefined) => {
  if (!assetPath) {
    return "";
  }

  return assetPath.replace(/^\/+/, "./");
};

const classAccents: Record<number, string> = {
  1: "#b779ff",
  2: "#ffd166",
  3: "#ff7f9f",
  4: "#54d6b5",
  5: "#e4d85f",
  6: "#b6d98a",
  7: "#8f7cff",
  8: "#46c7e8"
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
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const selectCharacter = useGoalQuestStore((state) => state.selectCharacter);
  const startAdventure = useGoalQuestStore((state) => state.startAdventure);
  const touchStartX = useRef<number | null>(null);

  const initialIndex = Math.max(
    0,
    goalQuestCharacters.findIndex((character) => character.id === selectedCharacter?.id)
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    if (!selectedCharacter) {
      return;
    }

    const nextIndex = goalQuestCharacters.findIndex((character) => character.id === selectedCharacter.id);
    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    }
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
  const previousCharacter = goalQuestCharacters[wrapIndex(activeIndex - 1)];
  const nextCharacter = goalQuestCharacters[wrapIndex(activeIndex + 1)];
  const activePath = pathForCharacter(activeCharacter.id);
  const activeAccent = classAccents[activeCharacter.id] ?? activeCharacter.color;
  const activeImageSrc = resolvePublicAsset(goalQuestAssets.classes[activeCharacter.id]);

  const moveBy = (direction: number) => {
    setActiveIndex((current) => wrapIndex(current + direction));
  };

  const confirmCharacter = () => {
    selectCharacter(activeCharacter.id);
    startAdventure();
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 45) {
      return;
    }

    moveBy(delta > 0 ? -1 : 1);
  };

  const renderSidePreview = (character: (typeof goalQuestCharacters)[number], direction: -1 | 1) => {
    const accent = classAccents[character.id] ?? character.color;
    const imageSrc = resolvePublicAsset(goalQuestAssets.classes[character.id]);

    return (
      <button
        type="button"
        className={`character-carousel-side character-carousel-side--${direction < 0 ? "left" : "right"}`}
        onClick={() => moveBy(direction)}
        aria-label={`${direction < 0 ? "Previous" : "Next"} character: ${character.name}`}
        style={{ "--class-accent": accent } as React.CSSProperties}
      >
        <img
          className={`character-carousel-side-sprite ${character.id === 3 ? "character-select-sprite--blend" : ""}`}
          src={imageSrc}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />
        <span>{character.name}</span>
      </button>
    );
  };

  return (
    <div className="game-screen active character-select-screen character-carousel-screen">
      <button type="button" className="character-back-button" onClick={() => setScreen("start")}>
        <span aria-hidden="true">←</span>
        <span>BACK</span>
      </button>

      <header className="character-select-header character-carousel-header">
        <h2>SELECT YOUR CHARACTER</h2>
        <p>Choose the hero who matches the way you want to grow</p>
      </header>

      <section
        className="character-carousel"
        aria-label="Character carousel"
        style={{ "--class-accent": activeAccent } as React.CSSProperties}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          className="character-carousel-arrow character-carousel-arrow--left"
          onClick={() => moveBy(-1)}
          aria-label="Previous character"
        >
          ‹
        </button>

        {renderSidePreview(previousCharacter, -1)}

        <article className="character-carousel-active" aria-live="polite">
          <div className="character-carousel-selected-label">★ SELECTED ★</div>

          <div className="character-carousel-hero-stage" aria-hidden="true">
            <span className="character-carousel-hero-glow" />
            <img
              className={`character-carousel-main-sprite ${activeCharacter.id === 3 ? "character-select-sprite--blend" : ""}`}
              src={activeImageSrc}
              alt=""
              loading="eager"
              decoding="async"
            />
            <span className="character-carousel-platform" />
          </div>

          <div className="character-carousel-copy">
            <h3>{activeCharacter.name}</h3>
            <p className="character-carousel-role">{activeCharacter.skill}</p>
            <p className="character-carousel-path">{activePath?.name ?? "PATH OF THE ADVENTURER"}</p>
            <p className="character-carousel-description">{activeCharacter.description}</p>
          </div>

          <div className="character-carousel-stats" aria-label={`${activeCharacter.name} stats`}>
            <span className="character-carousel-stat character-carousel-stat--hp">
              <span aria-hidden="true">♥</span>
              <strong>{activeCharacter.hp}</strong>
              <small>HP</small>
            </span>
            <span className="character-carousel-stat character-carousel-stat--mp">
              <span aria-hidden="true">◆</span>
              <strong>{activeCharacter.mp}</strong>
              <small>MP</small>
            </span>
            <span className="character-carousel-stat character-carousel-stat--skill">
              <span aria-hidden="true">✦</span>
              <strong>{activeCharacter.abilities[0]}</strong>
            </span>
          </div>
        </article>

        {renderSidePreview(nextCharacter, 1)}

        <button
          type="button"
          className="character-carousel-arrow character-carousel-arrow--right"
          onClick={() => moveBy(1)}
          aria-label="Next character"
        >
          ›
        </button>
      </section>

      <nav className="character-carousel-dots" aria-label="Choose character">
        {goalQuestCharacters.map((character, index) => (
          <button
            key={character.id}
            type="button"
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${character.name}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </nav>

      <div className="character-carousel-counter" aria-hidden="true">
        {activeIndex + 1} / {goalQuestCharacters.length}
      </div>

      <div className="character-start-area character-carousel-start-area">
        <button type="button" className="character-start-button character-carousel-start-button" onClick={confirmCharacter}>
          <i className="fas fa-play" aria-hidden="true" />
          <span>{selectedCharacter?.id === activeCharacter.id ? "CONTINUE WITH THIS CLASS" : "START AS " + activeCharacter.name}</span>
        </button>
      </div>

      <p className="character-carousel-help">Use ← →, click a side hero, or swipe to browse</p>
    </div>
  );
}
