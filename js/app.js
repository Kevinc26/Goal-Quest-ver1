// ==================== GOALQUEST - APP.JS ====================
// Versión: 1.0.0 - Producción GitHub Pages
// Autor: Kevin + ChatGPT
// ============================================================

// ==================== DATOS DEL JUEGO ====================
const GAME_DATA = {
    characters: [
        { id: 1, name: 'MAGO', icon: '🧙', color: '#9d4edd', colorRgb: '157,78,221', hp: 32, mp: 60, skill: 'Claridad Mental', description: 'Domina el caos mental con sabiduría arcana', abilities: ['Bola de Fuego Mental', 'Escudo de Concentración'] },
        { id: 2, name: 'CABALLERO', icon: '⚔️', color: '#4a4e69', colorRgb: '74,78,105', hp: 55, mp: 20, skill: 'Disciplina Férrea', description: 'Forja hábitos con armadura inquebrantable', abilities: ['Golpe de Voluntad', 'Escudo de Rutina'] },
        { id: 3, name: 'CURADOR', icon: '❤️', color: '#ff6b6b', colorRgb: '255,107,107', hp: 40, mp: 50, skill: 'Energía Vital', description: 'Restaura tu energía con sanación divina', abilities: ['Curación Energética', 'Bendición del Descanso'] },
        { id: 4, name: 'TANQUE', icon: '🛡️', color: '#43aa8b', colorRgb: '67,170,139', hp: 70, mp: 15, skill: 'Resistencia Mental', description: 'Aguanta la presión con defensas inquebrantables', abilities: ['Pared de Enfoque', 'Golpe de Persistencia'] },
        { id: 5, name: 'ARQUERO', icon: '🏹', color: '#f9c74f', colorRgb: '249,199,79', hp: 45, mp: 35, skill: 'Enfoque Preciso', description: 'Elimina distracciones con puntería letal', abilities: ['Flecha de Enfoque', 'Tiro Certero'] },
        { id: 6, name: 'CLÉRIGO', icon: '🙏', color: '#90be6d', colorRgb: '144,190,109', hp: 50, mp: 45, skill: 'Equilibrio Interior', description: 'Balancea vida con sabiduría espiritual', abilities: ['Bendición del Equilibrio', 'Oración de Claridad'] },
        { id: 7, name: 'NINJA', icon: '🥷', color: '#222831', colorRgb: '34,40,49', hp: 48, mp: 40, skill: 'Agilidad Mental', description: 'Se mueve rápido entre tareas con sigilo', abilities: ['Ataque Veloz', 'Evasión de Distracciones'] },
        { id: 8, name: 'ALQUIMISTA', icon: '⚗️', color: '#00adb5', colorRgb: '0,173,181', hp: 38, mp: 65, skill: 'Transformación', description: 'Transforma hábitos negativos en positivos', abilities: ['Poción de Enfoque', 'Transformación Mental'] }
    ],
    
    regions: [
        { id: 1, name: 'BOSQUE DEL CAOS', color: '#ff6b6b', colorRgb: '255,107,107', icon: '🧠', 
          boss: { name: 'Dragón del Desorden', sprite: '🐉', hp: 100, difficulty: 1, attacks: ['Confusión', 'Procrastinación', 'Distracción'] },
          missions: ['Escribir pensamientos caóticos', 'Clasificar tareas por energía', 'Eliminar actividades innecesarias', 'Meditar 10 minutos', 'Crear lista de prioridades', 'Limpiar espacio de trabajo', 'Planificar semana siguiente'],
          missionTypes: ['text', 'text', 'text', 'timer', 'text', 'text', 'text'] },
        { id: 2, name: 'MONTAÑA IDENTIDAD', color: '#4ecdc4', colorRgb: '78,205,196', icon: '🏔️',
          boss: { name: 'Gólem del Yo Viejo', sprite: '🗿', hp: 120, difficulty: 2, attacks: ['Autocrítica', 'Duda', 'Miedo al Cambio'] },
          missions: ['Definir nueva identidad', 'Listar acciones del nuevo yo', 'Visualizar éxito', 'Crear afirmación diaria', 'Actuar como nuevo yo', 'Compartir cambio', 'Celebrar victoria'],
          missionTypes: ['text', 'text', 'text', 'text', 'text', 'text', 'text'] },
        { id: 3, name: 'CIUDAD ENTORNO', color: '#45b7d1', colorRgb: '69,183,209', icon: '🏰',
          boss: { name: 'Hydra de Malos Hábitos', sprite: '🐍', hp: 150, difficulty: 3, attacks: ['Tentación', 'Rutina Negativa', 'Influencia Tóxica'] },
          missions: ['Organizar espacio físico', 'Eliminar objetos distractores', 'Limpiar espacio digital', 'Definir límites sociales', 'Crear ritual matutino', 'Programar descansos', 'Evaluar relaciones'],
          missionTypes: ['text', 'text', 'text', 'text', 'timer', 'text', 'text'] },
        { id: 4, name: 'DESIERTO MOTIVACIÓN', color: '#f9c74f', colorRgb: '249,199,79', icon: '🏜️',
          boss: { name: 'Fénix del Desánimo', sprite: '🔥', hp: 140, difficulty: 3, attacks: ['Desánimo', 'Falta de Propósito', 'Agotamiento'] },
          missions: ['Identificar propósitos', 'Crear visión de futuro', 'Listar recompensas personales', 'Visualizar meta cumplida', 'Encontrar inspiración', 'Compartir progreso', 'Celebrar pequeños logros'],
          missionTypes: ['text', 'text', 'text', 'text', 'text', 'text', 'text'] },
        { id: 5, name: 'OCÉANO DISCIPLINA', color: '#4a4e69', colorRgb: '74,78,105', icon: '🌊',
          boss: { name: 'Kraken de la Pereza', sprite: '🐙', hp: 160, difficulty: 4, attacks: ['Pereza', 'Excusa', 'Autoengaño'] },
          missions: ['Crear rutina matutina', 'Seguir horario estricto', 'Ejercicio diario', 'Trabajar en bloque', 'Evitar distracciones', 'Mantener espacio ordenado', 'Revisar progreso diario'],
          missionTypes: ['text', 'timer', 'timer', 'timer', 'text', 'text', 'text'] },
        { id: 6, name: 'CIELO CREATIVIDAD', color: '#9d4edd', colorRgb: '157,78,221', icon: '☁️',
          boss: { name: 'Dragón del Bloqueo', sprite: '🌩️', hp: 180, difficulty: 4, attacks: ['Bloqueo Creativo', 'Perfeccionismo', 'Miedo al Fracaso'] },
          missions: ['Brainstorming de ideas', 'Proyecto creativo diario', 'Consumir inspiración', 'Experimentar sin miedo', 'Compartir creación', 'Buscar feedback', 'Iterar y mejorar'],
          missionTypes: ['text', 'text', 'timer', 'text', 'text', 'text', 'text'] },
        { id: 7, name: 'INFIERNO MIEDO', color: '#f94144', colorRgb: '249,65,68', icon: '🔥',
          boss: { name: 'Diablo de la Ansiedad', sprite: '😈', hp: 200, difficulty: 5, attacks: ['Ansiedad', 'Pánico', 'Parálisis'] },
          missions: ['Exposición gradual', 'Respiración consciente', 'Diario de miedos', 'Afirmaciones positivas', 'Buscar apoyo', 'Practicar valentía', 'Celebrar confrontaciones'],
          missionTypes: ['text', 'timer', 'text', 'text', 'text', 'text', 'text'] },
        { id: 8, name: 'CIELO ARMONÍA', color: '#90be6d', colorRgb: '144,190,109', icon: '🌈',
          boss: { name: 'Ángel del Equilibrio', sprite: '👼', hp: 250, difficulty: 5, attacks: ['Desequilibrio', 'Obsesión', 'Burnout'] },
          missions: ['Meditación diaria', 'Equilibrio trabajo-vida', 'Autocuidado consciente', 'Gratitud diaria', 'Conexión social', 'Tiempo en naturaleza', 'Reflexión semanal'],
          missionTypes: ['timer', 'text', 'timer', 'text', 'text', 'timer', 'text'] }
    ],
    
    dailyMissions: {
        categories: [
            { name: 'MINDFULNESS', color: '#4dff91', missions: [
                { text: 'Meditar 5 minutos enfocándote en la respiración', type: 'timer', time: 5 },
                { text: 'Practicar 3 minutos de respiración consciente', type: 'timer', time: 3 },
                { text: 'Escribir 3 cosas por las que estás agradecido hoy', type: 'text' },
                { text: 'Hacer un escaneo corporal de 2 minutos', type: 'timer', time: 2 },
                { text: 'Observar tus pensamientos sin juzgar por 5 minutos', type: 'timer', time: 5 }
            ]},
            { name: 'PRODUCTIVIDAD', color: '#6c63ff', missions: [
                { text: 'Priorizar tus 3 tareas más importantes del día', type: 'text' },
                { text: 'Trabajar en modo concentración por 25 minutos', type: 'timer', time: 25 },
                { text: 'Revisar y limpiar tu bandeja de entrada de email', type: 'text' },
                { text: 'Planificar tu día siguiente antes de dormir', type: 'text' },
                { text: 'Eliminar 3 distracciones de tu espacio de trabajo', type: 'text' }
            ]},
            { name: 'BIENESTAR FÍSICO', color: '#ff6b6b', missions: [
                { text: 'Hacer 10 minutos de estiramientos matutinos', type: 'timer', time: 10 },
                { text: 'Caminar al aire libre por 15 minutos', type: 'timer', time: 15 },
                { text: 'Beber 8 vasos de agua durante el día', type: 'text' },
                { text: 'Preparar una comida saludable y nutritiva', type: 'text' },
                { text: 'Practicar postura correcta por 5 minutos', type: 'timer', time: 5 }
            ]},
            { name: 'CRECIMIENTO PERSONAL', color: '#ffd166', missions: [
                { text: 'Leer 10 páginas de un libro de desarrollo personal', type: 'text' },
                { text: 'Escribir una reflexión sobre tu aprendizaje de hoy', type: 'text' },
                { text: 'Practicar una nueva habilidad por 15 minutos', type: 'timer', time: 15 },
                { text: 'Identificar un área de mejora y crear un plan', type: 'text' },
                { text: 'Escuchar un podcast educativo de 20 minutos', type: 'timer', time: 20 }
            ]},
            { name: 'CONEXIÓN SOCIAL', color: '#4ecdc4', missions: [
                { text: 'Expresar gratitud a alguien importante para ti', type: 'text' },
                { text: 'Hacer una llamada o mensaje a un ser querido', type: 'text' },
                { text: 'Practicar escucha activa por 5 minutos', type: 'timer', time: 5 },
                { text: 'Ofrecer ayuda a alguien sin esperar nada a cambio', type: 'text' },
                { text: 'Compartir algo positivo en redes sociales', type: 'text' }
            ]},
            { name: 'ORGANIZACIÓN', color: '#9d4edd', missions: [
                { text: 'Limpiar y organizar un área de tu hogar por 10 minutos', type: 'timer', time: 10 },
                { text: 'Revisar y actualizar tu calendario semanal', type: 'text' },
                { text: 'Digitalizar o archivar documentos pendientes', type: 'text' },
                { text: 'Crear una lista de compras o pendientes organizada', type: 'text' },
                { text: 'Dedicar 15 minutos a ordenar tu espacio digital', type: 'timer', time: 15 }
            ]}
        ]
    }
};

