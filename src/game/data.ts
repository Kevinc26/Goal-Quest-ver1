import type { Character, ClassPath, DailyCategory, Region } from "./types";

export const CHARACTERS: Character[] = [
  {
    id: 1,
    name: "MAGO",
    icon: "🧙",
    color: "#9d4edd",
    colorRgb: "157,78,221",
    hp: 32,
    mp: 60,
    skill: "Claridad Mental",
    description: "Domina el caos mental con sabiduria arcana",
    abilities: ["Bola de Fuego Mental", "Escudo de Concentracion"]
  },
  {
    id: 2,
    name: "CABALLERO",
    icon: "⚔️",
    color: "#4a4e69",
    colorRgb: "74,78,105",
    hp: 55,
    mp: 20,
    skill: "Disciplina Ferrea",
    description: "Forja habitos con armadura inquebrantable",
    abilities: ["Golpe de Voluntad", "Escudo de Rutina"]
  },
  {
    id: 3,
    name: "CURADOR",
    icon: "❤️",
    color: "#ff6b6b",
    colorRgb: "255,107,107",
    hp: 40,
    mp: 50,
    skill: "Energia Vital",
    description: "Restaura tu energia con sanacion divina",
    abilities: ["Curacion Energetica", "Bendicion del Descanso"]
  },
  {
    id: 4,
    name: "TANQUE",
    icon: "🛡️",
    color: "#43aa8b",
    colorRgb: "67,170,139",
    hp: 70,
    mp: 15,
    skill: "Resistencia Mental",
    description: "Aguanta la presion con defensas inquebrantables",
    abilities: ["Pared de Enfoque", "Golpe de Persistencia"]
  },
  {
    id: 5,
    name: "ARQUERO",
    icon: "🏹",
    color: "#f9c74f",
    colorRgb: "249,199,79",
    hp: 45,
    mp: 35,
    skill: "Enfoque Preciso",
    description: "Elimina distracciones con punteria letal",
    abilities: ["Flecha de Enfoque", "Tiro Certero"]
  },
  {
    id: 6,
    name: "CLERIGO",
    icon: "🙏",
    color: "#90be6d",
    colorRgb: "144,190,109",
    hp: 50,
    mp: 45,
    skill: "Equilibrio Interior",
    description: "Balancea vida con sabiduria espiritual",
    abilities: ["Bendicion del Equilibrio", "Oracion de Claridad"]
  },
  {
    id: 7,
    name: "NINJA",
    icon: "🥷",
    color: "#222831",
    colorRgb: "34,40,49",
    hp: 48,
    mp: 40,
    skill: "Agilidad Mental",
    description: "Se mueve rapido entre tareas con sigilo",
    abilities: ["Ataque Veloz", "Evasion de Distracciones"]
  },
  {
    id: 8,
    name: "ALQUIMISTA",
    icon: "⚗️",
    color: "#00adb5",
    colorRgb: "0,173,181",
    hp: 38,
    mp: 65,
    skill: "Transformacion",
    description: "Transforma habitos negativos en positivos",
    abilities: ["Pocion de Enfoque", "Transformacion Mental"]
  }
];

