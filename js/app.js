// ==================== GOALQUEST - APP.JS ====================
// Versión: 2.2 - CON ONBOARDING + LOGROS + MÓDULO DE PODER
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

// ==================== SISTEMA DE LOGROS ====================
const AchievementSystem = {
    achievements: [
        { id: 'first_task', name: '🌅 El Primer Paso', description: 'Completa tu primera tarea.', icon: '🌅', color: '#4dff91', condition: (state) => state.stats.totalTasksCompleted >= 1, onUnlock: () => PowerFeedback.showMessage('Tu viaje comienza ahora.', 'var(--primary)') },
        { id: 'task_10', name: '⚡ Diez Pasos', description: 'Completa 10 tareas.', icon: '⚡', color: '#6c63ff', condition: (state) => state.stats.totalTasksCompleted >= 10, onUnlock: () => PowerFeedback.showMessage('La constancia es tu arma.', 'var(--secondary)') },
        { id: 'task_50', name: '🔥 Cincuenta Batallas', description: 'Completa 50 tareas.', icon: '🔥', color: '#ff6b6b', condition: (state) => state.stats.totalTasksCompleted >= 50, onUnlock: () => PowerFeedback.showMessage('Ya nada te detiene.', 'var(--danger)') },
        { id: 'task_100', name: '👑 Leyenda Viva', description: 'Completa 100 tareas.', icon: '👑', color: '#ffd700', condition: (state) => state.stats.totalTasksCompleted >= 100, onUnlock: () => PowerFeedback.showMessage('Tu nombre será recordado.', 'var(--gold)') },
        { id: 'streak_7', name: '🔥 Racha Semanal', description: 'Mantén una racha de 7 días.', icon: '🔥', color: '#ffd166', condition: (state) => state.stats.dailyStreak >= 7, onUnlock: () => PowerFeedback.showMessage('Siete días. Siete victorias.', 'var(--warning)') },
        { id: 'streak_30', name: '🌋 Racha Legendaria', description: 'Mantén una racha de 30 días.', icon: '🌋', color: '#ffd700', condition: (state) => state.stats.dailyStreak >= 30, onUnlock: () => PowerFeedback.showMessage('Treinta días. Un hábito. Una leyenda.', 'var(--gold)') },
        { id: 'first_region', name: '🗺️ Explorador', description: 'Completa tu primera región.', icon: '🗺️', color: '#4ecdc4', condition: (state) => Object.keys(state.completedRegions || {}).length >= 1, onUnlock: () => PowerFeedback.showMessage('Un mundo se abre ante ti.', 'var(--info)') },
        { id: 'all_regions', name: '🌍 Conquistador', description: 'Completa todas las regiones.', icon: '🌍', color: '#ffd700', condition: (state) => Object.keys(state.completedRegions || {}).length >= 8, onUnlock: () => PowerFeedback.showMessage('Has conquistado tu mundo interior.', 'var(--gold)') },
        { id: 'first_boss', name: '⚔️ Cazador de Dragones', description: 'Derrota a tu primer jefe.', icon: '⚔️', color: '#ff6b6b', condition: (state) => (state.defeatedBosses?.length || 0) >= 1, onUnlock: () => PowerFeedback.showMessage('El primer monstruo cae. Tu confianza crece.', 'var(--danger)') },
        { id: 'all_bosses', name: '👹 Matadragones', description: 'Derrota a todos los jefes.', icon: '👹', color: '#ffd700', condition: (state) => (state.defeatedBosses?.length || 0) >= 8, onUnlock: () => PowerFeedback.showMessage('No quedan monstruos. Solo tú.', 'var(--gold)') },
        { id: 'level_5', name: '⭐ Guerrero', description: 'Alcanza el nivel 5.', icon: '⭐', color: '#6c63ff', condition: (state) => state.stats.level >= 5, onUnlock: () => PowerFeedback.showMessage('Tu poder comienza a manifestarse.', 'var(--secondary)') },
        { id: 'level_10', name: '🌟 Veterano', description: 'Alcanza el nivel 10.', icon: '🌟', color: '#ffd166', condition: (state) => state.stats.level >= 10, onUnlock: () => PowerFeedback.showMessage('Ya no eres el mismo que empezó.', 'var(--warning)') },
        { id: 'level_25', name: '✨ Maestro', description: 'Alcanza el nivel 25.', icon: '✨', color: '#ffd700', condition: (state) => state.stats.level >= 25, onUnlock: () => PowerFeedback.showMessage('La maestría es silenciosa. Tú la alcanzaste.', 'var(--gold)') },
        { id: 'first_complete_day', name: '🏆 Día Perfecto', description: 'Completa todas tus tareas diarias por primera vez.', icon: '🏆', color: '#ffd700', condition: (state) => state.stats.daysCompleted >= 1, onUnlock: () => PowerFeedback.showMessage('Hoy venciste. Mañana también.', 'var(--gold)') },
        { id: 'complete_7_days', name: '📅 Semana Perfecta', description: 'Completa 7 días de tareas.', icon: '📅', color: '#ffd700', condition: (state) => state.stats.daysCompleted >= 7, onUnlock: () => PowerFeedback.showMessage('Una semana impecable. Eres imparable.', 'var(--gold)') }
    ],

    check(state) {
        let unlocked = [];
        if (!state.achievements) state.achievements = {};
        this.achievements.forEach(achievement => {
            if (!state.achievements[achievement.id] && achievement.condition(state)) {
                this.unlock(state, achievement);
                unlocked.push(achievement);
            }
        });
        return unlocked;
    },

    unlock(state, achievement) {
        state.achievements[achievement.id] = { unlocked: true, unlockedAt: new Date().toISOString() };
        const expBonus = 50;
        state.stats.exp += expBonus;
        this.showNotification(achievement);
        if (achievement.onUnlock) achievement.onUnlock();
        PowerFeedback.flash('rgba(255, 215, 0, 0.5)');
    },

    showNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'notification achievement';
        notification.style.background = 'linear-gradient(145deg, #1a1a2e, #0f0f1f)';
        notification.style.borderLeft = `8px solid ${achievement.color}`;
        notification.style.boxShadow = `0 0 30px ${achievement.color}`;
        notification.style.padding = '20px';
        notification.style.maxWidth = '350px';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 48px;">${achievement.icon}</div>
                <div style="flex: 1;">
                    <div style="color: ${achievement.color}; font-size: 10px; margin-bottom: 5px; letter-spacing: 2px;">🏆 LOGRO DESBLOQUEADO</div>
                    <div style="color: white; font-size: 14px; font-weight: bold; margin-bottom: 5px;">${achievement.name}</div>
                    <div style="color: #aaa; font-size: 11px;">${achievement.description}</div>
                    <div style="color: ${achievement.color}; font-size: 11px; margin-top: 8px;">+50 EXP</div>
                </div>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => { notification.style.animation = 'slideOut 0.5s ease forwards'; setTimeout(() => notification.remove(), 500); }, 5000);
    },

    getProgress(state, achievementId) {
        if (achievementId === 'task_10') return Math.min(state.stats.totalTasksCompleted || 0, 10);
        if (achievementId === 'task_50') return Math.min(state.stats.totalTasksCompleted || 0, 50);
        if (achievementId === 'task_100') return Math.min(state.stats.totalTasksCompleted || 0, 100);
        if (achievementId === 'streak_7') return Math.min(state.stats.dailyStreak || 0, 7);
        if (achievementId === 'streak_30') return Math.min(state.stats.dailyStreak || 0, 30);
        if (achievementId === 'level_5') return Math.min(state.stats.level || 0, 5);
        if (achievementId === 'level_10') return Math.min(state.stats.level || 0, 10);
        if (achievementId === 'level_25') return Math.min(state.stats.level || 0, 25);
        if (achievementId === 'first_region') return Object.keys(state.completedRegions || {}).length >= 1 ? 1 : 0;
        if (achievementId === 'all_regions') return Object.keys(state.completedRegions || {}).length;
        if (achievementId === 'first_boss') return (state.defeatedBosses?.length || 0) >= 1 ? 1 : 0;
        if (achievementId === 'all_bosses') return state.defeatedBosses?.length || 0;
        if (achievementId === 'first_complete_day') return state.stats.daysCompleted || 0;
        if (achievementId === 'complete_7_days') return Math.min(state.stats.daysCompleted || 0, 7);
        return 0;
    },

    renderScreen() {
        const state = GameState;
        const total = this.achievements.length;
        const unlocked = Object.keys(state.achievements || {}).length;
        return `
            <div class="game-screen active">
                <button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom: 20px;">← VOLVER AL MAPA</button>
                <div style="display: flex; align-items: center; gap: 30px; margin-bottom: 40px; width: 100%; max-width: 1000px;">
                    <div style="font-size: 80px; color: var(--gold); text-shadow: 0 0 30px var(--gold);">🏆</div>
                    <div>
                        <h2 style="color: var(--gold); font-size: 28px; margin-bottom: 10px;">SALÓN DE LA FAMA</h2>
                        <p style="color: #aaa; font-size: 14px;">Has desbloqueado <span style="color: var(--gold); font-weight: bold;">${unlocked}</span> de <span style="color: var(--gold);">${total}</span> logros</p>
                        <div style="width: 300px; height: 8px; background: rgba(255,215,0,0.2); margin-top: 15px; border: 1px solid var(--gold);"><div style="width: ${(unlocked/total)*100}%; height: 100%; background: var(--gold);"></div></div>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 25px; width: 100%; max-width: 1200px;">
                    ${this.achievements.map(ach => {
                        const isUnlocked = state.achievements?.[ach.id]?.unlocked;
                        const progress = this.getProgress(state, ach.id);
                        const maxProgress = { 'task_10':10, 'task_50':50, 'task_100':100, 'streak_7':7, 'streak_30':30, 'level_5':5, 'level_10':10, 'level_25':25, 'all_regions':8, 'all_bosses':8, 'complete_7_days':7 }[ach.id] || 1;
                        const progressPercent = Math.min(100, (progress / maxProgress) * 100);
                        return `
                            <div style="background: ${isUnlocked ? 'rgba(255,215,0,0.1)' : 'rgba(26,26,46,0.95)'}; border: 2px solid ${isUnlocked ? ach.color : '#3a3a5a'}; padding: 20px; display: flex; gap: 20px; box-shadow: ${isUnlocked ? `0 0 30px ${ach.color}20` : 'none'};">
                                <div style="font-size: 48px; filter: ${isUnlocked ? 'none' : 'grayscale(0.8)'}; opacity: ${isUnlocked ? 1 : 0.5};">${ach.icon}</div>
                                <div style="flex:1;">
                                    <div style="color: ${isUnlocked ? ach.color : '#aaa'}; font-size: 12px; font-weight: bold; margin-bottom: 8px;">${ach.name}</div>
                                    <div style="color: ${isUnlocked ? '#fff' : '#888'}; font-size: 11px; margin-bottom: 12px;">${ach.description}</div>
                                    ${!isUnlocked ? `
                                        <div style="margin-top:10px;">
                                            <div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span style="color:#aaa; font-size:9px;">PROGRESO</span><span style="color:${ach.color}; font-size:9px;">${progress}/${maxProgress}</span></div>
                                            <div style="width:100%; height:6px; background:rgba(0,0,0,0.5); border:1px solid #3a3a5a;"><div style="width:${progressPercent}%; height:100%; background:${ach.color};"></div></div>
                                        </div>
                                    ` : '<div style="color:var(--primary); font-size:10px; margin-top:10px;">✓ DESBLOQUEADO</div>'}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div style="text-align: center; margin-top: 40px;"><button class="ff-button" onclick="window.showScreen('world')" style="background: var(--gold); border-bottom-color: #b8860b;"><i class="fas fa-map"></i> CONTINUAR AVENTURA</button></div>
            </div>
        `;
    }
};

// ==================== MÓDULO DE PODER ====================
const ParticleSystem = {
    container: null, isActive: false,
    init() { if (!document.querySelector('.particle-container')) { this.container = document.createElement('div'); this.container.className = 'particle-container'; document.body.appendChild(this.container); } },
    start() { if (this.isActive) return; this.isActive = true; this.init(); this.generateParticles(30); },
    stop() { this.isActive = false; if (this.container) this.container.innerHTML = ''; },
    generateParticles(count) {
        if (!this.container) return;
        this.container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 5 + 's';
            p.style.animationDuration = Math.floor(Math.random() * 10) + 10 + 's';
            this.container.appendChild(p);
        }
    }
};

const PowerMessages = {
    daily: ["✨ Ya comenzaste a cambiar.", "⚡ Hoy fuiste más fuerte que tu miedo.", "🌟 La fortuna sonríe a los valientes.", "🌅 Tu progreso transforma el mundo.", "🔥 Cada paso te acerca a tu leyenda."],
    region: ["🗡️ El caos se ordena ante tu voluntad.", "🛡️ Tu identidad se forja con cada decisión.", "🏹 Las distracciones caen, el enfoque reina.", "❤️ Te estás convirtiendo en quien elegiste ser.", "⚔️ No fue el monstruo. Fue tu límite. Y lo superaste."],
    levelUp: ["⭐ Tu poder trasciende lo imaginado.", "👑 El mundo ahora te reconoce.", "🌠 Eres más de lo que fuiste ayer.", "✨ La leyenda continúa creciendo.", "💥 Tu potencial no tiene techo."],
    dayComplete: ["🏆 Hoy conquistaste tu mundo.", "🌙 El día terminó, pero tu poder permanece.", "🎯 Mañana, nuevos desafíos. Hoy, celebra.", "🔥 Esta es tu racha. Esta es tu historia.", "💪 No solo cumpliste tareas. Construiste destino."],
    firstTask: ["🌅 El primer paso. El más importante.", "⚡ Tu viaje comienza ahora.", "✨ Algo grande está por venir.", "🔥 Despertaste al guerrero interior.", "💫 La energía fluye a través de ti."],
    combat: ["⚔️ Hoy enfrentas tu miedo.", "🛡️ El dragón no es tu enemigo. Tu duda lo es.", "🔥 Respira. El poder está en ti.", "🌪️ El caos se rinde ante la voluntad férrea.", "💥 Un desafío digno de tu crecimiento."],
    victory: ["👑 No fue el monstruo. Fue tu límite. Y lo superaste.", "✨ Has demostrado de qué estás hecho.", "🏆 El jefe cayó. Tu confianza asciende.", "🌠 Un enemigo menos. Una lección más.", "⚡ El mundo se vuelve más claro contigo."],
    achievement: ["🏆 Tu nombre quedará grabado.", "✨ Has hecho historia.", "🔥 Un logro más en tu leyenda.", "⭐ Tu esfuerzo tiene recompensa."]
};

const PowerFeedback = {
    showMessage(text, color = 'var(--primary)') {
        const m = document.createElement('div');
        m.className = 'power-message';
        m.style.color = color;
        m.style.borderColor = color;
        m.textContent = text;
        document.body.appendChild(m);
        setTimeout(() => m.remove(), 3000);
    },
    flash(color = 'rgba(77,255,145,0.3)') {
        const o = document.createElement('div');
        o.className = 'power-flash-overlay';
        o.style.background = `radial-gradient(circle at center, ${color} 0%, transparent 70%)`;
        document.body.appendChild(o);
        setTimeout(() => o.remove(), 1500);
    },
    onTaskComplete(type, isFirst = false) {
        if (isFirst) {
            const msg = PowerMessages.firstTask[Math.floor(Math.random() * PowerMessages.firstTask.length)];
            this.showMessage(msg, 'var(--warning)');
            this.flash('rgba(255,209,102,0.4)');
            try {
                const ctx = new (AudioContext || webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = 659.25;
                gain.gain.value = 0.1;
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            } catch (e) {}
        } else if (type === 'daily') {
            this.showMessage(PowerMessages.daily[Math.floor(Math.random() * PowerMessages.daily.length)], 'var(--primary)');
            this.flash();
        } else if (type === 'region') {
            this.showMessage(PowerMessages.region[Math.floor(Math.random() * PowerMessages.region.length)], 'var(--secondary)');
            this.flash('rgba(108,99,255,0.3)');
        }
    },
    onLevelUp() {
        this.showMessage(PowerMessages.levelUp[Math.floor(Math.random() * PowerMessages.levelUp.length)], 'var(--warning)');
        this.flash('rgba(255,215,0,0.4)');
    },
    onDayComplete() {
        this.showMessage(PowerMessages.dayComplete[Math.floor(Math.random() * PowerMessages.dayComplete.length)], 'var(--gold)');
        this.flash('rgba(255,215,0,0.5)');
        document.body.classList.add('world-state-completed');
        setTimeout(() => document.body.classList.remove('world-state-completed'), 5000);
    },
    onCombatStart() {
        this.showMessage(PowerMessages.combat[Math.floor(Math.random() * PowerMessages.combat.length)], 'var(--danger)');
        this.flash('rgba(255,107,107,0.3)');
    },
    onVictory() {
        this.showMessage(PowerMessages.victory[Math.floor(Math.random() * PowerMessages.victory.length)], 'var(--warning)');
        this.flash('rgba(255,215,0,0.5)');
    }
};

const WorldTransformer = {
    updateState(tasksCompleted) {
        const b = document.body;
        for (let i = 0; i <= 5; i++) b.classList.remove(`world-state-${i}`);
        b.classList.remove('world-state-completed');
        if (tasksCompleted >= GameState.stats.dailyTasksGoal) b.classList.add('world-state-completed');
        else b.classList.add(`world-state-${tasksCompleted}`);
    },
    energizeTitle() {
        const t = document.querySelector('.game-title');
        if (t && !t.classList.contains('energized')) t.classList.add('energized');
    }
};

// ==================== SISTEMA DE CAMINOS POR CLASE ====================
const CLASS_PATHS = {
    clarity: { name: "CAMINO DE LA CLARIDAD", description: "Domina el caos mental con precisión arcana",
        regionThemes: { 1: "DESCARGA MENTAL PROFUNDA", 2: "IDENTIDAD BASADA EN CLARIDAD", 3: "ELIMINAR RUIDO COGNITIVO", 4: "ENERGÍA MENTAL Y DESCANSO", 5: "RACHAS DE DECISIÓN RÁPIDA", 6: "SOLTAR CONTROL INTELECTUAL", 7: "CREAR IDEAS IMPERFECTAS", 8: "ACTUAR SIN ENTENDER TODO" },
        missionOverrides: {
            1: ["Escribir pensamientos confusos que nublan tu mente", "Clasificar tareas por claridad mental requerida", "Eliminar patrones de pensamiento repetitivos", "Meditar 10 minutos para aclarar la mente", "Crear lista de decisiones pendientes", "Limpiar espacio mental con respiración consciente", "Planificar con claridad, no con ansiedad"],
            2: ["Definir quién eres cuando piensas con claridad", "Listar acciones desde la perspectiva clara", "Visualizar éxitos con detalle nítido", "Crear afirmación diaria de claridad mental", "Actuar con decisión clara", "Compartir insights mentales claros", "Celebrar momentos de absoluta claridad"],
            3: ["Organizar espacio para pensamiento claro", "Eliminar objetos que distraen tu mente", "Limpiar información digital innecesaria", "Definir límites cognitivos", "Crear ritual matutino de claridad", "Programar descansos mentales", "Evaluar relaciones por claridad que aportan"]
        },
        motivationalMessages: ["La claridad llega cuando el ruido mental cesa.", "Cada pensamiento claro es un paso hacia el dominio.", "La mente clara ve oportunidades donde otros ven caos.", "Tu claridad mental es tu arma más poderosa.", "En la claridad encuentras las respuestas que buscas."] },
    discipline: { name: "CAMINO DE LA DISCIPLINA", description: "Forja hábitos con armadura inquebrantable",
        regionThemes: { 1: "COMPROMISOS ROTOS", 2: "IDENTIDAD = CUMPLIR", 3: "ENTORNO RÍGIDO", 4: "ENERGÍA COMO DEBER", 5: "RACHAS VISIBLES", 6: "CASTIGOS CLAROS", 7: "CONSTRUCCIÓN CONSTANTE", 8: "AVANZAR SIN MOTIVACIÓN" },
        missionOverrides: {
            1: ["Escribir compromisos incumplidos contigo mismo", "Clasificar tareas por nivel de compromiso", "Eliminar excusas y justificaciones", "Meditar 10 minutos con postura militar", "Crear lista de reglas personales", "Limpiar espacio de disciplina", "Planificar con rigurosidad militar"],
            2: ["Definir identidad como persona de palabra", "Listar acciones que demuestren disciplina", "Visualizar éxito a través de constancia", "Crear código de honor diario", "Actuar con rigor militar", "Compartir logros de disciplina", "Celebrar victorias de voluntad"],
            3: ["Organizar espacio con precisión militar", "Eliminar objetos que fomentan la pereza", "Limpiar distracciones digitales estrictamente", "Definir fronteras de compromiso", "Crear ritual matutino espartano", "Programar entrenamientos diarios", "Evaluar relaciones por disciplina compartida"]
        },
        motivationalMessages: ["La disciplina es el puente entre metas y logros.", "Cada acto de disciplina fortalece tu voluntad.", "El hábito vence a la inspiración cada día.", "Tu armadura de disciplina te protege de las tentaciones.", "La consistencia es la verdadera medida del carácter."] },
    energy: { name: "CAMINO DE LA ENERGÍA", description: "Restaura tu energía con sanación divina",
        regionThemes: { 1: "DESCARGA EMOCIONAL", 2: "IDENTIDAD = CUIDARME", 3: "LÍMITES SOCIALES", 4: "ENERGÍA COMO NÚCLEO", 5: "RACHAS SUAVES", 6: "RIESGO: DEJAR DE AYUDAR", 7: "CREAR PARA MÍ", 8: "ELEGIRME SIN CULPA" },
        missionOverrides: {
            1: ["Escribir emociones que te drenan energía", "Clasificar tareas por nivel energético requerido", "Eliminar relaciones tóxicas que consumen", "Meditar 10 minutos para recargar", "Crear lista de fuentes de energía", "Limpiar espacio energético", "Planificar según tus ritmos naturales"],
            2: ["Definir identidad como cuidador de ti mismo", "Listar acciones que te recargan", "Visualizar éxito con energía plena", "Crear afirmación diaria de autocuidado", "Actuar desde la energía renovada", "Compartir energía positiva", "Celebrar momentos de plenitud"],
            3: ["Organizar espacio para fluir energía", "Eliminar objetos con energía estancada", "Limpiar espacios digitales negativos", "Definir límites energéticos", "Crear ritual matutino de recarga", "Programar pausas energéticas", "Evaluar relaciones por energía que aportan"]
        },
        motivationalMessages: ["Tu energía es sagrada, protégete.", "Cada acto de autocuidado es una semilla de crecimiento.", "Cuando te nutres a ti mismo, puedes nutrir al mundo.", "La energía positiva atrae más energía positiva.", "Escucha a tu cuerpo, él sabe lo que necesita."] },
    resilience: { name: "CAMINO DE LA RESILIENCIA", description: "Aguanta la presión con defensas inquebrantables",
        regionThemes: { 1: "CARGAS INVISIBLES", 2: "IDENTIDAD ≠ AGUANTAR", 3: "ELIMINAR SOBRECARGA", 4: "DESCANSO OBLIGATORIO", 5: "RACHAS DE AUTOCUIDADO", 6: "RIESGO: PEDIR AYUDA", 7: "EXPRESAR", 8: "SOLTAR CONTROL" },
        missionOverrides: {
            1: ["Escribir cargas emocionales que aguantas", "Clasificar tareas por nivel de resistencia", "Eliminar responsabilidades innecesarias", "Meditar 10 minutos para soltar peso", "Crear lista de límites saludables", "Limpiar espacio de sobrecarga", "Planificar con márgenes de seguridad"],
            2: ["Definir identidad como resiliente, no como mártir", "Listar acciones que fortalecen sin dañar", "Visualizar éxito con equilibrio", "Crear afirmación diaria de resistencia sana", "Actuar con firmeza, no con rigidez", "Compartir aprendizajes de resiliencia", "Celebrar capacidad de recuperación"],
            3: ["Organizar espacio para resistir sin romper", "Eliminar objetos que simbolizan carga", "Limpiar compromisos digitales excesivos", "Definir fronteras de responsabilidad", "Crear ritual matutino de estabilidad", "Programar tiempos de descarga", "Evaluar relaciones por apoyo mutuo"]
        },
        motivationalMessages: ["La verdadera fuerza está en saber cuándo descansar.", "Ser resiliente no significa aguantarlo todo.", "Cada límite sano es un acto de autoamor.", "Tu capacidad de recuperación es tu superpoder.", "A veces soltar es más valiente que aguantar."] },
    focus: { name: "CAMINO DEL ENFOQUE", description: "Elimina distracciones con puntería letal",
        regionThemes: { 1: "ELIMINAR FRENTES ABIERTOS", 2: "UNA COSA BIEN HECHA", 3: "MINIMALISMO", 4: "ENERGÍA DIRIGIDA", 5: "RACHAS ESPECÍFICAS", 6: "RIESGO: RENUNCIAR", 7: "DOMINAR UNA HABILIDAD", 8: "EJECUTAR SIN DUDAR" },
        missionOverrides: {
            1: ["Escribir distracciones que dispersan tu atención", "Clasificar tareas por prioridad de enfoque", "Eliminar proyectos paralelos innecesarios", "Meditar 10 minutos para enfocar la mente", "Crear lista de objetivos únicos", "Limpiar espacio de elementos distractores", "Planificar con precisión quirúrgica"],
            2: ["Definir identidad como especialista, no generalista", "Listar acciones con enfoque láser", "Visualizar éxito en un área específica", "Crear afirmación diaria de concentración", "Actuar con atención total", "Compartir logros de enfoque profundo", "Celebrar momentos de flujo total"],
            3: ["Organizar espacio para máxima concentración", "Eliminar objetos que dispersan la atención", "Limpiar notificaciones digitales innecesarias", "Definir límites de enfoque", "Crear ritual matutino de concentración", "Programar bloques de atención profunda", "Evaluar relaciones por capacidad de enfoque"]
        },
        motivationalMessages: ["Donde pones tu atención, pones tu energía.", "Un objetivo claro es mitad del camino recorrido.", "La maestría viene de enfocarse, no de dispersarse.", "Tu puntería mental es tu arma más precisa.", "En la profundidad del enfoque está la excelencia."] },
    balance: { name: "CAMINO DEL EQUILIBRIO", description: "Balancea vida con sabiduría espiritual",
        regionThemes: { 1: "ORDENAR VALORES", 2: "IDENTIDAD CON PROPÓSITO", 3: "RITUALES", 4: "CUERPO COMO TEMPLO", 5: "RACHAS PRÁCTICAS", 6: "RIESGO: ACTUAR SIN CERTEZA", 7: "COMPARTIR SABIDURÍA", 8: "VIVIR LO QUE PREDICA" },
        missionOverrides: {
            1: ["Escribir desequilibrios en tu vida actual", "Clasificar tareas por áreas de vida", "Eliminar extremos que rompen el balance", "Meditar 10 minutos para encontrar centro", "Crear lista de pilares equilibrados", "Limpiar espacio para armonía", "Planificar con equilibrio holístico"],
            2: ["Definir identidad como persona integral", "Listar acciones que promueven equilibrio", "Visualizar éxito en todas las áreas", "Crear afirmación diaria de armonía", "Actuar desde el centro, no desde los extremos", "Compartir sabiduría del equilibrio", "Celebrar momentos de perfecta armonía"],
            3: ["Organizar espacio para fluir en equilibrio", "Eliminar objetos que rompen la armonía", "Limpiar desorden digital que desequilibra", "Definir límites para mantener balance", "Crear ritual matutino de centramiento", "Programar tiempos para cada área de vida", "Evaluar relaciones por equilibrio que aportan"]
        },
        motivationalMessages: ["El equilibrio no es estático, es un baile constante.", "En el centro del torbellino está la calma.", "Tu sabiduría interior conoce el camino del medio.", "Cada área de tu vida merece atención amorosa.", "El verdadero poder está en la armonía, no en la fuerza."] },
    agility: { name: "CAMINO DE LA AGILIDAD", description: "Se mueve rápido entre tareas con sigilo",
        regionThemes: { 1: "URGENCIAS FALSAS", 2: "IDENTIDAD CALMADA", 3: "ELIMINAR INTERRUPCIONES", 4: "ENERGÍA ESTABLE", 5: "RACHAS FLEXIBLES", 6: "RIESGO: FRENAR", 7: "CREAR LENTO", 8: "ACCIÓN CONSCIENTE" },
        missionOverrides: {
            1: ["Escribir falsas urgencias que te apresuran", "Clasificar tareas por velocidad óptima", "Eliminar presiones innecesarias", "Meditar 10 minutos para ralentizar", "Crear lista de ritmos naturales", "Limpiar espacio de prisa innecesaria", "Planificar con fluidez, no con presión"],
            2: ["Definir identidad como ágil, no como apurado", "Listar acciones con precisión ninja", "Visualizar éxito con gracia y fluidez", "Crear afirmación diaria de movilidad consciente", "Actuar con sigilo y precisión", "Compartir estrategias de agilidad", "Celebrar movimientos fluidos"],
            3: ["Organizar espacio para moverse libremente", "Eliminar obstáculos que frenan tu flujo", "Limpiar procesos digitales lentos", "Definir límites de velocidad saludable", "Crear ritual matutino de preparación ágil", "Programar transiciones suaves", "Evaluar relaciones por fluidez compartida"]
        },
        motivationalMessages: ["La verdadera agilidad está en la mente, no en la prisa.", "Moverse con gracia es más eficiente que correr.", "Tu sigilo mental te permite avanzar sin resistencia.", "En la fluidez del movimiento está la eficiencia.", "Un ninja sabe cuándo moverse y cuándo quedarse quieto."] },
    transformation: { name: "CAMINO DE LA TRANSFORMACIÓN", description: "Transforma hábitos negativos en positivos",
        regionThemes: { 1: "PATRONES REPETIDOS", 2: "IDENTIDAD EVOLUTIVA", 3: "ENTORNO EXPERIMENTAL", 4: "ENERGÍA COMO RECURSO", 5: "RACHAS DE EXPERIMENTOS", 6: "RIESGO: SOSTENER", 7: "PRODUCTO REAL", 8: "LANZAR IMPERFECTO" },
        missionOverrides: {
            1: ["Escribir patrones que quieres transformar", "Clasificar tareas por potencial de cambio", "Eliminar hábitos que bloquean transformación", "Meditar 10 minutos para visualizar cambio", "Crear lista de experimentos personales", "Limpiar espacio para nueva energía", "Planificar con mentalidad de crecimiento"],
            2: ["Definir identidad como ser en constante evolución", "Listar acciones que catalizan transformación", "Visualizar versiones futuras de ti mismo", "Crear afirmación diaria de metamorfosis", "Actuar como la versión transformada", "Compartir procesos de cambio", "Celebrar cada pequeña transformación"],
            3: ["Organizar espacio como laboratorio personal", "Eliminar objetos que anclan al pasado", "Limpiar rutinas digitales obsoletas", "Definir límites como experimentos", "Crear ritual matutino de reinvención", "Programar momentos de reflexión evolutiva", "Evaluar relaciones por potencial transformador"]
        },
        motivationalMessages: ["La transformación es el arte de reinventarse.", "Cada día es una oportunidad para evolucionar.", "Tu laboratorio interior siempre está experimentando.", "La alquimia personal convierte plomo en oro.", "El cambio constante es la única constante."] }
};

const CLASS_TO_FOCUS = { 1: 'clarity', 2: 'discipline', 3: 'energy', 4: 'resilience', 5: 'focus', 6: 'balance', 7: 'agility', 8: 'transformation' };

const PathSystem = {
    getCurrentFocus() { return GameState.character ? CLASS_TO_FOCUS[GameState.character.id] : null; },
    getCurrentPath() { const f = this.getCurrentFocus(); return f ? CLASS_PATHS[f] : null; },
    getMissionText(r, i) {
        const p = this.getCurrentPath();
        const d = GAME_DATA.regions.find(x => x.id === r)?.missions || [];
        if (p?.missionOverrides?.[r]?.[i]) return p.missionOverrides[r][i];
        return d[i] || `Misión ${i + 1}`;
    },
    getRegionTheme(r) {
        const p = this.getCurrentPath();
        if (p?.regionThemes?.[r]) return p.regionThemes[r];
        return GAME_DATA.regions.find(x => x.id === r)?.name || `Región ${r}`;
    },
    getPathName() { return this.getCurrentPath()?.name || "CAMINO DEL AVENTURERO"; },
    getPathDescription() { return this.getCurrentPath()?.description || "Transforma tu vida a través de la aventura"; },
    getMotivationalMessage() { const p = this.getCurrentPath(); return p?.motivationalMessages?.[Math.floor(Math.random() * p.motivationalMessages.length)] || "¡Sigue adelante, aventurero!"; },
    showClassNotification(m, i = '💡') {
        const c = GameState.character;
        const n = document.createElement('div');
        n.className = 'notification';
        n.style.borderLeftColor = c?.color || 'var(--primary)';
        n.innerHTML = `<div style="font-size:24px;color:${c?.color || 'var(--primary)'}">${i}</div><div style="font-size:12px;"><strong style="color:${c?.color || 'var(--primary)'}">${c?.name || 'Aventurero'}:</strong><br>${m}</div>`;
        document.body.appendChild(n);
        setTimeout(() => { n.style.animation = 'slideIn 0.3s ease reverse'; setTimeout(() => n.remove(), 300); }, 3000);
    }
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
        if (c) { this.character = c; this.save(); PathSystem.showClassNotification(`Has elegido el ${PathSystem.getPathName()}`, '🎮'); return true; }
        return false;
    },
    
    init() {
        this.load();
        this.checkDailyReset();
        this.generateDailyMissions();
        WorldTransformer.updateState(this.stats.dailyTasksCompleted);
        ParticleSystem.init();
        AchievementSystem.check(this);
        
        // ========== INICIAR ONBOARDING SI ES PRIMERA VEZ ==========
        // DESPUÉS (corregido):
        if (typeof OnboardingSystem !== 'undefined' && !this.character && !OnboardingSystem.hasSeon {
            setTimeout(() => {
                OnboardingSystem.init();
            }, 100);
        }
        // ==========================================================
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
                if (this.stats.lastRegionMissionDate === undefined) this.stats.lastRegionMissionDate = null;
                if (this.stats.lastCompletedRegionDay === undefined) this.stats.lastCompletedRegionDay = null;
                if (this.stats.totalTasksCompleted === undefined) this.stats.totalTasksCompleted = 0;
                if (this.stats.daysCompleted === undefined) this.stats.daysCompleted = 0;
                if (this.character) { this.checkDailyReset(); PathSystem.showClassNotification('Partida cargada', '💾'); }
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
    
    getAvailableDailyMissions() { return this.dailyMissionsState.availableMissions.filter(m => !this.dailyMissionsState.completedDailyMissions.includes(m.id)); },
    isDailyMissionCompleted(id) { return this.dailyMissionsState.completedDailyMissions.includes(id); },
    
    completeDailyMission(id) {
        if (!this.isDailyMissionCompleted(id)) {
            this.dailyMissionsState.completedDailyMissions.push(id);
            this.stats.dailyTasksCompleted++;
            this.stats.totalTasksCompleted++;
            
            const isFirst = this.stats.dailyTasksCompleted === 1;
            PowerFeedback.onTaskComplete('daily', isFirst);
            
            this.stats.exp += 25;
            this.stats.dailyExp += 25;
            
            WorldTransformer.updateState(this.stats.dailyTasksCompleted);
            AchievementSystem.check(this);
            
            if (this.isTodayCompleted()) {
                this.todayCompleted = true;
                this.stats.daysCompleted++;
                PowerFeedback.onDayComplete();
                PathSystem.showClassNotification(`¡DÍA COMPLETADO!`, '🏆');
                this.stats.exp += 50;
            } else {
                const r = this.stats.dailyTasksGoal - this.stats.dailyTasksCompleted;
                PathSystem.showClassNotification(`¡Misión completada! ${r} restantes`, '✅');
            }
            
            this.checkLevelUp();
            this.save();
            return true;
        }
        return false;
    },
    
    checkDailyReset() {
        const t = new Date().toDateString();
        if (this.lastPlayedDate !== t) {
            this.todayCompleted = false;
            this.stats.dailyTasksCompleted = 0;
            this.stats.dailyExp = 0;
            this.stats.lastRegionMissionDate = null;
            this.stats.lastCompletedRegionDay = null;
            WorldTransformer.updateState(0);
            if (this.lastPlayedDate) {
                const diff = Math.floor((new Date(t) - new Date(this.lastPlayedDate)) / (1000 * 60 * 60 * 24));
                if (diff === 1) { this.stats.dailyStreak++; PathSystem.showClassNotification(`🔥 Racha: ${this.stats.dailyStreak} días`, '🔥'); }
                else if (diff > 1) { this.stats.dailyStreak = 0; PathSystem.showClassNotification('Racha reiniciada', '🔁'); }
            }
            if (this.lastPlayedDate && this.todayCompleted) { this.stats.exp += 50; this.stats.dailyExp += 50; PathSystem.showClassNotification('¡Bonus diario! +50 EXP', '⭐'); }
            this.lastPlayedDate = t;
            this.save();
        }
    },
    
    canCompleteMoreTasksToday() { return this.stats.dailyTasksCompleted < this.stats.dailyTasksGoal; },
    isTodayCompleted() { return this.stats.dailyTasksCompleted >= this.stats.dailyTasksGoal; },
    hasCompletedRegionMissionToday() { return this.stats.lastRegionMissionDate === new Date().toDateString(); },
    isMissionAvailable(r, i) { const c = this.completedMissions[r] || []; if (c[i]) return false; if (i === 0) return true; return c[i - 1] === true; },
    getNextAvailableMission(r) { const c = this.completedMissions[r] || []; for (let i = 0; i < 7; i++) { if (!c[i]) { if (i === 0 || c[i - 1]) return i; return -1; } } return -1; },
    
    startDailyTask(i) {
        if (this.isTodayCompleted()) { PathSystem.showClassNotification('¡Ya completaste tus tareas diarias!', '✅'); return null; }
        const a = this.getAvailableDailyMissions();
        if (i < 0 || i >= a.length) { PathSystem.showClassNotification('Misión no disponible', '❌'); return null; }
        const m = a[i];
        this.currentTask = { type: 'daily', missionId: m.id, missionText: m.text, missionType: m.type, category: m.category, categoryColor: m.categoryColor, time: m.time || 5, userInput: '', completed: false };
        if (m.type === 'timer') { this.taskTimerSeconds = m.time * 60; this.startTimer(); }
        return this.currentTask;
    },
    
    startRegionTask(r, i) {
        if (this.hasCompletedRegionMissionToday()) { PathSystem.showClassNotification('¡Ya completaste una misión de región hoy!', '🌙'); return null; }
        const n = this.getNextAvailableMission(r);
        if (i !== n) { if (n === -1) PathSystem.showClassNotification('¡Región completada!', '🏆'); else PathSystem.showClassNotification(`Hoy: Día ${n + 1}`, '📅'); return null; }
        if (!this.isMissionAvailable(r, i)) { PathSystem.showClassNotification('Misión no disponible', '🔒'); return null; }
        const t = PathSystem.getMissionText(r, i);
        const rg = GAME_DATA.regions.find(x => x.id === r);
        this.currentTask = { type: 'region', regionId: r, missionIndex: i, missionText: t, missionType: rg.missionTypes[i], userInput: '', completed: false };
        if (rg.missionTypes[i] === 'timer') { const m = t.match(/(\d+)\s*minutos?/i); this.taskTimerSeconds = (m ? parseInt(m[1]) : 5) * 60; this.startTimer(); }
        return this.currentTask;
    },
    
    startTimer() {
        if (this.taskTimer) clearInterval(this.taskTimer);
        this.taskTimer = setInterval(() => {
            this.taskTimerSeconds--;
            if (this.taskTimerSeconds <= 0) { clearInterval(this.taskTimer); this.taskTimer = null; PathSystem.showClassNotification('¡Tiempo completado!', '⏰'); }
            const d = document.querySelector('.timer-display');
            if (d) { const m = Math.floor(this.taskTimerSeconds / 60); const s = this.taskTimerSeconds % 60; d.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`; }
        }, 1000);
    },
    
    saveUserInput(i) { if (this.currentTask) this.currentTask.userInput = i; return true; },
    
    completeTask() {
        if (!this.currentTask) return false;
        const { type, missionType, userInput } = this.currentTask;
        if (this.taskTimer) { clearInterval(this.taskTimer); this.taskTimer = null; }
        if (missionType === 'timer' && this.taskTimerSeconds > 0) { PathSystem.showClassNotification('¡Completa el tiempo primero!', '⏰'); return false; }
        if (missionType === 'text' && (!userInput || userInput.trim().length < 5)) { PathSystem.showClassNotification('Escribe algo (mínimo 5 caracteres)', '📝'); return false; }
        if (type === 'daily') return this.completeDailyMission(this.currentTask.missionId);
        if (type === 'region') return this.completeRegionMission(this.currentTask.regionId, this.currentTask.missionIndex);
        return false;
    },
    
    completeRegionMission(r, i) {
        if (this.hasCompletedRegionMissionToday()) { PathSystem.showClassNotification('¡Ya completaste una misión de región hoy!', '🌙'); return false; }
        if (!this.isMissionAvailable(r, i)) { PathSystem.showClassNotification('Completa las misiones en orden', '🔒'); return false; }
        const n = this.getNextAvailableMission(r);
        if (i !== n) { PathSystem.showClassNotification(`Hoy: Día ${n + 1}`, '📅'); return false; }
        if (!this.completedMissions[r]) this.completedMissions[r] = [];
        if (!this.completedMissions[r][i]) {
            this.completedMissions[r][i] = true;
            this.stats.lastRegionMissionDate = new Date().toDateString();
            this.stats.lastCompletedRegionDay = i;
            this.stats.totalTasksCompleted++;
            
            const isFirst = this.stats.dailyTasksCompleted === 0;
            PowerFeedback.onTaskComplete('region', isFirst);
            
            this.stats.exp += 25;
            this.stats.dailyExp += 25;
            
            PathSystem.showClassNotification(`¡Día ${i + 1} completado! +25 EXP`, '✅');
            if (i + 1 < 7) PathSystem.showClassNotification(`Mañana: Día ${i + 2}`, '📅');
            
            this.checkLevelUp();
            this.checkRegionCompletion(r);
            AchievementSystem.check(this);
            this.save();
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
            PowerFeedback.onLevelUp();
            PathSystem.showClassNotification(`¡Nivel ${this.stats.level}!`, '⭐');
            AchievementSystem.check(this);
            return true;
        }
        return false;
    },
    
    checkRegionCompletion(r) {
        const m = this.completedMissions[r];
        if (!m) return false;
        const all = m.length === 7 && m.every(x => x);
        if (all && !this.defeatedBosses.includes(r)) {
            const next = r + 1;
            if (next <= GAME_DATA.regions.length && !this.unlockedRegions.includes(next)) {
                this.unlockedRegions.push(next);
                PathSystem.showClassNotification(`¡Región ${r} completada!`, '🔓');
                AchievementSystem.check(this);
            }
            return true;
        }
        return false;
    },
    
    isRegionCompleted(r) { const m = this.completedMissions[r]; return m ? m.length === 7 && m.every(x => x) : false; },
    isRegionUnlocked(r) { return this.unlockedRegions.includes(r); },
    isBossDefeated(r) { return this.defeatedBosses.includes(r); },
    
    startCombat(r) {
        if (!this.isRegionCompleted(r)) { PathSystem.showClassNotification('Completa las 7 misiones primero', '❌'); return null; }
        if (this.isBossDefeated(r)) { PathSystem.showClassNotification('Jefe ya derrotado', '🏆'); return null; }
        const rg = GAME_DATA.regions.find(x => x.id === r);
        if (!rg) return null;
        PowerFeedback.onCombatStart();
        this.currentCombat = { regionId: r, enemy: { ...rg.boss, currentHp: rg.boss.hp }, playerHp: this.stats.hp, playerMp: this.stats.mp, turn: 0, log: [] };
        return this.currentCombat;
    },
    
    combatAttack(t) {
        if (!this.currentCombat) return null;
        const c = this.currentCombat;
        c.turn++;
        let d = 0;
        if (t === 'weak') d = 10 + Math.floor(this.stats.dailyExp / 10);
        else if (t === 'medium') d = 20 + Math.floor(this.stats.dailyExp / 5);
        else if (t === 'strong') d = 30 + Math.floor(this.stats.dailyExp / 3);
        c.enemy.currentHp = Math.max(0, c.enemy.currentHp - d);
        c.log.push(`Atacas: -${d} HP`);
        if (c.enemy.currentHp <= 0) { this.defeatBoss(c.regionId); return { victory: true, damage: d }; }
        return { victory: false, damage: d };
    },
    
    enemyTurn() {
        if (!this.currentCombat) return null;
        const c = this.currentCombat;
        const rg = GAME_DATA.regions.find(x => x.id === c.regionId);
        const a = rg.boss.attacks[Math.floor(Math.random() * rg.boss.attacks.length)];
        const d = 10 + (rg.boss.difficulty * 5);
        c.playerHp = Math.max(0, c.playerHp - d);
        this.stats.hp = c.playerHp;
        c.log.push(`${rg.boss.name} usa ${a}: -${d} HP`);
        return { attack: a, damage: d };
    },
    
    defeatBoss(r) {
        if (!this.defeatedBosses.includes(r)) {
            this.defeatedBosses.push(r);
            const rg = GAME_DATA.regions.find(x => x.id === r);
            const exp = 100 * rg.boss.difficulty;
            this.stats.exp += exp;
            this.stats.dailyExp += exp;
            PowerFeedback.onVictory();
            this.checkLevelUp();
            AchievementSystem.check(this);
            this.save();
            return exp;
        }
        return 0;
    },
    
    rest() { this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + 30); this.stats.mp = Math.min(this.stats.maxMp, this.stats.mp + 10); this.save(); return { hp: 30, mp: 10 }; },
    
    showTaskPopup(t) {
        let c = '';
        if (t.missionType === 'timer') {
            const m = Math.floor(this.taskTimerSeconds / 60);
            const s = this.taskTimerSeconds % 60;
            c = `<div class="popup-icon" style="color:var(--warning)">⏰</div><h3 style="color:var(--warning);margin-bottom:20px;">${t.missionText}</h3><div class="timer-container"><div class="timer-display">${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}</div><div class="timer-buttons"><button class="ff-button" onclick="window.pauseResumeTimer()" style="background:var(--warning);">⏸️ PAUSAR</button><button class="ff-button" onclick="window.resetTimer()" style="background:var(--danger);">🔄 REINICIAR</button></div></div><button class="ff-button" onclick="window.finishTask()" style="margin-top:20px;">✅ COMPLETAR TAREA</button>`;
        } else {
            c = `<div class="popup-icon" style="color:var(--primary)">📝</div><h3 style="color:var(--primary);margin-bottom:20px;">${t.missionText}</h3><textarea class="task-textarea" placeholder="Escribe aquí..." oninput="window.saveTaskInput(this.value)"></textarea><button class="ff-button" onclick="window.finishTask()" style="margin-top:20px;">✅ GUARDAR Y COMPLETAR</button>`;
        }
        const p = document.createElement('div');
        p.className = 'task-popup';
        p.innerHTML = `<div class="popup-content">${c}<button class="ff-button" onclick="window.closeTaskPopup()" style="margin-top:15px;background:var(--danger);">❌ CANCELAR</button></div>`;
        document.body.appendChild(p);
    },
    
    showMotivationPopup() {
        const p = Math.min(100, (this.stats.dailyTasksCompleted / this.stats.dailyTasksGoal) * 100);
        const r = this.stats.dailyTasksGoal - this.stats.dailyTasksCompleted;
        const m = PathSystem.getMotivationalMessage();
        let t, msg, i, col;
        if (this.isTodayCompleted()) { t = "¡DÍA COMPLETADO! 🏆"; msg = "Has completado todas tus tareas. Eres imparable."; i = "🏆"; col = "#ffd700"; }
        else if (p >= 80) { t = "¡CASI LO LOGRAS! ⚡"; msg = `¡Solo ${r} tarea${r > 1 ? 's' : ''} más!`; i = "⚡"; col = "#ffd166"; }
        else if (p >= 50) { t = "¡VAS POR BUEN CAMINO! 🔥"; msg = `Llevas ${this.stats.dailyTasksCompleted} de ${this.stats.dailyTasksGoal}`; i = "🔥"; col = "#ff6b6b"; }
        else { t = "¡BUEN COMIENZO! 🚀"; msg = `Has completado ${this.stats.dailyTasksCompleted} tarea${this.stats.dailyTasksCompleted !== 1 ? 's' : ''}`; i = "🚀"; col = "#4dff91"; }
        const pop = document.createElement('div');
        pop.className = 'task-popup';
        pop.innerHTML = `<div class="popup-content"><div class="popup-icon" style="color:${col}">${i}</div><h3 style="color:${col};margin-bottom:20px;">${t}</h3><p style="color:#f0f0f0;margin-bottom:30px;font-size:14px;">${msg}<br><br><em style="color:${GameState.character?.color || 'var(--primary)'}">${m}</em></p><div style="margin:20px 0;"><div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="font-size:10px;color:#aaa;">Progreso</span><span style="font-size:10px;color:${col};">${this.stats.dailyTasksCompleted}/${this.stats.dailyTasksGoal}</span></div><div class="daily-progress-bar"><div class="daily-progress-fill" style="width:${p}%"><div class="daily-progress-text">${Math.round(p)}%</div></div></div></div><div style="display:flex;justify-content:center;gap:20px;margin-top:30px;"><div style="text-align:center;"><div style="color:#ffd166;font-size:12px;">Racha</div><div style="font-size:24px;color:#ffd166;">${this.stats.dailyStreak} días</div></div><div style="text-align:center;"><div style="color:#4dff91;font-size:12px;">Nivel</div><div style="font-size:24px;color:#4dff91;">${this.stats.level}</div></div></div><button class="ff-button" onclick="window.closeTaskPopup()" style="margin-top:30px;background:${col};">CONTINUAR</button></div>`;
        document.body.appendChild(pop);
    },
    
    reset() {
        if (confirm('¿Reiniciar juego?')) {
            this.character = null;
            this.stats = { hp: 100, mp: 100, exp: 0, level: 1, maxHp: 100, maxMp: 100, nextLevelExp: 100, dailyExp: 0, dailyStreak: 0, dailyTasksCompleted: 0, dailyTasksGoal: 5, lastRegionMissionDate: null, lastCompletedRegionDay: null, totalTasksCompleted: 0, daysCompleted: 0 };
            this.unlockedRegions = [1];
            this.completedMissions = {};
            this.defeatedBosses = [];
            this.completedRegions = {};
            this.dailyMissionsState = { lastGeneratedDate: null, availableMissions: [], completedDailyMissions: [] };
            this.achievements = {};
            this.currentCombat = null;
            this.lastPlayedDate = null;
            this.todayCompleted = false;
            this.currentTask = null;
            if (this.taskTimer) { clearInterval(this.taskTimer); this.taskTimer = null; }
            localStorage.removeItem('goalquest_save');
            PathSystem.showClassNotification('Juego reiniciado', '🔄');
            return true;
        }
        return false;
    }
};

