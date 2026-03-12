import React from "react";

import { regionById } from "../../../game/data";
import { useGoalQuestStore } from "../../../stores/goalQuestStore";
import { percent } from "../utils";

export default function CombatScreen() {
  const combat = useGoalQuestStore((state) => state.currentCombat);
  const stats = useGoalQuestStore((state) => state.stats);
  const character = useGoalQuestStore((state) => state.character);
  const performAttack = useGoalQuestStore((state) => state.performAttack);
  const fleeCombat = useGoalQuestStore((state) => state.fleeCombat);

  if (!combat) {
    return (
      <div className="game-screen active">
        <h2 style={{ color: "var(--warning)" }}>No hay combate activo</h2>
      </div>
    );
  }

  const region = regionById(combat.regionId);
  if (!region || !character) {
    return null;
  }

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={fleeCombat} style={{ marginBottom: "20px" }}>
        🏃 HUIR
      </button>

      <div className="combat-arena">
        <div className="combat-context">Hoy enfrentas tu miedo.</div>
        <h2 style={{ color: "var(--danger)", textAlign: "center" }}>VS {region.boss.name}</h2>

        <div style={{ display: "flex", justifyContent: "space-around", margin: "30px 0", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "60px" }}>{character.icon}</div>
            <div>{character.name}</div>
            <div className="stat-bar hp-bar">
              <div className="stat-fill" style={{ width: `${percent(combat.playerHp, stats.maxHp)}%` }}>
                <div className="stat-text">
                  {combat.playerHp}/{stats.maxHp}
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: "40px", color: "var(--danger)" }}>⚔️</div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "60px" }}>{region.boss.sprite}</div>
            <div>{region.boss.name}</div>
            <div className="stat-bar hp-bar">
              <div className="stat-fill" style={{ width: `${percent(combat.enemyCurrentHp, region.boss.hp)}%` }}>
                <div className="stat-text">
                  {combat.enemyCurrentHp}/{region.boss.hp}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="button-container" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
          <button type="button" className="ff-button" onClick={() => performAttack("weak")}>
            ⚡ DEBIL
          </button>
          <button type="button" className="ff-button" onClick={() => performAttack("medium")}>
            💥 MEDIO
          </button>
          <button type="button" className="ff-button" onClick={() => performAttack("strong")}>
            🔥 FUERTE
          </button>
        </div>
      </div>
    </div>
  );
}