export const REGIONS: Region[] = [
  {
    id: 1,
    name: "BOSQUE DEL CAOS",
    color: "#ff6b6b",
    colorRgb: "255,107,107",
    icon: "🧠",
    boss: {
      name: "Dragon del Desorden",
      sprite: "🐉",
      hp: 100,
      difficulty: 1,
      attacks: ["Confusion", "Procrastinacion", "Distraccion"]
    },
    missions: [
      "Escribir pensamientos caoticos",
      "Clasificar tareas por energia",
      "Eliminar actividades innecesarias",
      "Meditar 10 minutos",
      "Crear lista de prioridades",
      "Limpiar espacio de trabajo",
      "Planificar semana siguiente"
    ],
    missionTypes: ["text", "text", "text", "timer", "text", "text", "text"]
  },
  {
    id: 2,
    name: "MONTAÑA IDENTIDAD",
    color: "#4ecdc4",
    colorRgb: "78,205,196",
    icon: "🏔️",
    boss: {
      name: "Golem del Yo Viejo",
      sprite: "🗿",
      hp: 120,
      difficulty: 2,
      attacks: ["Autocritica", "Duda", "Miedo al Cambio"]
    },
    missions: [
      "Definir nueva identidad",
      "Listar acciones del nuevo yo",
      "Visualizar exito",
      "Crear afirmacion diaria",
      "Actuar como nuevo yo",
      "Compartir cambio",
      "Celebrar victoria"
    ],
    missionTypes: ["text", "text", "text", "text", "text", "text", "text"]
  },
  {
    id: 3,
    name: "CIUDAD ENTORNO",
    color: "#45b7d1",
    colorRgb: "69,183,209",
    icon: "🏰",
    boss: {
      name: "Hydra de Malos Habitos",
      sprite: "🐍",
      hp: 150,
      difficulty: 3,
      attacks: ["Tentacion", "Rutina Negativa", "Influencia Toxica"]
    },
    missions: [
      "Organizar espacio fisico",
      "Eliminar objetos distractores",
      "Limpiar espacio digital",
      "Definir limites sociales",
      "Crear ritual matutino",
      "Programar descansos",
      "Evaluar relaciones"
    ],
    missionTypes: ["text", "text", "text", "text", "timer", "text", "text"]
  },
  {
    id: 4,
    name: "DESIERTO MOTIVACION",
    color: "#f9c74f",
    colorRgb: "249,199,79",
    icon: "🏜️",
    boss: {
      name: "Fenix del Desanimo",
      sprite: "🔥",
      hp: 140,
      difficulty: 3,
      attacks: ["Desanimo", "Falta de Proposito", "Agotamiento"]
    },
    missions: [
      "Identificar propositos",
      "Crear vision de futuro",
      "Listar recompensas personales",
      "Visualizar meta cumplida",
      "Encontrar inspiracion",
      "Compartir progreso",
      "Celebrar pequenos logros"
    ],
    missionTypes: ["text", "text", "text", "text", "text", "text", "text"]
  },
  {
    id: 5,
    name: "OCEANO DISCIPLINA",
    color: "#4a4e69",
    colorRgb: "74,78,105",
    icon: "🌊",
    boss: {
      name: "Kraken de la Pereza",
      sprite: "🐙",
      hp: 160,
      difficulty: 4,
      attacks: ["Pereza", "Excusa", "Autoengano"]
    },
    missions: [
      "Crear rutina matutina",
      "Seguir horario estricto",
      "Ejercicio diario",
      "Trabajar en bloque",
      "Evitar distracciones",
      "Mantener espacio ordenado",
      "Revisar progreso diario"
    ],
    missionTypes: ["text", "timer", "timer", "timer", "text", "text", "text"]
  },
  {
    id: 6,
    name: "CIELO CREATIVIDAD",
    color: "#9d4edd",
    colorRgb: "157,78,221",
    icon: "☁️",
    boss: {
      name: "Dragon del Bloqueo",
      sprite: "🌩️",
      hp: 180,
      difficulty: 4,
      attacks: ["Bloqueo Creativo", "Perfeccionismo", "Miedo al Fracaso"]
    },
    missions: [
      "Brainstorming de ideas",
      "Proyecto creativo diario",
      "Consumir inspiracion",
      "Experimentar sin miedo",
      "Compartir creacion",
      "Buscar feedback",
      "Iterar y mejorar"
    ],
    missionTypes: ["text", "text", "timer", "text", "text", "text", "text"]
  },
  {
    id: 7,
    name: "INFIERNO MIEDO",
    color: "#f94144",
    colorRgb: "249,65,68",
    icon: "🔥",
    boss: {
      name: "Diablo de la Ansiedad",
      sprite: "😈",
      hp: 200,
      difficulty: 5,
      attacks: ["Ansiedad", "Panico", "Paralisis"]
    },
    missions: [
      "Exposicion gradual",
      "Respiracion consciente",
      "Diario de miedos",
      "Afirmaciones positivas",
      "Buscar apoyo",
      "Practicar valentia",
      "Celebrar confrontaciones"
    ],
    missionTypes: ["text", "timer", "text", "text", "text", "text", "text"]
  },
  {
    id: 8,
    name: "CIELO ARMONIA",
    color: "#90be6d",
    colorRgb: "144,190,109",
    icon: "🌈",
    boss: {
      name: "Angel del Equilibrio",
      sprite: "👼",
      hp: 250,
      difficulty: 5,
      attacks: ["Desequilibrio", "Obsesion", "Burnout"]
    },
    missions: [
      "Meditacion diaria",
      "Equilibrio trabajo-vida",
      "Autocuidado consciente",
      "Gratitud diaria",
      "Conexion social",
      "Tiempo en naturaleza",
      "Reflexion semanal"
    ],
    missionTypes: ["timer", "text", "timer", "text", "text", "timer", "text"]
  }
];