// ==================== RENDER ENGINE ====================
const RenderEngine = {
    showScreen(s, d = null) {
        GameState.currentScreen = s;
        const c = document.getElementById('game-container');
        let h = '';
        if (s === 'start') h = this.renderStartScreen();
        else if (s === 'characters') h = this.renderCharacterScreen();
        else if (s === 'world') h = this.renderWorldScreen();
        else if (s === 'region') h = this.renderRegionScreen(d);
        else if (s === 'daily') h = this.renderDailyMissionsScreen();
        else if (s === 'combat') h = this.renderCombatScreen();
        else if (s === 'rest') h = this.renderRestScreen();
        else if (s === 'settings') h = this.renderSettingsScreen();
        else if (s === 'achievements') h = AchievementSystem.renderScreen();
        c.innerHTML = h;
        if (s === 'start') { setTimeout(() => { ParticleSystem.start(); WorldTransformer.energizeTitle(); }, 100); }
    },
    
    renderStartScreen() {
        const p = GameState.character ? PathSystem.getPathName() : '';
        return `<div class="game-screen active"><h1 class="game-title">GOALQUEST</h1><p style="text-align:center;color:var(--warning);margin:20px 0;">RPG de Transformación Psicológica</p>${GameState.character ? `<div style="text-align:center;margin-bottom:20px;"><div style="font-size:40px;color:${GameState.character.color}">${GameState.character.icon}</div><div style="color:${GameState.character.color};font-size:16px;margin-top:10px;">${p}</div><div style="color:#aaa;font-size:12px;margin-top:5px;">${PathSystem.getPathDescription()}</div></div>` : ''}<div class="ff-menu"><button class="menu-option" onclick="window.showScreen('characters')"><i class="fas fa-gamepad"></i><span>▶ JUGAR AHORA</span></button>${GameState.character ? `<button class="menu-option" onclick="window.showScreen('daily')"><i class="fas fa-calendar-day"></i><span>MISIONES DIARIAS (${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal})</span></button><button class="menu-option" onclick="window.showScreen('world')"><i class="fas fa-play"></i><span>CONTINUAR AVENTURA</span></button>` : ''}<button class="menu-option" onclick="window.showScreen('settings')"><i class="fas fa-cog"></i><span>CONFIGURACIÓN</span></button></div>${GameState.character && GameState.stats.dailyStreak > 0 ? `<div style="text-align:center;color:var(--warning);margin-top:30px;">🔥 Racha: ${GameState.stats.dailyStreak} días</div>` : ''}<div style="position:absolute;bottom:20px;width:100%;text-align:center;color:#666;font-size:10px;">© 2024 GOALQUEST</div></div>`;
    },
    
    renderCharacterScreen() {
        return `<div class="game-screen active"><button class="ff-button" onclick="window.showScreen('start')" style="margin-bottom:20px;">← VOLVER</button><h2 style="color:var(--primary);text-align:center;margin:20px 0;">SELECCIONA TU PERSONAJE</h2><div class="character-grid">${GAME_DATA.characters.map(c => { const s = GameState.character?.id === c.id; const f = CLASS_TO_FOCUS[c.id]; const p = CLASS_PATHS[f]; const i = asset(ASSETS.classes[c.id]); return `<div class="character-card ${s ? 'selected' : ''}" onclick="window.selectCharacter(${c.id})" style="--char-color:${c.color};--char-color-rgb:${c.colorRgb}"><div style="display:flex;align-items:center;gap:15px;margin-bottom:15px;"><div style="width:64px;height:64px;border-radius:12px;overflow:hidden;border:2px solid rgba(255,255,255,0.2);background:rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;"><img src="${i}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML='<div style=\\'font-size:32px\\'>${c.icon}</div>';"></div><div><h3 style="color:${c.color}">${c.name}</h3><p style="font-size:10px;color:#aaa;">${c.skill}</p><p style="font-size:8px;color:${c.color};margin-top:5px;">${p?.name || 'Camino'}</p></div></div><p style="margin:15px 0;font-size:12px;color:#ccc;flex-grow:1;">${c.description}</p><div style="display:flex;justify-content:space-between;margin-top:auto;"><div style="text-align:center;"><div style="color:var(--danger);font-size:11px;">HP</div><div style="font-size:14px;">${c.hp}</div></div><div style="text-align:center;"><div style="color:var(--primary);font-size:11px;">MP</div><div style="font-size:14px;">${c.mp}</div></div><div style="text-align:center;"><div style="color:var(--warning);font-size:11px;">HAB.</div><div style="font-size:10px;">${c.abilities[0]}</div></div></div></div>`; }).join('')}</div>${GameState.character ? `<div style="text-align:center;margin-top:30px;"><button class="ff-button" onclick="window.startAdventure()"><i class="fas fa-play"></i> COMENZAR</button></div>` : `<div style="text-align:center;color:var(--warning);margin-top:30px;">⚠️ Selecciona un personaje</div>`}</div>`;
    },
    
    renderStatusBar() {
        const s = GameState.stats;
        const c = GameState.character;
        const p = Math.min(100, (s.dailyTasksCompleted / s.dailyTasksGoal) * 100);
        const i = asset(c?.id && ASSETS.classes[c.id] ? ASSETS.classes[c.id] : ASSETS.classes[1]);
        return `<div class="status-bar"><div style="display:flex;align-items:center;gap:15px;"><div style="width:48px;height:48px;border-radius:12px;overflow:hidden;border:2px solid rgba(255,255,255,0.2);background:rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;"><img src="${i}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML='<div style=\\'font-size:28px\\'>${c?.icon || '👤'}</div>';"></div><div><div style="color:var(--primary);font-weight:bold;">${c?.name || 'Sin personaje'}</div><div style="font-size:10px;color:#aaa;">${PathSystem.getPathName()}</div><div style="font-size:10px;color:var(--warning);">Nivel ${s.level}</div><div style="font-size:9px;color:var(--warning);">EXP: ${s.dailyExp}</div><div style="font-size:9px;color:${GameState.isTodayCompleted() ? 'var(--primary)' : 'var(--info)'};">${GameState.isTodayCompleted() ? '🏆 Día completado' : `📝 ${s.dailyTasksCompleted}/${s.dailyTasksGoal}`}</div>${GameState.hasCompletedRegionMissionToday() ? `<div style="font-size:9px;color:var(--warning);margin-top:5px;">🌙 Región completada</div>` : ''}</div></div><div style="display:flex;gap:20px;align-items:center;"><div><div style="font-size:10px;color:var(--danger);">HP</div><div class="stat-bar hp-bar"><div class="stat-fill" style="width:${(s.hp/s.maxHp)*100}%"><div class="stat-text">${s.hp}/${s.maxHp}</div></div></div></div><div><div style="font-size:10px;color:var(--primary);">MP</div><div class="stat-bar mp-bar"><div class="stat-fill" style="width:${(s.mp/s.maxMp)*100}%"><div class="stat-text">${s.mp}/${s.maxMp}</div></div></div></div><div><div style="font-size:10px;color:var(--warning);">EXP</div><div class="stat-bar exp-bar"><div class="stat-fill" style="width:${(s.exp/s.nextLevelExp)*100}%"><div class="stat-text">${s.exp}/${s.nextLevelExp}</div></div></div></div><div><div style="font-size:10px;color:var(--info);text-align:center;">DIARIO</div><div class="daily-progress-bar"><div class="daily-progress-fill" style="width:${p}%"><div class="daily-progress-text">${s.dailyTasksCompleted}/${s.dailyTasksGoal}</div></div></div></div></div></div>`;
    },
    
    renderWorldScreen() {
        if (!GameState.character) { this.showScreen('characters'); return ''; }
        const p = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
        return `<div class="game-screen active">${this.renderStatusBar()}<h2 style="color:var(--primary);text-align:center;margin:20px 0;">${PathSystem.getPathName()}</h2><p style="text-align:center;color:#aaa;margin-bottom:10px;font-size:12px;">${PathSystem.getPathDescription()}</p><div style="background:rgba(26,26,46,0.95);border-radius:15px;padding:20px;border:3px solid var(--warning);margin-bottom:30px;max-width:600px;width:100%;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;"><div><div style="color:var(--warning);font-size:14px;">PROGRESO DIARIO</div><div style="color:#aaa;font-size:10px;">${GameState.isTodayCompleted() ? '✅ Completado' : `${GameState.stats.dailyTasksGoal - GameState.stats.dailyTasksCompleted} restantes`}</div></div><div style="color:var(--warning);font-size:16px;">${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal}</div></div><div class="daily-progress-bar" style="width:100%;"><div class="daily-progress-fill" style="width:${p}%"><div class="daily-progress-text">${Math.round(p)}%</div></div></div>${GameState.isTodayCompleted() ? `<div style="color:var(--primary);text-align:center;margin-top:15px;font-size:12px;">🏆 Día completado</div>` : `<div style="color:var(--info);text-align:center;margin-top:15px;font-size:12px;">💪 Completa ${GameState.stats.dailyTasksGoal} tareas</div>`}${GameState.hasCompletedRegionMissionToday() ? `<div style="color:var(--warning);text-align:center;margin-top:15px;font-size:12px;">🌙 Misión de región completada</div>` : ''}<div style="display:flex;justify-content:center;gap:10px;margin-top:20px;"><button class="ff-button" onclick="window.showScreen('daily')" style="padding:10px 20px;font-size:12px;">📅 DIARIAS</button><button class="ff-button" onclick="window.showScreen('achievements')" style="padding:10px 20px;font-size:12px;background:var(--gold);">🏆 LOGROS</button></div></div><p style="text-align:center;color:#aaa;margin-bottom:30px;">7 misiones por región para desbloquear al jefe</p><div class="map-grid">${GAME_DATA.regions.map(r => { const u = GameState.isRegionUnlocked(r.id); const c = GameState.completedMissions[r.id]?.filter(m => m).length || 0; const ic = GameState.isRegionCompleted(r.id); const bd = GameState.isBossDefeated(r.id); const t = PathSystem.getRegionTheme(r.id); const img = asset(ASSETS.acts[r.id]); const n = GameState.getNextAvailableMission(r.id); return `<div class="region-tile ${u ? '' : 'locked'}" onclick="${u ? `window.enterRegion(${r.id})` : ''}" style="--region-color:${r.color};--region-color-rgb:${r.colorRgb}"><div><div style="width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-bottom:10px;"><img src="${img}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" onerror="this.onerror=null;this.remove();this.parentElement.innerHTML='<div style=\\'font-size:40px;padding:10px;\\'>${r.icon}</div>';"></div><h4 style="color:${r.color};">${t}</h4><p style="color:#666;font-size:10px;margin-top:5px;">${r.name}</p></div>${u ? `<div style="margin:15px 0;"><div style="background:rgba(0,0,0,0.3);border-radius:5px;height:8px;"><div style="height:100%;background:${r.color};border-radius:5px;width:${(c/7)*100}%;"></div></div><div style="font-size:10px;color:#aaa;margin-top:5px;">${c}/7 misiones</div>${!GameState.hasCompletedRegionMissionToday() && n !== -1 && !ic ? `<div style="font-size:9px;color:var(--warning);margin-top:5px;">🔥 Hoy: Día ${n+1}</div>` : ''}</div>${ic && !bd ? `<button class="ff-button" onclick="window.startCombat(${r.id});event.stopPropagation();" style="padding:8px 15px;font-size:11px;background:var(--danger);margin:5px 0;">⚔️ JEFE</button>` : ''}${bd ? `<div style="color:var(--warning);font-size:12px;margin-top:10px;">👑 Derrotado</div>` : ''}${!ic ? `<div style="color:var(--primary);font-size:10px;margin-top:10px;">🎯 ${7-c} restantes</div>` : ''}` : `<div style="font-size:30px;margin:10px 0;">🔒</div><div style="font-size:10px;color:#aaa;">Completa región anterior</div>`}</div>`; }).join('')}</div><div style="text-align:center;margin-top:30px;"><button class="ff-button" onclick="window.showScreen('daily')">📅 DIARIAS</button><button class="ff-button" onclick="window.showScreen('rest')">🔥 DESCANSAR</button><button class="ff-button" onclick="window.showScreen('start')">🏠 MENÚ</button></div></div>`;
    },
    
    renderDailyMissionsScreen() {
        if (!GameState.character) { this.showScreen('characters'); return ''; }
        GameState.generateDailyMissions();
        const a = GameState.getAvailableDailyMissions();
        const p = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
        return `<div class="game-screen active"><button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom:20px;">← VOLVER</button><div style="display:flex;align-items:center;gap:20px;margin-bottom:30px;"><div style="font-size:50px;color:var(--warning)">📅</div><div><h2 style="color:var(--warning);">MISIONES DIARIAS</h2><p style="color:#aaa;font-size:12px;">${GameState.dailyMissionsState.availableMissions.length} disponibles hoy</p>${GameState.isTodayCompleted() ? '<p style="color:var(--primary);font-size:11px;margin-top:5px;">🏆 Día completado</p>' : `<p style="color:var(--warning);font-size:11px;margin-top:5px;">📝 ${GameState.stats.dailyTasksGoal - GameState.stats.dailyTasksCompleted} disponibles</p>`}</div></div><div style="background:rgba(26,26,46,0.95);border-radius:15px;padding:20px;border:3px solid var(--warning);margin-bottom:30px;width:100%;max-width:800px;"><div style="display:flex;justify-content:space-between;margin-bottom:10px;"><div style="color:var(--warning);">PROGRESO</div><div style="color:var(--warning);">${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal}</div></div><div class="daily-progress-bar" style="width:100%;"><div class="daily-progress-fill" style="width:${p}%;"></div></div><div style="color:var(--info);text-align:center;margin-top:10px;font-size:12px;">+50 EXP al completar el día</div></div><h3 style="color:var(--primary);margin-bottom:20px;">MISIONES DE HOY</h3>${a.length > 0 ? `<div style="background:rgba(26,26,46,0.95);border-radius:15px;padding:20px;border:2px solid var(--warning);width:100%;max-width:800px;">${a.map((m,i) => `<div class="daily-mission-item available" onclick="window.startDailyTask(${i})"><div style="width:24px;height:24px;border:2px solid ${m.categoryColor};border-radius:5px;display:flex;align-items:center;justify-content:center;">${m.type === 'timer' ? '⏰' : '📝'}</div><div style="flex:1;"><div style="color:var(--warning);font-size:12px;">${m.text}${m.type === 'timer' ? ` (${m.time} min)` : ''}</div><div style="color:${m.categoryColor};">${m.category}</div></div></div>`).join('')}</div><div style="text-align:center;margin-top:30px;color:#aaa;font-size:11px;">⭐ +25 EXP por misión</div>` : '<div style="background:rgba(26,26,46,0.95);padding:40px;text-align:center;border:2px solid var(--primary);"><div style="font-size:60px;color:var(--primary);">🏆</div><h3 style="color:var(--primary);">¡TODAS COMPLETADAS!</h3></div>'}<div style="text-align:center;margin-top:30px;"><button class="ff-button" onclick="window.showScreen('world')"><i class="fas fa-map"></i> VOLVER</button></div></div>`;
    },
    
    renderRegionScreen(r) {
        const rg = GAME_DATA.regions.find(x => x.id === r);
        if (!rg || !GameState.isRegionUnlocked(r)) { PathSystem.showClassNotification('Región bloqueada', '🔒'); this.showScreen('world'); return ''; }
        const c = GameState.completedMissions[r] || [];
        const t = PathSystem.getRegionTheme(r);
        const n = GameState.getNextAvailableMission(r);
        const h = GameState.hasCompletedRegionMissionToday();
        return `<div class="game-screen active"><button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom:20px;">← VOLVER</button><div style="display:flex;align-items:center;gap:20px;margin-bottom:30px;"><div style="font-size:50px;color:${rg.color};">${rg.icon}</div><div><h2 style="color:${rg.color};">${t}</h2><p style="color:#666;font-size:12px;">${rg.name} | Dificultad: ${rg.boss.difficulty}</p><p style="color:var(--info);font-size:11px;margin-top:5px;">${c.filter(m => m).length}/7 misiones</p>${h ? '<p style="color:var(--warning);font-size:11px;margin-top:5px;">🌙 Misión completada hoy</p>' : ''}${!h && n !== -1 ? `<p style="color:var(--warning);font-size:11px;margin-top:5px;">🔥 Hoy: Día ${n+1}</p>` : ''}${n === -1 && c.length === 7 ? '<p style="color:var(--primary);font-size:11px;margin-top:5px;">🏆 ¡Enfréntate al jefe!</p>' : ''}</div></div><h3 style="color:var(--primary);margin-bottom:20px;">MISIONES DE LA SEMANA</h3><div style="background:rgba(26,26,46,0.95);border-radius:15px;padding:20px;border:2px solid ${rg.color};width:100%;max-width:800px;">${Array.from({length:7}).map((_,i) => { const ic = c[i]; const isNext = i === n; const can = !h && !ic && isNext; const mt = PathSystem.getMissionText(r, i); let s = ''; if (ic) s = '<div style="color:var(--primary);font-size:10px;">✅ +25 EXP</div>'; else if (can) s = '<div style="color:var(--warning);font-size:10px;">🔥 DISPONIBLE</div>'; else if (isNext && h) s = '<div style="color:var(--warning);font-size:10px;">🌙 Vuelve mañana</div>'; else if (isNext) s = '<div style="color:var(--info);font-size:10px;">⏳ Mañana</div>'; else if (!ic && i < n) s = '<div style="color:var(--primary);font-size:10px;">✅ Completada</div>'; else if (!ic && i > n) s = '<div style="color:#aaa;font-size:10px;">🔒 Anteriores</div>'; return `<div class="mission-item ${ic ? 'completed' : ''} ${can ? 'today' : ''}" onclick="${can ? `window.startRegionTask(${r},${i})` : ''}"><div style="width:24px;height:24px;border:2px solid ${rg.color};border-radius:5px;display:flex;align-items:center;justify-content:center;background:${ic ? rg.color : 'transparent'};">${ic ? '✓' : isNext ? '🔥' : (rg.missionTypes[i] === 'timer' ? '⏰' : '📝')}</div><div style="flex:1;"><div style="color:${ic ? rg.color : (can ? 'var(--warning)' : 'white')};">Día ${i+1}: ${mt}</div>${s}</div></div>`; }).join('')}</div>${c.length === 7 && !GameState.isBossDefeated(r) ? `<div style="text-align:center;margin-top:30px;"><button class="ff-button" onclick="window.startCombat(${r})" style="background:var(--danger);">⚔️ DESAFIAR A ${rg.boss.name}</button></div>` : ''}${c.length === 7 && GameState.isBossDefeated(r) ? `<div style="text-align:center;margin-top:30px;"><div style="color:var(--warning);padding:15px;background:rgba(255,209,102,0.1);border-radius:10px;border:2px solid var(--warning);">👑 Jefe derrotado</div></div>` : ''}<div style="text-align:center;margin-top:30px;"><button class="ff-button" onclick="window.showScreen('daily')" style="background:var(--warning);"><i class="fas fa-calendar-day"></i> DIARIAS</button></div></div>`;
    },
    
    renderCombatScreen() {
        if (!GameState.currentCombat) { this.showScreen('world'); return ''; }
        const c = GameState.currentCombat;
        const r = GAME_DATA.regions.find(x => x.id === c.regionId);
        return `<div class="game-screen active"><button class="ff-button" onclick="window.fleeCombat()" style="margin-bottom:20px;">🏃 HUIR</button><div class="combat-arena"><div class="combat-context">⚔️ Hoy enfrentas tu miedo. ⚔️</div><h2 style="color:var(--danger);text-align:center;">VS ${r.boss.name}</h2><div style="display:flex;justify-content:space-around;margin:30px 0;"><div style="text-align:center;"><div style="font-size:60px;">${GameState.character?.icon}</div><div>${GameState.character?.name}</div><div class="stat-bar hp-bar"><div class="stat-fill" style="width:${(c.playerHp/GameState.stats.maxHp)*100}%;"><div class="stat-text">${c.playerHp}/${GameState.stats.maxHp}</div></div></div></div><div style="font-size:40px;color:var(--danger);">⚔️</div><div style="text-align:center;"><div style="font-size:60px;">${r.boss.sprite}</div><div>${r.boss.name}</div><div class="stat-bar hp-bar"><div class="stat-fill" style="width:${(c.enemy.currentHp/c.enemy.hp)*100}%;"><div class="stat-text">${c.enemy.currentHp}/${c.enemy.hp}</div></div></div></div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:15px;"><button class="ff-button" onclick="window.performAttack('weak')">⚡ DÉBIL<br><small>10+EXP/10</small></button><button class="ff-button" onclick="window.performAttack('medium')">💥 MEDIO<br><small>20+EXP/5</small></button><button class="ff-button" onclick="window.performAttack('strong')">🔥 FUERTE<br><small>30+EXP/3</small></button></div></div></div>`;
    },
    
    renderRestScreen() {
        const p = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
        return `<div class="game-screen active"><button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom:20px;">← VOLVER</button><div style="text-align:center;margin:50px 0;"><div style="font-size:100px;">🔥</div><h2 style="color:var(--warning);">CAMPAMENTO</h2><button class="ff-button" onclick="window.restAction()" style="font-size:16px;padding:20px 40px;">💤 DESCANSAR<br><small>+30 HP, +10 MP</small></button></div><div style="background:rgba(26,26,46,0.95);border-radius:20px;padding:30px;border:3px solid var(--primary);"><h3 style="color:var(--warning);text-align:center;">ESTADO</h3><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;"><div style="text-align:center;"><div style="color:var(--danger);">HP</div><div style="font-size:24px;">${GameState.stats.hp}/${GameState.stats.maxHp}</div></div><div style="text-align:center;"><div style="color:var(--primary);">MP</div><div style="font-size:24px;">${GameState.stats.mp}/${GameState.stats.maxMp}</div></div><div style="text-align:center;"><div style="color:var(--warning);">NIVEL</div><div style="font-size:24px;">${GameState.stats.level}</div></div><div style="text-align:center;"><div style="color:var(--secondary);">RACHA</div><div style="font-size:24px;">${GameState.stats.dailyStreak} días</div></div></div>${GameState.hasCompletedRegionMissionToday() ? '<div style="color:var(--warning);text-align:center;margin-top:20px;">🌙 Región completada</div>' : ''}</div></div>`;
    },
    
    renderSettingsScreen() {
        return `<div class="game-screen active"><button class="ff-button" onclick="window.showScreen('start')" style="margin-bottom:20px;">← VOLVER</button><h2 style="color:var(--primary);margin:30px 0;">CONFIGURACIÓN</h2><div class="ff-menu"><div style="margin:20px 0;"><div style="color:var(--primary);">TAREAS DIARIAS (${GameState.stats.dailyTasksGoal})</div><input type="range" min="3" max="10" value="${GameState.stats.dailyTasksGoal}" onchange="window.changeDailyGoal(this.value)" style="width:100%;"></div><button class="ff-button" onclick="window.resetGame()" style="width:100%;background:var(--danger);">🔄 REINICIAR</button></div></div>`;
    }
};

