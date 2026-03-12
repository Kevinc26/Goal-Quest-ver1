import React, { useEffect, useRef, useState } from "react";

export default function MusicToggleButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("goalquest_music");
    setEnabled(saved === "on");

    const audio = new Audio("/assets/music/tema-inicio.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (enabled) {
      audioRef.current.play().catch(() => {
        // Browser autoplay policies may block until user interaction.
      });
      window.localStorage.setItem("goalquest_music", "on");
    } else {
      audioRef.current.pause();
      window.localStorage.setItem("goalquest_music", "off");
    }
  }, [enabled]);

  return (
    <button
      type="button"
      onClick={() => setEnabled((value) => !value)}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#4a4e69",
        color: "white",
        border: "2px solid var(--primary)",
        borderRadius: "30px",
        padding: "10px 20px",
        fontFamily: "'Press Start 2P', cursive",
        fontSize: "10px",
        cursor: "pointer",
        zIndex: 10000,
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
      }}
    >
      {enabled ? "🎵 Musica: ON" : "🎵 Musica: OFF"}
    </button>
  );
}
