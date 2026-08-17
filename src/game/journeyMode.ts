export type JourneyMode = "adventure" | "custom" | "hybrid";

const JOURNEY_MODE_KEY = "goalquest_journey_mode_v1";
const JOURNEY_MODE_EVENT = "goalquest:journey-mode-changed";

const isJourneyMode = (value: string | null): value is JourneyMode =>
  value === "adventure" || value === "custom" || value === "hybrid";

export const getJourneyMode = (): JourneyMode | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(JOURNEY_MODE_KEY);
  return isJourneyMode(value) ? value : null;
};

export const setJourneyMode = (mode: JourneyMode) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(JOURNEY_MODE_KEY, mode);
  window.dispatchEvent(new CustomEvent(JOURNEY_MODE_EVENT, { detail: mode }));
};

export const clearJourneyMode = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(JOURNEY_MODE_KEY);
  window.dispatchEvent(new CustomEvent(JOURNEY_MODE_EVENT, { detail: null }));
};

export const subscribeJourneyMode = (listener: (mode: JourneyMode | null) => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => listener(getJourneyMode());
  window.addEventListener(JOURNEY_MODE_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(JOURNEY_MODE_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
};
