import type { Character, ClassPath, DailyCategory, Region } from "./types";

export const CHARACTERS: Character[] = [
  {
    id: 1,
    name: "MAGE",
    icon: "🧙",
    color: "#9d4edd",
    colorRgb: "157,78,221",
    hp: 32,
    mp: 60,
    skill: "Mental Clarity",
    description: "Master mental chaos with arcane wisdom",
    abilities: ["Mental Fireball", "Focus Shield"]
  },
  {
    id: 2,
    name: "KNIGHT",
    icon: "⚔️",
    color: "#4a4e69",
    colorRgb: "74,78,105",
    hp: 55,
    mp: 20,
    skill: "Iron Discipline",
    description: "Forge habits with unbreakable discipline",
    abilities: ["Willpower Strike", "Routine Shield"]
  },
  {
    id: 3,
    name: "HEALER",
    icon: "❤️",
    color: "#ff6b6b",
    colorRgb: "255,107,107",
    hp: 40,
    mp: 50,
    skill: "Vital Energy",
    description: "Restore your energy with restorative magic",
    abilities: ["Energy Healing", "Resting Blessing"]
  },
  {
    id: 4,
    name: "TANK",
    icon: "🛡️",
    color: "#43aa8b",
    colorRgb: "67,170,139",
    hp: 70,
    mp: 15,
    skill: "Mental Resilience",
    description: "Withstand pressure with unbreakable defenses",
    abilities: ["Focus Wall", "Persistence Strike"]
  },
  {
    id: 5,
    name: "ARCHER",
    icon: "🏹",
    color: "#f9c74f",
    colorRgb: "249,199,79",
    hp: 45,
    mp: 35,
    skill: "Precise Focus",
    description: "Eliminate distractions with deadly precision",
    abilities: ["Focus Arrow", "Precision Shot"]
  },
  {
    id: 6,
    name: "CLERIC",
    icon: "🙏",
    color: "#90be6d",
    colorRgb: "144,190,109",
    hp: 50,
    mp: 45,
    skill: "Inner Balance",
    description: "Balance your life with spiritual wisdom",
    abilities: ["Balance Blessing", "Prayer of Clarity"]
  },
  {
    id: 7,
    name: "NINJA",
    icon: "🥷",
    color: "#222831",
    colorRgb: "34,40,49",
    hp: 48,
    mp: 40,
    skill: "Mental Agility",
    description: "Move quickly between tasks with stealth and precision",
    abilities: ["Swift Strike", "Distraction Evasion"]
  },
  {
    id: 8,
    name: "ALCHEMIST",
    icon: "⚗️",
    color: "#00adb5",
    colorRgb: "0,173,181",
    hp: 38,
    mp: 65,
    skill: "Transformation",
    description: "Transform negative habits into positive ones",
    abilities: ["Focus Potion", "Mental Transformation"]
  }
];