// ==================== FUNCIONES GLOBALES ====================
window.showScreen = (s, d) => RenderEngine.showScreen(s, d);
window.selectCharacter = (id) => { if (GameState.selectCharacter(id)) RenderEngine.showScreen('characters'); };
window.startAdventure = () => { if (!GameState.character) { PathSystem.showClassNotification('Selecciona un personaje', '❌'); return; } GameState.save(); RenderEngine.showScreen('world'); PathSystem.showClassNotification(`¡Bienvenido, ${GameState.character.name}!`, '🚀'); };
window.enterRegion = (id) => RenderEngine.showScreen('region', id);
window.startDailyTask = (i) => { if (GameState.startDailyTask(i)) GameState.showTaskPopup(GameState.currentTask); };
window.startRegionTask = (r, i) => { if (GameState.startRegionTask(r, i)) GameState.showTaskPopup(GameState.currentTask); };
window.saveTaskInput = (v) => GameState.saveUserInput(v);
window.finishTask = () => { if (GameState.completeTask()) { window.closeTaskPopup(); RenderEngine.showScreen(GameState.currentTask?.type === 'daily' ? 'daily' : (GameState.currentTask?.type === 'region' ? 'region' : 'world'), GameState.currentTask?.regionId); } };
window.pauseResumeTimer = () => { if (GameState.taskTimer) { clearInterval(GameState.taskTimer); GameState.taskTimer = null; } else GameState.startTimer(); };
window.resetTimer = () => { if (GameState.currentTask?.missionType === 'timer') { GameState.taskTimerSeconds = (GameState.currentTask.time || 5) * 60; if (GameState.taskTimer) { clearInterval(GameState.taskTimer); GameState.startTimer(); } } };
window.closeTaskPopup = () => { document.querySelector('.task-popup')?.remove(); if (GameState.taskTimer) { clearInterval(GameState.taskTimer); GameState.taskTimer = null; } GameState.currentTask = null; };
window.startCombat = (id) => { if (GameState.startCombat(id)) { RenderEngine.showScreen('combat'); PathSystem.showClassNotification(`¡Combate!`, '⚔️'); } };
window.performAttack = (t) => { const r = GameState.combatAttack(t); if (r) { if (r.victory) setTimeout(() => { RenderEngine.showScreen('world'); }, 1000); else setTimeout(() => { GameState.enemyTurn(); RenderEngine.showScreen('combat'); if (GameState.currentCombat?.playerHp <= 0) { setTimeout(() => { GameState.currentCombat = null; RenderEngine.showScreen('world'); }, 1000); } }, 1000); } };
window.fleeCombat = () => { if (confirm('¿Huir? -10% EXP')) { GameState.stats.exp = Math.max(0, Math.floor(GameState.stats.exp * 0.9)); GameState.currentCombat = null; RenderEngine.showScreen('world'); } };
window.restAction = () => { const r = GameState.rest(); PathSystem.showClassNotification(`+${r.hp} HP, +${r.mp} MP`, '💤'); RenderEngine.showScreen('rest'); };
window.changeDailyGoal = (g) => { GameState.stats.dailyTasksGoal = parseInt(g); GameState.save(); RenderEngine.showScreen('settings'); };
window.resetGame = () => { if (GameState.reset()) RenderEngine.showScreen('start'); };

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        if (ls) {
            ls.style.opacity = '0';
            setTimeout(() => {
                ls.style.display = 'none';
                GameState.init();
                RenderEngine.showScreen('start');
            }, 300);
        }
    }, 1500);
});
