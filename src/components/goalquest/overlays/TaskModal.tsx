import React, { useEffect } from "react";

import { useGoalQuestStore } from "../../../stores/goalQuestStore";
import { formatTime } from "../utils";

export default function TaskModal() {
  const task = useGoalQuestStore((state) => state.currentTask);
  const taskTimerPaused = useGoalQuestStore((state) => state.taskTimerPaused);
  const closeTask = useGoalQuestStore((state) => state.closeTask);
  const setTaskInput = useGoalQuestStore((state) => state.setTaskInput);
  const completeTask = useGoalQuestStore((state) => state.completeTask);
  const toggleTaskTimer = useGoalQuestStore((state) => state.toggleTaskTimer);
  const resetTaskTimer = useGoalQuestStore((state) => state.resetTaskTimer);
  const tickTaskTimer = useGoalQuestStore((state) => state.tickTaskTimer);

  useEffect(() => {
    if (!task || task.missionType !== "timer") {
      return;
    }

    const interval = window.setInterval(() => {
      tickTaskTimer();
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [task?.id, task?.missionType, tickTaskTimer]);

  if (!task) {
    return null;
  }

  return (
    <div className="task-popup">
      <div className="popup-content">
        {task.missionType === "timer" ? (
          <>
            <div className="popup-icon" style={{ color: "var(--warning)" }}>
              ⏰
            </div>
            <h3 style={{ color: "var(--warning)", marginBottom: "20px" }}>{task.missionText}</h3>
            <div className="timer-container">
              <div className="timer-display">{formatTime(task.secondsLeft)}</div>
              <div className="timer-buttons" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button type="button" className="ff-button" onClick={toggleTaskTimer} style={{ background: "var(--warning)" }}>
                  {taskTimerPaused ? "▶ CONTINUAR" : "⏸ PAUSAR"}
                </button>
                <button type="button" className="ff-button" onClick={resetTaskTimer} style={{ background: "var(--danger)" }}>
                  🔄 REINICIAR
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="popup-icon" style={{ color: "var(--primary)" }}>
              📝
            </div>
            <h3 style={{ color: "var(--primary)", marginBottom: "20px" }}>{task.missionText}</h3>
            <textarea
              className="task-textarea"
              placeholder="Escribe aqui..."
              value={task.userInput}
              onChange={(event) => setTaskInput(event.target.value)}
            />
          </>
        )}

        <button type="button" className="ff-button" onClick={completeTask} style={{ marginTop: "20px" }}>
          ✅ COMPLETAR
        </button>
        <button
          type="button"
          className="ff-button"
          onClick={closeTask}
          style={{ marginTop: "15px", background: "var(--danger)" }}
        >
          ❌ CANCELAR
        </button>
      </div>
    </div>
  );
}
