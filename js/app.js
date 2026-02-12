// ==================== DATOS DEL JUEGO ====================
        const GAME_DATA = {
            characters: [
                { 
                    id: 1, 
                    name: 'MAGO', 
                    icon: '🧙', 
                    color: '#9d4edd',
                    colorRgb: '157, 78, 221',
                    hp: 32, 
                    mp: 60,
                    skill: 'Claridad Mental',
                    description: 'Domina el caos mental con sabiduría arcana',
                    abilities: ['Bola de Fuego Mental', 'Escudo de Concentración']
                },
                { 
                    id: 2, 
                    name: 'CABALLERO', 
                    icon: '⚔️', 
                    color: '#4a4e69',
                    colorRgb: '74, 78, 105',
                    hp: 55, 
                    mp: 20,
                    skill: 'Disciplina Férrea',
                    description: 'Forja hábitos con armadura inquebrantable',
                    abilities: ['Golpe de Voluntad', 'Escudo de Rutina']
                },
                { 
                    id: 3, 
                    name: 'CURADOR', 
                    icon: '❤️', 
                    color: '#ff6b6b',
                    colorRgb: '255, 107, 107',
                    hp: 40, 
                    mp: 50,
                    skill: 'Energía Vital',
                    description: 'Restaura tu energía con sanación divina',
                    abilities: ['Curación Energética', 'Bendición del Descanso']
                },
                { 
                    id: 4, 
                    name: 'TANQUE', 
                    icon: '🛡️', 
                    color: '#43aa8b',
                    colorRgb: '67, 170, 139',
                    hp: 70, 
                    mp: 15,
                    skill: 'Resistencia Mental',
                    description: 'Aguanta la presión con defensas inquebrantables',
                    abilities: ['Pared de Enfoque', 'Golpe de Persistencia']
                },
                { 
                    id: 5, 
                    name: 'ARQUERO', 
                    icon: '🏹', 
                    color: '#f9c74f',
                    colorRgb: '249, 199, 79',
                    hp: 45, 
                    mp: 35,
                    skill: 'Enfoque Preciso',
                    description: 'Elimina distracciones con puntería letal',
                    abilities: ['Flecha de Enfoque', 'Tiro Certero']
                },
                { 
                    id: 6, 
                    name: 'CLÉRIGO', 
                    icon: '🙏', 
                    color: '#90be6d',
                    colorRgb: '144, 190, 109',
                    hp: 50, 
                    mp: 45,
                    skill: 'Equilibrio Interior',
                    description: 'Balancea vida con sabiduría espiritual',
                    abilities: ['Bendición del Equilibrio', 'Oración de Claridad']
                },
                { 
                    id: 7, 
                    name: 'NINJA', 
                    icon: '🥷', 
                    color: '#222831',
                    colorRgb: '34, 40, 49',
                    hp: 48, 
                    mp: 40,
                    skill: 'Agilidad Mental',
                    description: 'Se mueve rápido entre tareas con sigilo',
                    abilities: ['Ataque Veloz', 'Evasión de Distracciones']
                },
                { 
                    id: 8, 
                    name: 'ALQUIMISTA', 
                    icon: '⚗️', 
                    color: '#00adb5',
                    colorRgb: '0, 173, 181',
                    hp: 38, 
                    mp: 65,
                    skill: 'Transformación',
                    description: 'Transforma hábitos negativos en positivos',
                    abilities: ['Poción de Enfoque', 'Transformación Mental']
                }
            ],
            
            regions: [
                { 
                    id: 1, 
                    name: 'BOSQUE DEL CAOS', 
                    color: '#ff6b6b',
                    colorRgb: '255, 107, 107',
                    icon: '🧠',
                    boss: { 
                        name: 'Dragón del Desorden', 
                        sprite: '🐉', 
                        hp: 100,
                        difficulty: 1,
                        attacks: ['Confusión', 'Procrastinación', 'Distracción']
                    },
                    missions: [
                        'Escribir pensamientos caóticos',
                        'Clasificar tareas por energía',
                        'Eliminar actividades innecesarias',
                        'Meditar 10 minutos',
                        'Crear lista de prioridades',
                        'Limpiar espacio de trabajo',
                        'Planificar semana siguiente'
                    ],
                    missionTypes: ['text', 'text', 'text', 'timer', 'text', 'text', 'text']
                },
                { 
                    id: 2, 
                    name: 'MONTAÑA IDENTIDAD', 
                    color: '#4ecdc4',
                    colorRgb: '78, 205, 196',
                    icon: '🏔️',
                    boss: { 
                        name: 'Gólem del Yo Viejo', 
                        sprite: '🗿', 
                        hp: 120,
                        difficulty: 2,
                        attacks: ['Autocrítica', 'Duda', 'Miedo al Cambio']
                    },
                    missions: [
                        'Definir nueva identidad',
                        'Listar acciones del nuevo yo',
                        'Visualizar éxito',
                        'Crear afirmación diaria',
                        'Actuar como nuevo yo',
                        'Compartir cambio',
                        'Celebrar victoria'
                    ],
                    missionTypes: ['text', 'text', 'text', 'text', 'text', 'text', 'text']
                },
                { 
                    id: 3, 
                    name: 'CIUDAD ENTORNO', 
                    color: '#45b7d1',
                    colorRgb: '69, 183, 209',
                    icon: '🏰',
                    boss: { 
                        name: 'Hydra de Malos Hábitos', 
                        sprite: '🐍', 
                        hp: 150,
                        difficulty: 3,
                        attacks: ['Tentación', 'Rutina Negativa', 'Influencia Tóxica']
                    },
                    missions: [
                        'Organizar espacio físico',
                        'Eliminar objetos distractores',
                        'Limpiar espacio digital',
                        'Definir límites sociales',
                        'Crear ritual matutino',
                        'Programar descansos',
                        'Evaluar relaciones'
                    ],
                    missionTypes: ['text', 'text', 'text', 'text', 'timer', 'text', 'text']
                },
                { 
                    id: 4, 
                    name: 'DESIERTO MOTIVACIÓN', 
                    color: '#f9c74f',
                    colorRgb: '249, 199, 79',
                    icon: '🏜️',
                    boss: { 
                        name: 'Fénix del Desánimo', 
                        sprite: '🔥', 
                        hp: 140,
                        difficulty: 3,
                        attacks: ['Desánimo', 'Falta de Propósito', 'Agotamiento']
                    },
                    missions: [
                        'Identificar propósitos',
                        'Crear visión de futuro',
                        'Listar recompensas personales',
                        'Visualizar meta cumplida',
                        'Encontrar inspiración',
                        'Compartir progreso',
                        'Celebrar pequeños logros'
                    ],
                    missionTypes: ['text', 'text', 'text', 'text', 'text', 'text', 'text']
                },
                { 
                    id: 5, 
                    name: 'OCÉANO DISCIPLINA', 
                    color: '#4a4e69',
                    colorRgb: '74, 78, 105',
                    icon: '🌊',
                    boss: { 
                        name: 'Kraken de la Pereza', 
                        sprite: '🐙', 
                        hp: 160,
                        difficulty: 4,
                        attacks: ['Pereza', 'Excusa', 'Autoengaño']
                    },
                    missions: [
                        'Crear rutina matutina',
                        'Seguir horario estricto',
                        'Ejercicio diario',
                        'Trabajar en bloque',
                        'Evitar distracciones',
                        'Mantener espacio ordenado',
                        'Revisar progreso diario'
                    ],
                    missionTypes: ['text', 'timer', 'timer', 'timer', 'text', 'text', 'text']
                },
                { 
                    id: 6, 
                    name: 'CIELO CREATIVIDAD', 
                    color: '#9d4edd',
                    colorRgb: '157, 78, 221',
                    icon: '☁️',
                    boss: { 
                        name: 'Dragón del Bloqueo', 
                        sprite: '🌩️', 
                        hp: 180,
                        difficulty: 4,
                        attacks: ['Bloqueo Creativo', 'Perfeccionismo', 'Miedo al Fracaso']
                    },
                    missions: [
                        'Brainstorming de ideas',
                        'Proyecto creativo diario',
                        'Consumir inspiración',
                        'Experimentar sin miedo',
                        'Compartir creación',
                        'Buscar feedback',
                        'Iterar y mejorar'
                    ],
                    missionTypes: ['text', 'text', 'timer', 'text', 'text', 'text', 'text']
                },
                { 
                    id: 7, 
                    name: 'INFIERNO MIEDO', 
                    color: '#f94144',
                    colorRgb: '249, 65, 68',
                    icon: '🔥',
                    boss: { 
                        name: 'Diablo de la Ansiedad', 
                        sprite: '😈', 
                        hp: 200,
                        difficulty: 5,
                        attacks: ['Ansiedad', 'Pánico', 'Parálisis']
                    },
                    missions: [
                        'Exposición gradual',
                        'Respiración consciente',
                        'Diario de miedos',
                        'Afirmaciones positivas',
                        'Buscar apoyo',
                        'Practicar valentía',
                        'Celebrar confrontaciones'
                    ],
                    missionTypes: ['text', 'timer', 'text', 'text', 'text', 'text', 'text']
                },
                { 
                    id: 8, 
                    name: 'CIELO ARMONÍA', 
                    color: '#90be6d',
                    colorRgb: '144, 190, 109',
                    icon: '🌈',
                    boss: { 
                        name: 'Ángel del Equilibrio', 
                        sprite: '👼', 
                        hp: 250,
                        difficulty: 5,
                        attacks: ['Desequilibrio', 'Obsesión', 'Burnout']
                    },
                    missions: [
                        'Meditación diaria',
                        'Equilibrio trabajo-vida',
                        'Autocuidado consciente',
                        'Gratitud diaria',
                        'Conexión social',
                        'Tiempo en naturaleza',
                        'Reflexión semanal'
                    ],
                    missionTypes: ['timer', 'text', 'timer', 'text', 'text', 'timer', 'text']
                }
            ],
            
            // ==================== MISIONES DIARIAS ====================
            dailyMissions: {
                categories: [
                    {
                        name: 'MINDFULNESS',
                        color: '#4dff91',
                        missions: [
                            { text: 'Meditar 5 minutos enfocándote en la respiración', type: 'timer', time: 5 },
                            { text: 'Practicar 3 minutos de respiración consciente', type: 'timer', time: 3 },
                            { text: 'Escribir 3 cosas por las que estás agradecido hoy', type: 'text' },
                            { text: 'Hacer un escaneo corporal de 2 minutos', type: 'timer', time: 2 },
                            { text: 'Observar tus pensamientos sin juzgar por 5 minutos', type: 'timer', time: 5 }
                        ]
                    },
                    {
                        name: 'PRODUCTIVIDAD',
                        color: '#6c63ff',
                        missions: [
                            { text: 'Priorizar tus 3 tareas más importantes del día', type: 'text' },
                            { text: 'Trabajar en modo concentración por 25 minutos', type: 'timer', time: 25 },
                            { text: 'Revisar y limpiar tu bandeja de entrada de email', type: 'text' },
                            { text: 'Planificar tu día siguiente antes de dormir', type: 'text' },
                            { text: 'Eliminar 3 distracciones de tu espacio de trabajo', type: 'text' }
                        ]
                    },
                    {
                        name: 'BIENESTAR FÍSICO',
                        color: '#ff6b6b',
                        missions: [
                            { text: 'Hacer 10 minutos de estiramientos matutinos', type: 'timer', time: 10 },
                            { text: 'Caminar al aire libre por 15 minutos', type: 'timer', time: 15 },
                            { text: 'Beber 8 vasos de agua durante el día', type: 'text' },
                            { text: 'Preparar una comida saludable y nutritiva', type: 'text' },
                            { text: 'Practicar postura correcta por 5 minutos', type: 'timer', time: 5 }
                        ]
                    },
                    {
                        name: 'CRECIMIENTO PERSONAL',
                        color: '#ffd166',
                        missions: [
                            { text: 'Leer 10 páginas de un libro de desarrollo personal', type: 'text' },
                            { text: 'Escribir una reflexión sobre tu aprendizaje de hoy', type: 'text' },
                            { text: 'Practicar una nueva habilidad por 15 minutos', type: 'timer', time: 15 },
                            { text: 'Identificar un área de mejora y crear un plan', type: 'text' },
                            { text: 'Escuchar un podcast educativo de 20 minutos', type: 'timer', time: 20 }
                        ]
                    },
                    {
                        name: 'CONEXIÓN SOCIAL',
                        color: '#4ecdc4',
                        missions: [
                            { text: 'Expresar gratitud a alguien importante para ti', type: 'text' },
                            { text: 'Hacer una llamada o mensaje a un ser querido', type: 'text' },
                            { text: 'Practicar escucha activa por 5 minutos', type: 'timer', time: 5 },
                            { text: 'Ofrecer ayuda a alguien sin esperar nada a cambio', type: 'text' },
                            { text: 'Compartir algo positivo en redes sociales', type: 'text' }
                        ]
                    },
                    {
                        name: 'ORGANIZACIÓN',
                        color: '#9d4edd',
                        missions: [
                            { text: 'Limpiar y organizar un área de tu hogar por 10 minutos', type: 'timer', time: 10 },
                            { text: 'Revisar y actualizar tu calendario semanal', type: 'text' },
                            { text: 'Digitalizar o archivar documentos pendientes', type: 'text' },
                            { text: 'Crear una lista de compras o pendientes organizada', type: 'text' },
                            { text: 'Dedicar 15 minutos a ordenar tu espacio digital', type: 'timer', time: 15 }
                        ]
                    }
                ]
            }
        };

        // ==================== ASSETS ====================
        // Versión corregida - maneja mejor los nombres de archivo
        const ASSETS = {
            start: "backgrounds/pantalla de inicio.png",
            acts: {
                1: "backgrounds/Acto 1.png",
                2: "backgrounds/acto 2.png",
                3: "backgrounds/acto 3.png",
                4: "backgrounds/acto 4.png",
                5: "backgrounds/acto 5.png",
                6: "backgrounds/acto 6.png",
                7: "backgrounds/acto 7.png",
                8: "backgrounds/acto 8.png"
            },
            classes: {
                1: "classes/mago.png",
                2: "classes/caballero.png",
                3: "classes/curador.png",
                4: "classes/Tanque.png",
                5: "classes/arquero.png",
                6: "classes/clerigo.png",
                7: "classes/ninja.png",
                8: "classes/alquimista.png"
            }
        };

        // Función asset CORREGIDA
        function asset(relPath) {
            if (!relPath) return '';
            
            // Si ya tiene assets/, mantenerlo
            if (relPath.startsWith('assets/')) {
                return relPath;
            }
            
            // Manejar espacios en los nombres de archivo
            const encodedPath = relPath.split('/').map(part => 
                encodeURIComponent(part).replace(/%20/g, ' ')
            ).join('/');
            
            return 'assets/' + encodedPath;
        }

        // ==================== SISTEMA DE CAMINOS POR CLASE ====================
        const CLASS_PATHS = {
            // MAGO -> focus: "clarity"
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
                    1: [
                        "Escribir pensamientos confusos que nublan tu mente",
                        "Clasificar tareas por claridad mental requerida",
                        "Eliminar patrones de pensamiento repetitivos",
                        "Meditar 10 minutos para aclarar la mente",
                        "Crear lista de decisiones pendientes",
                        "Limpiar espacio mental con respiración consciente",
                        "Planificar con claridad, no con ansiedad"
                    ],
                    2: [
                        "Definir quién eres cuando piensas con claridad",
                        "Listar acciones desde la perspectiva clara",
                        "Visualizar éxitos con detalle nítido",
                        "Crear afirmación diaria de claridad mental",
                        "Actuar con decisión clara",
                        "Compartir insights mentales claros",
                        "Celebrar momentos de absoluta claridad"
                    ],
                    3: [
                        "Organizar espacio para pensamiento claro",
                        "Eliminar objetos que distraen tu mente",
                        "Limpiar información digital innecesaria",
                        "Definir límites cognitivos",
                        "Crear ritual matutino de claridad",
                        "Programar descansos mentales",
                        "Evaluar relaciones por claridad que aportan"
                    ]
                },
                motivationalMessages: [
                    "La claridad llega cuando el ruido mental cesa.",
                    "Cada pensamiento claro es un paso hacia el dominio.",
                    "La mente clara ve oportunidades donde otros ven caos.",
                    "Tu claridad mental es tu arma más poderosa.",
                    "En la claridad encuentras las respuestas que buscas."
                ]
            },
            
            // CABALLERO -> focus: "discipline"
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
                    1: [
                        "Escribir compromisos incumplidos contigo mismo",
                        "Clasificar tareas por nivel de compromiso",
                        "Eliminar excusas y justificaciones",
                        "Meditar 10 minutos con postura militar",
                        "Crear lista de reglas personales",
                        "Limpiar espacio de disciplina",
                        "Planificar con rigurosidad militar"
                    ],
                    2: [
                        "Definir identidad como persona de palabra",
                        "Listar acciones que demuestren disciplina",
                        "Visualizar éxito a través de constancia",
                        "Crear código de honor diario",
                        "Actuar con rigor militar",
                        "Compartir logros de disciplina",
                        "Celebrar victorias de voluntad"
                    ],
                    3: [
                        "Organizar espacio con precisión militar",
                        "Eliminar objetos que fomentan la pereza",
                        "Limpiar distracciones digitales estrictamente",
                        "Definir fronteras de compromiso",
                        "Crear ritual matutino espartano",
                        "Programar entrenamientos diarios",
                        "Evaluar relaciones por disciplina compartida"
                    ]
                },
                motivationalMessages: [
                    "La disciplina es el puente entre metas y logros.",
                    "Cada acto de disciplina fortalece tu voluntad.",
                    "El hábito vence a la inspiración cada día.",
                    "Tu armadura de disciplina te protege de las tentaciones.",
                    "La consistencia es la verdadera medida del carácter."
                ]
            },
            
            // CURADOR -> focus: "energy"
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
                    1: [
                        "Escribir emociones que te drenan energía",
                        "Clasificar tareas por nivel energético requerido",
                        "Eliminar relaciones tóxicas que consumen",
                        "Meditar 10 minutos para recargar",
                        "Crear lista de fuentes de energía",
                        "Limpiar espacio energético",
                        "Planificar según tus ritmos naturales"
                    ],
                    2: [
                        "Definir identidad como cuidador de ti mismo",
                        "Listar acciones que te recargan",
                        "Visualizar éxito con energía plena",
                        "Crear afirmación diaria de autocuidado",
                        "Actuar desde la energía renovada",
                        "Compartir energía positiva",
                        "Celebrar momentos de plenitud"
                    ],
                    3: [
                        "Organizar espacio para fluir energía",
                        "Eliminar objetos con energía estancada",
                        "Limpiar espacios digitales negativos",
                        "Definir límites energéticos",
                        "Crear ritual matutino de recarga",
                        "Programar pausas energéticas",
                        "Evaluar relaciones por energía que aportan"
                    ]
                },
                motivationalMessages: [
                    "Tu energía es sagrada, protégete.",
                    "Cada acto de autocuidado es una semilla de crecimiento.",
                    "Cuando te nutres a ti mismo, puedes nutrir al mundo.",
                    "La energía positiva atrae más energía positiva.",
                    "Escucha a tu cuerpo, él sabe lo que necesita."
                ]
            },
            
            // TANQUE -> focus: "resilience"
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
                    1: [
                        "Escribir cargas emocionales que aguantas",
                        "Clasificar tareas por nivel de resistencia",
                        "Eliminar responsabilidades innecesarias",
                        "Meditar 10 minutos para soltar peso",
                        "Crear lista de límites saludables",
                        "Limpiar espacio de sobrecarga",
                        "Planificar con márgenes de seguridad"
                    ],
                    2: [
                        "Definir identidad como resiliente, no como mártir",
                        "Listar acciones que fortalecen sin dañar",
                        "Visualizar éxito con equilibrio",
                        "Crear afirmación diaria de resistencia sana",
                        "Actuar con firmeza, no con rigidez",
                        "Compartir aprendizajes de resiliencia",
                        "Celebrar capacidad de recuperación"
                    ],
                    3: [
                        "Organizar espacio para resistir sin romper",
                        "Eliminar objetos que simbolizan carga",
                        "Limpiar compromisos digitales excesivos",
                        "Definir fronteras de responsabilidad",
                        "Crear ritual matutino de estabilidad",
                        "Programar tiempos de descarga",
                        "Evaluar relaciones por apoyo mutuo"
                    ]
                },
                motivationalMessages: [
                    "La verdadera fuerza está en saber cuándo descansar.",
                    "Ser resiliente no significa aguantarlo todo.",
                    "Cada límite sano es un acto de autoamor.",
                    "Tu capacidad de recuperación es tu superpoder.",
                    "A veces soltar es más valiente que aguantar."
                ]
            },
            
            // ARQUERO -> focus: "focus"
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
                    1: [
                        "Escribir distracciones que dispersan tu atención",
                        "Clasificar tareas por prioridad de enfoque",
                        "Eliminar proyectos paralelos innecesarios",
                        "Meditar 10 minutos para enfocar la mente",
                        "Crear lista de objetivos únicos",
                        "Limpiar espacio de elementos distractores",
                        "Planificar con precisión quirúrgica"
                    ],
                    2: [
                        "Definir identidad como especialista, no generalista",
                        "Listar acciones con enfoque láser",
                        "Visualizar éxito en un área específica",
                        "Crear afirmación diaria de concentración",
                        "Actuar con atención total",
                        "Compartir logros de enfoque profundo",
                        "Celebrar momentos de flujo total"
                    ],
                    3: [
                        "Organizar espacio para máxima concentración",
                        "Eliminar objetos que dispersan la atención",
                        "Limpiar notificaciones digitales innecesarias",
                        "Definir límites de enfoque",
                        "Crear ritual matutino de concentración",
                        "Programar bloques de atención profunda",
                        "Evaluar relaciones por capacidad de enfoque"
                    ]
                },
                motivationalMessages: [
                    "Donde pones tu atención, pones tu energía.",
                    "Un objetivo claro es mitad del camino recorrido.",
                    "La maestría viene de enfocarse, no de dispersarse.",
                    "Tu puntería mental es tu arma más precisa.",
                    "En la profundidad del enfoque está la excelencia."
                ]
            },
            
            // CLÉRIGO -> focus: "balance"
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
                    1: [
                        "Escribir desequilibrios en tu vida actual",
                        "Clasificar tareas por áreas de vida",
                        "Eliminar extremos que rompen el balance",
                        "Meditar 10 minutos para encontrar centro",
                        "Crear lista de pilares equilibrados",
                        "Limpiar espacio para armonía",
                        "Planificar con equilibrio holístico"
                    ],
                    2: [
                        "Definir identidad como persona integral",
                        "Listar acciones que promueven equilibrio",
                        "Visualizar éxito en todas las áreas",
                        "Crear afirmación diaria de armonía",
                        "Actuar desde el centro, no desde los extremos",
                        "Compartir sabiduría del equilibrio",
                        "Celebrar momentos de perfecta armonía"
                    ],
                    3: [
                        "Organizar espacio para fluir en equilibrio",
                        "Eliminar objetos que rompen la armonía",
                        "Limpiar desorden digital que desequilibra",
                        "Definir límites para mantener balance",
                        "Crear ritual matutino de centramiento",
                        "Programar tiempos para cada área de vida",
                        "Evaluar relaciones por equilibrio que aportan"
                    ]
                },
                motivationalMessages: [
                    "El equilibrio no es estático, es un baile constante.",
                    "En el centro del torbellino está la calma.",
                    "Tu sabiduría interior conoce el camino del medio.",
                    "Cada área de tu vida merece atención amorosa.",
                    "El verdadero poder está en la armonía, no en la fuerza."
                ]
            },
            
            // NINJA -> focus: "agility"
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
                    1: [
                        "Escribir falsas urgencias que te apresuran",
                        "Clasificar tareas por velocidad óptima",
                        "Eliminar presiones innecesarias",
                        "Meditar 10 minutos para ralentizar",
                        "Crear lista de ritmos naturales",
                        "Limpiar espacio de prisa innecesaria",
                        "Planificar con fluidez, no con presión"
                    ],
                    2: [
                        "Definir identidad como ágil, no como apurado",
                        "Listar acciones con precisión ninja",
                        "Visualizar éxito con gracia y fluidez",
                        "Crear afirmación diaria de movilidad consciente",
                        "Actuar con sigilo y precisión",
                        "Compartir estrategias de agilidad",
                        "Celebrar movimientos fluidos"
                    ],
                    3: [
                        "Organizar espacio para moverse libremente",
                        "Eliminar obstáculos que frenan tu flujo",
                        "Limpiar procesos digitales lentos",
                        "Definir límites de velocidad saludable",
                        "Crear ritual matutino de preparación ágil",
                        "Programar transiciones suaves",
                        "Evaluar relaciones por fluidez compartida"
                    ]
                },
                motivationalMessages: [
                    "La verdadera agilidad está en la mente, no en la prisa.",
                    "Moverse con gracia es más eficiente que correr.",
                    "Tu sigilo mental te permite avanzar sin resistencia.",
                    "En la fluidez del movimiento está la eficiencia.",
                    "Un ninja sabe cuándo moverse y cuándo quedarse quieto."
                ]
            },
            
            // ALQUIMISTA -> focus: "transformation"
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
                    1: [
                        "Escribir patrones que quieres transformar",
                        "Clasificar tareas por potencial de cambio",
                        "Eliminar hábitos que bloquean transformación",
                        "Meditar 10 minutos para visualizar cambio",
                        "Crear lista de experimentos personales",
                        "Limpiar espacio para nueva energía",
                        "Planificar con mentalidad de crecimiento"
                    ],
                    2: [
                        "Definir identidad como ser en constante evolución",
                        "Listar acciones que catalizan transformación",
                        "Visualizar versiones futuras de ti mismo",
                        "Crear afirmación diaria de metamorfosis",
                        "Actuar como la versión transformada",
                        "Compartir procesos de cambio",
                        "Celebrar cada pequeña transformación"
                    ],
                    3: [
                        "Organizar espacio como laboratorio personal",
                        "Eliminar objetos que anclan al pasado",
                        "Limpiar rutinas digitales obsoletas",
                        "Definir límites como experimentos",
                        "Crear ritual matutino de reinvención",
                        "Programar momentos de reflexión evolutiva",
                        "Evaluar relaciones por potencial transformador"
                    ]
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

        // ==================== MAPPING DE CLASES A FOCUS ====================
        const CLASS_TO_FOCUS = {
            1: 'clarity',      // MAGO
            2: 'discipline',   // CABALLERO
            3: 'energy',       // CURADOR
            4: 'resilience',   // TANQUE
            5: 'focus',        // ARQUERO
            6: 'balance',      // CLÉRIGO
            7: 'agility',      // NINJA
            8: 'transformation' // ALQUIMISTA
        };

        // ==================== FUNCIONES DE AYUDA PARA CAMINOS ====================
        const PathSystem = {
            // Obtener el focus de la clase actual
            getCurrentFocus: function() {
                if (!GameState.character) return null;
                return CLASS_TO_FOCUS[GameState.character.id];
            },
            
            // Obtener configuración del camino actual
            getCurrentPath: function() {
                const focus = this.getCurrentFocus();
                return focus ? CLASS_PATHS[focus] : null;
            },
            
            // Obtener texto de misión con override de clase
            getMissionText: function(regionId, missionIndex) {
                const path = this.getCurrentPath();
                const defaultMissions = GAME_DATA.regions.find(r => r.id === regionId)?.missions || [];
                
                if (path && path.missionOverrides && path.missionOverrides[regionId]) {
                    const override = path.missionOverrides[regionId][missionIndex];
                    if (override) return override;
                }
                
                // Fallback a misión original
                return defaultMissions[missionIndex] || `Misión ${missionIndex + 1}`;
            },
            
            // Obtener tema de región según clase
            getRegionTheme: function(regionId) {
                const path = this.getCurrentPath();
                if (path && path.regionThemes && path.regionThemes[regionId]) {
                    return path.regionThemes[regionId];
                }
                // Fallback al nombre original de la región
                const region = GAME_DATA.regions.find(r => r.id === regionId);
                return region?.name || `Región ${regionId}`;
            },
            
            // Obtener nombre del camino actual
            getPathName: function() {
                const path = this.getCurrentPath();
                return path?.name || "CAMINO DEL AVENTURERO";
            },
            
            // Obtener descripción del camino actual
            getPathDescription: function() {
                const path = this.getCurrentPath();
                return path?.description || "Transforma tu vida a través de la aventura";
            },
            
            // Obtener mensaje motivacional según clase
            getMotivationalMessage: function() {
                const path = this.getCurrentPath();
                if (path && path.motivationalMessages) {
                    const messages = path.motivationalMessages;
                    return messages[Math.floor(Math.random() * messages.length)];
                }
                return "¡Sigue adelante, aventurero!";
            },
            
            // Aplicar estilos de clase a elementos
            applyClassStyling: function(element, color) {
                if (element && color) {
                    element.style.borderColor = color;
                    element.style.boxShadow = `0 0 15px ${color}40`;
                }
            },
            
            // Mostrar notificación con estilo de clase
            showClassNotification: function(message, icon = '💡') {
                const path = this.getCurrentPath();
                const character = GameState.character;
                
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.style.borderLeftColor = character?.color || 'var(--primary)';
                notification.innerHTML = `
                    <div style="font-size: 24px; color: ${character?.color || 'var(--primary)'}">${icon}</div>
                    <div style="font-size: 12px;">
                        <strong style="color: ${character?.color || 'var(--primary)'}">${character?.name || 'Aventurero'}:</strong><br>
                        ${message}
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideIn 0.3s ease reverse';
                    setTimeout(() => notification.remove(), 300);
                }, 3000);
            }
        };

        // ==================== ESTADO DEL JUEGO ====================
        const GameState = {
            // Datos del jugador
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
                dailyTasksGoal: 5
            },
            
            // Progreso
            unlockedRegions: [1],
            completedMissions: {},
            defeatedBosses: [],
            
            // MISIONES DIARIAS
            dailyMissionsState: {
                lastGeneratedDate: null,
                availableMissions: [],
                completedDailyMissions: []
            },
            
            // Estado diario
            lastPlayedDate: null,
            todayCompleted: false,
            
            // Estado actual
            currentScreen: 'start',
            currentRegion: null,
            currentCombat: null,
            
            // Tarea actual
            currentTask: null,
            taskTimer: null,
            taskTimerSeconds: 0,
            
            // ==================== MÉTODOS ====================
            
            // Seleccionar personaje
            selectCharacter: function(characterId) {
                const character = GAME_DATA.characters.find(c => c.id === characterId);
                if (character) {
                    this.character = character;
                    this.save();
                    PathSystem.showClassNotification(`Has elegido el ${PathSystem.getPathName()}`, '🎮');
                    return true;
                }
                return false;
            },
            
            // Inicializar
            init: function() {
                this.load();
                this.checkDailyReset();
                this.generateDailyMissions();
            },
            
            // Cargar partida
            load: function() {
                const saved = localStorage.getItem('goalquest_save');
                if (saved) {
                    try {
                        const data = JSON.parse(saved);
                        this.character = data.character;
                        this.stats = data.stats || this.stats;
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
                        
                        // Inicializar valores si no existen
                        if (this.stats.dailyTasksCompleted === undefined) {
                            this.stats.dailyTasksCompleted = 0;
                            this.stats.dailyTasksGoal = 5;
                        }
                        
                        // Solo mostrar notificación si hay un personaje seleccionado
                        if (this.character) {
                            // Verificar si es un nuevo día
                            this.checkDailyReset();
                            PathSystem.showClassNotification('Partida cargada', '💾');
                        }
                    } catch (e) {
                        console.error('Error cargando:', e);
                    }
                }
            },
            
            // Guardar partida
            save: function() {
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
            
            // GENERAR MISIONES DIARIAS
            generateDailyMissions: function() {
                const today = new Date().toDateString();
                
                // Solo generar nuevas misiones si es un nuevo día
                if (this.dailyMissionsState.lastGeneratedDate !== today) {
                    console.log('Generando nuevas misiones diarias para:', today);
                    
                    this.dailyMissionsState.lastGeneratedDate = today;
                    this.dailyMissionsState.completedDailyMissions = [];
                    this.dailyMissionsState.availableMissions = [];
                    
                    // Recopilar todas las misiones disponibles
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
                    
                    console.log('Total de misiones disponibles:', allMissions.length);
                    
                    // Mezclar las misiones
                    const shuffledMissions = [...allMissions].sort(() => Math.random() - 0.5);
                    
                    // Seleccionar 5 misiones únicas
                    const selectedMissions = [];
                    const usedTexts = new Set();
                    
                    for (const mission of shuffledMissions) {
                        if (selectedMissions.length >= 5) break;
                        
                        if (!usedTexts.has(mission.text)) {
                            selectedMissions.push(mission);
                            usedTexts.add(mission.text);
                        }
                    }
                    
                    // Si no tenemos 5 misiones, agregar más
                    while (selectedMissions.length < 5 && selectedMissions.length < allMissions.length) {
                        const randomMission = shuffledMissions.find(m => !selectedMissions.some(sm => sm.text === m.text));
                        if (randomMission) {
                            selectedMissions.push(randomMission);
                        } else {
                            break;
                        }
                    }
                    
                    this.dailyMissionsState.availableMissions = selectedMissions;
                    this.save();
                    
                    console.log('Misiones diarias generadas para hoy:', selectedMissions);
                }
            },
            
            // Obtener misiones diarias disponibles
            getAvailableDailyMissions: function() {
                return this.dailyMissionsState.availableMissions.filter(mission => 
                    !this.dailyMissionsState.completedDailyMissions.includes(mission.id)
                );
            },
            
            // ¿Misión diaria completada?
            isDailyMissionCompleted: function(missionId) {
                return this.dailyMissionsState.completedDailyMissions.includes(missionId);
            },
            
            // Completar misión diaria
            completeDailyMission: function(missionId) {
                if (!this.isDailyMissionCompleted(missionId)) {
                    this.dailyMissionsState.completedDailyMissions.push(missionId);
                    this.stats.dailyTasksCompleted++;
                    
                    // Recompensa por misión diaria
                    const expGained = 25;
                    this.stats.exp += expGained;
                    this.stats.dailyExp += expGained;
                    
                    // Verificar si completó todas las tareas del día
                    if (this.isTodayCompleted()) {
                        this.todayCompleted = true;
                        PathSystem.showClassNotification(`¡DÍA COMPLETADO! ${this.stats.dailyTasksGoal}/${this.stats.dailyTasksGoal} tareas`, '🏆');
                        
                        // Bonus por completar el día
                        const dailyBonus = 50;
                        this.stats.exp += dailyBonus;
                        PathSystem.showClassNotification(`¡Bonus diario! +${dailyBonus} EXP`, '⭐');
                    } else {
                        // Notificación de progreso
                        const remaining = this.stats.dailyTasksGoal - this.stats.dailyTasksCompleted;
                        PathSystem.showClassNotification(`¡Misión diaria completada! ${remaining} tareas restantes hoy`, '✅');
                    }
                    
                    // Verificar nivel
                    this.checkLevelUp();
                    
                    this.save();
                    
                    // Mostrar popup motivacional (solo cada 2 tareas para no saturar)
                    if (this.stats.dailyTasksCompleted % 2 === 0 || this.isTodayCompleted()) {
                        this.showMotivationPopup();
                    }
                    
                    return true;
                }
                return false;
            },
            
            // Reset diario
            checkDailyReset: function() {
                const today = new Date().toDateString();
                
                if (this.lastPlayedDate !== today) {
                    // Nuevo día - Resetear contadores diarios
                    this.todayCompleted = false;
                    this.stats.dailyTasksCompleted = 0;
                    this.stats.dailyExp = 0;
                    
                    // Verificar y actualizar racha
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
                    
                    // Si es un nuevo día y completó las tareas del día anterior, dar recompensa extra
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
            
            // ¿Puede completar más tareas hoy?
            canCompleteMoreTasksToday: function() {
                return this.stats.dailyTasksCompleted < this.stats.dailyTasksGoal;
            },
            
            // ¿Día completado?
            isTodayCompleted: function() {
                return this.stats.dailyTasksCompleted >= this.stats.dailyTasksGoal;
            },
            
            // Verificar si misión está disponible (secuencial)
            isMissionAvailable: function(regionId, missionIndex) {
                const completed = this.completedMissions[regionId] || [];
                
                // Si ya está completada, no está disponible
                if (completed[missionIndex]) {
                    return false;
                }
                
                // Día 1 siempre está disponible si no está completado
                if (missionIndex === 0) {
                    return true;
                }
                
                // Para días 2-7: verificar que el día anterior esté completado
                const previousMissionCompleted = completed[missionIndex - 1];
                return previousMissionCompleted === true;
            },
            
            // Obtener próxima misión disponible en una región
            getNextAvailableMission: function(regionId) {
                const completed = this.completedMissions[regionId] || [];
                
                for (let i = 0; i < 7; i++) {
                    if (!completed[i]) {
                        // Verificar si está disponible (día 1 o día anterior completado)
                        if (i === 0 || completed[i - 1]) {
                            return i;
                        }
                        return -1;
                    }
                }
                return -1;
            },
            
            // Iniciar tarea de misión diaria
            startDailyTask: function(missionIndex) {
                // Verificar si ya completó las tareas de hoy
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
            
            // Iniciar tarea de región
            startRegionTask: function(regionId, missionIndex) {
                // Verificar si ya completó las tareas de hoy
                if (this.isTodayCompleted()) {
                    PathSystem.showClassNotification('¡Ya completaste tus 5 tareas diarias! Vuelve mañana.', '✅');
                    return null;
                }
                
                // Verificar si la misión está disponible (secuencial)
                if (!this.isMissionAvailable(regionId, missionIndex)) {
                    const nextMission = this.getNextAvailableMission(regionId);
                    
                    if (nextMission === -1) {
                        PathSystem.showClassNotification('¡Ya completaste todas las misiones de esta región!', '🏆');
                    } else {
                        PathSystem.showClassNotification(`Completa primero la misión del Día ${nextMission + 1}`, '🔒');
                    }
                    return null;
                }
                
                const missionText = PathSystem.getMissionText(regionId, missionIndex);
                const region = GAME_DATA.regions.find(r => r.id === regionId);
                const missionType = region.missionTypes[missionIndex];
                
                this.currentTask = {
                    type: 'region',
                    regionId: regionId,
                    missionIndex: missionIndex,
                    missionText: missionText,
                    missionType: missionType,
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
            
            // Iniciar timer
            startTimer: function() {
                if (this.taskTimer) {
                    clearInterval(this.taskTimer);
                }
                
                this.taskTimer = setInterval(() => {
                    this.taskTimerSeconds--;
                    if (this.taskTimerSeconds <= 0) {
                        clearInterval(this.taskTimer);
                        this.taskTimer = null;
                        PathSystem.showClassNotification('¡Tiempo completado!', '⏰');
                    }
                    
                    const timerDisplay = document.querySelector('.timer-display');
                    if (timerDisplay) {
                        const minutes = Math.floor(this.taskTimerSeconds / 60);
                        const seconds = this.taskTimerSeconds % 60;
                        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    }
                }, 1000);
            },
            
            // Guardar entrada de usuario
            saveUserInput: function(input) {
                if (this.currentTask) {
                    this.currentTask.userInput = input;
                    return true;
                }
                return false;
            },
            
            // Completar tarea actual
            completeTask: function() {
                if (!this.currentTask) {
                    return false;
                }
                
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
            
            // Completar misión de región
            completeRegionMission: function(regionId, missionIndex) {
                if (this.isTodayCompleted()) {
                    PathSystem.showClassNotification('¡Ya completaste tus 5 tareas diarias! Vuelve mañana.', '✅');
                    return false;
                }
                
                if (!this.isMissionAvailable(regionId, missionIndex)) {
                    PathSystem.showClassNotification('¡Debes completar las misiones en orden!', '🔒');
                    return false;
                }
                
                if (!this.completedMissions[regionId]) {
                    this.completedMissions[regionId] = [];
                }
                
                if (!this.completedMissions[regionId][missionIndex]) {
                    this.completedMissions[regionId][missionIndex] = true;
                    
                    this.stats.dailyTasksCompleted++;
                    
                    const expGained = 25;
                    this.stats.exp += expGained;
                    this.stats.dailyExp += expGained;
                    
                    if (this.isTodayCompleted()) {
                        this.todayCompleted = true;
                        PathSystem.showClassNotification(`¡DÍA COMPLETADO! ${this.stats.dailyTasksGoal}/${this.stats.dailyTasksGoal} tareas`, '🏆');
                        
                        const dailyBonus = 50;
                        this.stats.exp += dailyBonus;
                        PathSystem.showClassNotification(`¡Bonus diario! +${dailyBonus} EXP`, '⭐');
                    } else {
                        const remaining = this.stats.dailyTasksGoal - this.stats.dailyTasksCompleted;
                        PathSystem.showClassNotification(`¡Tarea completada! ${remaining} tareas restantes hoy`, '✅');
                    }
                    
                    this.checkLevelUp();
                    this.checkRegionCompletion(regionId);
                    this.save();
                    
                    if (this.stats.dailyTasksCompleted % 2 === 0 || this.isTodayCompleted()) {
                        this.showMotivationPopup();
                    }
                    
                    return true;
                } else {
                    PathSystem.showClassNotification('Ya completaste esta misión', '✅');
                    return false;
                }
            },
            
            // Verificar nivel
            checkLevelUp: function() {
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
            
            // Verificar región completada
            checkRegionCompletion: function(regionId) {
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
            
            // ¿Región completada?
            isRegionCompleted: function(regionId) {
                const missions = this.completedMissions[regionId];
                if (!missions) return false;
                
                return missions.length === 7 && missions.every(m => m);
            },
            
            // ¿Región desbloqueada?
            isRegionUnlocked: function(regionId) {
                return this.unlockedRegions.includes(regionId);
            },
            
            // ¿Jefe derrotado?
            isBossDefeated: function(regionId) {
                return this.defeatedBosses.includes(regionId);
            },
            
            // Iniciar combate
            startCombat: function(regionId) {
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
                    regionId: regionId,
                    enemy: { ...region.boss, currentHp: region.boss.hp },
                    playerHp: this.stats.hp,
                    playerMp: this.stats.mp,
                    turn: 0,
                    log: []
                };
                
                return this.currentCombat;
            },
            
            // Atacar en combate
            combatAttack: function(type) {
                if (!this.currentCombat) return null;
                
                const combat = this.currentCombat;
                combat.turn++;
                
                let damage = 0;
                switch(type) {
                    case 'weak': damage = 10 + Math.floor(this.stats.dailyExp / 10); break;
                    case 'medium': damage = 20 + Math.floor(this.stats.dailyExp / 5); break;
                    case 'strong': damage = 30 + Math.floor(this.stats.dailyExp / 3); break;
                }
                
                combat.enemy.currentHp = Math.max(0, combat.enemy.currentHp - damage);
                combat.log.push(`Atacas con ${type.toUpperCase()}: -${damage} HP`);
                
                if (combat.enemy.currentHp <= 0) {
                    this.defeatBoss(combat.regionId);
                    return { victory: true, damage: damage };
                }
                
                return { victory: false, damage: damage };
            },
            
            // Turno enemigo
            enemyTurn: function() {
                if (!this.currentCombat) return null;
                
                const combat = this.currentCombat;
                const region = GAME_DATA.regions.find(r => r.id === combat.regionId);
                const attack = region.boss.attacks[Math.floor(Math.random() * region.boss.attacks.length)];
                
                const damage = 10 + (region.boss.difficulty * 5);
                combat.playerHp = Math.max(0, combat.playerHp - damage);
                this.stats.hp = combat.playerHp;
                
                combat.log.push(`${region.boss.name} usa ${attack}: -${damage} HP`);
                
                return { attack: attack, damage: damage };
            },
            
            // Derrotar jefe
            defeatBoss: function(regionId) {
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
            
            // Descansar
            rest: function() {
                const hpHealed = 30;
                const mpHealed = 10;
                
                this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + hpHealed);
                this.stats.mp = Math.min(this.stats.maxMp, this.stats.mp + mpHealed);
                
                this.save();
                return { hp: hpHealed, mp: mpHealed };
            },
            
            // Mostrar popup de tarea
            showTaskPopup: function(task) {
                const missionText = task.missionText;
                const missionType = task.missionType;
                
                let content = '';
                
                if (missionType === 'timer') {
                    const minutes = Math.floor(this.taskTimerSeconds / 60);
                    const seconds = this.taskTimerSeconds % 60;
                    
                    content = `
                        <div class="popup-icon" style="color: var(--warning)">⏰</div>
                        <h3 style="color: var(--warning); margin-bottom: 20px;">${missionText}</h3>
                        <div class="timer-container">
                            <div class="timer-display">${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</div>
                            <div class="timer-buttons">
                                <button class="ff-button" onclick="pauseResumeTimer()" style="background: var(--warning);">
                                    ⏸️ PAUSAR
                                </button>
                                <button class="ff-button" onclick="resetTimer()" style="background: var(--danger);">
                                    🔄 REINICIAR
                                </button>
                            </div>
                        </div>
                        <button class="ff-button" onclick="finishTask()" style="margin-top: 20px;">
                            ✅ COMPLETAR TAREA
                        </button>
                    `;
                } else {
                    content = `
                        <div class="popup-icon" style="color: var(--primary)">📝</div>
                        <h3 style="color: var(--primary); margin-bottom: 20px;">${missionText}</h3>
                        <textarea class="task-textarea" placeholder="Escribe aquí para completar la tarea..." oninput="saveTaskInput(this.value)"></textarea>
                        <button class="ff-button" onclick="finishTask()" style="margin-top: 20px;">
                            ✅ GUARDAR Y COMPLETAR
                        </button>
                    `;
                }
                
                const popup = document.createElement('div');
                popup.className = 'task-popup';
                popup.innerHTML = `
                    <div class="popup-content">
                        ${content}
                        <button class="ff-button" onclick="closeTaskPopup()" 
                                style="margin-top: 15px; background: var(--danger);">
                            ❌ CANCELAR
                        </button>
                    </div>
                `;
                
                document.body.appendChild(popup);
            },
            
            // Mostrar popup motivacional
            showMotivationPopup: function() {
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
                        <div class="popup-icon" style="color: ${color}">
                            ${icon}
                        </div>
                        <h3 style="color: ${color}; margin-bottom: 20px;">
                            ${title}
                        </h3>
                        <p style="color: #f0f0f0; margin-bottom: 30px; font-size: 14px; line-height: 1.6;">
                            ${message}<br><br>
                            <em style="color: ${GameState.character?.color || 'var(--primary)'}">
                                ${motivationalMessage}
                            </em>
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
                        <button class="ff-button" onclick="closeTaskPopup()" 
                                style="margin-top: 30px; background: ${color};">
                            CONTINUAR AVENTURA
                        </button>
                    </div>
                `;
                
                document.body.appendChild(popup);
            },
            
            // Reiniciar juego
            reset: function() {
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
                        dailyTasksGoal: 5
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

        // ==================== SISTEMA DE RENDERIZADO ====================
        const RenderEngine = {
            // Mostrar pantalla
            showScreen: function(screenName, data = null) {
                GameState.currentScreen = screenName;
                const container = document.getElementById('game-container');
                
                let screenHTML = '';
                
                switch(screenName) {
                    case 'start':
                        screenHTML = this.renderStartScreen();
                        break;
                    case 'characters':
                        screenHTML = this.renderCharacterScreen();
                        break;
                    case 'world':
                        screenHTML = this.renderWorldScreen();
                        break;
                    case 'region':
                        screenHTML = this.renderRegionScreen(data);
                        break;
                    case 'daily':
                        screenHTML = this.renderDailyMissionsScreen();
                        break;
                    case 'combat':
                        screenHTML = this.renderCombatScreen();
                        break;
                    case 'rest':
                        screenHTML = this.renderRestScreen();
                        break;
                    case 'settings':
                        screenHTML = this.renderSettingsScreen();
                        break;
                }
                
                container.innerHTML = screenHTML;
            },
            
            // Pantalla de inicio
            renderStartScreen: function() {
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
                            <button class="menu-option" onclick="showScreen('characters')">
                                <i class="fas fa-gamepad"></i>
                                <span>NUEVA PARTIDA</span>
                            </button>
                            
                            ${GameState.character ? `
                                <button class="menu-option" onclick="showScreen('daily')">
                                    <i class="fas fa-calendar-day"></i>
                                    <span>MISIONES DIARIAS (${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal})</span>
                                </button>
                                
                                <button class="menu-option" onclick="showScreen('world')">
                                    <i class="fas fa-play"></i>
                                    <span>CONTINUAR AVENTURA</span>
                                </button>
                            ` : ''}
                            
                            <button class="menu-option" onclick="showScreen('settings')">
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
            
            // Pantalla de personajes
            renderCharacterScreen: function() {
                return `
                    <div class="game-screen active">
                        <button class="ff-button" onclick="showScreen('start')" style="margin-bottom: 20px;">
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
                                         onclick="selectCharacter(${char.id})"
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
                                <button class="ff-button" onclick="startAdventure()">
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
            
            // Pantalla del mundo
            renderWorldScreen: function() {
                if (!GameState.character) {
                    this.showScreen('characters');
                    return '';
                }
                
                const dailyProgressPercent = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
                const pathName = PathSystem.getPathName();
                const pathDescription = PathSystem.getPathDescription();
                
                return `
                    <div class="game-screen active">
                        ${this.renderStatusBar()}
                        
                        <h2 style="color: var(--primary); text-align: center; margin: 20px 0;">
                            ${pathName}
                        </h2>
                        <p style="text-align: center; color: #aaa; margin-bottom: 10px; font-size: 12px;">
                            ${pathDescription}
                        </p>
                        
                        <div style="background: rgba(26, 26, 46, 0.95); border-radius: 15px; padding: 20px; border: 3px solid var(--warning); margin-bottom: 30px; max-width: 600px; width: 100%;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                <div>
                                    <div style="color: var(--warning); font-size: 14px;">PROGRESO DIARIO</div>
                                    <div style="color: #aaa; font-size: 10px;">${GameState.isTodayCompleted() ? '✅ Día completado' : `${GameState.stats.dailyTasksGoal - GameState.stats.dailyTasksCompleted} tareas restantes`}</div>
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
                            
                            <div style="text-align: center; margin-top: 20px;">
                                <button class="ff-button" onclick="showScreen('daily')" style="padding: 10px 20px; font-size: 12px;">
                                    📅 VER MISIONES DIARIAS
                                </button>
                            </div>
                        </div>
                        
                        <p style="text-align: center; color: #aaa; margin-bottom: 30px;">
                            Completa las 7 misiones de cada región para desbloquear el combate contra el jefe
                        </p>
                        
                        <div class="map-grid">
                            ${GAME_DATA.regions.map(region => {
                                const isUnlocked = GameState.isRegionUnlocked(region.id);
                                const isCompleted = GameState.isRegionCompleted(region.id);
                                const isBossDefeated = GameState.isBossDefeated(region.id);
                                const completedMissions = GameState.completedMissions[region.id]?.filter(m => m).length || 0;
                                const regionTheme = PathSystem.getRegionTheme(region.id);
                                const imgSrc = asset(ASSETS.acts[region.id]);
                                
                                return `
                                    <div class="region-tile ${isUnlocked ? '' : 'locked'}"
                                         onclick="${isUnlocked ? `enterRegion(${region.id})` : ''}"
                                         style="--region-color: ${region.color}; --region-color-rgb: ${region.colorRgb}">
                                        
                                        <div>
                                            <div style="width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-bottom:10px;">
                                                <img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" 
                                                     onerror="this.onerror=null; this.remove(); this.parentElement.innerHTML = '<div style=\\'font-size:40px; padding:10px;\\'>${region.icon}</div>';">
                                            </div>
                                            <h4 style="color: ${region.color}">${regionTheme}</h4>
                                            <p style="color: #666; font-size: 10px; margin-top: 5px;">${region.name}</p>
                                        </div>
                                        
                                        ${isUnlocked ? `
                                            <div style="margin: 15px 0;">
                                                <div style="background: rgba(0,0,0,0.3); border-radius: 5px; height: 8px;">
                                                    <div style="height: 100%; background: ${region.color}; border-radius: 5px; width: ${(completedMissions / 7) * 100}%"></div>
                                                </div>
                                                <div style="font-size: 10px; color: #aaa; margin-top: 5px;">
                                                    ${completedMissions}/7 misiones
                                                </div>
                                            </div>
                                            
                                            ${isCompleted && !isBossDefeated ? `
                                                <button class="ff-button" onclick="startCombat(${region.id}); event.stopPropagation();"
                                                        style="padding: 8px 15px; font-size: 11px; background: linear-gradient(145deg, var(--danger), #cc4a4a); margin: 5px 0;">
                                                    ⚔️ COMBATIR JEFE
                                                </button>
                                            ` : ''}
                                            
                                            ${isBossDefeated ? `
                                                <div style="color: var(--warning); font-size: 12px; margin-top: 10px;">
                                                    👑 Jefe derrotado
                                                </div>
                                            ` : ''}
                                            
                                            ${isUnlocked && !isCompleted ? `
                                                <div style="color: var(--primary); font-size: 10px; margin-top: 10px;">
                                                    🎯 ${7 - completedMissions} misiones restantes
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
                            <button class="ff-button" onclick="showScreen('daily')">
                                <i class="fas fa-calendar-day"></i> MISIONES DIARIAS
                            </button>
                            <button class="ff-button" onclick="showScreen('rest')">
                                <i class="fas fa-campground"></i> DESCANSAR
                            </button>
                            <button class="ff-button" onclick="showScreen('start')">
                                <i class="fas fa-home"></i> MENÚ
                            </button>
                        </div>
                    </div>
                `;
            },
            
            // Barra de estado
            renderStatusBar: function() {
                const stats = GameState.stats;
                const character = GameState.character;
                const dailyProgressPercent = Math.min(100, (stats.dailyTasksCompleted / stats.dailyTasksGoal) * 100);
                const imgSrc = asset(character?.id && ASSETS.classes[character.id] ? ASSETS.classes[character.id] : ASSETS.classes[1]);
                
                return `
                    <div class="status-bar">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="width:48px;height:48px;border-radius:12px;overflow:hidden;border:2px solid rgba(255,255,255,0.2);background:rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;">
                                <img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" 
                                     onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML = '<div style=\\'font-size:28px\\'>${character?.icon || '👤'}</div>';">
                            </div>
                            <div>
                                <div style="color: var(--primary); font-weight: bold;">${character?.name || 'Sin personaje'}</div>
                                <div style="font-size: 10px; color: #aaa;">${PathSystem.getPathName()}</div>
                                <div style="font-size: 10px; color: var(--warning);">Nivel ${stats.level}</div>
                                <div style="font-size: 9px; color: var(--warning);">EXP Diaria: ${stats.dailyExp}</div>
                                <div style="font-size: 9px; color: ${GameState.isTodayCompleted() ? 'var(--primary)' : 'var(--info)'};">
                                    ${GameState.isTodayCompleted() ? '🏆 Día completado' : `📝 ${stats.dailyTasksCompleted}/${stats.dailyTasksGoal} tareas`}
                                </div>
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 20px; align-items: center;">
                            <div>
                                <div style="font-size: 10px; color: var(--danger);">HP</div>
                                <div class="stat-bar hp-bar">
                                    <div class="stat-fill" style="width: ${(stats.hp / stats.maxHp) * 100}%">
                                        <div class="stat-text">${stats.hp}/${stats.maxHp}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div style="font-size: 10px; color: var(--primary);">MP</div>
                                <div class="stat-bar mp-bar">
                                    <div class="stat-fill" style="width: ${(stats.mp / stats.maxMp) * 100}%">
                                        <div class="stat-text">${stats.mp}/${stats.maxMp}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div style="font-size: 10px; color: var(--warning);">EXP</div>
                                <div class="stat-bar exp-bar">
                                    <div class="stat-fill" style="width: ${(stats.exp / stats.nextLevelExp) * 100}%">
                                        <div class="stat-text">${stats.exp}/${stats.nextLevelExp}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div style="font-size: 10px; color: var(--info); text-align: center;">DIARIO</div>
                                <div class="daily-progress-bar">
                                    <div class="daily-progress-fill" style="width: ${dailyProgressPercent}%">
                                        <div class="daily-progress-text">${stats.dailyTasksCompleted}/${stats.dailyTasksGoal}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            },
            
            // Pantalla de Misiones Diarias
            renderDailyMissionsScreen: function() {
                if (!GameState.character) {
                    this.showScreen('characters');
                    return '';
                }
                
                GameState.generateDailyMissions();
                
                const availableMissions = GameState.getAvailableDailyMissions();
                const completedCount = GameState.dailyMissionsState.completedDailyMissions.length;
                const totalDailyMissions = GameState.dailyMissionsState.availableMissions.length;
                const dailyProgressPercent = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
                
                return `
                    <div class="game-screen active">
                        <button class="ff-button" onclick="showScreen('world')" style="margin-bottom: 20px;">
                            ← VOLVER AL MAPA
                        </button>
                        
                        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
                            <div style="font-size: 50px; color: var(--warning)">📅</div>
                            <div>
                                <h2 style="color: var(--warning);">MISIONES DIARIAS</h2>
                                <p style="color: #aaa; font-size: 12px;">Renuevan cada día - ${totalDailyMissions} disponibles hoy</p>
                                ${GameState.isTodayCompleted() ? 
                                    '<p style="color: var(--primary); font-size: 11px; margin-top: 5px;">🏆 ¡Día completado! Vuelve mañana</p>' : 
                                    `<p style="color: var(--warning); font-size: 11px; margin-top: 5px;">
                                        📝 ${GameState.stats.dailyTasksGoal - GameState.stats.dailyTasksCompleted} tareas disponibles hoy
                                    </p>`}
                            </div>
                        </div>
                        
                        <div style="background: rgba(26, 26, 46, 0.95); border-radius: 15px; padding: 20px; border: 3px solid var(--warning); margin-bottom: 30px; width: 100%; max-width: 800px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <div style="color: var(--warning);">PROGRESO DIARIO</div>
                                <div style="color: var(--warning);">${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal}</div>
                            </div>
                            <div class="daily-progress-bar" style="width: 100%;">
                                <div class="daily-progress-fill" style="width: ${dailyProgressPercent}%">
                                    <div class="daily-progress-text">${Math.round(dailyProgressPercent)}%</div>
                                </div>
                            </div>
                            <div style="color: var(--info); text-align: center; margin-top: 10px; font-size: 12px;">
                                💪 Completa ${GameState.stats.dailyTasksGoal} tareas para ganar +50 EXP bonus
                            </div>
                        </div>
                        
                        <h3 style="color: var(--primary); margin-bottom: 20px;">TUS MISIONES DE HOY</h3>
                        
                        ${availableMissions.length > 0 ? `
                            <div style="background: rgba(26, 26, 46, 0.95); border-radius: 15px; padding: 20px; border: 2px solid var(--warning); width: 100%; max-width: 800px;">
                                ${availableMissions.map((mission, index) => {
                                    const missionIcon = mission.type === 'timer' ? '⏰' : '📝';
                                    const timeText = mission.type === 'timer' ? ` (${mission.time} min)` : '';
                                    const canComplete = GameState.canCompleteMoreTasksToday();
                                    
                                    return `
                                        <div class="daily-mission-item ${canComplete ? 'available' : ''} ${!canComplete ? 'disabled' : ''}" 
                                             onclick="${canComplete ? `startDailyTask(${index})` : ''}">
                                            
                                            <div style="width: 24px; height: 24px; border: 2px solid ${mission.categoryColor}; 
                                                 border-radius: 5px; display: flex; align-items: center; 
                                                 justify-content: center; background: transparent;">
                                                ${missionIcon}
                                            </div>
                                            
                                            <div style="flex: 1;">
                                                <div style="color: ${canComplete ? 'var(--warning)' : 'white'}; font-size: 12px;">
                                                    ${mission.text}${timeText}
                                                </div>
                                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px;">
                                                    <div style="color: ${mission.categoryColor}; font-size: 10px;">
                                                        ${mission.category}
                                                    </div>
                                                    ${canComplete ? 
                                                        '<div style="color: var(--warning); font-size: 10px;">🔥 DISPONIBLE</div>' :
                                                        '<div style="color: var(--danger); font-size: 10px;">⏰ Día completado</div>'}
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                            
                            <div style="text-align: center; margin-top: 30px; color: #aaa; font-size: 11px;">
                                ⭐ Cada misión completada te da +25 EXP
                            </div>
                        ` : `
                            <div style="background: rgba(26, 26, 46, 0.95); border-radius: 15px; padding: 40px; border: 2px solid var(--primary); width: 100%; max-width: 800px; text-align: center;">
                                <div style="font-size: 60px; color: var(--primary); margin-bottom: 20px;">🏆</div>
                                <h3 style="color: var(--primary); margin-bottom: 15px;">¡TODAS LAS MISIONES COMPLETADAS!</h3>
                                <p style="color: #aaa; margin-bottom: 20px; font-size: 12px;">
                                    Has completado todas tus misiones diarias. ¡Excelente trabajo!
                                </p>
                                <p style="color: var(--warning); font-size: 11px;">
                                    Vuelve mañana para nuevas misiones diarias
                                </p>
                            </div>
                        `}
                        
                        ${completedCount > 0 ? `
                            <div style="margin-top: 40px; width: 100%; max-width: 800px;">
                                <h3 style="color: var(--primary); margin-bottom: 20px;">MISIONES COMPLETADAS HOY (${completedCount})</h3>
                                <div style="background: rgba(26, 26, 46, 0.95); border-radius: 15px; padding: 20px; border: 2px solid var(--primary);">
                                    ${GameState.dailyMissionsState.completedDailyMissions.map(missionId => {
                                        const mission = GameState.dailyMissionsState.availableMissions.find(m => m.id === missionId);
                                        if (!mission) return '';
                                        
                                        const missionIcon = mission.type === 'timer' ? '⏰' : '📝';
                                        const timeText = mission.type === 'timer' ? ` (${mission.time} min)` : '';
                                        
                                        return `
                                            <div style="padding: 10px; margin: 5px 0; background: rgba(77, 255, 145, 0.1); border-radius: 8px; border-left: 4px solid var(--primary);">
                                                <div style="color: var(--primary); font-size: 11px;">
                                                    ${missionIcon} ${mission.text}${timeText}
                                                </div>
                                                <div style="color: ${mission.categoryColor}; font-size: 9px; margin-top: 3px;">
                                                    ${mission.category} • +25 EXP
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <button class="ff-button" onclick="showScreen('world')">
                                <i class="fas fa-map"></i> VOLVER AL MAPA
                            </button>
                        </div>
                    </div>
                `;
            },
            
            // Pantalla de región
            renderRegionScreen: function(regionId) {
                const region = GAME_DATA.regions.find(r => r.id === regionId);
                if (!region || !GameState.isRegionUnlocked(regionId)) {
                    PathSystem.showClassNotification('Región bloqueada', '🔒');
                    this.showScreen('world');
                    return '';
                }
                
                const missionTypes = region.missionTypes;
                const completed = GameState.completedMissions[regionId] || [];
                const regionTheme = PathSystem.getRegionTheme(regionId);
                const nextMissionIndex = GameState.getNextAvailableMission(regionId);
                
                return `
                    <div class="game-screen active">
                        <button class="ff-button" onclick="showScreen('world')" style="margin-bottom: 20px;">
                            ← VOLVER AL MAPA
                        </button>
                        
                        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
                            <div style="font-size: 50px; color: ${region.color}">${region.icon}</div>
                            <div>
                                <h2 style="color: ${region.color}">${regionTheme}</h2>
                                <p style="color: #666; font-size: 12px;">${region.name} | Dificultad: ${region.boss.difficulty}</p>
                                ${GameState.isTodayCompleted() ? 
                                    '<p style="color: var(--primary); font-size: 11px; margin-top: 5px;">🏆 ¡Día completado! Vuelve mañana</p>' : 
                                    `<p style="color: var(--warning); font-size: 11px; margin-top: 5px;">
                                        📝 ${GameState.stats.dailyTasksGoal - GameState.stats.dailyTasksCompleted} tareas disponibles hoy
                                    </p>`}
                                <p style="color: var(--info); font-size: 11px; margin-top: 5px;">
                                    ${completed.filter(m => m).length}/7 misiones completadas
                                </p>
                                
                                ${nextMissionIndex !== -1 && !GameState.isTodayCompleted() ? `
                                    <p style="color: var(--warning); font-size: 10px; margin-top: 5px; padding: 5px; background: rgba(255, 209, 102, 0.1); border-radius: 5px;">
                                        🔥 Próxima misión: Día ${nextMissionIndex + 1}
                                    </p>
                                ` : ''}
                            </div>
                        </div>
                        
                        <h3 style="color: var(--primary); margin-bottom: 20px;">MISIONES DE LA SEMANA</h3>
                        
                        <div style="background: rgba(26, 26, 46, 0.95); border-radius: 15px; padding: 20px; border: 2px solid ${region.color}; width: 100%; max-width: 800px;">
                            ${Array.from({length: 7}).map((_, index) => {
                                const isCompleted = completed[index];
                                const missionType = missionTypes[index];
                                const typeIcon = missionType === 'timer' ? '⏰' : '📝';
                                const isAvailable = GameState.isMissionAvailable(regionId, index);
                                const canComplete = isAvailable && !isCompleted && GameState.canCompleteMoreTasksToday();
                                const isNextMission = index === nextMissionIndex;
                                
                                const missionText = PathSystem.getMissionText(regionId, index);
                                
                                return `
                                    <div class="mission-item ${isCompleted ? 'completed' : ''} ${canComplete ? 'today' : ''} ${(!canComplete && !isCompleted) ? 'disabled' : ''}" 
                                         onclick="${canComplete ? `startRegionTask(${regionId}, ${index})` : ''}">
                                        
                                        <div style="width: 24px; height: 24px; border: 2px solid ${region.color}; 
                                             border-radius: 5px; display: flex; align-items: center; 
                                             justify-content: center; background: ${isCompleted ? region.color : 'transparent'};">
                                            ${isCompleted ? '✓' : isNextMission ? '🔥' : typeIcon}
                                        </div>
                                        
                                        <div style="flex: 1;">
                                            <div style="color: ${isCompleted ? region.color : (canComplete ? 'var(--warning)' : 'white')}; font-size: 12px;">
                                                Día ${index + 1}: ${missionText} ${!isCompleted ? `(${typeIcon} ${missionType === 'timer' ? 'Temporizador' : 'Texto'})` : ''}
                                            </div>
                                            ${isCompleted ? 
                                                '<div style="color: var(--primary); font-size: 10px;">✅ +25 EXP</div>' : 
                                                canComplete ? 
                                                    '<div style="color: var(--warning); font-size: 10px;">🔥 DISPONIBLE - Click para completar</div>' :
                                                    isNextMission && !GameState.isTodayCompleted() ?
                                                        '<div style="color: var(--info); font-size: 10px;">⏳ Próxima misión disponible</div>' :
                                                        !isAvailable ?
                                                            '<div style="color: #aaa; font-size: 10px;">🔒 Completa el día anterior primero</div>' :
                                                            GameState.isTodayCompleted() ?
                                                                '<div style="color: var(--danger); font-size: 10px;">⏰ Día completado, vuelve mañana</div>' :
                                                                '<div style="color: #aaa; font-size: 10px;">🔒 No disponible</div>'}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        
                        ${completed.length === 7 && !GameState.isBossDefeated(regionId) ? `
                            <div style="text-align: center; margin-top: 30px;">
                                <button class="ff-button" onclick="startCombat(${regionId})"
                                        style="background: linear-gradient(145deg, var(--danger), #cc4a4a);">
                                    ⚔️ DESAFIAR A ${region.boss.name}
                                </button>
                                <p style="color: var(--warning); font-size: 11px; margin-top: 10px;">
                                    ¡Has completado todas las misiones! Ahora puedes enfrentar al jefe.
                                </p>
                            </div>
                        ` : completed.length === 7 ? `
                            <div style="text-align: center; margin-top: 30px;">
                                <div style="color: var(--warning); padding: 15px; background: rgba(255, 209, 102, 0.1); border-radius: 10px; border: 2px solid var(--warning);">
                                    👑 Jefe derrotado<br>
                                    <small style="color: #aaa;">¡Región completada al 100%!</small>
                                </div>
                            </div>
                        ` : ''}
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <button class="ff-button" onclick="showScreen('daily')" style="background: var(--warning);">
                                <i class="fas fa-calendar-day"></i> IR A MISIONES DIARIAS
                            </button>
                        </div>
                    </div>
                `;
            },
            
            // Pantalla de combate
            renderCombatScreen: function() {
                if (!GameState.currentCombat) {
                    this.showScreen('world');
                    return '';
                }
                
                const combat = GameState.currentCombat;
                const region = GAME_DATA.regions.find(r => r.id === combat.regionId);
                const enemyHealthPercent = (combat.enemy.currentHp / combat.enemy.hp) * 100;
                const playerHealthPercent = (combat.playerHp / GameState.stats.maxHp) * 100;
                
                return `
                    <div class="game-screen active">
                        <button class="ff-button" onclick="fleeCombat()" style="margin-bottom: 20px;">
                            🏃 HUIR DEL COMBATE
                        </button>
                        
                        <div class="combat-arena">
                            <h2 style="color: var(--danger); text-align: center; margin-bottom: 20px;">
                                COMBATE CONTRA ${region.boss.name}
                            </h2>
                            
                            <div style="display: flex; justify-content: space-around; align-items: center; margin: 30px 0;">
                                <div style="text-align: center;">
                                    <div style="font-size: 60px;">${GameState.character?.icon || '👤'}</div>
                                    <div style="color: var(--primary); margin-top: 10px;">${GameState.character?.name}</div>
                                    <div class="stat-bar hp-bar" style="width: 120px; margin: 10px auto;">
                                        <div class="stat-fill" style="width: ${playerHealthPercent}%">
                                            <div class="stat-text">${combat.playerHp}/${GameState.stats.maxHp}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="font-size: 40px; color: var(--danger);">⚔️</div>
                                
                                <div style="text-align: center;">
                                    <div class="enemy-sprite">${region.boss.sprite}</div>
                                    <div style="color: var(--danger); margin-top: 10px;">${region.boss.name}</div>
                                    <div class="stat-bar hp-bar" style="width: 120px; margin: 10px auto;">
                                        <div class="stat-fill" style="width: ${enemyHealthPercent}%">
                                            <div class="stat-text">${combat.enemy.currentHp}/${combat.enemy.hp}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <p style="color: var(--warning); font-size: 12px;">
                                    EXP Disponible: ${GameState.stats.exp} | EXP Diaria: ${GameState.stats.dailyExp}
                                </p>
                                <p style="color: #aaa; font-size: 11px;">
                                    Los ataques usan tu EXP diaria acumulada
                                </p>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 30px 0;">
                                <button class="ff-button" onclick="performAttack('weak')">
                                    ⚡ DÉBIL<br>
                                    <small>10 + EXP/10</small>
                                </button>
                                
                                <button class="ff-button" onclick="performAttack('medium')">
                                    💥 MEDIO<br>
                                    <small>20 + EXP/5</small>
                                </button>
                                
                                <button class="ff-button" onclick="performAttack('strong')">
                                    🔥 FUERTE<br>
                                    <small>30 + EXP/3</small>
                                </button>
                            </div>
                            
                            <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 15px; max-height: 150px; overflow-y: auto;">
                                <h4 style="color: var(--primary); margin-bottom: 10px;">REGISTRO DE COMBATE</h4>
                                ${combat.log.map(entry => `
                                    <div style="color: #aaa; font-size: 11px; margin: 5px 0; padding: 5px; background: rgba(0,0,0,0.2); border-radius: 5px;">
                                        ${entry}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            },
            
            // Pantalla de descanso
            renderRestScreen: function() {
                const dailyProgressPercent = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
                
                return `
                    <div class="game-screen active">
                        <button class="ff-button" onclick="showScreen('world')" style="margin-bottom: 20px;">
                            ← VOLVER AL MAPA
                        </button>
                        
                        <div style="text-align: center; margin: 50px 0;">
                            <div style="font-size: 100px; animation: fire 1s ease-in-out infinite;">🔥</div>
                            <h2 style="color: var(--warning); margin: 20px 0;">CAMPAMENTO DE DESCANSO</h2>
                            <p style="color: #aaa; margin-bottom: 30px;">
                                El héroe descansa junto a la hoguera para recuperar fuerzas
                            </p>
                            
                            <button class="ff-button" onclick="restAction()" style="font-size: 16px; padding: 20px 40px;">
                                💤 DESCANSAR<br>
                                <small>+30 HP, +10 MP</small>
                            </button>
                        </div>
                        
                        <div style="background: rgba(26, 26, 46, 0.95); border-radius: 20px; padding: 30px; margin-top: 30px; border: 3px solid var(--primary); max-width: 600px; width: 100%;">
                            <h3 style="color: var(--warning); text-align: center; margin-bottom: 20px;">
                                ESTADO DEL HÉROE
                            </h3>
                            
                            <div style="margin-bottom: 30px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                    <div style="color: var(--warning);">PROGRESO DIARIO</div>
                                    <div style="color: var(--warning);">${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal}</div>
                                </div>
                                <div class="daily-progress-bar" style="width: 100%;">
                                    <div class="daily-progress-fill" style="width: ${dailyProgressPercent}%">
                                        <div class="daily-progress-text">${Math.round(dailyProgressPercent)}%</div>
                                    </div>
                                </div>
                                ${GameState.isTodayCompleted() ? 
                                    '<div style="color: var(--primary); text-align: center; margin-top: 10px; font-size: 12px;">🏆 ¡Día completado!</div>' :
                                    `<div style="color: var(--info); text-align: center; margin-top: 10px; font-size: 12px;">
                                        ${GameState.stats.dailyTasksGoal - GameState.stats.dailyTasksCompleted} tareas restantes hoy
                                    </div>`
                                }
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                                <div style="text-align: center;">
                                    <div style="color: var(--danger);">SALUD</div>
                                    <div style="font-size: 24px;">${GameState.stats.hp}/${GameState.stats.maxHp}</div>
                                </div>
                                
                                <div style="text-align: center;">
                                    <div style="color: var(--primary);">ENERGÍA</div>
                                    <div style="font-size: 24px;">${GameState.stats.mp}/${GameState.stats.maxMp}</div>
                                </div>
                                
                                <div style="text-align: center;">
                                    <div style="color: var(--warning);">NIVEL</div>
                                    <div style="font-size: 24px;">${GameState.stats.level}</div>
                                </div>
                                
                                <div style="text-align: center;">
                                    <div style="color: var(--secondary);">EXP DIARIA</div>
                                    <div style="font-size: 24px;">${GameState.stats.dailyExp}</div>
                                </div>
                            </div>
                            
                            <div style="margin-top: 30px; text-align: center;">
                                <div style="color: var(--warning); font-size: 12px; margin-top: 10px;">
                                    Racha actual: ${GameState.stats.dailyStreak} días
                                </div>
                                ${GameState.stats.dailyStreak >= 7 ? 
                                    '<div style="color: var(--primary); font-size: 12px; margin-top: 10px;">🔥 ¡Racha semanal activa!</div>' :
                                    ''}
                            </div>
                        </div>
                    </div>
                `;
            },
            
            // Pantalla de configuración
            renderSettingsScreen: function() {
                return `
                    <div class="game-screen active">
                        <button class="ff-button" onclick="showScreen('start')" style="margin-bottom: 20px;">
                            ← VOLVER
                        </button>
                        
                        <h2 style="color: var(--primary); text-align: center; margin: 30px 0;">CONFIGURACIÓN</h2>
                        
                        <div class="ff-menu">
                            <div style="margin: 20px 0;">
                                <div style="color: var(--primary); margin-bottom: 10px;">VOLUMEN</div>
                                <input type="range" min="0" max="100" value="50" style="width: 100%;">
                            </div>
                            
                            <div style="margin: 20px 0;">
                                <div style="color: var(--primary); margin-bottom: 10px;">VELOCIDAD DE TEXTO</div>
                                <input type="range" min="1" max="10" value="5" style="width: 100%;">
                            </div>
                            
                            <div style="margin: 20px 0;">
                                <div style="color: var(--primary); margin-bottom: 10px;">TAREAS DIARIAS (${GameState.stats.dailyTasksGoal})</div>
                                <input type="range" min="3" max="10" value="${GameState.stats.dailyTasksGoal}" 
                                       onchange="changeDailyGoal(this.value)" style="width: 100%;">
                                <div style="color: #aaa; font-size: 10px; text-align: center; margin-top: 5px;">
                                    Ajusta cuántas tareas necesitas completar cada día
                                </div>
                            </div>
                            
                            <button class="ff-button" onclick="resetGame()" 
                                    style="width: 100%; margin-top: 20px; background: linear-gradient(145deg, var(--danger), #cc4a4a);">
                                🔄 REINICIAR JUEGO
                            </button>
                            
                            <div style="margin-top: 30px; padding: 15px; background: rgba(255, 209, 102, 0.1); border-radius: 10px; border: 2px solid var(--warning);">
                                <p style="color: var(--warning); margin: 0; font-size: 11px; text-align: center;">
                                    💡 El progreso se guarda automáticamente
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            }
        };

        // ==================== FUNCIONES GLOBALES ====================
        window.showScreen = function(screen, data) {
            RenderEngine.showScreen(screen, data);
        };
        
        window.selectCharacter = function(characterId) {
            if (GameState.selectCharacter(characterId)) {
                RenderEngine.showScreen('characters');
            }
        };
        
        window.startAdventure = function() {
            if (!GameState.character) {
                PathSystem.showClassNotification('Selecciona un personaje primero', '❌');
                return;
            }
            
            GameState.save();
            RenderEngine.showScreen('world');
            PathSystem.showClassNotification(`¡Bienvenido, ${GameState.character.name}! Completa 5 tareas hoy.`, '🚀');
        };
        
        window.loadGame = function() {
            GameState.init();
            if (GameState.character) {
                GameState.generateDailyMissions();
                RenderEngine.showScreen('world');
                PathSystem.showClassNotification(`¡Bienvenido de nuevo, ${GameState.character.name}!`, '👋');
            } else {
                RenderEngine.showScreen('start');
            }
        };
        
        window.enterRegion = function(regionId) {
            RenderEngine.showScreen('region', regionId);
        };
        
        window.startDailyTask = function(missionIndex) {
            if (GameState.startDailyTask(missionIndex)) {
                GameState.showTaskPopup(GameState.currentTask);
            }
        };
        
        window.startRegionTask = function(regionId, missionIndex) {
            if (GameState.startRegionTask(regionId, missionIndex)) {
                GameState.showTaskPopup(GameState.currentTask);
            }
        };
        
        window.saveTaskInput = function(value) {
            GameState.saveUserInput(value);
        };
        
        window.finishTask = function() {
            if (GameState.completeTask()) {
                closeTaskPopup();
                if (GameState.currentTask?.type === 'daily') {
                    RenderEngine.showScreen('daily');
                } else if (GameState.currentTask?.type === 'region') {
                    const regionId = GameState.currentTask.regionId;
                    GameState.currentTask = null;
                    RenderEngine.showScreen('region', regionId);
                } else {
                    RenderEngine.showScreen('world');
                }
            }
        };
        
        window.pauseResumeTimer = function() {
            if (GameState.taskTimer) {
                clearInterval(GameState.taskTimer);
                GameState.taskTimer = null;
                PathSystem.showClassNotification('Timer pausado', '⏸️');
            } else {
                GameState.startTimer();
                PathSystem.showClassNotification('Timer reanudado', '▶️');
            }
        };
        
        window.resetTimer = function() {
            if (GameState.currentTask && GameState.currentTask.missionType === 'timer') {
                const time = GameState.currentTask.time || 5;
                GameState.taskTimerSeconds = time * 60;
                
                if (GameState.taskTimer) {
                    clearInterval(GameState.taskTimer);
                    GameState.startTimer();
                }
                
                PathSystem.showClassNotification('Timer reiniciado', '🔄');
            }
        };
        
        window.closeTaskPopup = function() {
            const popup = document.querySelector('.task-popup');
            if (popup) {
                popup.remove();
            }
            
            if (GameState.taskTimer) {
                clearInterval(GameState.taskTimer);
                GameState.taskTimer = null;
            }
            
            GameState.currentTask = null;
        };
        
        window.startCombat = function(regionId) {
            if (GameState.startCombat(regionId)) {
                RenderEngine.showScreen('combat');
                PathSystem.showClassNotification(`¡Combate contra ${GAME_DATA.regions.find(r => r.id === regionId).boss.name}!`, '⚔️');
            }
        };
        
        window.performAttack = function(type) {
            const result = GameState.combatAttack(type);
            
            if (result) {
                const damageDisplay = document.createElement('div');
                damageDisplay.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 50px;
                    color: var(--primary);
                    text-shadow: 0 0 20px var(--primary);
                    animation: fadeIn 0.2s ease, fadeOut 0.5s ease 0.5s forwards;
                    z-index: 1000;
                    pointer-events: none;
                `;
                damageDisplay.textContent = `-${result.damage}`;
                document.body.appendChild(damageDisplay);
                
                setTimeout(() => damageDisplay.remove(), 700);
                
                if (result.victory) {
                    setTimeout(() => {
                        PathSystem.showClassNotification('¡Jefe derrotado!', '🏆');
                        RenderEngine.showScreen('world');
                    }, 1000);
                } else {
                    setTimeout(() => {
                        const enemyTurn = GameState.enemyTurn();
                        if (enemyTurn) {
                            RenderEngine.showScreen('combat');
                            
                            if (GameState.currentCombat && GameState.currentCombat.playerHp <= 0) {
                                setTimeout(() => {
                                    PathSystem.showClassNotification('¡Has sido derrotado!', '💀');
                                    GameState.currentCombat = null;
                                    RenderEngine.showScreen('world');
                                }, 1000);
                            }
                        }
                    }, 1000);
                }
            }
        };
        
        window.fleeCombat = function() {
            if (confirm('¿Huir del combate? Perderás 10% de tu EXP.')) {
                GameState.stats.exp = Math.max(0, Math.floor(GameState.stats.exp * 0.9));
                GameState.currentCombat = null;
                PathSystem.showClassNotification('Has huido. -10% EXP', '🏃');
                RenderEngine.showScreen('world');
            }
        };
        
        window.restAction = function() {
            const result = GameState.rest();
            PathSystem.showClassNotification(`Descansado: +${result.hp} HP, +${result.mp} MP`, '💤');
            RenderEngine.showScreen('rest');
        };
        
        window.changeDailyGoal = function(newGoal) {
            const goal = parseInt(newGoal);
            if (goal >= 3 && goal <= 10) {
                GameState.stats.dailyTasksGoal = goal;
                GameState.save();
                PathSystem.showClassNotification(`Meta diaria cambiada a ${goal} tareas`, '🎯');
                RenderEngine.showScreen('settings');
            }
        };
        
        window.resetGame = function() {
            if (GameState.reset()) {
                RenderEngine.showScreen('start');
            }
        };

        // ==================== INICIALIZACIÓN ====================
        window.onload = function() {
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
        };
