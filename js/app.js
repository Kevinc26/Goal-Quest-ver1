// ==================== GOALQUEST - APP.JS ====================
// Versión: 2.3 - CORREGIDO (PowerFeedback protegido)
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

// ==================== ASSETS ====================
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

function asset(relPath) {
    return relPath;
}

// ==================== POWER FEEDBACK (VERSIÓN MÍNIMA) ====================
const PowerFeedback = {
    showMessage(text, color) {
        console.log("💬", text);
    },
    flash(color) {
        console.log("✨ Flash");
    },
    onTaskComplete() {},
    onLevelUp() {},
    onDayComplete() {},
    onCombatStart() {},
    onVictory() {}
};

// ==================== GAMESTATE ====================
const GameState = {
    character: null,
    stats: {
        hp: 100, mp: 100, exp: 0, level: 1, maxHp: 100, maxMp: 100, nextLevelExp: 100,
        dailyExp: 0, dailyStreak: 0, dailyTasksCompleted: 0, dailyTasksGoal: 5,
        lastRegionMissionDate: null, lastCompletedRegionDay: null,
        totalTasksCompleted: 0, daysCompleted: 0
    },
    unlockedRegions: [1],
    completedMissions: {},
    defeatedBosses: [],
    completedRegions: {},
    dailyMissionsState: { lastGeneratedDate: null, availableMissions: [], completedDailyMissions: [] },
    lastPlayedDate: null,
    todayCompleted: false,
    currentScreen: 'start',
    currentRegion: null,
    currentCombat: null,
    currentTask: null,
    taskTimer: null,
    taskTimerSeconds: 0,
    achievements: {},

    selectCharacter(id) {
        const c = GAME_DATA.characters.find(x => x.id === id);
        if (c) { this.character = c; this.save(); console.log(`Has elegido el ${c.name}`); return true; }
        return false;
    },
    
    init() {
        console.log("🎮 Inicializando GameState...");
        this.load();
        this.checkDailyReset();
        this.generateDailyMissions();
        
        console.log("✅ GameState listo");
        
        // ========== INICIAR ONBOARDING ==========
        if (typeof OnboardingSystem !== 'undefined' && !this.character && !OnboardingSystem.hasSeenOnboarding()) {
            console.log("🆕 Mostrando onboarding...");
            setTimeout(() => {
                OnboardingSystem.init();
            }, 100);
        } else {
            console.log("🔁 Onboarding ya visto o personaje existe");
        }
        // ========================================
    },
    
    load() {
        const s = localStorage.getItem('goalquest_save');
        if (s) {
            try {
                const d = JSON.parse(s);
                this.character = d.character;
                this.stats = { ...this.stats, ...d.stats };
                this.unlockedRegions = d.unlockedRegions || [1];
                this.completedMissions = d.completedMissions || {};
                this.defeatedBosses = d.defeatedBosses || [];
                this.completedRegions = d.completedRegions || {};
                this.lastPlayedDate = d.lastPlayedDate;
                this.todayCompleted = d.todayCompleted || false;
                this.dailyMissionsState = d.dailyMissionsState || { lastGeneratedDate: null, availableMissions: [], completedDailyMissions: [] };
                this.achievements = d.achievements || {};
            } catch (e) { console.error('Error cargando:', e); }
        }
    },
    
    save() {
        localStorage.setItem('goalquest_save', JSON.stringify({
            character: this.character, stats: this.stats, unlockedRegions: this.unlockedRegions,
            completedMissions: this.completedMissions, defeatedBosses: this.defeatedBosses,
            completedRegions: this.completedRegions, lastPlayedDate: this.lastPlayedDate,
            todayCompleted: this.todayCompleted, dailyMissionsState: this.dailyMissionsState,
            achievements: this.achievements, saveDate: new Date().toISOString()
        }));
    },
    
    generateDailyMissions() {
        const t = new Date().toDateString();
        if (this.dailyMissionsState.lastGeneratedDate !== t) {
            this.dailyMissionsState.lastGeneratedDate = t;
            this.dailyMissionsState.completedDailyMissions = [];
            this.dailyMissionsState.availableMissions = [];
            const all = [];
            GAME_DATA.dailyMissions.categories.forEach(c => c.missions.forEach(m => all.push({ ...m, category: c.name, categoryColor: c.color, id: `${c.name}_${Date.now()}_${Math.random().toString(36).substr(2,9)}` })));
            const shuffled = [...all].sort(() => Math.random() - 0.5);
            const selected = []; const used = new Set();
            for (const m of shuffled) { if (selected.length >= 5) break; if (!used.has(m.text)) { selected.push(m); used.add(m.text); } }
            while (selected.length < 5 && selected.length < all.length) { const r = shuffled.find(m => !selected.some(s => s.text === m.text)); if (r) selected.push(r); else break; }
            this.dailyMissionsState.availableMissions = selected;
            this.save();
        }
    },
    
    checkDailyReset() {
        const t = new Date().toDateString();
        if (this.lastPlayedDate !== t) {
            this.todayCompleted = false;
            this.stats.dailyTasksCompleted = 0;
            this.stats.dailyExp = 0;
            this.stats.lastRegionMissionDate = null;
            this.stats.lastCompletedRegionDay = null;
            if (this.lastPlayedDate) {
                const diff = Math.floor((new Date(t) - new Date(this.lastPlayedDate)) / (1000 * 60 * 60 * 24));
                if (diff === 1) { this.stats.dailyStreak++; console.log(`🔥 Racha: ${this.stats.dailyStreak} días`); }
                else if (diff > 1) { this.stats.dailyStreak = 0; console.log('Racha reiniciada'); }
            }
            this.lastPlayedDate = t;
            this.save();
        }
    },
    
    hasSeenOnboarding() {
        return localStorage.getItem('goalquest_onboarding_seen') === 'true';
    }
};

// ==================== RENDER ENGINE MÍNIMO ====================
const RenderEngine = {
    showScreen(screen) {
        console.log("📺 Mostrando pantalla:", screen);
        document.getElementById('game-container').innerHTML = `<div style="color: white; padding: 20px;">Pantalla: ${screen}</div>`;
    }
};

window.showScreen = (s) => RenderEngine.showScreen(s);
window.GameState = GameState;
window.RenderEngine = RenderEngine;

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 DOM cargado, iniciando...");
    setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        if (ls) {
            ls.style.opacity = '0';
            setTimeout(() => {
                ls.style.display = 'none';
                GameState.init();
                if (!GameState.hasSeenOnboarding() && !GameState.character) {
                    console.log("👋 Mostrando onboarding...");
                } else {
                    RenderEngine.showScreen('start');
                }
            }, 300);
        }
    }, 1500);
});
