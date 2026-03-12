import React from "react";

import type { ScreenName } from "../../game/types";
import { useGoalQuestStore } from "../../stores/goalQuestStore";
import AchievementsScreen from "./screens/AchievementsScreen";
import CharacterScreen from "./screens/CharacterScreen";
import CombatScreen from "./screens/CombatScreen";
import DailyScreen from "./screens/DailyScreen";
import RegionScreen from "./screens/RegionScreen";
import RestScreen from "./screens/RestScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StartScreen from "./screens/StartScreen";
import WorldScreen from "./screens/WorldScreen";

export default function ScreenRouter() {
  const screen = useGoalQuestStore((state) => state.screen);

  const componentByScreen: Record<ScreenName, React.ReactNode> = {
    start: <StartScreen />,
    characters: <CharacterScreen />,
    world: <WorldScreen />,
    region: <RegionScreen />,
    daily: <DailyScreen />,
    combat: <CombatScreen />,
    rest: <RestScreen />,
    settings: <SettingsScreen />,
    achievements: <AchievementsScreen />
  };

  return <>{componentByScreen[screen]}</>;
}
