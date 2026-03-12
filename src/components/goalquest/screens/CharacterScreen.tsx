import React from "react";

import { goalQuestAssets, goalQuestCharacters, useGoalQuestStore } from "../../../stores/goalQuestStore";

export default function CharacterScreen() {
  const selectedCharacter = useGoalQuestStore((state) => state.character);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const selectCharacter = useGoalQuestStore((state) => state.selectCharacter);
  const startAdventure = useGoalQuestStore((state) => state.startAdventure);
  const getPathName = useGoalQuestStore((state) => state.getPathName);

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={() => setScreen("start")} style={{ marginBottom: "20px" }}>
        ← VOLVER
      </button>

      <h2 style={{ color: "var(--primary)", margin: "20px 0" }}>SELECCIONA TU PERSONAJE</h2>

      <div className="character-grid">
        {goalQuestCharacters.map((character) => {
          const selected = selectedCharacter?.id === character.id;
          return (
            <button
              key={character.id}
              type="button"
              className={`character-card ${selected ? "selected" : ""}`}
              onClick={() => selectCharacter(character.id)}
              style={{ textAlign: "left" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "2px solid rgba(255,255,255,0.2)",
                    background: "rgba(0,0,0,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <img
                    src={goalQuestAssets.classes[character.id]}
                    alt={character.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", imageRendering: "pixelated" }}
                  />
                </div>
                <div>
                  <h3 style={{ color: character.color }}>{character.name}</h3>
                  <p style={{ fontSize: "10px", color: "#aaa" }}>{character.skill}</p>
                  {selected ? (
                    <p style={{ fontSize: "8px", color: character.color, marginTop: "5px" }}>{getPathName()}</p>
                  ) : null}
                </div>
              </div>

              <p style={{ margin: "15px 0", fontSize: "12px", color: "#ccc", flexGrow: 1 }}>{character.description}</p>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "var(--danger)", fontSize: "11px" }}>HP</div>
                  <div style={{ fontSize: "14px" }}>{character.hp}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "var(--primary)", fontSize: "11px" }}>MP</div>
                  <div style={{ fontSize: "14px" }}>{character.mp}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "var(--warning)", fontSize: "11px" }}>HAB.</div>
                  <div style={{ fontSize: "10px" }}>{character.abilities[0]}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedCharacter ? (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button type="button" className="ff-button" onClick={startAdventure}>
            <i className="fas fa-play" /> COMENZAR
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "var(--warning)", marginTop: "30px" }}>Selecciona un personaje</div>
      )}
    </div>
  );
}
