import React, { useEffect, useState } from "react";

const VISIBLE_MS = 5000;
const HIDDEN_MS = 18000;

export default function NextStepCard({
  title,
  text,
  icon = "🧭",
  accent = "var(--warning)",
  children
}: {
  title: string;
  text: string;
  icon?: string;
  accent?: string;
  children?: React.ReactNode;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, [title, text]);

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setVisible((current) => !current),
      visible ? VISIBLE_MS : HIDDEN_MS
    );

    return () => window.clearTimeout(timeout);
  }, [visible, title, text]);

  if (!visible) {
    return null;
  }

  return (
    <aside
      className="goalquest-next-step"
      aria-label="Recommended next step"
      style={{ "--next-step-accent": accent } as React.CSSProperties}
    >
      <div className="goalquest-next-step-icon" aria-hidden="true">{icon}</div>

      <div className="goalquest-next-step-copy">
        <div className="goalquest-next-step-label">NEXT STEP</div>
        <div className="goalquest-next-step-title">{title}</div>
        <div className="goalquest-next-step-text">{text}</div>
      </div>

      {children ? <div className="goalquest-next-step-actions">{children}</div> : null}

      <button
        type="button"
        className="goalquest-next-step-close"
        onClick={() => setVisible(false)}
        aria-label="Hide next step"
        title="Hide for now"
      >
        ×
      </button>
    </aside>
  );
}
