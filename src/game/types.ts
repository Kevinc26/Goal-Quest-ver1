export type MissionType = "text" | "timer";

export type ScreenName =
  | "start"
  | "characters"
  | "world"
  | "region"
  | "daily"
  | "combat"
  | "rest"
  | "settings"
  | "achievements";

export interface Character {
  id: number;
  name: string;
  icon: string;
  color: string;
  colorRgb: string;
  hp: number;
  mp: number;
  skill: string;
  description: string;
  abilities: string[];
}

export interface RegionBoss {
  name: string;
  sprite: string;
  hp: number;
  difficulty: number;
  attacks: string[];
}

export interface Region {
  id: number;
  name: string;
  color: string;
  colorRgb: string;
  icon: string;
  boss: RegionBoss;
  missions: string[];
  missionTypes: MissionType[];
}

export interface DailyMissionTemplate {
  text: string;
  type: MissionType;
  time?: number;
}

export interface DailyCategory {
  name: string;
  color: string;
  missions: DailyMissionTemplate[];
}

export interface DailyMission extends DailyMissionTemplate {
  id: string;
  category: string;
  categoryColor: string;
}

export interface Stats {
  hp: number;
  mp: number;
  exp: number;
  level: number;
  maxHp: number;
  maxMp: number;
  nextLevelExp: number;
  dailyExp: number;
  dailyStreak: number;
  dailyTasksCompleted: number;
  dailyTasksGoal: number;
  lastRegionMissionDate: string | null;
  lastCompletedRegionDay: number | null;
  totalTasksCompleted: number;
  daysCompleted: number;
}

export interface CurrentTask {
  id: string;
  type: "daily" | "region";
  missionId?: string;
  regionId?: number;
  missionIndex?: number;
  missionText: string;
  missionType: MissionType;
  userInput: string;
  initialSeconds: number;
  secondsLeft: number;
}

export interface CombatState {
  regionId: number;
  enemyCurrentHp: number;
  playerHp: number;
  turn: number;
  log: string[];
}

export interface Toast {
  id: string;
  message: string;
  icon?: string;
  color?: string;
}

export interface ClassPath {
  name: string;
  description: string;
  motivationalMessages: string[];
}