// ==================== ASSETS - CORREGIDO PARA GITHUB PAGES ====================
// Todas las rutas son relativas a la raíz del proyecto
const ASSETS = {
    start: "./assets/backgrounds/pantalla de inicio.png",
    acts: {
        1: "./assets/backgrounds/Acto 1.png",
        2: "./assets/backgrounds/acto 2.png",
        3: "./assets/backgrounds/acto 3.png",
        4: "./assets/backgrounds/acto 4.png",
        5: "./assets/backgrounds/acto 5.png",
        6: "./assets/backgrounds/acto 6.png",
        7: "./assets/backgrounds/acto 7.png",
        8: "./assets/backgrounds/acto 8.png"
    },
    classes: {
        1: "./assets/classes/mago.png",
        2: "./assets/classes/caballero.png",
        3: "./assets/classes/curador.png",
        4: "./assets/classes/Tanque.png",
        5: "./assets/classes/arquero.png",
        6: "./assets/classes/clerigo.png",
        7: "./assets/classes/ninja.png",
        8: "./assets/classes/alquimista.png"
    }
};

// ==================== FUNCIÓN ASSET ====================
// Devuelve la ruta completa para GitHub Pages
function asset(relPath) {
    return relPath; // Ya incluye "./assets/..."
}

// ==================== SISTEMA DE CAMINOS POR CLASE ====================
const CLASS_PATHS = {
    clarity: { 
        name: "CAMINO DE LA CLARIDAD", 
        description: "Domina el caos mental con precisión arcana",
        regionThemes: {
            1: "DESCARGA MENTAL PROFUNDA",
            2: "IDENTIDAD BASADA EN CLARIDAD",
            3: "ELIMINAR RUIDO COGNITIVO",
            4: "ENERGÍA MENTAL Y DESCANSO",
            5: "RACHAS DE DECISIÓN RÁPIDA",
            6: "SOLTAR CONTROL INTELECTUAL",
            7: "CREAR IDEAS IMPERFECTAS",
            8: "ACTUAR SIN ENTENDER TODO"
        },
        missionOverrides: {
            1: ["Escribir pensamientos confusos que nublan tu mente", "Clasificar tareas por claridad mental requerida", "Eliminar patrones de pensamiento repetitivos", "Meditar 10 minutos para aclarar la mente", "Crear lista de decisiones pendientes", "Limpiar espacio mental con respiración consciente", "Planificar con claridad, no con ansiedad"],
            2: ["Definir quién eres cuando piensas con claridad", "Listar acciones desde la perspectiva clara", "Visualizar éxitos con detalle nítido", "Crear afirmación diaria de claridad mental", "Actuar con decisión clara", "Compartir insights mentales claros", "Celebrar momentos de absoluta claridad"],
            3: ["Organizar espacio para pensamiento claro", "Eliminar objetos que distraen tu mente", "Limpiar información digital innecesaria", "Definir límites cognitivos", "Crear ritual matutino de claridad", "Programar descansos mentales", "Evaluar relaciones por claridad que aportan"]
        },
        motivationalMessages: [
            "La claridad llega cuando el ruido mental cesa.",
            "Cada pensamiento claro es un paso hacia el dominio.",
            "La mente clara ve oportunidades donde otros ven caos.",
            "Tu claridad mental es tu arma más poderosa.",
            "En la claridad encuentras las respuestas que buscas."
        ]
    },
    discipline: {
        name: "CAMINO DE LA DISCIPLINA",
        description: "Forja hábitos con armadura inquebrantable",
        regionThemes: {
            1: "COMPROMISOS ROTOS",
            2: "IDENTIDAD = CUMPLIR",
            3: "ENTORNO RÍGIDO",
            4: "ENERGÍA COMO DEBER",
            5: "RACHAS VISIBLES",
            6: "CASTIGOS CLAROS",
            7: "CONSTRUCCIÓN CONSTANTE",
            8: "AVANZAR SIN MOTIVACIÓN"
        },
        missionOverrides: {
            1: ["Escribir compromisos incumplidos contigo mismo", "Clasificar tareas por nivel de compromiso", "Eliminar excusas y justificaciones", "Meditar 10 minutos con postura militar", "Crear lista de reglas personales", "Limpiar espacio de disciplina", "Planificar con rigurosidad militar"],
            2: ["Definir identidad como persona de palabra", "Listar acciones que demuestren disciplina", "Visualizar éxito a través de constancia", "Crear código de honor diario", "Actuar con rigor militar", "Compartir logros de disciplina", "Celebrar victorias de voluntad"],
            3: ["Organizar espacio con precisión militar", "Eliminar objetos que fomentan la pereza", "Limpiar distracciones digitales estrictamente", "Definir fronteras de compromiso", "Crear ritual matutino espartano", "Programar entrenamientos diarios", "Evaluar relaciones por disciplina compartida"]
        },
        motivationalMessages: [
            "La disciplina es el puente entre metas y logros.",
            "Cada acto de disciplina fortalece tu voluntad.",
            "El hábito vence a la inspiración cada día.",
            "Tu armadura de disciplina te protege de las tentaciones.",
            "La consistencia es la verdadera medida del carácter."
        ]
    },
    energy: {
        name: "CAMINO DE LA ENERGÍA",
        description: "Restaura tu energía con sanación divina",
        regionThemes: {
            1: "DESCARGA EMOCIONAL",
            2: "IDENTIDAD = CUIDARME",
            3: "LÍMITES SOCIALES",
            4: "ENERGÍA COMO NÚCLEO",
            5: "RACHAS SUAVES",
            6: "RIESGO: DEJAR DE AYUDAR",
            7: "CREAR PARA MÍ",
            8: "ELEGIRME SIN CULPA"
        },
        missionOverrides: {
            1: ["Escribir emociones que te drenan energía", "Clasificar tareas por nivel energético requerido", "Eliminar relaciones tóxicas que consumen", "Meditar 10 minutos para recargar", "Crear lista de fuentes de energía", "Limpiar espacio energético", "Planificar según tus ritmos naturales"],
            2: ["Definir identidad como cuidador de ti mismo", "Listar acciones que te recargan", "Visualizar éxito con energía plena", "Crear afirmación diaria de autocuidado", "Actuar desde la energía renovada", "Compartir energía positiva", "Celebrar momentos de plenitud"],
            3: ["Organizar espacio para fluir energía", "Eliminar objetos con energía estancada", "Limpiar espacios digitales negativos", "Definir límites energéticos", "Crear ritual matutino de recarga", "Programar pausas energéticas", "Evaluar relaciones por energía que aportan"]
        },
        motivationalMessages: [
            "Tu energía es sagrada, protégete.",
            "Cada acto de autocuidado es una semilla de crecimiento.",
            "Cuando te nutres a ti mismo, puedes nutrir al mundo.",
            "La energía positiva atrae más energía positiva.",
            "Escucha a tu cuerpo, él sabe lo que necesita."
        ]
    },
    resilience: {
        name: "CAMINO DE LA RESILIENCIA",
        description: "Aguanta la presión con defensas inquebrantables",
        regionThemes: {
            1: "CARGAS INVISIBLES",
            2: "IDENTIDAD ≠ AGUANTAR",
            3: "ELIMINAR SOBRECARGA",
            4: "DESCANSO OBLIGATORIO",
            5: "RACHAS DE AUTOCUIDADO",
            6: "RIESGO: PEDIR AYUDA",
            7: "EXPRESAR",
            8: "SOLTAR CONTROL"
        },
        missionOverrides: {
            1: ["Escribir cargas emocionales que aguantas", "Clasificar tareas por nivel de resistencia", "Eliminar responsabilidades innecesarias", "Meditar 10 minutos para soltar peso", "Crear lista de límites saludables", "Limpiar espacio de sobrecarga", "Planificar con márgenes de seguridad"],
            2: ["Definir identidad como resiliente, no como mártir", "Listar acciones que fortalecen sin dañar", "Visualizar éxito con equilibrio", "Crear afirmación diaria de resistencia sana", "Actuar con firmeza, no con rigidez", "Compartir aprendizajes de resiliencia", "Celebrar capacidad de recuperación"],
            3: ["Organizar espacio para resistir sin romper", "Eliminar objetos que simbolizan carga", "Limpiar compromisos digitales excesivos", "Definir fronteras de responsabilidad", "Crear ritual matutino de estabilidad", "Programar tiempos de descarga", "Evaluar relaciones por apoyo mutuo"]
        },
        motivationalMessages: [
            "La verdadera fuerza está en saber cuándo descansar.",
            "Ser resiliente no significa aguantarlo todo.",
            "Cada límite sano es un acto de autoamor.",
            "Tu capacidad de recuperación es tu superpoder.",
            "A veces soltar es más valiente que aguantar."
        ]
    },
    focus: {
        name: "CAMINO DEL ENFOQUE",
        description: "Elimina distracciones con puntería letal",
        regionThemes: {
            1: "ELIMINAR FRENTES ABIERTOS",
            2: "UNA COSA BIEN HECHA",
            3: "MINIMALISMO",
            4: "ENERGÍA DIRIGIDA",
            5: "RACHAS ESPECÍFICAS",
            6: "RIESGO: RENUNCIAR",
            7: "DOMINAR UNA HABILIDAD",
            8: "EJECUTAR SIN DUDAR"
        },
        missionOverrides: {
            1: ["Escribir distracciones que dispersan tu atención", "Clasificar tareas por prioridad de enfoque", "Eliminar proyectos paralelos innecesarios", "Meditar 10 minutos para enfocar la mente", "Crear lista de objetivos únicos", "Limpiar espacio de elementos distractores", "Planificar con precisión quirúrgica"],
            2: ["Definir identidad como especialista, no generalista", "Listar acciones con enfoque láser", "Visualizar éxito en un área específica", "Crear afirmación diaria de concentración", "Actuar con atención total", "Compartir logros de enfoque profundo", "Celebrar momentos de flujo total"],
            3: ["Organizar espacio para máxima concentración", "Eliminar objetos que dispersan la atención", "Limpiar notificaciones digitales innecesarias", "Definir límites de enfoque", "Crear ritual matutino de concentración", "Programar bloques de atención profunda", "Evaluar relaciones por capacidad de enfoque"]
        },
        motivationalMessages: [
            "Donde pones tu atención, pones tu energía.",
            "Un objetivo claro es mitad del camino recorrido.",
            "La maestría viene de enfocarse, no de dispersarse.",
            "Tu puntería mental es tu arma más precisa.",
            "En la profundidad del enfoque está la excelencia."
        ]
    },
    balance: {
        name: "CAMINO DEL EQUILIBRIO",
        description: "Balancea vida con sabiduría espiritual",
        regionThemes: {
            1: "ORDENAR VALORES",
            2: "IDENTIDAD CON PROPÓSITO",
            3: "RITUALES",
            4: "CUERPO COMO TEMPLO",
            5: "RACHAS PRÁCTICAS",
            6: "RIESGO: ACTUAR SIN CERTEZA",
            7: "COMPARTIR SABIDURÍA",
            8: "VIVIR LO QUE PREDICA"
        },
        missionOverrides: {
            1: ["Escribir desequilibrios en tu vida actual", "Clasificar tareas por áreas de vida", "Eliminar extremos que rompen el balance", "Meditar 10 minutos para encontrar centro", "Crear lista de pilares equilibrados", "Limpiar espacio para armonía", "Planificar con equilibrio holístico"],
            2: ["Definir identidad como persona integral", "Listar acciones que promueven equilibrio", "Visualizar éxito en todas las áreas", "Crear afirmación diaria de armonía", "Actuar desde el centro, no desde los extremos", "Compartir sabiduría del equilibrio", "Celebrar momentos de perfecta armonía"],
            3: ["Organizar espacio para fluir en equilibrio", "Eliminar objetos que rompen la armonía", "Limpiar desorden digital que desequilibra", "Definir límites para mantener balance", "Crear ritual matutino de centramiento", "Programar tiempos para cada área de vida", "Evaluar relaciones por equilibrio que aportan"]
        },
        motivationalMessages: [
            "El equilibrio no es estático, es un baile constante.",
            "En el centro del torbellino está la calma.",
            "Tu sabiduría interior conoce el camino del medio.",
            "Cada área de tu vida merece atención amorosa.",
            "El verdadero poder está en la armonía, no en la fuerza."
        ]
    },
    agility: {
        name: "CAMINO DE LA AGILIDAD",
        description: "Se mueve rápido entre tareas con sigilo",
        regionThemes: {
            1: "URGENCIAS FALSAS",
            2: "IDENTIDAD CALMADA",
            3: "ELIMINAR INTERRUPCIONES",
            4: "ENERGÍA ESTABLE",
            5: "RACHAS FLEXIBLES",
            6: "RIESGO: FRENAR",
            7: "CREAR LENTO",
            8: "ACCIÓN CONSCIENTE"
        },
        missionOverrides: {
            1: ["Escribir falsas urgencias que te apresuran", "Clasificar tareas por velocidad óptima", "Eliminar presiones innecesarias", "Meditar 10 minutos para ralentizar", "Crear lista de ritmos naturales", "Limpiar espacio de prisa innecesaria", "Planificar con fluidez, no con presión"],
            2: ["Definir identidad como ágil, no como apurado", "Listar acciones con precisión ninja", "Visualizar éxito con gracia y fluidez", "Crear afirmación diaria de movilidad consciente", "Actuar con sigilo y precisión", "Compartir estrategias de agilidad", "Celebrar movimientos fluidos"],
            3: ["Organizar espacio para moverse libremente", "Eliminar obstáculos que frenan tu flujo", "Limpiar procesos digitales lentos", "Definir límites de velocidad saludable", "Crear ritual matutino de preparación ágil", "Programar transiciones suaves", "Evaluar relaciones por fluidez compartida"]
        },
        motivationalMessages: [
            "La verdadera agilidad está en la mente, no en la prisa.",
            "Moverse con gracia es más eficiente que correr.",
            "Tu sigilo mental te permite avanzar sin resistencia.",
            "En la fluidez del movimiento está la eficiencia.",
            "Un ninja sabe cuándo moverse y cuándo quedarse quieto."
        ]
    },
    transformation: {
        name: "CAMINO DE LA TRANSFORMACIÓN",
        description: "Transforma hábitos negativos en positivos",
        regionThemes: {
            1: "PATRONES REPETIDOS",
            2: "IDENTIDAD EVOLUTIVA",
            3: "ENTORNO EXPERIMENTAL",
            4: "ENERGÍA COMO RECURSO",
            5: "RACHAS DE EXPERIMENTOS",
            6: "RIESGO: SOSTENER",
            7: "PRODUCTO REAL",
            8: "LANZAR IMPERFECTO"
        },
        missionOverrides: {
            1: ["Escribir patrones que quieres transformar", "Clasificar tareas por potencial de cambio", "Eliminar hábitos que bloquean transformación", "Meditar 10 minutos para visualizar cambio", "Crear lista de experimentos personales", "Limpiar espacio para nueva energía", "Planificar con mentalidad de crecimiento"],
            2: ["Definir identidad como ser en constante evolución", "Listar acciones que catalizan transformación", "Visualizar versiones futuras de ti mismo", "Crear afirmación diaria de metamorfosis", "Actuar como la versión transformada", "Compartir procesos de cambio", "Celebrar cada pequeña transformación"],
            3: ["Organizar espacio como laboratorio personal", "Eliminar objetos que anclan al pasado", "Limpiar rutinas digitales obsoletas", "Definir límites como experimentos", "Crear ritual matutino de reinvención", "Programar momentos de reflexión evolutiva", "Evaluar relaciones por potencial transformador"]
        },
        motivationalMessages: [
            "La transformación es el arte de reinventarse.",
            "Cada día es una oportunidad para evolucionar.",
            "Tu laboratorio interior siempre está experimentando.",
            "La alquimia personal convierte plomo en oro.",
            "El cambio constante es la única constante."
        ]
    }
};

