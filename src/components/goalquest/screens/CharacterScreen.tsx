import React from "react";

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

export default function CharacterScreen() {
  const selectedCharacter = useGoalQuestStore((state) => state.character);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const selectCharacter = useGoalQuestStore((state) => state.selectCharacter);
  const startAdventure = useGoalQuestStore((state) => state.startAdventure);

  return (
    <div className="game-screen active character-select-screen">
      <button type="button" className="character-back-button" onClick={() => setScreen("start")}>
        <span aria-hidden="true">←</span>
        <span>BACK</span>
      </button>

      <header className="character-select-header">
        <h2>SELECT YOUR CHARACTER</h2>
        <p>Choose the path that fits you</p>
      </header>

      <div className="character-grid character-select-grid">
        {goalQuestCharacters.map((character) => {
          const selected = selectedCharacter?.id === character.id;
          const classImageSrc = resolvePublicAsset(goalQuestAssets.classes[character.id]);
          const accent = classAccents[character.id] ?? character.color;
          const path = pathForCharacter(character.id);

          return (
            <button
              key={character.id}
              type="button"
              className={`character-card character-select-card ${selected ? "selected" : ""}`}
              onClick={() => selectCharacter(character.id)}
              aria-pressed={selected}
              style={{ "--class-accent": accent } as React.CSSProperties}
            >
              <div className="character-card-badge-slot">
                {selected ? <span className="character-selected-badge">★ SELECTED ★</span> : null}
              </div>

              <div className="character-sprite-stage" aria-hidden="true">
                <img
                  className={`character-select-sprite ${character.id === 3 ? "character-select-sprite--blend" : ""}`}
                  src={classImageSrc}
                  alt=""
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="character-card-copy">
                <h3>{character.name}</h3>
                <p className="character-role">{character.skill}</p>
                <p className="character-path-label">{path?.name ?? "PATH OF THE ADVENTURER"}</p>
                <p className="character-description">{character.description}</p>
              </div>

              <div className="character-stat-strip" aria-label={`${character.name} stats`}>
                <span className="character-stat character-stat-hp" title="HP">
                  <span aria-hidden="true">♥</span>
                  <strong>{character.hp}</strong>
                </span>
                <span className="character-stat character-stat-mp" title="MP">
                  <span aria-hidden="true">◆</span>
                  <strong>{character.mp}</strong>
                </span>
                <span className="character-stat character-stat-skill" title="Primary skill">
                  <span aria-hidden="true">✦</span>
                  <strong>{character.abilities[0]}</strong>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedCharacter ? (
        <div className="character-start-area">
          <button type="button" className="character-start-button" onClick={startAdventure}>
            <i className="fas fa-play" aria-hidden="true" />
            <span>START ADVENTURE</span>
          </button>
        </div>
      ) : (
        <div className="character-select-hint">SELECT A CHARACTER TO BEGIN</div>
      )}
    </div>
  );
}
