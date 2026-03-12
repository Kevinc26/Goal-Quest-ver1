import React from "react";

import { useGoalQuestStore } from "../../../stores/goalQuestStore";

export default function NotificationLayer() {
  const toasts = useGoalQuestStore((state) => state.toasts);

  if (!toasts.length) {
    return null;
  }

  return (
    <>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="notification"
          style={{
            borderLeftColor: toast.color,
            top: `${20 + index * 96}px`
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "20px", color: toast.color }}>{toast.icon ?? "💡"}</div>
            <div style={{ fontSize: "10px" }}>{toast.message}</div>
          </div>
        </div>
      ))}
    </>
  );
}