export const DAILY_CATEGORIES: DailyCategory[] = [
  {
    name: "MINDFULNESS",
    color: "#4dff91",
    missions: [
      { text: "Meditar 5 minutos en respiracion", type: "timer", time: 5 },
      { text: "Respiracion consciente por 3 minutos", type: "timer", time: 3 },
      { text: "Escribir 3 cosas de gratitud", type: "text" },
      { text: "Escaneo corporal de 2 minutos", type: "timer", time: 2 },
      { text: "Observar pensamientos sin juzgar por 5 minutos", type: "timer", time: 5 }
    ]
  },
  {
    name: "PRODUCTIVIDAD",
    color: "#6c63ff",
    missions: [
      { text: "Priorizar 3 tareas importantes", type: "text" },
      { text: "Modo concentracion por 25 minutos", type: "timer", time: 25 },
      { text: "Limpiar bandeja de entrada", type: "text" },
      { text: "Planificar el siguiente dia", type: "text" },
      { text: "Eliminar 3 distracciones del espacio", type: "text" }
    ]
  },
  {
    name: "BIENESTAR",
    color: "#ff6b6b",
    missions: [
      { text: "Estiramientos por 10 minutos", type: "timer", time: 10 },
      { text: "Caminar 15 minutos", type: "timer", time: 15 },
      { text: "Tomar suficiente agua", type: "text" },
      { text: "Preparar comida saludable", type: "text" },
      { text: "Practicar postura correcta por 5 minutos", type: "timer", time: 5 }
    ]
  },
  {
    name: "CRECIMIENTO",
    color: "#ffd166",
    missions: [
      { text: "Leer 10 paginas", type: "text" },
      { text: "Escribir reflexion del dia", type: "text" },
      { text: "Practicar una habilidad 15 minutos", type: "timer", time: 15 },
      { text: "Definir una mejora y plan de accion", type: "text" },
      { text: "Escuchar podcast educativo 20 minutos", type: "timer", time: 20 }
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
    name: "CAMINO DE LA CLARIDAD",
    description: "Domina el caos mental con precision",
    motivationalMessages: [
      "La claridad llega cuando baja el ruido.",
      "Cada pensamiento claro te acerca a tu meta."
    ]
  },
  discipline: {
    name: "CAMINO DE LA DISCIPLINA",
    description: "Forja habitos con armadura inquebrantable",
    motivationalMessages: [
      "La disciplina gana cuando la motivacion falla.",
      "La consistencia construye resultados."
    ]
  },
  energy: {
    name: "CAMINO DE LA ENERGIA",
    description: "Restaura tu energia con autocuidado",
    motivationalMessages: [
      "Tu energia es sagrada.",
      "Cuidarte te hace mas fuerte."
    ]
  },
  resilience: {
    name: "CAMINO DE LA RESILIENCIA",
    description: "Aguanta la presion con equilibrio",
    motivationalMessages: [
      "Ser fuerte tambien es saber descansar.",
      "Recuperarte es parte del avance."
    ]
  },
  focus: {
    name: "CAMINO DEL ENFOQUE",
    description: "Elimina distracciones con punteria",
    motivationalMessages: [
      "Donde va tu atencion, va tu energia.",
      "Enfoque profundo, progreso real."
    ]
  },
  balance: {
    name: "CAMINO DEL EQUILIBRIO",
    description: "Balancea vida con sabiduria",
    motivationalMessages: [
      "El equilibrio es practica diaria.",
      "Avanza sin perder tu centro."
    ]
  },
  agility: {
    name: "CAMINO DE LA AGILIDAD",
    description: "Avanza rapido y con precision",
    motivationalMessages: [
      "La agilidad no es prisa.",
      "Fluir tambien es estrategia."
    ]
  },
  transformation: {
    name: "CAMINO DE LA TRANSFORMACION",
    description: "Transforma habitos negativos en positivos",
    motivationalMessages: [
      "Cada dia puedes reinventarte.",
      "Pequenos cambios, gran metamorfosis."
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
