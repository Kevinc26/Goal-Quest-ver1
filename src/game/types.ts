export type MissionType = "text" | "timer" | "check";

export type ScreenName =
  | "start"
  | "characters"
  | "journey"
  | "gear"
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

export type CombatStatusEffectId = "guard" | "vulnerable" | "weakened" | "confused";

export interface CombatStatusEffect {
  id: CombatStatusEffectId;
  turns: number;
  potency: number;
}

export interface CombatState {
  regionId: number;
  enemyCurrentHp: number;
  playerHp: number;
  turn: number;
  log: string[];
  /** Optional for compatibility with saves created before the RPG combat overhaul. */
  outcome?: "active" | "victory" | "defeat";
  /** Boss EXP reward, captured when victory happens so the result screen can present it. */
  reward?: number;
  /** Cinematic combat V2 resource state. Old saves fall back to Stats.mp. */
  playerMp?: number;
  /** Temporary player effects used by class guard/heal/status mechanics. */
  playerEffects?: CombatStatusEffect[];
  /** Temporary boss effects applied by class abilities. */
  bossEffects?: CombatStatusEffect[];
}

export interface JourneyRecord {
  journeyNumber: number;
  ascensionLevel: number;
  completedAt: string;
  characterId: number | null;
  characterLevel: number;
  totalTasksCompleted: number;
  dailyStreak: number;
  bossesDefeated: number;
}

export interface JourneyState {
  journeyNumber: number;
  ascensionLevel: number;
  startedAt: string;
  history: JourneyRecord[];
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