export const REGIONS: Region[] = [
  {
    id: 1,
    name: "CHAOS FOREST",
    color: "#ff6b6b",
    colorRgb: "255,107,107",
    icon: "🧠",
    boss: {
      name: "Dragon of Disorder",
      sprite: "🐉",
      hp: 100,
      difficulty: 1,
      attacks: ["Confusion", "Procrastination", "Distraction"]
    },
    missions: [
      "Write down chaotic thoughts",
      "Sort tasks by energy level",
      "Remove unnecessary activities",
      "Meditate for 10 minutes",
      "Create a priority list",
      "Clean your workspace",
      "Plan next week"
    ],
    missionTypes: ["text", "text", "text", "timer", "text", "text", "text"]
  },
  {
    id: 2,
    name: "MOUNTAIN OF IDENTITY",
    color: "#4ecdc4",
    colorRgb: "78,205,196",
    icon: "🏔️",
    boss: {
      name: "Golem of the Old Self",
      sprite: "🗿",
      hp: 120,
      difficulty: 2,
      attacks: ["Self-Criticism", "Doubt", "Fear of Change"]
    },
    missions: [
      "Define your new identity",
      "List actions your new self would take",
      "Visualize success",
      "Create a daily affirmation",
      "Act as your new self",
      "Share your change",
      "Celebrate a victory"
    ],
    missionTypes: ["text", "text", "text", "text", "text", "text", "text"]
  },
  {
    id: 3,
    name: "CITY OF INFLUENCE",
    color: "#45b7d1",
    colorRgb: "69,183,209",
    icon: "🏰",
    boss: {
      name: "Hydra of Bad Habits",
      sprite: "🐍",
      hp: 150,
      difficulty: 3,
      attacks: ["Temptation", "Negative Routine", "Toxic Influence"]
    },
    missions: [
      "Organize your physical space",
      "Remove distracting objects",
      "Clean up your digital space",
      "Set social boundaries",
      "Create a morning ritual",
      "Schedule breaks",
      "Evaluate your relationships"
    ],
    missionTypes: ["text", "text", "text", "text", "timer", "text", "text"]
  },
  {
    id: 4,
    name: "DESERT OF MOTIVATION",
    color: "#f9c74f",
    colorRgb: "249,199,79",
    icon: "🏜️",
    boss: {
      name: "Phoenix of Discouragement",
      sprite: "🔥",
      hp: 140,
      difficulty: 3,
      attacks: ["Discouragement", "Lack of Purpose", "Burnout"]
    },
    missions: [
      "Identify your purpose",
      "Create a vision for the future",
      "List personal rewards",
      "Visualize your goal achieved",
      "Find inspiration",
      "Share your progress",
      "Celebrate small wins"
    ],
    missionTypes: ["text", "text", "text", "text", "text", "text", "text"]
  },
  {
    id: 5,
    name: "OCEAN OF DISCIPLINE",
    color: "#4a4e69",
    colorRgb: "74,78,105",
    icon: "🌊",
    boss: {
      name: "Kraken of Laziness",
      sprite: "🐙",
      hp: 160,
      difficulty: 4,
      attacks: ["Laziness", "Excuses", "Self-Deception"]
    },
    missions: [
      "Create a morning routine",
      "Follow a structured schedule",
      "Exercise daily",
      "Work in focused blocks",
      "Avoid distractions",
      "Keep your space organized",
      "Review your daily progress"
    ],
    missionTypes: ["text", "timer", "timer", "timer", "text", "text", "text"]
  },
  {
    id: 6,
    name: "SKY OF CREATIVITY",
    color: "#9d4edd",
    colorRgb: "157,78,221",
    icon: "☁️",
    boss: {
      name: "Dragon of Creative Block",
      sprite: "🌩️",
      hp: 180,
      difficulty: 4,
      attacks: ["Creative Block", "Perfectionism", "Fear of Failure"]
    },
    missions: [
      "Brainstorm ideas",
      "Work on a daily creative project",
      "Seek inspiration",
      "Experiment without fear",
      "Share your creation",
      "Ask for feedback",
      "Iterate and improve"
    ],
    missionTypes: ["text", "text", "timer", "text", "text", "text", "text"]
  },
  {
    id: 7,
    name: "HELL OF FEAR",
    color: "#f94144",
    colorRgb: "249,65,68",
    icon: "🔥",
    boss: {
      name: "Demon of Anxiety",
      sprite: "😈",
      hp: 200,
      difficulty: 5,
      attacks: ["Anxiety", "Panic", "Paralysis"]
    },
    missions: [
      "Practice gradual exposure",
      "Practice mindful breathing",
      "Keep a fear journal",
      "Write positive affirmations",
      "Ask for support",
      "Practice courage",
      "Celebrate facing your fears"
    ],
    missionTypes: ["text", "timer", "text", "text", "text", "text", "text"]
  },
  {
    id: 8,
    name: "SKY OF HARMONY",
    color: "#90be6d",
    colorRgb: "144,190,109",
    icon: "🌈",
    boss: {
      name: "Angel of Balance",
      sprite: "👼",
      hp: 250,
      difficulty: 5,
      attacks: ["Imbalance", "Obsession", "Burnout"]
    },
    missions: [
      "Daily meditation",
      "Practice work-life balance",
      "Practice intentional self-care",
      "Daily gratitude",
      "Build social connection",
      "Spend time in nature",
      "Weekly reflection"
    ],
    missionTypes: ["timer", "text", "timer", "text", "text", "timer", "text"]
  }
];

