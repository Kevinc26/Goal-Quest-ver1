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

  const timerIncomplete = task.missionType === "timer" && task.secondsLeft > 0;
  const completionLabel = timerIncomplete
    ? `🔒 COMPLETE IN ${formatTime(task.secondsLeft)}`
    : "✅ COMPLETE QUEST";

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
              <p
                style={{
                  color: timerIncomplete ? "#aaa" : "var(--primary)",
                  fontSize: "10px",
                  lineHeight: 1.6,
                  margin: "12px auto 16px",
                  maxWidth: "360px"
                }}
                aria-live="polite"
              >
                {timerIncomplete
                  ? `Complete Quest unlocks when the timer reaches 00:00. ${formatTime(task.secondsLeft)} remaining.`
                  : "Timer complete. You can now complete this quest."}
              </p>
              <div className="timer-buttons" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button type="button" className="ff-button" onClick={toggleTaskTimer} style={{ background: "var(--warning)" }}>
                  {taskTimerPaused ? "▶ CONTINUE" : "⏸ PAUSE"}
                </button>
                <button type="button" className="ff-button" onClick={resetTaskTimer} style={{ background: "var(--danger)" }}>
                  🔄 RESET
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
              placeholder="Write here..."
              value={task.userInput}
              onChange={(event) => setTaskInput(event.target.value)}
            />
          </>
        )}

        <button
          type="button"
          className="ff-button"
          onClick={completeTask}
          disabled={timerIncomplete}
          aria-disabled={timerIncomplete}
          style={{
            marginTop: "20px",
            ...(timerIncomplete
              ? {
                  background: "#45455a",
                  color: "#9a9aad",
                  cursor: "not-allowed",
                  boxShadow: "none",
                  filter: "none",
                  borderBottomColor: "#303040",
                  opacity: 0.72
                }
              : {})
          }}
        >
          {completionLabel}
        </button>
        <button
          type="button"
          className="ff-button"
          onClick={closeTask}
          style={{ marginTop: "15px", background: "var(--danger)" }}
        >
          ❌ CANCEL
        </button>
      </div>
    </div>
  );
}