const CLASS_TO_FOCUS = {
    1: 'clarity',
    2: 'discipline',
    3: 'energy',
    4: 'resilience',
    5: 'focus',
    6: 'balance',
    7: 'agility',
    8: 'transformation'
};

// ==================== PATHSYSTEM ====================
const PathSystem = {
    getCurrentFocus() {
        return GameState.character ? CLASS_TO_FOCUS[GameState.character.id] : null;
    },
    getCurrentPath() {
        const focus = this.getCurrentFocus();
        return focus ? CLASS_PATHS[focus] : null;
    },
    getMissionText(regionId, missionIndex) {
        const path = this.getCurrentPath();
        const defaultMissions = GAME_DATA.regions.find(r => r.id === regionId)?.missions || [];
        if (path && path.missionOverrides && path.missionOverrides[regionId]) {
            const override = path.missionOverrides[regionId][missionIndex];
            if (override) return override;
        }
        return defaultMissions[missionIndex] || `Misión ${missionIndex + 1}`;
    },
    getRegionTheme(regionId) {
        const path = this.getCurrentPath();
        if (path && path.regionThemes && path.regionThemes[regionId]) return path.regionThemes[regionId];
        const region = GAME_DATA.regions.find(r => r.id === regionId);
        return region?.name || `Región ${regionId}`;
    },
    getPathName() {
        return this.getCurrentPath()?.name || "CAMINO DEL AVENTURERO";
    },
    getPathDescription() {
        return this.getCurrentPath()?.description || "Transforma tu vida a través de la aventura";
    },
    getMotivationalMessage() {
        const path = this.getCurrentPath();
        return path?.motivationalMessages?.[Math.floor(Math.random() * path.motivationalMessages.length)] || "¡Sigue adelante, aventurero!";
    },
    showClassNotification(message, icon = '💡') {
        const character = GameState.character;
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.borderLeftColor = character?.color || 'var(--primary)';
        notification.innerHTML = `<div style="font-size: 24px; color: ${character?.color || 'var(--primary)'}">${icon}</div><div style="font-size: 12px;"><strong style="color: ${character?.color || 'var(--primary)'}">${character?.name || 'Aventurero'}:</strong><br>${message}</div>`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// ==================== GAMESTATE ====================
const GameState = {
    character: null,
    stats: {
        hp: 100,
        mp: 100,
        exp: 0,
        level: 1,
        maxHp: 100,
        maxMp: 100,
        nextLevelExp: 100,
        dailyExp: 0,
        dailyStreak: 0,
        dailyTasksCompleted: 0,
        dailyTasksGoal: 5,
        lastRegionMissionDate: null,
        lastCompletedRegionDay: null
    },
    unlockedRegions: [1],
    completedMissions: {},
    defeatedBosses: [],
    dailyMissionsState: {
        lastGeneratedDate: null,
        availableMissions: [],
        completedDailyMissions: []
    },
    lastPlayedDate: null,
    todayCompleted: false,
    currentScreen: 'start',
    currentRegion: null,
    currentCombat: null,
    currentTask: null,
    taskTimer: null,
    taskTimerSeconds: 0,

    selectCharacter(characterId) {
        const character = GAME_DATA.characters.find(c => c.id === characterId);
        if (character) {
            this.character = character;
            this.save();
            PathSystem.showClassNotification(`Has elegido el ${PathSystem.getPathName()}`, '🎮');
            return true;
        }
        return false;
    },

    init() {
        this.load();
        this.checkDailyReset();
        this.generateDailyMissions();
    },

    load() {
        const saved = localStorage.getItem('goalquest_save');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.character = data.character;
                this.stats = { ...this.stats, ...data.stats };
                this.unlockedRegions = data.unlockedRegions || [1];
                this.completedMissions = data.completedMissions || {};
                this.defeatedBosses = data.defeatedBosses || [];
                this.lastPlayedDate = data.lastPlayedDate;
                this.todayCompleted = data.todayCompleted || false;
                this.dailyMissionsState = data.dailyMissionsState || {
                    lastGeneratedDate: null,
                    availableMissions: [],
                    completedDailyMissions: []
                };
                
                if (this.stats.lastRegionMissionDate === undefined) this.stats.lastRegionMissionDate = null;
                if (this.stats.lastCompletedRegionDay === undefined) this.stats.lastCompletedRegionDay = null;
                
                if (this.character) {
                    this.checkDailyReset();
                    PathSystem.showClassNotification('Partida cargada', '💾');
                }
            } catch (e) {
                console.error('Error cargando:', e);
            }
        }
    },

    save() {
        const saveData = {
            character: this.character,
            stats: this.stats,
            unlockedRegions: this.unlockedRegions,
            completedMissions: this.completedMissions,
            defeatedBosses: this.defeatedBosses,
            lastPlayedDate: this.lastPlayedDate,
            todayCompleted: this.todayCompleted,
            dailyMissionsState: this.dailyMissionsState,
            saveDate: new Date().toISOString()
        };
        localStorage.setItem('goalquest_save', JSON.stringify(saveData));
    },

    generateDailyMissions() {
        const today = new Date().toDateString();
        if (this.dailyMissionsState.lastGeneratedDate !== today) {
            this.dailyMissionsState.lastGeneratedDate = today;
            this.dailyMissionsState.completedDailyMissions = [];
            this.dailyMissionsState.availableMissions = [];
            
            const allMissions = [];
            GAME_DATA.dailyMissions.categories.forEach(category => {
                category.missions.forEach(mission => {
                    allMissions.push({
                        ...mission,
                        category: category.name,
                        categoryColor: category.color,
                        id: `${category.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                    });
                });
            });
            
            const shuffledMissions = [...allMissions].sort(() => Math.random() - 0.5);
            const selectedMissions = [];
            const usedTexts = new Set();
            
            for (const mission of shuffledMissions) {
                if (selectedMissions.length >= 5) break;
                if (!usedTexts.has(mission.text)) {
                    selectedMissions.push(mission);
                    usedTexts.add(mission.text);
                }
            }
            
            while (selectedMissions.length < 5 && selectedMissions.length < allMissions.length) {
                const randomMission = shuffledMissions.find(m => !selectedMissions.some(sm => sm.text === m.text));
                if (randomMission) selectedMissions.push(randomMission);
                else break;
            }
            
            this.dailyMissionsState.availableMissions = selectedMissions;
            this.save();
        }
    },

    getAvailableDailyMissions() {
        return this.dailyMissionsState.availableMissions.filter(m => !this.dailyMissionsState.completedDailyMissions.includes(m.id));
    },

    isDailyMissionCompleted(missionId) {
        return this.dailyMissionsState.completedDailyMissions.includes(missionId);
    },

    completeDailyMission(missionId) {
        if (!this.isDailyMissionCompleted(missionId)) {
            this.dailyMissionsState.completedDailyMissions.push(missionId);
            this.stats.dailyTasksCompleted++;
            
            const expGained = 25;
            this.stats.exp += expGained;
            this.stats.dailyExp += expGained;
            
            if (this.isTodayCompleted()) {
                this.todayCompleted = true;
                PathSystem.showClassNotification(`¡DÍA COMPLETADO! ${this.stats.dailyTasksGoal}/${this.stats.dailyTasksGoal} tareas diarias`, '🏆');
                const dailyBonus = 50;
                this.stats.exp += dailyBonus;
                PathSystem.showClassNotification(`¡Bonus diario! +${dailyBonus} EXP`, '⭐');
            } else {
                const remaining = this.stats.dailyTasksGoal - this.stats.dailyTasksCompleted;
                PathSystem.showClassNotification(`¡Misión diaria completada! ${remaining} tareas diarias restantes`, '✅');
            }
            
            this.checkLevelUp();
            this.save();
            
            if (this.stats.dailyTasksCompleted % 2 === 0 || this.isTodayCompleted()) {
                this.showMotivationPopup();
            }
            
            return true;
        }
        return false;
    },

    checkDailyReset() {
        const today = new Date().toDateString();
        if (this.lastPlayedDate !== today) {
            this.todayCompleted = false;
            this.stats.dailyTasksCompleted = 0;
            this.stats.dailyExp = 0;
            this.stats.lastRegionMissionDate = null;
            this.stats.lastCompletedRegionDay = null;
            
            if (this.lastPlayedDate) {
                const lastDate = new Date(this.lastPlayedDate);
                const currentDate = new Date(today);
                const diffDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    this.stats.dailyStreak++;
                    PathSystem.showClassNotification(`🔥 Racha activa: ${this.stats.dailyStreak} días`, '🔥');
                } else if (diffDays > 1) {
                    this.stats.dailyStreak = 0;
                    PathSystem.showClassNotification('Racha reiniciada', '🔁');
                }
            }
            
            if (this.lastPlayedDate && this.todayCompleted) {
                const bonusExp = 50;
                this.stats.exp += bonusExp;
                this.stats.dailyExp += bonusExp;
                PathSystem.showClassNotification(`¡Bonus diario! +${bonusExp} EXP por completar ayer`, '⭐');
            }
            
            this.lastPlayedDate = today;
            this.save();
        }
    },

    canCompleteMoreTasksToday() {
        return this.stats.dailyTasksCompleted < this.stats.dailyTasksGoal;
    },

    isTodayCompleted() {
        return this.stats.dailyTasksCompleted >= this.stats.dailyTasksGoal;
    },

    hasCompletedRegionMissionToday() {
        const today = new Date().toDateString();
        return this.stats.lastRegionMissionDate === today;
    },

    isMissionAvailable(regionId, missionIndex) {
        const completed = this.completedMissions[regionId] || [];
        if (completed[missionIndex]) return false;
        if (missionIndex === 0) return true;
        return completed[missionIndex - 1] === true;
    },

    getNextAvailableMission(regionId) {
        const completed = this.completedMissions[regionId] || [];
        for (let i = 0; i < 7; i++) {
            if (!completed[i]) {
                if (i === 0 || completed[i - 1]) return i;
                return -1;
            }
        }
        return -1;
    },

    startDailyTask(missionIndex) {
        if (this.isTodayCompleted()) {
            PathSystem.showClassNotification('¡Ya completaste tus 5 tareas diarias! Vuelve mañana.', '✅');
            return null;
        }
        
        const availableMissions = this.getAvailableDailyMissions();
        if (missionIndex < 0 || missionIndex >= availableMissions.length) {
            PathSystem.showClassNotification('Misión no disponible', '❌');
            return null;
        }
        
        const mission = availableMissions[missionIndex];
        this.currentTask = {
            type: 'daily',
            missionId: mission.id,
            missionText: mission.text,
            missionType: mission.type,
            category: mission.category,
            categoryColor: mission.categoryColor,
            time: mission.time || 5,
            userInput: '',
            completed: false
        };
        
        if (mission.type === 'timer') {
            this.taskTimerSeconds = mission.time * 60;
            this.startTimer();
        }
        
        return this.currentTask;
    },

    startRegionTask(regionId, missionIndex) {
        if (this.hasCompletedRegionMissionToday()) {
            PathSystem.showClassNotification('¡Ya completaste una misión de región hoy! Vuelve mañana.', '🌙');
            return null;
        }
        
        const nextMission = this.getNextAvailableMission(regionId);
        if (missionIndex !== nextMission) {
            if (nextMission === -1) {
                PathSystem.showClassNotification('¡Ya completaste todas las misiones de esta región!', '🏆');
            } else {
                PathSystem.showClassNotification(`Hoy solo puedes hacer la misión del Día ${nextMission + 1}`, '📅');
            }
            return null;
        }
        
        if (!this.isMissionAvailable(regionId, missionIndex)) {
            PathSystem.showClassNotification('Misión no disponible', '🔒');
            return null;
        }
        
        const missionText = PathSystem.getMissionText(regionId, missionIndex);
        const region = GAME_DATA.regions.find(r => r.id === regionId);
        const missionType = region.missionTypes[missionIndex];
        
        this.currentTask = {
            type: 'region',
            regionId,
            missionIndex,
            missionText,
            missionType,
            userInput: '',
            completed: false
        };
        
        if (missionType === 'timer') {
            const match = missionText.match(/(\d+)\s*minutos?/i);
            const minutes = match ? parseInt(match[1]) : 5;
            this.taskTimerSeconds = minutes * 60;
            this.startTimer();
        }
        
        return this.currentTask;
    },

    startTimer() {
        if (this.taskTimer) clearInterval(this.taskTimer);
        this.taskTimer = setInterval(() => {
            this.taskTimerSeconds--;
            if (this.taskTimerSeconds <= 0) {
                clearInterval(this.taskTimer);
                this.taskTimer = null;
                PathSystem.showClassNotification('¡Tiempo completado!', '⏰');
            }
            
            const timerDisplay = document.querySelector('.timer-display');
            if (timerDisplay) {
                const m = Math.floor(this.taskTimerSeconds / 60);
                const s = this.taskTimerSeconds % 60;
                timerDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            }
        }, 1000);
    },

    saveUserInput(input) {
        if (this.currentTask) {
            this.currentTask.userInput = input;
            return true;
        }
        return false;
    },

    completeTask() {
        if (!this.currentTask) return false;
        
        const { type, missionType, userInput } = this.currentTask;
        
        if (this.taskTimer) {
            clearInterval(this.taskTimer);
            this.taskTimer = null;
        }
        
        if (missionType === 'timer' && this.taskTimerSeconds > 0) {
            PathSystem.showClassNotification('¡Completa el tiempo primero!', '⏰');
            return false;
        }
        
        if (missionType === 'text' && (!userInput || userInput.trim().length < 5)) {
            PathSystem.showClassNotification('¡Escribe algo para completar la tarea! (mínimo 5 caracteres)', '📝');
            return false;
        }
        
        if (type === 'daily') {
            return this.completeDailyMission(this.currentTask.missionId);
        } else if (type === 'region') {
            return this.completeRegionMission(this.currentTask.regionId, this.currentTask.missionIndex);
        }
        
        return false;
    },

    completeRegionMission(regionId, missionIndex) {
        if (this.hasCompletedRegionMissionToday()) {
            PathSystem.showClassNotification('¡Ya completaste una misión de región hoy!', '🌙');
            return false;
        }
        
        if (!this.isMissionAvailable(regionId, missionIndex)) {
            PathSystem.showClassNotification('¡Debes completar las misiones en orden!', '🔒');
            return false;
        }
        
        const nextMission = this.getNextAvailableMission(regionId);
        if (missionIndex !== nextMission) {
            PathSystem.showClassNotification(`Hoy debes hacer la misión del Día ${nextMission + 1}`, '📅');
            return false;
        }
        
        if (!this.completedMissions[regionId]) {
            this.completedMissions[regionId] = [];
        }
        
        if (!this.completedMissions[regionId][missionIndex]) {
            this.completedMissions[regionId][missionIndex] = true;
            this.stats.lastRegionMissionDate = new Date().toDateString();
            this.stats.lastCompletedRegionDay = missionIndex;
            
            const expGained = 25;
            this.stats.exp += expGained;
            this.stats.dailyExp += expGained;
            
            PathSystem.showClassNotification(`¡Misión del Día ${missionIndex + 1} completada! +25 EXP`, '✅');
            if (missionIndex + 1 < 7) {
                PathSystem.showClassNotification(`Vuelve mañana para la misión del Día ${missionIndex + 2}`, '📅');
            }
            
            this.checkLevelUp();
            this.checkRegionCompletion(regionId);
            this.save();
            
            if (this.stats.dailyTasksCompleted % 2 === 0) {
                this.showMotivationPopup();
            }
            
            return true;
        }
        return false;
    },

    checkLevelUp() {
        if (this.stats.exp >= this.stats.nextLevelExp) {
            this.stats.level++;
            this.stats.maxHp += 10;
            this.stats.maxMp += 10;
            this.stats.hp = this.stats.maxHp;
            this.stats.mp = this.stats.maxMp;
            this.stats.nextLevelExp = Math.floor(this.stats.nextLevelExp * 1.5);
            PathSystem.showClassNotification(`¡Nivel ${this.stats.level}!`, '⭐');
            return true;
        }
        return false;
    },

    checkRegionCompletion(regionId) {
        const missions = this.completedMissions[regionId];
        if (!missions) return false;
        
        const allCompleted = missions.length === 7 && missions.every(m => m);
        
        if (allCompleted && !this.defeatedBosses.includes(regionId)) {
            const nextRegionId = regionId + 1;
            if (nextRegionId <= GAME_DATA.regions.length && !this.unlockedRegions.includes(nextRegionId)) {
                this.unlockedRegions.push(nextRegionId);
                PathSystem.showClassNotification(`¡Región ${regionId} completada!<br>Nueva región desbloqueada`, '🔓');
            }
            return true;
        }
        return false;
    },

    isRegionCompleted(regionId) {
        const m = this.completedMissions[regionId];
        return m ? m.length === 7 && m.every(x => x) : false;
    },

    isRegionUnlocked(regionId) {
        return this.unlockedRegions.includes(regionId);
    },

    isBossDefeated(regionId) {
        return this.defeatedBosses.includes(regionId);
    },

    startCombat(regionId) {
        if (!this.isRegionCompleted(regionId)) {
            PathSystem.showClassNotification('Debes completar las 7 misiones antes de combatir al jefe', '❌');
            return null;
        }
        if (this.isBossDefeated(regionId)) {
            PathSystem.showClassNotification('Ya derrotaste a este jefe', '🏆');
            return null;
        }
        const region = GAME_DATA.regions.find(r => r.id === regionId);
        if (!region) return null;
        
        this.currentCombat = {
            regionId,
            enemy: { ...region.boss, currentHp: region.boss.hp },
            playerHp: this.stats.hp,
            playerMp: this.stats.mp,
            turn: 0,
            log: []
        };
        return this.currentCombat;
    },

    combatAttack(type) {
        if (!this.currentCombat) return null;
        const combat = this.currentCombat;
        combat.turn++;
        
        let damage = 0;
        switch (type) {
            case 'weak':
                damage = 10 + Math.floor(this.stats.dailyExp / 10);
                break;
            case 'medium':
                damage = 20 + Math.floor(this.stats.dailyExp / 5);
                break;
            case 'strong':
                damage = 30 + Math.floor(this.stats.dailyExp / 3);
                break;
        }
        
        combat.enemy.currentHp = Math.max(0, combat.enemy.currentHp - damage);
        combat.log.push(`Atacas con ${type.toUpperCase()}: -${damage} HP`);
        
        if (combat.enemy.currentHp <= 0) {
            this.defeatBoss(combat.regionId);
            return { victory: true, damage };
        }
        
        return { victory: false, damage };
    },

    enemyTurn() {
        if (!this.currentCombat) return null;
        const combat = this.currentCombat;
        const region = GAME_DATA.regions.find(r => r.id === combat.regionId);
        const attack = region.boss.attacks[Math.floor(Math.random() * region.boss.attacks.length)];
        const damage = 10 + (region.boss.difficulty * 5);
        
        combat.playerHp = Math.max(0, combat.playerHp - damage);
        this.stats.hp = combat.playerHp;
        combat.log.push(`${region.boss.name} usa ${attack}: -${damage} HP`);
        
        return { attack, damage };
    },

    defeatBoss(regionId) {
        if (!this.defeatedBosses.includes(regionId)) {
            this.defeatedBosses.push(regionId);
            const region = GAME_DATA.regions.find(r => r.id === regionId);
            const expReward = 100 * region.boss.difficulty;
            this.stats.exp += expReward;
            this.stats.dailyExp += expReward;
            this.checkLevelUp();
            this.save();
            return expReward;
        }
        return 0;
    },

    rest() {
        const hpHealed = 30;
        const mpHealed = 10;
        this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + hpHealed);
        this.stats.mp = Math.min(this.stats.maxMp, this.stats.mp + mpHealed);
        this.save();
        return { hp: hpHealed, mp: mpHealed };
    },

    showTaskPopup(task) {
        let content = '';
        
        if (task.missionType === 'timer') {
            const minutes = Math.floor(this.taskTimerSeconds / 60);
            const seconds = this.taskTimerSeconds % 60;
            content = `
                <div class="popup-icon" style="color: var(--warning)">⏰</div>
                <h3 style="color: var(--warning); margin-bottom: 20px;">${task.missionText}</h3>
                <div class="timer-container">
                    <div class="timer-display">${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</div>
                    <div class="timer-buttons">
                        <button class="ff-button" onclick="window.pauseResumeTimer()" style="background: var(--warning);">⏸️ PAUSAR</button>
                        <button class="ff-button" onclick="window.resetTimer()" style="background: var(--danger);">🔄 REINICIAR</button>
                    </div>
                </div>
                <button class="ff-button" onclick="window.finishTask()" style="margin-top: 20px;">✅ COMPLETAR TAREA</button>
            `;
        } else {
            content = `
                <div class="popup-icon" style="color: var(--primary)">📝</div>
                <h3 style="color: var(--primary); margin-bottom: 20px;">${task.missionText}</h3>
                <textarea class="task-textarea" placeholder="Escribe aquí para completar la tarea..." oninput="window.saveTaskInput(this.value)"></textarea>
                <button class="ff-button" onclick="window.finishTask()" style="margin-top: 20px;">✅ GUARDAR Y COMPLETAR</button>
            `;
        }
        
        const popup = document.createElement('div');
        popup.className = 'task-popup';
        popup.innerHTML = `
            <div class="popup-content">
                ${content}
                <button class="ff-button" onclick="window.closeTaskPopup()" style="margin-top: 15px; background: var(--danger);">❌ CANCELAR</button>
            </div>
        `;
        document.body.appendChild(popup);
    },

    showMotivationPopup() {
        const dailyProgressPercent = Math.min(100, (this.stats.dailyTasksCompleted / this.stats.dailyTasksGoal) * 100);
        const remainingTasks = this.stats.dailyTasksGoal - this.stats.dailyTasksCompleted;
        const motivationalMessage = PathSystem.getMotivationalMessage();
        
        let title, message, icon, color;
        
        if (this.isTodayCompleted()) {
            title = "¡DÍA COMPLETADO! 🏆";
            message = "¡Increíble trabajo! Has completado todas tus tareas diarias. Eres imparable.";
            icon = "🏆";
            color = "#ffd700";
        } else if (dailyProgressPercent >= 80) {
            title = "¡CASI LO LOGRAS! ⚡";
            message = `¡Solo ${remainingTasks} tarea${remainingTasks > 1 ? 's' : ''} más para completar el día!`;
            icon = "⚡";
            color = "#ffd166";
        } else if (dailyProgressPercent >= 50) {
            title = "¡VAS POR BUEN CAMINO! 🔥";
            message = `Llevas ${this.stats.dailyTasksCompleted} de ${this.stats.dailyTasksGoal} tareas. ¡Sigue así!`;
            icon = "🔥";
            color = "#ff6b6b";
        } else {
            title = "¡BUEN COMIENZO! 🚀";
            message = `Has completado ${this.stats.dailyTasksCompleted} tarea${this.stats.dailyTasksCompleted !== 1 ? 's' : ''}. ¡Continúa tu progreso!`;
            icon = "🚀";
            color = "#4dff91";
        }
        
        const popup = document.createElement('div');
        popup.className = 'task-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <div class="popup-icon" style="color: ${color}">${icon}</div>
                <h3 style="color: ${color}; margin-bottom: 20px;">${title}</h3>
                <p style="color: #f0f0f0; margin-bottom: 30px; font-size: 14px; line-height: 1.6;">
                    ${message}<br><br>
                    <em style="color: ${GameState.character?.color || 'var(--primary)'}">${motivationalMessage}</em>
                </p>
                <div style="margin: 20px 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="font-size: 10px; color: #aaa;">Progreso Diario</span>
                        <span style="font-size: 10px; color: ${color};">${this.stats.dailyTasksCompleted}/${this.stats.dailyTasksGoal}</span>
                    </div>
                    <div class="daily-progress-bar">
                        <div class="daily-progress-fill" style="width: ${dailyProgressPercent}%">
                            <div class="daily-progress-text">${Math.round(dailyProgressPercent)}%</div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 30px;">
                    <div style="text-align: center;">
                        <div style="color: #ffd166; font-size: 12px;">Racha Actual</div>
                        <div style="font-size: 24px; color: #ffd166;">${this.stats.dailyStreak} días</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: #4dff91; font-size: 12px;">Nivel</div>
                        <div style="font-size: 24px; color: #4dff91;">${this.stats.level}</div>
                    </div>
                </div>
                <button class="ff-button" onclick="window.closeTaskPopup()" style="margin-top: 30px; background: ${color};">CONTINUAR AVENTURA</button>
            </div>
        `;
        document.body.appendChild(popup);
    },

    reset() {
        if (confirm('¿Reiniciar juego? Se perderá todo el progreso.')) {
            this.character = null;
            this.stats = {
                hp: 100,
                mp: 100,
                exp: 0,
                level: 1,
                maxHp: 100,
                maxMp: 100,
                nextLevelExp: 100,
                dailyExp: 0,
                dailyStreak: 0,
                dailyTasksCompleted: 0,
                dailyTasksGoal: 5,
                lastRegionMissionDate: null,
                lastCompletedRegionDay: null
            };
            this.unlockedRegions = [1];
            this.completedMissions = {};
            this.defeatedBosses = [];
            this.dailyMissionsState = {
                lastGeneratedDate: null,
                availableMissions: [],
                completedDailyMissions: []
            };
            this.currentCombat = null;
            this.lastPlayedDate = null;
            this.todayCompleted = false;
            this.currentTask = null;
            
            if (this.taskTimer) {
                clearInterval(this.taskTimer);
                this.taskTimer = null;
            }
            
            localStorage.removeItem('goalquest_save');
            PathSystem.showClassNotification('Juego reiniciado', '🔄');
            return true;
        }
        return false;
    }
};

// ==================== RENDER ENGINE ====================
const RenderEngine = {
    showScreen(screenName, data = null) {
        GameState.currentScreen = screenName;
        const container = document.getElementById('game-container');
        let html = '';
        
        switch (screenName) {
            case 'start':
                html = this.renderStartScreen();
                break;
            case 'characters':
                html = this.renderCharacterScreen();
                break;
            case 'world':
                html = this.renderWorldScreen();
                break;
            case 'region':
                html = this.renderRegionScreen(data);
                break;
            case 'daily':
                html = this.renderDailyMissionsScreen();
                break;
            case 'combat':
                html = this.renderCombatScreen();
                break;
            case 'rest':
                html = this.renderRestScreen();
                break;
            case 'settings':
                html = this.renderSettingsScreen();
                break;
        }
        
        container.innerHTML = html;
    },

    renderStartScreen() {
        const pathName = GameState.character ? PathSystem.getPathName() : '';
        return `
            <div class="game-screen active">
                <h1 class="game-title">GOALQUEST</h1>
                <p style="text-align: center; color: var(--warning); margin: 20px 0;">
                    RPG de Transformación Psicológica
                </p>
                ${GameState.character ? `
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-size: 40px; color: ${GameState.character.color}">${GameState.character.icon}</div>
                        <div style="color: ${GameState.character.color}; font-size: 16px; margin-top: 10px;">
                            ${pathName}
                        </div>
                        <div style="color: #aaa; font-size: 12px; margin-top: 5px;">
                            ${PathSystem.getPathDescription()}
                        </div>
                    </div>
                ` : ''}
                <div class="ff-menu">
                    <button class="menu-option" onclick="window.showScreen('characters')">
                        <i class="fas fa-gamepad"></i>
                        <span>▶ JUGAR AHORA</span>
                    </button>
                    ${GameState.character ? `
                        <button class="menu-option" onclick="window.showScreen('daily')">
                            <i class="fas fa-calendar-day"></i>
                            <span>MISIONES DIARIAS (${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal})</span>
                        </button>
                        <button class="menu-option" onclick="window.showScreen('world')">
                            <i class="fas fa-play"></i>
                            <span>CONTINUAR AVENTURA</span>
                        </button>
                    ` : ''}
                    <button class="menu-option" onclick="window.showScreen('settings')">
                        <i class="fas fa-cog"></i>
                        <span>CONFIGURACIÓN</span>
                    </button>
                </div>
                ${GameState.character && GameState.stats.dailyStreak > 0 ? `
                    <div style="text-align: center; color: var(--warning); margin-top: 30px;">
                        🔥 Racha activa: ${GameState.stats.dailyStreak} días
                    </div>
                ` : ''}
                <div style="position: absolute; bottom: 20px; width: 100%; text-align: center; color: #666; font-size: 10px;">
                    © 2024 GOALQUEST RPG - Transforma tu bienestar
                </div>
            </div>
        `;
    },

    renderCharacterScreen() {
        return `
            <div class="game-screen active">
                <button class="ff-button" onclick="window.showScreen('start')" style="margin-bottom: 20px;">
                    ← VOLVER
                </button>
                <h2 style="color: var(--primary); text-align: center; margin: 20px 0;">
                    SELECCIONA TU PERSONAJE
                </h2>
                <div class="character-grid">
                    ${GAME_DATA.characters.map(char => {
                        const isSelected = GameState.character?.id === char.id;
                        const focus = CLASS_TO_FOCUS[char.id];
                        const path = CLASS_PATHS[focus];
                        const imgSrc = asset(ASSETS.classes[char.id]);
                        
                        return `
                            <div class="character-card ${isSelected ? 'selected' : ''}"
                                 onclick="window.selectCharacter(${char.id})"
                                 style="--char-color: ${char.color}; --char-color-rgb: ${char.colorRgb}">
                                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                                    <div style="width:64px;height:64px;border-radius:12px;overflow:hidden;border:2px solid rgba(255,255,255,0.2);background:rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;">
                                        <img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" 
                                             onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML = '<div style=\\'font-size:32px\\'>${char.icon}</div>';">
                                    </div>
                                    <div>
                                        <h3 style="color: ${char.color}">${char.name}</h3>
                                        <p style="font-size: 10px; color: #aaa;">${char.skill}</p>
                                        <p style="font-size: 8px; color: ${char.color}; margin-top: 5px;">
                                            ${path?.name || 'Camino Personal'}
                                        </p>
                                    </div>
                                </div>
                                <p style="margin: 15px 0; font-size: 12px; color: #ccc; flex-grow: 1;">
                                    ${char.description}
                                </p>
                                <div style="display: flex; justify-content: space-between; margin-top: auto;">
                                    <div style="text-align: center;">
                                        <div style="color: var(--danger); font-size: 11px;">HP</div>
                                        <div style="font-size: 14px;">${char.hp}</div>
                                    </div>
                                    <div style="text-align: center;">
                                        <div style="color: var(--primary); font-size: 11px;">MP</div>
                                        <div style="font-size: 14px;">${char.mp}</div>
                                    </div>
                                    <div style="text-align: center;">
                                        <div style="color: var(--warning); font-size: 11px;">HABILIDADES</div>
                                        <div style="font-size: 10px;">${char.abilities[0]}</div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                ${GameState.character ? `
                    <div style="text-align: center; margin-top: 30px;">
                        <button class="ff-button" onclick="window.startAdventure()">
                            <i class="fas fa-play"></i>
                            COMENZAR COMO ${GameState.character.name}
                        </button>
                    </div>
                ` : `
                    <div style="text-align: center; color: var(--warning); margin-top: 30px;">
                        ⚠️ Selecciona un personaje para comenzar
                    </div>
                `}
            </div>
        `;
    },

    renderStatusBar() {
        const s = GameState.stats;
        const c = GameState.character;
        const dailyProgressPercent = Math.min(100, (s.dailyTasksCompleted / s.dailyTasksGoal) * 100);
        const imgSrc = asset(c?.id && ASSETS.classes[c.id] ? ASSETS.classes[c.id] : ASSETS.classes[1]);
        
        return `
            <div class="status-bar">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="width:48px;height:48px;border-radius:12px;overflow:hidden;border:2px solid rgba(255,255,255,0.2);background:rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;">
                        <img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" 
                             onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML = '<div style=\\'font-size:28px\\'>${c?.icon || '👤'}</div>';">
                    </div>
                    <div>
                        <div style="color: var(--primary); font-weight: bold;">${c?.name || 'Sin personaje'}</div>
                        <div style="font-size: 10px; color: #aaa;">${PathSystem.getPathName()}</div>
                        <div style="font-size: 10px; color: var(--warning);">Nivel ${s.level}</div>
                        <div style="font-size: 9px; color: var(--warning);">EXP Diaria: ${s.dailyExp}</div>
                        <div style="font-size: 9px; color: ${GameState.isTodayCompleted() ? 'var(--primary)' : 'var(--info)'};">
                            ${GameState.isTodayCompleted() ? '🏆 Día completado' : `📝 ${s.dailyTasksCompleted}/${s.dailyTasksGoal} tareas`}
                        </div>
                        ${GameState.hasCompletedRegionMissionToday() ? `
                            <div style="font-size: 9px; color: var(--warning); margin-top: 5px;">
                                🌙 Misión de región completada hoy
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div style="display: flex; gap: 20px; align-items: center;">
                    <div>
                        <div style="font-size: 10px; color: var(--danger);">HP</div>
                        <div class="stat-bar hp-bar">
                            <div class="stat-fill" style="width: ${(s.hp / s.maxHp) * 100}%">
                                <div class="stat-text">${s.hp}/${s.maxHp}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style="font-size: 10px; color: var(--primary);">MP</div>
                        <div class="stat-bar mp-bar">
                            <div class="stat-fill" style="width: ${(s.mp / s.maxMp) * 100}%">
                                <div class="stat-text">${s.mp}/${s.maxMp}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style="font-size: 10px; color: var(--warning);">EXP</div>
                        <div class="stat-bar exp-bar">
                            <div class="stat-fill" style="width: ${(s.exp / s.nextLevelExp) * 100}%">
                                <div class="stat-text">${s.exp}/${s.nextLevelExp}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style="font-size: 10px; color: var(--info); text-align: center;">DIARIO</div>
                        <div class="daily-progress-bar">
                            <div class="daily-progress-fill" style="width: ${dailyProgressPercent}%">
                                <div class="daily-progress-text">${s.dailyTasksCompleted}/${s.dailyTasksGoal}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderWorldScreen() {
        if (!GameState.character) {
            this.showScreen('characters');
            return '';
        }
        
        const dailyProgressPercent = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
        
        return `
            <div class="game-screen active">
                ${this.renderStatusBar()}
                <h2 style="color: var(--primary); text-align: center; margin: 20px 0;">
                    ${PathSystem.getPathName()}
                </h2>
                <p style="text-align: center; color: #aaa; margin-bottom: 10px; font-size: 12px;">
                    ${PathSystem.getPathDescription()}
                </p>
                <div style="background: rgba(26,26,46,0.95); border-radius: 15px; padding: 20px; border: 3px solid var(--warning); margin-bottom: 30px; max-width: 600px; width: 100%;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <div>
                            <div style="color: var(--warning); font-size: 14px;">PROGRESO DIARIO</div>
                            <div style="color: #aaa; font-size: 10px;">
                                ${GameState.isTodayCompleted() ? '✅ Día completado' : `${GameState.stats.dailyTasksGoal - GameState.stats.dailyTasksCompleted} tareas restantes`}
                            </div>
                        </div>
                        <div style="color: var(--warning); font-size: 16px;">
                            ${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal}
                        </div>
                    </div>
                    <div class="daily-progress-bar" style="width: 100%;">
                        <div class="daily-progress-fill" style="width: ${dailyProgressPercent}%">
                            <div class="daily-progress-text">${Math.round(dailyProgressPercent)}%</div>
                        </div>
                    </div>
                    ${GameState.isTodayCompleted() ? `
                        <div style="color: var(--primary); text-align: center; margin-top: 15px; font-size: 12px;">
                            🏆 ¡Día completado! Vuelve mañana para más tareas
                        </div>
                    ` : `
                        <div style="color: var(--info); text-align: center; margin-top: 15px; font-size: 12px;">
                            💪 Completa ${GameState.stats.dailyTasksGoal} tareas diarias para bonus
                        </div>
                    `}
                    ${GameState.hasCompletedRegionMissionToday() ? `
                        <div style="color: var(--warning); text-align: center; margin-top: 15px; font-size: 12px;">
                            🌙 Ya completaste tu misión de región hoy. Vuelve mañana.
                        </div>
                    ` : ''}
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="ff-button" onclick="window.showScreen('daily')" style="padding: 10px 20px; font-size: 12px;">
                            📅 VER MISIONES DIARIAS
                        </button>
                    </div>
                </div>
                <p style="text-align: center; color: #aaa; margin-bottom: 30px;">
                    Completa las 7 misiones de cada región para desbloquear el combate contra el jefe
                </p>
                <div class="map-grid">
                    ${GAME_DATA.regions.map(r => {
                        const unlocked = GameState.isRegionUnlocked(r.id);
                        const completed = GameState.completedMissions[r.id]?.filter(m => m).length || 0;
                        const isCompleted = GameState.isRegionCompleted(r.id);
                        const isBossDefeated = GameState.isBossDefeated(r.id);
                        const regionTheme = PathSystem.getRegionTheme(r.id);
                        const imgSrc = asset(ASSETS.acts[r.id]);
                        const nextMission = GameState.getNextAvailableMission(r.id);
                        
                        return `
                            <div class="region-tile ${unlocked ? '' : 'locked'}"
                                 onclick="${unlocked ? `window.enterRegion(${r.id})` : ''}"
                                 style="--region-color: ${r.color}; --region-color-rgb: ${r.colorRgb}">
                                <div>
                                    <div style="width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-bottom:10px;">
                                        <img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" 
                                             onerror="this.onerror=null; this.remove(); this.parentElement.innerHTML = '<div style=\\'font-size:40px; padding:10px;\\'>${r.icon}</div>';">
                                    </div>
                                    <h4 style="color: ${r.color};">${regionTheme}</h4>
                                    <p style="color: #666; font-size: 10px; margin-top: 5px;">${r.name}</p>
                                </div>
                                ${unlocked ? `
                                    <div style="margin: 15px 0;">
                                        <div style="background: rgba(0,0,0,0.3); border-radius: 5px; height: 8px;">
                                            <div style="height: 100%; background: ${r.color}; border-radius: 5px; width: ${(completed / 7) * 100}%;"></div>
                                        </div>
                                        <div style="font-size: 10px; color: #aaa; margin-top: 5px;">
                                            ${completed}/7 misiones
                                        </div>
                                        ${!GameState.hasCompletedRegionMissionToday() && nextMission !== -1 && !isCompleted ? `
                                            <div style="font-size: 9px; color: var(--warning); margin-top: 5px;">
                                                🔥 Hoy: Día ${nextMission + 1}
                                            </div>
                                        ` : ''}
                                    </div>
                                    ${isCompleted && !isBossDefeated ? `
                                        <button class="ff-button" onclick="window.startCombat(${r.id}); event.stopPropagation();"
                                                style="padding: 8px 15px; font-size: 11px; background: linear-gradient(145deg, var(--danger), #cc4a4a); margin: 5px 0;">
                                            ⚔️ COMBATIR JEFE
                                        </button>
                                    ` : ''}
                                    ${isBossDefeated ? `
                                        <div style="color: var(--warning); font-size: 12px; margin-top: 10px;">
                                            👑 Jefe derrotado
                                        </div>
                                    ` : ''}
                                    ${!isCompleted ? `
                                        <div style="color: var(--primary); font-size: 10px; margin-top: 10px;">
                                            🎯 ${7 - completed} misiones restantes
                                        </div>
                                    ` : ''}
                                ` : `
                                    <div style="font-size: 30px; margin: 10px 0;">🔒</div>
                                    <div style="font-size: 10px; color: #aaa;">
                                        Completa la región anterior
                                    </div>
                                `}
                            </div>
                        `;
                    }).join('')}
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <button class="ff-button" onclick="window.showScreen('daily')">
                        <i class="fas fa-calendar-day"></i> MISIONES DIARIAS
                    </button>
                    <button class="ff-button" onclick="window.showScreen('rest')">
                        <i class="fas fa-campground"></i> DESCANSAR
                    </button>
                    <button class="ff-button" onclick="window.showScreen('start')">
                        <i class="fas fa-home"></i> MENÚ
                    </button>
                </div>
            </div>
        `;
    },

    renderDailyMissionsScreen() {
        if (!GameState.character) {
            this.showScreen('characters');
            return '';
        }
        
        GameState.generateDailyMissions();
        const available = GameState.getAvailableDailyMissions();
        const dailyProgressPercent = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
        
        return `
            <div class="game-screen active">
                <button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom: 20px;">
                    ← VOLVER AL MAPA
                </button>
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
                    <div style="font-size: 50px; color: var(--warning)">📅</div>
                    <div>
                        <h2 style="color: var(--warning);">MISIONES DIARIAS</h2>
                        <p style="color: #aaa; font-size: 12px;">
                            Renuevan cada día - ${GameState.dailyMissionsState.availableMissions.length} disponibles hoy
                        </p>
                        ${GameState.isTodayCompleted() ? `
                            <p style="color: var(--primary); font-size: 11px; margin-top: 5px;">
                                🏆 ¡Día completado! Vuelve mañana
                            </p>
                        ` : `
                            <p style="color: var(--warning); font-size: 11px; margin-top: 5px;">
                                📝 ${GameState.stats.dailyTasksGoal - GameState.stats.dailyTasksCompleted} tareas disponibles hoy
                            </p>
                        `}
                    </div>
                </div>
                <div style="background: rgba(26,26,46,0.95); border-radius: 15px; padding: 20px; border: 3px solid var(--warning); margin-bottom: 30px; width: 100%; max-width: 800px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div style="color: var(--warning);">PROGRESO DIARIO</div>
                        <div style="color: var(--warning);">${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal}</div>
                    </div>
                    <div class="daily-progress-bar" style="width: 100%;">
                        <div class="daily-progress-fill" style="width: ${dailyProgressPercent}%;"></div>
                    </div>
                    <div style="color: var(--info); text-align: center; margin-top: 10px; font-size: 12px;">
                        💪 Completa ${GameState.stats.dailyTasksGoal} tareas para ganar +50 EXP bonus
                    </div>
                </div>
                <h3 style="color: var(--primary); margin-bottom: 20px;">TUS MISIONES DE HOY</h3>
                ${available.length > 0 ? `
                    <div style="background: rgba(26,26,46,0.95); border-radius: 15px; padding: 20px; border: 2px solid var(--warning); width: 100%; max-width: 800px;">
                        ${available.map((m, i) => `
                            <div class="daily-mission-item available" onclick="window.startDailyTask(${i})">
                                <div style="width:24px;height:24px;border:2px solid ${m.categoryColor}; border-radius:5px; display:flex; align-items:center; justify-content:center;">
                                    ${m.type === 'timer' ? '⏰' : '📝'}
                                </div>
                                <div style="flex:1;">
                                    <div style="color: var(--warning); font-size: 12px;">
                                        ${m.text}${m.type === 'timer' ? ` (${m.time} min)` : ''}
                                    </div>
                                    <div style="color: ${m.categoryColor};">
                                        ${m.category}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="text-align: center; margin-top: 30px; color: #aaa; font-size: 11px;">
                        ⭐ Cada misión completada te da +25 EXP
                    </div>
                ` : `
                    <div style="background: rgba(26,26,46,0.95); padding: 40px; text-align: center; border: 2px solid var(--primary);">
                        <div style="font-size: 60px; color: var(--primary);">🏆</div>
                        <h3 style="color: var(--primary);">¡TODAS COMPLETADAS!</h3>
                    </div>
                `}
                <div style="text-align: center; margin-top: 30px;">
                    <button class="ff-button" onclick="window.showScreen('world')">
                        <i class="fas fa-map"></i> VOLVER AL MAPA
                    </button>
                </div>
            </div>
        `;
    },

    renderRegionScreen(regionId) {
        const region = GAME_DATA.regions.find(r => r.id === regionId);
        if (!region || !GameState.isRegionUnlocked(regionId)) {
            PathSystem.showClassNotification('Región bloqueada', '🔒');
            this.showScreen('world');
            return '';
        }
        
        const completed = GameState.completedMissions[regionId] || [];
        const regionTheme = PathSystem.getRegionTheme(regionId);
        const nextMission = GameState.getNextAvailableMission(regionId);
        const hasCompletedToday = GameState.hasCompletedRegionMissionToday();
        
        return `
            <div class="game-screen active">
                <button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom: 20px;">
                    ← VOLVER AL MAPA
                </button>
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
                    <div style="font-size: 50px; color: ${region.color};">${region.icon}</div>
                    <div>
                        <h2 style="color: ${region.color};">${regionTheme}</h2>
                        <p style="color: #666; font-size: 12px;">${region.name} | Dificultad: ${region.boss.difficulty}</p>
                        <p style="color: var(--info); font-size: 11px; margin-top: 5px;">
                            ${completed.filter(m => m).length}/7 misiones completadas
                        </p>
                        ${hasCompletedToday ? `
                            <p style="color: var(--warning); font-size: 11px; margin-top: 5px;">
                                🌙 Ya completaste tu misión hoy. Vuelve mañana.
                            </p>
                        ` : ''}
                        ${!hasCompletedToday && nextMission !== -1 ? `
                            <p style="color: var(--warning); font-size: 11px; margin-top: 5px;">
                                🔥 Misión de hoy: Día ${nextMission + 1}
                            </p>
                        ` : ''}
                        ${nextMission === -1 && completed.length === 7 ? `
                            <p style="color: var(--primary); font-size: 11px; margin-top: 5px;">
                                🏆 ¡Región completada! Enfréntate al jefe.
                            </p>
                        ` : ''}
                    </div>
                </div>
                <h3 style="color: var(--primary); margin-bottom: 20px;">MISIONES DE LA SEMANA</h3>
                <div style="background: rgba(26,26,46,0.95); border-radius: 15px; padding: 20px; border: 2px solid ${region.color}; width: 100%; max-width: 800px;">
                    ${Array.from({ length: 7 }).map((_, i) => {
                        const isCompleted = completed[i];
                        const isNext = i === nextMission;
                        const canComplete = !hasCompletedToday && !isCompleted && isNext;
                        const missionText = PathSystem.getMissionText(regionId, i);
                        
                        let status = '';
                        if (isCompleted) {
                            status = '<div style="color: var(--primary); font-size: 10px;">✅ +25 EXP</div>';
                        } else if (canComplete) {
                            status = '<div style="color: var(--warning); font-size: 10px;">🔥 DISPONIBLE HOY - Click para completar</div>';
                        } else if (isNext && hasCompletedToday) {
                            status = '<div style="color: var(--warning); font-size: 10px;">🌙 Vuelve mañana</div>';
                        } else if (isNext) {
                            status = '<div style="color: var(--info); font-size: 10px;">⏳ Misión de mañana</div>';
                        } else if (!isCompleted && i < nextMission) {
                            status = '<div style="color: var(--primary); font-size: 10px;">✅ Ya completada</div>';
                        } else if (!isCompleted && i > nextMission) {
                            status = '<div style="color: #aaa; font-size: 10px;">🔒 Completa días anteriores</div>';
                        }
                        
                        return `
                            <div class="mission-item ${isCompleted ? 'completed' : ''} ${canComplete ? 'today' : ''}"
                                 onclick="${canComplete ? `window.startRegionTask(${regionId}, ${i})` : ''}">
                                <div style="width:24px;height:24px;border:2px solid ${region.color}; border-radius:5px; display:flex; align-items:center; justify-content:center; background:${isCompleted ? region.color : 'transparent'};">
                                    ${isCompleted ? '✓' : isNext ? '🔥' : (region.missionTypes[i] === 'timer' ? '⏰' : '📝')}
                                </div>
                                <div style="flex:1;">
                                    <div style="color: ${isCompleted ? region.color : (canComplete ? 'var(--warning)' : 'white')};">
                                        Día ${i + 1}: ${missionText}
                                    </div>
                                    ${status}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                ${completed.length === 7 && !GameState.isBossDefeated(regionId) ? `
                    <div style="text-align: center; margin-top: 30px;">
                        <button class="ff-button" onclick="window.startCombat(${regionId})" style="background: var(--danger);">
                            ⚔️ DESAFIAR A ${region.boss.name}
                        </button>
                    </div>
                ` : ''}
                ${completed.length === 7 && GameState.isBossDefeated(regionId) ? `
                    <div style="text-align: center; margin-top: 30px;">
                        <div style="color: var(--warning); padding: 15px; background: rgba(255,209,102,0.1); border-radius: 10px; border: 2px solid var(--warning);">
                            👑 Jefe derrotado - Región completada
                        </div>
                    </div>
                ` : ''}
                <div style="text-align: center; margin-top: 30px;">
                    <button class="ff-button" onclick="window.showScreen('daily')" style="background: var(--warning);">
                        <i class="fas fa-calendar-day"></i> IR A MISIONES DIARIAS
                    </button>
                </div>
            </div>
        `;
    },

    renderCombatScreen() {
        if (!GameState.currentCombat) {
            this.showScreen('world');
            return '';
        }
        
        const c = GameState.currentCombat;
        const r = GAME_DATA.regions.find(x => x.id === c.regionId);
        
        return `
            <div class="game-screen active">
                <button class="ff-button" onclick="window.fleeCombat()" style="margin-bottom: 20px;">
                    🏃 HUIR
                </button>
                <div class="combat-arena">
                    <h2 style="color: var(--danger); text-align: center;">
                        VS ${r.boss.name}
                    </h2>
                    <div style="display: flex; justify-content: space-around; margin: 30px 0;">
                        <div style="text-align: center;">
                            <div style="font-size: 60px;">${GameState.character?.icon}</div>
                            <div>${GameState.character?.name}</div>
                            <div class="stat-bar hp-bar">
                                <div class="stat-fill" style="width: ${(c.playerHp / GameState.stats.maxHp) * 100}%;">
                                    <div class="stat-text">${c.playerHp}/${GameState.stats.maxHp}</div>
                                </div>
                            </div>
                        </div>
                        <div style="font-size: 40px; color: var(--danger);">⚔️</div>
                        <div style="text-align: center;">
                            <div style="font-size: 60px;">${r.boss.sprite}</div>
                            <div>${r.boss.name}</div>
                            <div class="stat-bar hp-bar">
                                <div class="stat-fill" style="width: ${(c.enemy.currentHp / c.enemy.hp) * 100}%;">
                                    <div class="stat-text">${c.enemy.currentHp}/${c.enemy.hp}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3,1fr); gap: 15px;">
                        <button class="ff-button" onclick="window.performAttack('weak')">
                            ⚡ DÉBIL<br><small>10 + EXP/10</small>
                        </button>
                        <button class="ff-button" onclick="window.performAttack('medium')">
                            💥 MEDIO<br><small>20 + EXP/5</small>
                        </button>
                        <button class="ff-button" onclick="window.performAttack('strong')">
                            🔥 FUERTE<br><small>30 + EXP/3</small>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    renderRestScreen() {
        const dailyProgressPercent = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
        
        return `
            <div class="game-screen active">
                <button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom: 20px;">
                    ← VOLVER
                </button>
                <div style="text-align: center; margin: 50px 0;">
                    <div style="font-size: 100px;">🔥</div>
                    <h2 style="color: var(--warning);">CAMPAMENTO</h2>
                    <button class="ff-button" onclick="window.restAction()" style="font-size: 16px; padding: 20px 40px;">
                        💤 DESCANSAR<br><small>+30 HP, +10 MP</small>
                    </button>
                </div>
                <div style="background: rgba(26,26,46,0.95); border-radius: 20px; padding: 30px; border: 3px solid var(--primary);">
                    <h3 style="color: var(--warning); text-align: center;">ESTADO</h3>
                    <div style="display: grid; grid-template-columns: repeat(2,1fr); gap: 20px;">
                        <div style="text-align: center;">
                            <div style="color: var(--danger);">HP</div>
                            <div style="font-size: 24px;">${GameState.stats.hp}/${GameState.stats.maxHp}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="color: var(--primary);">MP</div>
                            <div style="font-size: 24px;">${GameState.stats.mp}/${GameState.stats.maxMp}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="color: var(--warning);">NIVEL</div>
                            <div style="font-size: 24px;">${GameState.stats.level}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="color: var(--secondary);">RACHA</div>
                            <div style="font-size: 24px;">${GameState.stats.dailyStreak} días</div>
                        </div>
                    </div>
                    ${GameState.hasCompletedRegionMissionToday() ? `
                        <div style="color: var(--warning); text-align: center; margin-top: 20px;">
                            🌙 Misión de región completada hoy
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    renderSettingsScreen() {
        return `
            <div class="game-screen active">
                <button class="ff-button" onclick="window.showScreen('start')" style="margin-bottom: 20px;">
                    ← VOLVER
                </button>
                <h2 style="color: var(--primary); margin: 30px 0;">CONFIGURACIÓN</h2>
                <div class="ff-menu">
                    <div style="margin: 20px 0;">
                        <div style="color: var(--primary);">TAREAS DIARIAS (${GameState.stats.dailyTasksGoal})</div>
                        <input type="range" min="3" max="10" value="${GameState.stats.dailyTasksGoal}" 
                               onchange="window.changeDailyGoal(this.value)" style="width: 100%;">
                    </div>
                    <button class="ff-button" onclick="window.resetGame()" 
                            style="width: 100%; background: var(--danger);">
                        🔄 REINICIAR JUEGO
                    </button>
                </div>
            </div>
        `;
    }
};

// ==================== FUNCIONES GLOBALES ====================
window.showScreen = (s, d) => RenderEngine.showScreen(s, d);
window.selectCharacter = (id) => {
    if (GameState.selectCharacter(id)) RenderEngine.showScreen('characters');
};
window.startAdventure = () => {
    if (!GameState.character) {
        PathSystem.showClassNotification('Selecciona un personaje primero', '❌');
        return;
    }
    GameState.save();
    RenderEngine.showScreen('world');
    PathSystem.showClassNotification(`¡Bienvenido, ${GameState.character.name}!`, '🚀');
};
window.enterRegion = (id) => RenderEngine.showScreen('region', id);
window.startDailyTask = (i) => {
    if (GameState.startDailyTask(i)) GameState.showTaskPopup(GameState.currentTask);
};
window.startRegionTask = (rid, i) => {
    if (GameState.startRegionTask(rid, i)) GameState.showTaskPopup(GameState.currentTask);
};
window.saveTaskInput = (v) => GameState.saveUserInput(v);
window.finishTask = () => {
    if (GameState.completeTask()) {
        window.closeTaskPopup();
        RenderEngine.showScreen(
            GameState.currentTask?.type === 'daily' ? 'daily' : 
            (GameState.currentTask?.type === 'region' ? 'region' : 'world'), 
            GameState.currentTask?.regionId
        );
    }
};
window.pauseResumeTimer = () => {
    if (GameState.taskTimer) {
        clearInterval(GameState.taskTimer);
        GameState.taskTimer = null;
    } else {
        GameState.startTimer();
    }
};
window.resetTimer = () => {
    if (GameState.currentTask?.missionType === 'timer') {
        GameState.taskTimerSeconds = (GameState.currentTask.time || 5) * 60;
        if (GameState.taskTimer) {
            clearInterval(GameState.taskTimer);
            GameState.startTimer();
        }
    }
};
window.closeTaskPopup = () => {
    document.querySelector('.task-popup')?.remove();
    if (GameState.taskTimer) {
        clearInterval(GameState.taskTimer);
        GameState.taskTimer = null;
    }
    GameState.currentTask = null;
};
window.startCombat = (id) => {
    if (GameState.startCombat(id)) {
        RenderEngine.showScreen('combat');
        PathSystem.showClassNotification(`¡Combate contra ${GAME_DATA.regions.find(r => r.id === id).boss.name}!`, '⚔️');
    }
};
window.performAttack = (t) => {
    const r = GameState.combatAttack(t);
    if (r) {
        if (r.victory) {
            setTimeout(() => {
                PathSystem.showClassNotification('¡Jefe derrotado!', '🏆');
                RenderEngine.showScreen('world');
            }, 1000);
        } else {
            setTimeout(() => {
                GameState.enemyTurn();
                RenderEngine.showScreen('combat');
                if (GameState.currentCombat?.playerHp <= 0) {
                    setTimeout(() => {
                        PathSystem.showClassNotification('Derrotado', '💀');
                        GameState.currentCombat = null;
                        RenderEngine.showScreen('world');
                    }, 1000);
                }
            }, 1000);
        }
    }
};
window.fleeCombat = () => {
    if (confirm('¿Huir? -10% EXP')) {
        GameState.stats.exp = Math.max(0, Math.floor(GameState.stats.exp * 0.9));
        GameState.currentCombat = null;
        RenderEngine.showScreen('world');
    }
};
window.restAction = () => {
    const r = GameState.rest();
    PathSystem.showClassNotification(`+${r.hp} HP, +${r.mp} MP`, '💤');
    RenderEngine.showScreen('rest');
};
window.changeDailyGoal = (g) => {
    GameState.stats.dailyTasksGoal = parseInt(g);
    GameState.save();
    RenderEngine.showScreen('settings');
};
window.resetGame = () => {
    if (GameState.reset()) RenderEngine.showScreen('start');
};

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                GameState.init();
                RenderEngine.showScreen('start');
            }, 300);
        }
    }, 1500);
});