export const DAILY_CATEGORIES: DailyCategory[] = [
  {
    name: "MINDFULNESS",
    color: "#4dff91",
    missions: [
      { text: "Meditate on your breath for 5 minutes", type: "timer", time: 5 },
      { text: "Practice mindful breathing for 3 minutes", type: "timer", time: 3 },
      { text: "Write down 3 things you are grateful for", type: "text" },
      { text: "Do a 2-minute body scan", type: "timer", time: 2 },
      { text: "Observe your thoughts without judgment for 5 minutes", type: "timer", time: 5 }
    ]
  },
  {
    name: "PRODUCTIVITY",
    color: "#6c63ff",
    missions: [
      { text: "Prioritize 3 important tasks", type: "text" },
      { text: "Use focus mode for 25 minutes", type: "timer", time: 25 },
      { text: "Clear your inbox", type: "text" },
      { text: "Plan tomorrow", type: "text" },
      { text: "Remove 3 distractions from your space", type: "text" }
    ]
  },
  {
    name: "WELLBEING",
    color: "#ff6b6b",
    missions: [
      { text: "Stretch for 10 minutes", type: "timer", time: 10 },
      { text: "Walk for 15 minutes", type: "timer", time: 15 },
      { text: "Drink enough water", type: "text" },
      { text: "Prepare a healthy meal", type: "text" },
      { text: "Practice good posture for 5 minutes", type: "timer", time: 5 }
    ]
  },
  {
    name: "GROWTH",
    color: "#ffd166",
    missions: [
      { text: "Read 10 pages", type: "text" },
      { text: "Write a reflection on your day", type: "text" },
      { text: "Practice a skill for 15 minutes", type: "timer", time: 15 },
      { text: "Choose one improvement and create an action plan", type: "text" },
      { text: "Listen to an educational podcast for 20 minutes", type: "timer", time: 20 }
    ]
  }
];

export const CLASS_TO_PATH: Record<number, keyof typeof CLASS_PATHS> = {
  1: "clarity",
  2: "discipline",
  3: "energy",
  4: "resilience",
  5: "focus",
  6: "balance",
  7: "agility",
  8: "transformation"
};

export const CLASS_PATHS: Record<string, ClassPath> = {
  clarity: {
    name: "PATH OF CLARITY",
    description: "Master mental chaos with precision",
    motivationalMessages: [
      "Clarity comes when the noise fades.",
      "Every clear thought brings you closer to your goal."
    ]
  },
  discipline: {
    name: "PATH OF DISCIPLINE",
    description: "Forge habits with unbreakable discipline",
    motivationalMessages: [
      "Discipline wins when motivation fades.",
      "Consistency builds results."
    ]
  },
  energy: {
    name: "PATH OF ENERGY",
    description: "Restore your energy through self-care",
    motivationalMessages: [
      "Your energy is sacred.",
      "Taking care of yourself makes you stronger."
    ]
  },
  resilience: {
    name: "PATH OF RESILIENCE",
    description: "Stay steady under pressure",
    motivationalMessages: [
      "Strength also means knowing when to rest.",
      "Recovery is part of progress."
    ]
  },
  focus: {
    name: "PATH OF FOCUS",
    description: "Eliminate distractions with precision",
    motivationalMessages: [
      "Where your attention goes, your energy follows.",
      "Deep focus creates real progress."
    ]
  },
  balance: {
    name: "PATH OF BALANCE",
    description: "Balance your life with intention",
    motivationalMessages: [
      "Balance is a daily practice.",
      "Move forward without losing your center."
    ]
  },
  agility: {
    name: "PATH OF AGILITY",
    description: "Move quickly and precisely",
    motivationalMessages: [
      "Agility is not rushing.",
      "Flow is also a strategy."
    ]
  },
  transformation: {
    name: "PATH OF TRANSFORMATION",
    description: "Transform negative habits into positive ones",
    motivationalMessages: [
      "You can reinvent yourself every day.",
      "Small changes create big transformations."
    ]
  }
};

export const ASSETS = {
  start: "/assets/backgrounds/pantalla de inicio.png",
  acts: {
    1: "/assets/backgrounds/Acto 1.png",
    2: "/assets/backgrounds/acto 2.png",
    3: "/assets/backgrounds/acto 3.png",
    4: "/assets/backgrounds/acto 4.png",
    5: "/assets/backgrounds/acto 5.png",
    6: "/assets/backgrounds/acto 6.png",
    7: "/assets/backgrounds/acto 7.png",
    8: "/assets/backgrounds/acto 8.png"
  } as Record<number, string>,
  classes: {
    1: "/assets/classes/mago.png",
    2: "/assets/classes/caballero.png",
    3: "/assets/classes/curador.png",
    4: "/assets/classes/Tanque.png",
    5: "/assets/classes/arquero.png",
    6: "/assets/classes/clerigo.png",
    7: "/assets/classes/ninja.png",
    8: "/assets/classes/alquimista.png"
  } as Record<number, string>
};

export const regionById = (id: number) => REGIONS.find((region) => region.id === id);
export const characterById = (id: number) => CHARACTERS.find((character) => character.id === id);
