import React from "react";

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
  return (
    <section
      aria-label="Recommended next step"
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto 24px",
        padding: "18px 20px",
        border: `2px solid ${accent}`,
        borderRadius: "14px",
        background: "rgba(10, 10, 24, 0.78)",
        boxShadow: "0 0 22px rgba(77, 255, 145, 0.1)",
        textAlign: "left"
      }}
    >
      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
        <div style={{ fontSize: "26px", lineHeight: 1 }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: accent, fontSize: "9px", marginBottom: "7px", letterSpacing: "1px" }}>NEXT STEP</div>
          <h3 style={{ color: "white", fontSize: "13px", lineHeight: 1.5, marginBottom: "8px", textAlign: "left" }}>
            {title}
          </h3>
          <p style={{ color: "#c8c8d4", fontSize: "10px", lineHeight: 1.8, textAlign: "left" }}>{text}</p>
          {children ? <div style={{ marginTop: "14px" }}>{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
