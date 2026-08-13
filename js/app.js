// ==================== GOALQUEST - APP.JS ====================
// Version: 4.2 - AERIL FIXED (button order adjusted)
// ============================================================

// ==================== DIGITAL CORRUPTION SYSTEM ====================
const CORRUPTION_LEVELS = {
    0: { name: 'STABLE', color: '#4dff91', particles: 0, musicVol: 1.0, filter: 0, bgDarkness: 0 },
    1: { name: 'UNSTABLE', color: '#b388ff', particles: 0.15, musicVol: 0.9, filter: 0.1, bgDarkness: 0 },
    2: { name: 'CORRUPTED', color: '#aa00ff', particles: 0.4, musicVol: 0.8, filter: 0.3, bgDarkness: 0.1 },
    3: { name: 'CRITICAL', color: '#ff00ff', particles: 0.6, musicVol: 0.7, filter: 0.5, bgDarkness: 0.2 }
};

const CORRUPTION_MESSAGES = {
    1: { title: '🔮 Interference detected...', message: 'The signal is fading. Complete a quest to stabilize it.' },
    2: { title: '⚠️ Corruption spreading', message: 'The system is failing. Return before it is too late.' },
    3: { title: '💀 System compromised', message: 'We are losing you... One quest can restore the link.' }
};

// ==================== AERIL SYSTEM ====================
const AerilSystem = {
    corruptionLevel: 0,
    messageElement: null,
    aerilElement: null,
    lastMessageDate: null,
    hasSpokenToday: false,
    
    messages: {
        0: ["The portal is stable.", "All is in balance.", "You kept the light alive.", "Energy flows undisturbed.", "Your presence strengthens the bond."],
        1: ["I sense interference...", "Something is shifting.", "The system needs your attention.", "There is static in the air.", "Something is out of balance."],
        2: ["The Corruption is seeping through.", "The portal will not hold much longer.", "We need you.", "The light is flickering.", "We are losing integrity."],
        3: ["We are losing stability.", "Do not wait.", "The world is counting on you.", "This is critical.", "Return soon."]
    },
    
    specialMessages: {
        welcome: "You have returned.",
        streak7: "Your presence strengthens the portal.",
        streak30: "The journey is already changing you.",
        recovery: "Thank you for returning."
    },
    
    init() {
        this.createAeril();
        this.createMessageElement();
        this.checkFirstEntry();
    },
    
    createAeril() {
        this.aerilElement = document.createElement('div');
        this.aerilElement.className = 'aeril-guardian';
        
        // Intentar cargar la imagen
        const aerilImg = document.createElement('img');
        aerilImg.src = 'assets/classes/Aerial.png'; // CORREGIDO
        aerilImg.alt = 'Aeril';
        aerilImg.className = 'aeril-sprite';
        aerilImg.style.width = '80px';
        aerilImg.style.height = '80px';
        aerilImg.style.objectFit = 'contain';
        aerilImg.style.imageRendering = 'pixelated';
        
        // Fallback por si no carga
        aerilImg.onerror = function() {
            console.log('Using emoji fallback');
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'aeril-sprite';
            fallback.style.fontSize = '60px';
            fallback.style.lineHeight = '1';
            fallback.textContent = '🔮';
            this.parentNode.appendChild(fallback);
        };
        
        this.aerilElement.appendChild(aerilImg);
        document.body.appendChild(this.aerilElement);
    },
    
    createMessageElement() {
        this.messageElement = document.createElement('div');
        this.messageElement.className = 'aeril-message';
        document.body.appendChild(this.messageElement);
    },
    
    checkFirstEntry() {
        const today = new Date().toDateString();
        if (this.lastMessageDate !== today) {
            this.lastMessageDate = today;
            this.hasSpokenToday = false;
        }
    },
    
    setCorruptionLevel(level) {
        this.corruptionLevel = level;
        this.updateAppearance();
        this.updateMessage();
    },
    
    updateAppearance() {
        if (!this.aerilElement) return;
        
        this.aerilElement.classList.remove('corrupt-1', 'corrupt-2', 'corrupt-3', 'recovering');
        
        if (this.corruptionLevel > 0) {
            this.aerilElement.classList.add(`corrupt-${this.corruptionLevel}`);
            
            if (Math.random() < 0.3) {
                setTimeout(() => {
                    this.aerilElement.classList.add('glitch');
                    setTimeout(() => {
                        this.aerilElement.classList.remove('glitch');
                    }, 100);
                }, Math.random() * 5000);
            }
            
            if (this.corruptionLevel >= 2 && !this.glitchInterval) {
                this.glitchInterval = setInterval(() => {
                    if (this.corruptionLevel >= 2 && Math.random() < 0.5) {
                        this.aerilElement.classList.add('glitch');
                        setTimeout(() => {
                            this.aerilElement.classList.remove('glitch');
                        }, 100);
                    }
                }, 15000);
            }
        } else {
            if (this.glitchInterval) {
                clearInterval(this.glitchInterval);
                this.glitchInterval = null;
            }
        }
    },
    
    updateMessage() {
        if (!this.messageElement) return;
        
        const level = this.corruptionLevel;
        const messages = this.messages[level] || this.messages[0];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        this.messageElement.innerHTML = `🔮 Aeril: "${randomMessage}"`;
        this.messageElement.style.borderLeftColor = CORRUPTION_LEVELS[level].color;
    },
    
    showWelcomeMessage() {
        if (!this.messageElement || this.hasSpokenToday) return;
        
        this.messageElement.innerHTML = `🔮 Aeril: "${this.specialMessages.welcome}"`;
        this.messageElement.style.borderLeftColor = '#4dff91';
        this.hasSpokenToday = true;
        
        const gameScreen = document.querySelector('.game-screen');
        if (gameScreen) {
            gameScreen.style.transition = 'box-shadow 0.3s ease';
            gameScreen.style.boxShadow = '0 0 50px #4dff91';
            setTimeout(() => {
                gameScreen.style.boxShadow = '';
            }, 2000);
        }
        
        this.aerilElement.classList.add('welcome-glow');
        setTimeout(() => {
            this.aerilElement.classList.remove('welcome-glow');
        }, 2000);
        
        this.aerilElement.classList.add('look-up');
        setTimeout(() => {
            this.aerilElement.classList.remove('look-up');
        }, 1500);
    },
    
    showRecoveryMessage() {
        this.aerilElement.classList.add('recovering');
        this.messageElement.innerHTML = `🔮 Aeril: "${this.specialMessages.recovery}"`;
        this.messageElement.style.borderLeftColor = '#4dff91';
        
        setTimeout(() => {
            this.aerilElement.classList.remove('recovering');
        }, 1000);
    },
    
    showStreakMessage(days) {
        if (days >= 30) {
            this.messageElement.innerHTML = `🔮 Aeril: "${this.specialMessages.streak30}"`;
            this.messageElement.style.borderLeftColor = '#ffd700';
        } else if (days >= 7) {
            this.messageElement.innerHTML = `🔮 Aeril: "${this.specialMessages.streak7}"`;
            this.messageElement.style.borderLeftColor = '#ffd700';
        }
    }
};

// ==================== MUSIC SYSTEM ====================
const MusicSystem = {
    audio: null,
    isPlaying: false,
    userInteracted: false,
    button: null,
    corruptionLevel: 0,
    baseVolume: 0.3,

    init() {
        this.audio = new Audio();
        this.audio.src = 'assets/music/tema-inicio.mp3';
        this.audio.loop = true;
        this.audio.volume = this.baseVolume;

        const enableMusic = () => {
            if (!this.userInteracted) {
                this.userInteracted = true;
                document.removeEventListener('click', enableMusic);
                document.removeEventListener('keydown', enableMusic);
                if (this.button && this.button.dataset.state === 'on') {
                    this.play();
                }
            }
        };
        document.addEventListener('click', enableMusic);
        document.addEventListener('keydown', enableMusic);

        this.createButton();
        const saved = localStorage.getItem('goalquest_music');
        if (saved === 'on') {
            this.button.dataset.state = 'on';
            this.button.innerHTML = '🎵 Music: ON';
            if (this.userInteracted) this.play();
        } else {
            this.button.dataset.state = 'off';
            this.button.innerHTML = '🎵 Music: OFF';
        }
    },

    createButton() {
        this.button = document.createElement('div');
        this.button.innerHTML = '🎵 Music: OFF';
        this.button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4a4e69;
            color: white;
            border: none;
            border-radius: 30px;
            padding: 10px 20px;
            font-family: 'Press Start 2P', cursive;
            font-size: 10px;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        this.button.dataset.state = 'off';
        this.button.addEventListener('click', () => this.toggle());
        document.body.appendChild(this.button);
    },

    toggle() {
        if (this.button.dataset.state === 'off') {
            this.button.dataset.state = 'on';
            this.button.innerHTML = '🎵 Music: ON';
            localStorage.setItem('goalquest_music', 'on');
            if (this.userInteracted) this.play();
        } else {
            this.button.dataset.state = 'off';
            this.button.innerHTML = '🎵 Music: OFF';
            localStorage.setItem('goalquest_music', 'off');
            this.stop();
        }
    },

    play() {
        if (!this.audio) return;
        this.audio.play().catch(e => console.log('🎵 Waiting for interaction...'));
        this.isPlaying = true;
    },

    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.isPlaying = false;
        }
    },

    setCorruptionLevel(level) {
        this.corruptionLevel = level || 0;
        if (this.isPlaying) {
            const config = CORRUPTION_LEVELS[level] || CORRUPTION_LEVELS[0];
            this.audio.volume = this.baseVolume * config.musicVol;
        }
    },

    setVolume(vol) {
        if (this.audio) this.audio.volume = Math.max(0, Math.min(1, vol));
    }
};

// ==================== GAME DATA ====================
const GAME_DATA = {
    characters: [
        { id: 1, name: 'MAGE', icon: '🧙', color: '#9d4edd', colorRgb: '157,78,221', hp: 32, mp: 60, skill: 'Mental Clarity', description: 'Master mental chaos with arcane wisdom', abilities: ['Mind Fireball', 'Focus Shield'] },
        { id: 2, name: 'KNIGHT', icon: '⚔️', color: '#4a4e69', colorRgb: '74,78,105', hp: 55, mp: 20, skill: 'Iron Discipline', description: 'Forge habits with unbreakable resolve', abilities: ['Willpower Strike', 'Routine Shield'] },
        { id: 3, name: 'HEALER', icon: '❤️', color: '#ff6b6b', colorRgb: '255,107,107', hp: 40, mp: 50, skill: 'Vital Energy', description: 'Restore your energy with divine healing', abilities: ['Energy Heal', 'Resting Blessing'] },
        { id: 4, name: 'TANK', icon: '🛡️', color: '#43aa8b', colorRgb: '67,170,139', hp: 70, mp: 15, skill: 'Mental Fortitude', description: 'Stand firm under pressure with unbreakable defenses', abilities: ['Focus Wall', 'Persistence Strike'] },
        { id: 5, name: 'ARCHER', icon: '🏹', color: '#f9c74f', colorRgb: '249,199,79', hp: 45, mp: 35, skill: 'Deadeye Focus', description: 'Take down distractions with deadly accuracy', abilities: ['Focus Arrow', 'True Shot'] },
        { id: 6, name: 'CLERIC', icon: '🙏', color: '#90be6d', colorRgb: '144,190,109', hp: 50, mp: 45, skill: 'Inner Balance', description: 'Balance your life with spiritual wisdom', abilities: ['Blessing of Balance', 'Prayer of Clarity'] },
        { id: 7, name: 'NINJA', icon: '🥷', color: '#222831', colorRgb: '34,40,49', hp: 48, mp: 40, skill: 'Mental Agility', description: 'Move swiftly between tasks with stealth', abilities: ['Swift Strike', 'Distraction Dodge'] },
        { id: 8, name: 'ALCHEMIST', icon: '⚗️', color: '#00adb5', colorRgb: '0,173,181', hp: 38, mp: 65, skill: 'Transformation', description: 'Transform harmful habits into positive ones', abilities: ['Focus Potion', 'Mindshift'] }
    ],
    
    regions: [
        { id: 1, name: 'CHAOS FOREST', color: '#ff6b6b', colorRgb: '255,107,107', icon: '🧠', boss: { name: 'Dragon of Disorder', sprite: '🐉', hp: 100, difficulty: 1, attacks: ['Confusion', 'Procrastination', 'Distraction'] }, missions: ['Write down chaotic thoughts', 'Rank quests by energy required', 'Remove unnecessary activities', 'Meditate for 10 minutes', 'Create a priority list', 'Clear your workspace', 'Plan next week'], missionTypes: ['text','text','text','timer','text','text','text'] },
        { id: 2, name: 'IDENTITY PEAK', color: '#4ecdc4', colorRgb: '78,205,196', icon: '🏔️', boss: { name: 'Golem of the Old Self', sprite: '🗿', hp: 120, difficulty: 2, attacks: ['Self-Criticism', 'Doubt', 'Fear of Change'] }, missions: ['Define your new identity', 'List actions your future self would take', 'Visualize success', 'Create a daily affirmation', 'Act as your future self', 'Share one change', 'Celebrate a victory'], missionTypes: ['text','text','text','text','text','text','text'] },
        { id: 3, name: 'ENVIRONMENT CITY', color: '#45b7d1', colorRgb: '69,183,209', icon: '🏰', boss: { name: 'Hydra of Bad Habits', sprite: '🐍', hp: 150, difficulty: 3, attacks: ['Temptation', 'Negative Routine', 'Toxic Influence'] }, missions: ['Organize your physical space', 'Remove distracting objects', 'Clear digital clutter', 'Set social boundaries', 'Create a morning ritual', 'Schedule breaks', 'Review your relationships'], missionTypes: ['text','text','text','text','timer','text','text'] },
        { id: 4, name: 'MOTIVATION DESERT', color: '#f9c74f', colorRgb: '249,199,79', icon: '🏜️', boss: { name: 'Phoenix of Despair', sprite: '🔥', hp: 140, difficulty: 3, attacks: ['Discouragement', 'Lack of Purpose', 'Exhaustion'] }, missions: ['Identify your purpose', 'Create a vision for the future', 'List meaningful rewards', 'Visualize reaching your goal', 'Find inspiration', 'Share your progress', 'Celebrate a small win'], missionTypes: ['text','text','text','text','text','text','text'] },
        { id: 5, name: 'SEA OF DISCIPLINE', color: '#4a4e69', colorRgb: '74,78,105', icon: '🌊', boss: { name: 'Kraken of Sloth', sprite: '🐙', hp: 160, difficulty: 4, attacks: ['Sloth', 'Excuses', 'Self-Deception'] }, missions: ['Create a morning routine', 'Follow a focused schedule', 'Exercise daily', 'Work in a focus block', 'Avoid distractions', 'Keep your space organized', 'Review your daily progress'], missionTypes: ['text','timer','timer','timer','text','text','text'] },
        { id: 6, name: 'CREATIVITY SKY', color: '#9d4edd', colorRgb: '157,78,221', icon: '☁️', boss: { name: 'Dragon of Creative Block', sprite: '🌩️', hp: 180, difficulty: 4, attacks: ['Creative Block', 'Perfectionism', 'Fear of Failure'] }, missions: ['Brainstorm ideas', 'Work on a daily creative project', 'Seek inspiration', 'Experiment without fear', 'Share your creation', 'Ask for feedback', 'Iterate and improve'], missionTypes: ['text','text','timer','text','text','text','text'] },
        { id: 7, name: 'FEAR INFERNO', color: '#f94144', colorRgb: '249,65,68', icon: '🔥', boss: { name: 'Demon of Anxiety', sprite: '😈', hp: 200, difficulty: 5, attacks: ['Anxiety', 'Panic', 'Paralysis'] }, missions: ['Take one gradual step toward a fear', 'Practice mindful breathing', 'Write in your fear journal', 'Create positive affirmations', 'Ask for support', 'Practice courage', 'Celebrate facing a fear'], missionTypes: ['text','timer','text','text','text','text','text'] },
        { id: 8, name: 'SKY OF HARMONY', color: '#90be6d', colorRgb: '144,190,109', icon: '🌈', boss: { name: 'Angel of Balance', sprite: '👼', hp: 250, difficulty: 5, attacks: ['Imbalance', 'Obsession', 'Burnout'] }, missions: ['Meditate daily', 'Balance work and life', 'Practice mindful self-care', 'Write down what you are grateful for', 'Connect with someone', 'Spend time in nature', 'Reflect on your week'], missionTypes: ['timer','text','timer','text','text','timer','text'] }
    ],
    dailyMissions: {
        categories: [
            { name: 'MINDFULNESS', color: '#4dff91', missions: [{ text:'Meditate on your breathing for 5 minutes',type:'timer',time:5},{ text:'Practice mindful breathing for 3 minutes',type:'timer',time:3},{ text:'Write down 3 things you are grateful for today',type:'text'},{ text:'Do a 2-minute body scan',type:'timer',time:2},{ text:'Observe your thoughts without judgment for 5 minutes',type:'timer',time:5}] },
            { name: 'PRODUCTIVITY', color: '#6c63ff', missions: [{ text:'Choose your 3 most important quests today',type:'text'},{ text:'Work in focus mode for 25 minutes',type:'timer',time:25},{ text:'Clear your email inbox',type:'text'},{ text:'Plan tomorrow before bed',type:'text'},{ text:'Remove 3 distractions from your workspace',type:'text'}] },
            { name: 'PHYSICAL WELLNESS', color: '#ff6b6b', missions: [{ text:'Stretch for 10 minutes this morning',type:'timer',time:10},{ text:'Walk outside for 15 minutes',type:'timer',time:15},{ text:'Drink 8 glasses of water today',type:'text'},{ text:'Prepare a healthy meal',type:'text'},{ text:'Practice good posture for 5 minutes',type:'timer',time:5}] },
            { name: 'PERSONAL GROWTH', color: '#ffd166', missions: [{ text:'Read 10 pages of a personal-growth book',type:'text'},{ text:'Reflect on what you learned today',type:'text'},{ text:'Practice a new skill for 15 minutes',type:'timer',time:15},{ text:'Choose one area to improve and make a plan',type:'text'},{ text:'Listen to an educational podcast for 20 minutes',type:'timer',time:20}] },
            { name: 'SOCIAL CONNECTION', color: '#4ecdc4', missions: [{ text:'Thank someone important to you',type:'text'},{ text:'Call or message someone you care about',type:'text'},{ text:'Practice active listening for 5 minutes',type:'timer',time:5},{ text:'Help someone without expecting anything back',type:'text'},{ text:'Share something positive online',type:'text'}] },
            { name: 'ORGANIZATION', color: '#9d4edd', missions: [{ text:'Organize one area of your home for 10 minutes',type:'timer',time:10},{ text:'Update your weekly calendar',type:'text'},{ text:'File pending documents',type:'text'},{ text:'Create an organized shopping or task list',type:'text'},{ text:'Organize your digital space for 15 minutes',type:'timer',time:15}] }
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

// ==================== ACHIEVEMENT SYSTEM ====================
const AchievementSystem = {
    achievements: [
        { id: 'first_task', name: '🌅 The First Step', description: 'Complete your first quest.', icon: '🌅', color: '#4dff91', condition: (state) => state.stats.totalTasksCompleted >= 1, onUnlock: () => PowerFeedback.showMessage('Your journey begins now.', 'var(--primary)') },
        { id: 'task_10', name: '⚡ Ten Steps', description: 'Complete 10 quests.', icon: '⚡', color: '#6c63ff', condition: (state) => state.stats.totalTasksCompleted >= 10, onUnlock: () => PowerFeedback.showMessage('Consistency is your weapon.', 'var(--secondary)') },
        { id: 'task_50', name: '🔥 Fifty Battles', description: 'Complete 50 quests.', icon: '🔥', color: '#ff6b6b', condition: (state) => state.stats.totalTasksCompleted >= 50, onUnlock: () => PowerFeedback.showMessage('Nothing can stop you now.', 'var(--danger)') },
        { id: 'task_100', name: '👑 Living Legend', description: 'Complete 100 quests.', icon: '👑', color: '#ffd700', condition: (state) => state.stats.totalTasksCompleted >= 100, onUnlock: () => PowerFeedback.showMessage('Your name will be remembered.', 'var(--gold)') },
        { id: 'streak_7', name: '🔥 Weeklong Streak', description: 'Build a 7-day streak.', icon: '🔥', color: '#ffd166', condition: (state) => state.stats.dailyStreak >= 7, onUnlock: () => PowerFeedback.showMessage('Seven days. Seven victories.', 'var(--warning)') },
        { id: 'streak_30', name: '🌋 Legendary Streak', description: 'Build a 30-day streak.', icon: '🌋', color: '#ffd700', condition: (state) => state.stats.dailyStreak >= 30, onUnlock: () => PowerFeedback.showMessage('Thirty days. One habit. One legend.', 'var(--gold)') },
        { id: 'first_region', name: '🗺️ Explorer', description: 'Complete your first region.', icon: '🗺️', color: '#4ecdc4', condition: (state) => Object.keys(state.completedRegions || {}).length >= 1, onUnlock: () => PowerFeedback.showMessage('A new world opens before you.', 'var(--info)') },
        { id: 'all_regions', name: '🌍 Conqueror', description: 'Complete every region.', icon: '🌍', color: '#ffd700', condition: (state) => Object.keys(state.completedRegions || {}).length >= 8, onUnlock: () => PowerFeedback.showMessage('You conquered your inner world.', 'var(--gold)') },
        { id: 'first_boss', name: '⚔️ Dragon Hunter', description: 'Defeat your first boss.', icon: '⚔️', color: '#ff6b6b', condition: (state) => (state.defeatedBosses?.length || 0) >= 1, onUnlock: () => PowerFeedback.showMessage('The first monster falls. Your confidence grows.', 'var(--danger)') },
        { id: 'all_bosses', name: '👹 Dragonslayer', description: 'Defeat every boss.', icon: '👹', color: '#ffd700', condition: (state) => (state.defeatedBosses?.length || 0) >= 8, onUnlock: () => PowerFeedback.showMessage('No monsters remain. Only you.', 'var(--gold)') },
        { id: 'level_5', name: '⭐ Warrior', description: 'Reach Level 5.', icon: '⭐', color: '#6c63ff', condition: (state) => state.stats.level >= 5, onUnlock: () => PowerFeedback.showMessage('Your power begins to awaken.', 'var(--secondary)') },
        { id: 'level_10', name: '🌟 Veteran', description: 'Reach Level 10.', icon: '🌟', color: '#ffd166', condition: (state) => state.stats.level >= 10, onUnlock: () => PowerFeedback.showMessage('You are not the hero who began this journey.', 'var(--warning)') },
        { id: 'level_25', name: '✨ Master', description: 'Reach Level 25.', icon: '✨', color: '#ffd700', condition: (state) => state.stats.level >= 25, onUnlock: () => PowerFeedback.showMessage('Mastery is quiet. You achieved it.', 'var(--gold)') },
        { id: 'first_complete_day', name: '🏆 Perfect Day', description: 'Complete all your daily quests for the first time.', icon: '🏆', color: '#ffd700', condition: (state) => state.stats.daysCompleted >= 1, onUnlock: () => PowerFeedback.showMessage('You won today. Win again tomorrow.', 'var(--gold)') },
        { id: 'complete_7_days', name: '📅 Perfect Week', description: 'Complete seven full days of quests.', icon: '📅', color: '#ffd700', condition: (state) => state.stats.daysCompleted >= 7, onUnlock: () => PowerFeedback.showMessage('A flawless week. You are unstoppable.', 'var(--gold)') }
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
        notification.style.zIndex = '10001';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 48px;">${achievement.icon}</div>
                <div style="flex: 1;">
                    <div style="color: ${achievement.color}; font-size: 10px; margin-bottom: 5px; letter-spacing: 2px;">🏆 ACHIEVEMENT UNLOCKED</div>
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
                <button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom: 20px;">← BACK TO MAP</button>
                <div style="display: flex; align-items: center; gap: 30px; margin-bottom: 40px; width: 100%; max-width: 1000px; margin-left: auto; margin-right: auto;">
                    <div style="font-size: 80px; color: var(--gold); text-shadow: 0 0 30px var(--gold);">🏆</div>
                    <div>
                        <h2 style="color: var(--gold); font-size: 28px; margin-bottom: 10px;">HALL OF FAME</h2>
                        <p style="color: #aaa; font-size: 14px;">You unlocked <span style="color: var(--gold); font-weight: bold;">${unlocked}</span> of <span style="color: var(--gold);">${total}</span> achievements</p>
                        <div style="width: 300px; height: 8px; background: rgba(255,215,0,0.2); margin-top: 15px; border: 1px solid var(--gold);"><div style="width: ${(unlocked/total)*100}%; height: 100%; background: var(--gold);"></div></div>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 25px; width: 100%; max-width: 1200px; margin: 0 auto;">
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
                                            <div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span style="color:#aaa; font-size:9px;">PROGRESS</span><span style="color:${ach.color}; font-size:9px;">${progress}/${maxProgress}</span></div>
                                            <div style="width:100%; height:6px; background:rgba(0,0,0,0.5); border:1px solid #3a3a5a;"><div style="width:${progressPercent}%; height:100%; background:${ach.color};"></div></div>
                                        </div>
                                    ` : '<div style="color:var(--primary); font-size:10px; margin-top:10px;">✓ UNLOCKED</div>'}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div style="text-align: center; margin-top: 40px;"><button class="ff-button" onclick="window.showScreen('world')" style="background: var(--gold); border-bottom-color: #b8860b;"><i class="fas fa-map"></i> CONTINUE YOUR ADVENTURE</button></div>
            </div>
        `;
    }
};

// ==================== POWER MODULE ====================
const ParticleSystem = {
    container: null,
    isActive: false,
    corruptionLevel: 0,

    init() {
        if (!document.querySelector('.particle-container')) {
            this.container = document.createElement('div');
            this.container.className = 'particle-container';
            document.body.appendChild(this.container);
        }
    },

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.init();
        this.generateParticles(80);
    },

    stop() {
        this.isActive = false;
        if (this.container) this.container.innerHTML = '';
    },

    setCorruptionLevel(level) {
        this.corruptionLevel = level || 0;
        if (this.isActive) {
            this.generateParticles(80);
        }
    },

    generateParticles(count) {
        if (!this.container) return;
        this.container.innerHTML = '';
        
        const corruptionRatio = CORRUPTION_LEVELS[this.corruptionLevel]?.particles || 0;
        
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            
            const isCorrupted = Math.random() < corruptionRatio;
            p.style.backgroundColor = isCorrupted ? '#b388ff' : '#4dff91';
            p.style.boxShadow = isCorrupted 
                ? '0 0 10px #b388ff' 
                : '0 0 10px #4dff91';
            
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 5 + 's';
            p.style.animationDuration = Math.floor(Math.random() * 10) + 10 + 's';
            this.container.appendChild(p);
        }
    }
};

const PowerMessages = {
    daily: ["✨ Your journey is changing you.", "⚡ You were stronger than your fear today.", "🌟 Fortune favors the brave.", "🌅 Your progress transforms the world.", "🔥 Every step brings your legend closer."],
    region: ["🗡️ Chaos yields to your will.", "🛡️ Every choice forges your identity.", "🏹 Distractions fall. Focus reigns.", "❤️ You are becoming the hero you chose to be.", "⚔️ You broke through your limit."],
    levelUp: ["⭐ Your power has grown.", "👑 The world recognizes your strength.", "🌠 You are stronger than yesterday.", "✨ Your legend keeps growing.", "💥 Your potential has no ceiling."],
    dayComplete: ["🏆 You conquered your world today.", "🌙 The day ends, but your power remains.", "🎯 New challenges await tomorrow. Celebrate today.", "🔥 This is your streak. This is your story.", "💪 You did more than finish quests. You shaped your destiny."],
    firstTask: ["🌅 The first step is the most important.", "⚡ Your journey begins now.", "✨ Something great lies ahead.", "🔥 Your inner warrior has awakened.", "💫 Energy flows through you."],
    combat: ["⚔️ Face your fear today.", "🛡️ The dragon is not your enemy. Doubt is.", "🔥 Breathe. The power is within you.", "🌪️ Chaos yields to an iron will.", "💥 A challenge worthy of your growth."],
    victory: ["👑 You shattered your limit.", "✨ You proved what you are made of.", "🏆 The boss has fallen. Your confidence rises.", "🌠 One less enemy. One more lesson.", "⚡ The world grows clearer around you."],
    achievement: ["🏆 Your name will be remembered.", "✨ You made history.", "🔥 Another achievement joins your legend.", "⭐ Your effort earned its reward."]
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
    clarity: { name: 'PATH OF CLARITY', description: 'Master mental chaos with arcane precision',
        regionThemes: { 1: 'DEEP MIND DUMP', 2: 'CLARITY-BASED IDENTITY', 3: 'CLEAR COGNITIVE NOISE', 4: 'MENTAL ENERGY AND REST', 5: 'QUICK-DECISION STREAKS', 6: 'RELEASE INTELLECTUAL CONTROL', 7: 'CREATE IMPERFECT IDEAS', 8: 'ACT WITHOUT EVERY ANSWER' },
        missionOverrides: {
            1: ['Write down what is clouding your mind', 'Rank your quests by importance', 'Remove one unnecessary commitment', 'Meditate for 10 minutes', 'Create a short priority list', 'Clear your workspace', 'Plan your next week'],
            2: ['Define the person you choose to become', 'List actions your future self would take', 'Visualize a meaningful win', 'Write a daily affirmation', 'Act as your future self today', 'Share one positive change', 'Celebrate a win'],
            3: ['Organize your physical space', 'Remove distracting objects', 'Clear digital clutter', 'Set a healthy boundary', 'Create a morning ritual', 'Schedule recovery breaks', 'Review the relationships in your life'],
        },
        motivationalMessages: ['Every clear choice moves your journey forward.', 'Small actions forge a stronger hero.', 'Protect your energy; it powers every quest.', 'Rest is part of becoming stronger.', 'What you focus on becomes your path.'] },
    discipline: { name: 'PATH OF DISCIPLINE', description: 'Forge habits with unbreakable resolve',
        regionThemes: { 1: 'BROKEN COMMITMENTS', 2: 'KEEP YOUR WORD', 3: 'STRUCTURED ENVIRONMENT', 4: 'ENERGY AS DUTY', 5: 'VISIBLE STREAKS', 6: 'CLEAR CONSEQUENCES', 7: 'STEADY PROGRESS', 8: 'ADVANCE WITHOUT MOTIVATION' },
        missionOverrides: {
            1: ['Write down what is clouding your mind', 'Rank your quests by importance', 'Remove one unnecessary commitment', 'Meditate for 10 minutes', 'Create a short priority list', 'Clear your workspace', 'Plan your next week'],
            2: ['Define the person you choose to become', 'List actions your future self would take', 'Visualize a meaningful win', 'Write a daily affirmation', 'Act as your future self today', 'Share one positive change', 'Celebrate a win'],
            3: ['Organize your physical space', 'Remove distracting objects', 'Clear digital clutter', 'Set a healthy boundary', 'Create a morning ritual', 'Schedule recovery breaks', 'Review the relationships in your life'],
        },
        motivationalMessages: ['Every clear choice moves your journey forward.', 'Small actions forge a stronger hero.', 'Protect your energy; it powers every quest.', 'Rest is part of becoming stronger.', 'What you focus on becomes your path.'] },
    energy: { name: 'PATH OF ENERGY', description: 'Restore your energy with divine healing',
        regionThemes: { 1: 'EMOTIONAL RELEASE', 2: 'CHOOSE SELF-CARE', 3: 'SOCIAL BOUNDARIES', 4: 'ENERGY AT THE CORE', 5: 'GENTLE STREAKS', 6: 'ASK FOR HELP', 7: 'CREATE FOR YOURSELF', 8: 'CHOOSE YOURSELF WITHOUT GUILT' },
        missionOverrides: {
            1: ['Write down what is clouding your mind', 'Rank your quests by importance', 'Remove one unnecessary commitment', 'Meditate for 10 minutes', 'Create a short priority list', 'Clear your workspace', 'Plan your next week'],
            2: ['Define the person you choose to become', 'List actions your future self would take', 'Visualize a meaningful win', 'Write a daily affirmation', 'Act as your future self today', 'Share one positive change', 'Celebrate a win'],
            3: ['Organize your physical space', 'Remove distracting objects', 'Clear digital clutter', 'Set a healthy boundary', 'Create a morning ritual', 'Schedule recovery breaks', 'Review the relationships in your life'],
        },
        motivationalMessages: ['Every clear choice moves your journey forward.', 'Small actions forge a stronger hero.', 'Protect your energy; it powers every quest.', 'Rest is part of becoming stronger.', 'What you focus on becomes your path.'] },
    resilience: { name: 'PATH OF RESILIENCE', description: 'Stand firm under pressure with unbreakable defenses',
        regionThemes: { 1: 'INVISIBLE BURDENS', 2: 'RESILIENCE, NOT ENDURANCE', 3: 'REMOVE OVERLOAD', 4: 'REQUIRED REST', 5: 'SELF-CARE STREAKS', 6: 'ASK FOR HELP', 7: 'EXPRESS YOURSELF', 8: 'RELEASE CONTROL' },
        missionOverrides: {
            1: ['Write down what is clouding your mind', 'Rank your quests by importance', 'Remove one unnecessary commitment', 'Meditate for 10 minutes', 'Create a short priority list', 'Clear your workspace', 'Plan your next week'],
            2: ['Define the person you choose to become', 'List actions your future self would take', 'Visualize a meaningful win', 'Write a daily affirmation', 'Act as your future self today', 'Share one positive change', 'Celebrate a win'],
            3: ['Organize your physical space', 'Remove distracting objects', 'Clear digital clutter', 'Set a healthy boundary', 'Create a morning ritual', 'Schedule recovery breaks', 'Review the relationships in your life'],
        },
        motivationalMessages: ['Every clear choice moves your journey forward.', 'Small actions forge a stronger hero.', 'Protect your energy; it powers every quest.', 'Rest is part of becoming stronger.', 'What you focus on becomes your path.'] },
    focus: { name: 'PATH OF FOCUS', description: 'Take down distractions with deadly accuracy',
        regionThemes: { 1: 'CLOSE OPEN LOOPS', 2: 'DO ONE THING WELL', 3: 'MINIMALISM', 4: 'DIRECTED ENERGY', 5: 'FOCUSED STREAKS', 6: 'LET GO', 7: 'MASTER ONE SKILL', 8: 'ACT WITHOUT HESITATION' },
        missionOverrides: {
            1: ['Write down what is clouding your mind', 'Rank your quests by importance', 'Remove one unnecessary commitment', 'Meditate for 10 minutes', 'Create a short priority list', 'Clear your workspace', 'Plan your next week'],
            2: ['Define the person you choose to become', 'List actions your future self would take', 'Visualize a meaningful win', 'Write a daily affirmation', 'Act as your future self today', 'Share one positive change', 'Celebrate a win'],
            3: ['Organize your physical space', 'Remove distracting objects', 'Clear digital clutter', 'Set a healthy boundary', 'Create a morning ritual', 'Schedule recovery breaks', 'Review the relationships in your life'],
        },
        motivationalMessages: ['Every clear choice moves your journey forward.', 'Small actions forge a stronger hero.', 'Protect your energy; it powers every quest.', 'Rest is part of becoming stronger.', 'What you focus on becomes your path.'] },
    balance: { name: 'PATH OF BALANCE', description: 'Balance your life with spiritual wisdom',
        regionThemes: { 1: 'ALIGN YOUR VALUES', 2: 'PURPOSEFUL IDENTITY', 3: 'RITUALS', 4: 'BODY AS A TEMPLE', 5: 'PRACTICAL STREAKS', 6: 'ACT WITHOUT CERTAINTY', 7: 'SHARE WISDOM', 8: 'LIVE YOUR VALUES' },
        missionOverrides: {
            1: ['Write down what is clouding your mind', 'Rank your quests by importance', 'Remove one unnecessary commitment', 'Meditate for 10 minutes', 'Create a short priority list', 'Clear your workspace', 'Plan your next week'],
            2: ['Define the person you choose to become', 'List actions your future self would take', 'Visualize a meaningful win', 'Write a daily affirmation', 'Act as your future self today', 'Share one positive change', 'Celebrate a win'],
            3: ['Organize your physical space', 'Remove distracting objects', 'Clear digital clutter', 'Set a healthy boundary', 'Create a morning ritual', 'Schedule recovery breaks', 'Review the relationships in your life'],
        },
        motivationalMessages: ['Every clear choice moves your journey forward.', 'Small actions forge a stronger hero.', 'Protect your energy; it powers every quest.', 'Rest is part of becoming stronger.', 'What you focus on becomes your path.'] },
    agility: { name: 'PATH OF AGILITY', description: 'Move swiftly between tasks with stealth',
        regionThemes: { 1: 'FALSE URGENCIES', 2: 'CALM IDENTITY', 3: 'REMOVE INTERRUPTIONS', 4: 'STEADY ENERGY', 5: 'FLEXIBLE STREAKS', 6: 'SLOW DOWN', 7: 'CREATE SLOWLY', 8: 'MINDFUL ACTION' },
        missionOverrides: {
            1: ['Write down what is clouding your mind', 'Rank your quests by importance', 'Remove one unnecessary commitment', 'Meditate for 10 minutes', 'Create a short priority list', 'Clear your workspace', 'Plan your next week'],
            2: ['Define the person you choose to become', 'List actions your future self would take', 'Visualize a meaningful win', 'Write a daily affirmation', 'Act as your future self today', 'Share one positive change', 'Celebrate a win'],
            3: ['Organize your physical space', 'Remove distracting objects', 'Clear digital clutter', 'Set a healthy boundary', 'Create a morning ritual', 'Schedule recovery breaks', 'Review the relationships in your life'],
        },
        motivationalMessages: ['Every clear choice moves your journey forward.', 'Small actions forge a stronger hero.', 'Protect your energy; it powers every quest.', 'Rest is part of becoming stronger.', 'What you focus on becomes your path.'] },
    transformation: { name: 'PATH OF TRANSFORMATION', description: 'Turn harmful habits into positive ones',
        regionThemes: { 1: 'REPEATED PATTERNS', 2: 'EVOLVING IDENTITY', 3: 'EXPERIMENTAL ENVIRONMENT', 4: 'ENERGY AS A RESOURCE', 5: 'EXPERIMENT STREAKS', 6: 'MAKE IT LAST', 7: 'BUILD SOMETHING REAL', 8: 'LAUNCH IMPERFECTLY' },
        missionOverrides: {
            1: ['Write down what is clouding your mind', 'Rank your quests by importance', 'Remove one unnecessary commitment', 'Meditate for 10 minutes', 'Create a short priority list', 'Clear your workspace', 'Plan your next week'],
            2: ['Define the person you choose to become', 'List actions your future self would take', 'Visualize a meaningful win', 'Write a daily affirmation', 'Act as your future self today', 'Share one positive change', 'Celebrate a win'],
            3: ['Organize your physical space', 'Remove distracting objects', 'Clear digital clutter', 'Set a healthy boundary', 'Create a morning ritual', 'Schedule recovery breaks', 'Review the relationships in your life'],
        },
        motivationalMessages: ['Every clear choice moves your journey forward.', 'Small actions forge a stronger hero.', 'Protect your energy; it powers every quest.', 'Rest is part of becoming stronger.', 'What you focus on becomes your path.'] }
};

const CLASS_TO_FOCUS = { 1: 'clarity', 2: 'discipline', 3: 'energy', 4: 'resilience', 5: 'focus', 6: 'balance', 7: 'agility', 8: 'transformation' };

const PathSystem = {
    getCurrentFocus() { return GameState.character ? CLASS_TO_FOCUS[GameState.character.id] : null; },
    getCurrentPath() { const f = this.getCurrentFocus(); return f ? CLASS_PATHS[f] : null; },
    getMissionText(r, i) {
        const p = this.getCurrentPath();
        const d = GAME_DATA.regions.find(x => x.id === r)?.missions || [];
        if (p?.missionOverrides?.[r]?.[i]) return p.missionOverrides[r][i];
        return d[i] || `Quest ${i + 1}`;
    },
    getRegionTheme(r) {
        const p = this.getCurrentPath();
        if (p?.regionThemes?.[r]) return p.regionThemes[r];
        return GAME_DATA.regions.find(x => x.id === r)?.name || `Region ${r}`;
    },
    getPathName() { return this.getCurrentPath()?.name || "CAMINO DEL AVENTURERO"; },
    getPathDescription() { return this.getCurrentPath()?.description || "Transform your life through adventure"; },
    getMotivationalMessage() { const p = this.getCurrentPath(); return p?.motivationalMessages?.[Math.floor(Math.random() * p.motivationalMessages.length)] || "Keep going, adventurer!"; },
    showClassNotification(m, i = '💡') {
        const c = GameState.character;
        const n = document.createElement('div');
        n.className = 'notification';
        n.style.borderLeftColor = c?.color || 'var(--primary)';
        n.innerHTML = `<div style="font-size:24px;color:${c?.color || 'var(--primary)'}">${i}</div><div style="font-size:12px;"><strong style="color:${c?.color || 'var(--primary)'}">${c?.name || 'Adventurer'}:</strong><br>${m}</div>`;
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
    
    corruptionLevel: 0,
    lastLoginDate: null,

    selectCharacter(id) {
        const c = GAME_DATA.characters.find(x => x.id === id);
        if (c) { this.character = c; this.save(); PathSystem.showClassNotification(`You chose ${PathSystem.getPathName()}`, '🎮'); return true; }
        return false;
    },
    
    init() {
        console.log("Initialized GameState...");
        this.load();
        this.checkDailyReset();
        this.generateDailyMissions();
        this.calculateCorruptionLevel();
        WorldTransformer.updateState(this.stats.dailyTasksCompleted);
        ParticleSystem.init();
        AchievementSystem.check(this);
        
        setTimeout(() => {
            AerilSystem.init();
            AerilSystem.setCorruptionLevel(this.corruptionLevel);
            AerilSystem.showWelcomeMessage();
            
            if (this.stats.dailyStreak >= 7) {
                AerilSystem.showStreakMessage(this.stats.dailyStreak);
            }
        }, 500);
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
                
                this.corruptionLevel = d.corruptionLevel || 0;
                this.lastLoginDate = d.lastLoginDate || null;
                
                if (this.stats.lastRegionMissionDate === undefined) this.stats.lastRegionMissionDate = null;
                if (this.stats.lastCompletedRegionDay === undefined) this.stats.lastCompletedRegionDay = null;
                if (this.stats.totalTasksCompleted === undefined) this.stats.totalTasksCompleted = 0;
                if (this.stats.daysCompleted === undefined) this.stats.daysCompleted = 0;
                if (this.character) { this.checkDailyReset(); PathSystem.showClassNotification('Game loaded', '💾'); }
            } catch (e) { console.error('Load error:', e); }
        }
    },
    
    save() {
        localStorage.setItem('goalquest_save', JSON.stringify({
            character: this.character, stats: this.stats, unlockedRegions: this.unlockedRegions,
            completedMissions: this.completedMissions, defeatedBosses: this.defeatedBosses,
            completedRegions: this.completedRegions, lastPlayedDate: this.lastPlayedDate,
            todayCompleted: this.todayCompleted, dailyMissionsState: this.dailyMissionsState,
            achievements: this.achievements,
            corruptionLevel: this.corruptionLevel,
            lastLoginDate: this.lastLoginDate,
            saveDate: new Date().toISOString()
        }));
    },
    
    calculateCorruptionLevel() {
        const today = new Date().toDateString();
        
        if (!this.lastLoginDate) {
            this.lastLoginDate = today;
            this.corruptionLevel = 0;
            this.save();
            return 0;
        }
        
        const lastDate = new Date(this.lastLoginDate);
        const currentDate = new Date(today);
        const daysDiff = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
        
        let newLevel = 0;
        
        if (daysDiff >= 3) {
            newLevel = 3;
        } else if (daysDiff === 2) {
            newLevel = 2;
        } else if (daysDiff === 1 || (daysDiff === 0 && this.stats.dailyTasksCompleted === 0)) {
            newLevel = 1;
        } else {
            newLevel = 0;
        }
        
        if (this.lastLoginDate !== today) {
            this.lastLoginDate = today;
        }
        
        if (newLevel !== this.corruptionLevel && newLevel > 0) {
            this.showCorruptionMessage(newLevel);
        }
        
        this.corruptionLevel = newLevel;
        this.save();
        return newLevel;
    },

    showCorruptionMessage(level) {
        const msg = CORRUPTION_MESSAGES[level];
        if (!msg) return;
        
        const notification = document.createElement('div');
        notification.className = 'notification corruption-notification';
        notification.style.borderLeftColor = CORRUPTION_LEVELS[level].color;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 32px; color: ${CORRUPTION_LEVELS[level].color};">⚠️</div>
                <div>
                    <div style="color: ${CORRUPTION_LEVELS[level].color}; font-size: 12px; font-weight: bold; margin-bottom: 5px;">${msg.title}</div>
                    <div style="color: #aaa; font-size: 10px;">${msg.message}</div>
                </div>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 4000);
    },

    checkCorruptionRecovery() {
        if (this.stats.dailyTasksCompleted >= 1 && this.corruptionLevel > 0) {
            const oldLevel = this.corruptionLevel;
            this.corruptionLevel = 0;
            this.save();
            
            AerilSystem.showRecoveryMessage();
            
            const notification = document.createElement('div');
            notification.className = 'notification recovery-notification';
            notification.style.borderLeftColor = '#4dff91';
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 32px; color: #4dff91;">✅</div>
                    <div>
                        <div style="color: #4dff91; font-size: 12px; font-weight: bold;">System stabilized.</div>
                        <div style="color: #aaa; font-size: 10px;">The Corruption has been contained.</div>
                    </div>
                </div>
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
            
            this.triggerRecoveryEffect();
        }
    },

    triggerRecoveryEffect() {
        const container = document.getElementById('game-container');
        if (container) {
            container.style.transition = 'box-shadow 0.3s ease';
            container.style.boxShadow = '0 0 50px #4dff91';
            setTimeout(() => {
                container.style.boxShadow = '';
            }, 1000);
        }
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
                PathSystem.showClassNotification(`DAY COMPLETE!`, '🏆');
                this.stats.exp += 50;
            } else {
                const r = this.stats.dailyTasksGoal - this.stats.dailyTasksCompleted;
                PathSystem.showClassNotification(`Quest Complete! ${r} remaining`, '✅');
            }
            
            this.checkLevelUp();
            this.checkCorruptionRecovery();
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
                if (diff === 1) { this.stats.dailyStreak++; PathSystem.showClassNotification(`🔥 Streak: ${this.stats.dailyStreak} days`, '🔥'); }
                else if (diff > 1) { this.stats.dailyStreak = 0; PathSystem.showClassNotification('Streak reset', '🔁'); }
            }
            if (this.lastPlayedDate && this.todayCompleted) { this.stats.exp += 50; this.stats.dailyExp += 50; PathSystem.showClassNotification('Daily bonus! +50 EXP', '⭐'); }
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
        if (this.isTodayCompleted()) { PathSystem.showClassNotification('Daily quests already complete!', '✅'); return null; }
        const a = this.getAvailableDailyMissions();
        if (i < 0 || i >= a.length) { PathSystem.showClassNotification('Quest unavailable', '❌'); return null; }
        const m = a[i];
        this.currentTask = { type: 'daily', missionId: m.id, missionText: m.text, missionType: m.type, category: m.category, categoryColor: m.categoryColor, time: m.time || 5, userInput: '', completed: false };
        if (m.type === 'timer') { this.taskTimerSeconds = m.time * 60; this.startTimer(); }
        return this.currentTask;
    },
    
    startRegionTask(r, i) {
        if (this.hasCompletedRegionMissionToday()) { PathSystem.showClassNotification('You already completed a region quest today!', '🌙'); return null; }
        const n = this.getNextAvailableMission(r);
        if (i !== n) { if (n === -1) PathSystem.showClassNotification('Region complete!', '🏆'); else PathSystem.showClassNotification(`Today: Day ${n + 1}`, '📅'); return null; }
        if (!this.isMissionAvailable(r, i)) { PathSystem.showClassNotification('Quest unavailable', '🔒'); return null; }
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
            if (this.taskTimerSeconds <= 0) { clearInterval(this.taskTimer); this.taskTimer = null; PathSystem.showClassNotification('Timer complete!', '⏰'); }
            const d = document.querySelector('.timer-display');
            if (d) { const m = Math.floor(this.taskTimerSeconds / 60); const s = this.taskTimerSeconds % 60; d.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`; }
        }, 1000);
    },
    
    saveUserInput(i) { if (this.currentTask) this.currentTask.userInput = i; return true; },
    
    completeTask() {
        if (!this.currentTask) return false;
        const { type, missionType, userInput } = this.currentTask;
        if (this.taskTimer) { clearInterval(this.taskTimer); this.taskTimer = null; }
        if (missionType === 'timer' && this.taskTimerSeconds > 0) { PathSystem.showClassNotification('Finish the timer first!', '⏰'); return false; }
        if (missionType === 'text' && (!userInput || userInput.trim().length < 5)) { PathSystem.showClassNotification('Enter at least 5 characters', '📝'); return false; }
        if (type === 'daily') return this.completeDailyMission(this.currentTask.missionId);
        if (type === 'region') return this.completeRegionMission(this.currentTask.regionId, this.currentTask.missionIndex);
        return false;
    },
    
    completeRegionMission(r, i) {
        if (this.hasCompletedRegionMissionToday()) { PathSystem.showClassNotification('You already completed a region quest today!', '🌙'); return false; }
        if (!this.isMissionAvailable(r, i)) { PathSystem.showClassNotification('Complete quests in order', '🔒'); return false; }
        const n = this.getNextAvailableMission(r);
        if (i !== n) { PathSystem.showClassNotification(`Today: Day ${n + 1}`, '📅'); return false; }
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
            
            PathSystem.showClassNotification(`Day ${i + 1} Complete! +25 XP`, '✅');
            if (i + 1 < 7) PathSystem.showClassNotification(`Tomorrow: Day ${i + 2}`, '📅');
            
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
            PathSystem.showClassNotification(`Level Up! Level ${this.stats.level}`, '⭐');
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
                PathSystem.showClassNotification(`Region ${r} Complete!`, '🔓');
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
        if (!this.isRegionCompleted(r)) { PathSystem.showClassNotification('Complete all 7 quests first', '❌'); return null; }
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
            c = `<div class="popup-icon" style="color:var(--warning)">⏰</div><h3 style="color:var(--warning);margin-bottom:20px;">${t.missionText}</h3><div class="timer-container"><div class="timer-display">${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}</div><div class="timer-buttons"><button class="ff-button" onclick="window.pauseResumeTimer()" style="background:var(--warning);">⏸️ PAUSE</button><button class="ff-button" onclick="window.resetTimer()" style="background:var(--danger);">🔄 RESET</button></div></div><button class="ff-button" onclick="window.finishTask()" style="margin-top:20px;">✅ COMPLETE QUEST</button>`;
        } else {
            c = `<div class="popup-icon" style="color:var(--primary)">📝</div><h3 style="color:var(--primary);margin-bottom:20px;">${t.missionText}</h3><textarea class="task-textarea" placeholder="Enter your reflection..." oninput="window.saveTaskInput(this.value)"></textarea><button class="ff-button" onclick="window.finishTask()" style="margin-top:20px;">✅ SAVE & COMPLETE</button>`;
        }
        const p = document.createElement('div');
        p.className = 'task-popup';
        p.innerHTML = `<div class="popup-content">${c}<button class="ff-button" onclick="window.closeTaskPopup()" style="margin-top:15px;background:var(--danger);">❌ CANCEL</button></div>`;
        document.body.appendChild(p);
    },
    
    showMotivationPopup() {
        const p = Math.min(100, (this.stats.dailyTasksCompleted / this.stats.dailyTasksGoal) * 100);
        const r = this.stats.dailyTasksGoal - this.stats.dailyTasksCompleted;
        const m = PathSystem.getMotivationalMessage();
        let t, msg, i, col;
        if (this.isTodayCompleted()) { t = "DAY COMPLETE! 🏆"; msg = "All daily quests complete. You are unstoppable."; i = "🏆"; col = "#ffd700"; }
        else if (p >= 80) { t = "ALMOST THERE! ⚡"; msg = `Only ${r} quest${r > 1 ? 's' : ''} left!`; i = "⚡"; col = "#ffd166"; }
        else if (p >= 50) { t = "KEEP IT UP! 🔥"; msg = `Llevas ${this.stats.dailyTasksCompleted} of ${this.stats.dailyTasksGoal}`; i = "🔥"; col = "#ff6b6b"; }
        else { t = "GREAT START! 🚀"; msg = `${this.stats.dailyTasksCompleted} quest${this.stats.dailyTasksCompleted !== 1 ? 's' : ''} complete`; i = "🚀"; col = "#4dff91"; }
        const pop = document.createElement('div');
        pop.className = 'task-popup';
        pop.innerHTML = `<div class="popup-content"><div class="popup-icon" style="color:${col}">${i}</div><h3 style="color:${col};margin-bottom:20px;">${t}</h3><p style="color:#f0f0f0;margin-bottom:30px;font-size:14px;">${msg}<br><br><em style="color:${GameState.character?.color || 'var(--primary)'}">${m}</em></p><div style="margin:20px 0;"><div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="font-size:10px;color:#aaa;">Progress</span><span style="font-size:10px;color:${col};">${this.stats.dailyTasksCompleted}/${this.stats.dailyTasksGoal}</span></div><div class="daily-progress-bar"><div class="daily-progress-fill" style="width:${p}%"><div class="daily-progress-text">${Math.round(p)}%</div></div></div></div><div style="display:flex;justify-content:center;gap:20px;margin-top:30px;"><div style="text-align:center;"><div style="color:#ffd166;font-size:12px;">Streak</div><div style="font-size:24px;color:#ffd166;">${this.stats.dailyStreak} days</div></div><div style="text-align:center;"><div style="color:#4dff91;font-size:12px;">Level</div><div style="font-size:24px;color:#4dff91;">${this.stats.level}</div></div></div><button class="ff-button" onclick="window.closeTaskPopup()" style="margin-top:30px;background:${col};">CONTINUE</button></div>`;
        document.body.appendChild(pop);
    },
    
    reset() {
        if (confirm('Reset all game progress?')) {
            this.character = null;
            this.stats = { hp: 100, mp: 100, exp: 0, level: 1, maxHp: 100, maxMp: 100, nextLevelExp: 100, dailyExp: 0, dailyStreak: 0, dailyTasksCompleted: 0, dailyTasksGoal: 5, lastRegionMissionDate: null, lastCompletedRegionDay: null, totalTasksCompleted: 0, daysCompleted: 0 };
            this.unlockedRegions = [1];
            this.completedMissions = {};
            this.defeatedBosses = [];
            this.completedRegions = {};
            this.dailyMissionsState = { lastGeneratedDate: null, availableMissions: [], completedDailyMissions: [] };
            this.achievements = {};
            this.corruptionLevel = 0;
            this.lastLoginDate = null;
            this.currentCombat = null;
            this.lastPlayedDate = null;
            this.todayCompleted = false;
            this.currentTask = null;
            if (this.taskTimer) { clearInterval(this.taskTimer); this.taskTimer = null; }
            localStorage.removeItem('goalquest_save');
            PathSystem.showClassNotification('Game reset', '🔄');
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
        
        this.applyCorruptionEffects(GameState.corruptionLevel);
        
        if (s === 'start') { 
            setTimeout(() => { 
                ParticleSystem.start(); 
                WorldTransformer.energizeTitle();
                
                if (window.AerilSystem) {
                    AerilSystem.setCorruptionLevel(GameState.corruptionLevel);
                }
            }, 100); 
        }
    },
    
    applyCorruptionEffects(level) {
        if (level === undefined || level === null) return;
        
        document.querySelectorAll('.corruption-overlay').forEach(el => el.remove());
        document.querySelectorAll('.glitch-line').forEach(el => el.remove());
        document.body.classList.remove('corruption-bg-2', 'corruption-bg-3');
        
        if (level === 0) {
            const gameScreen = document.querySelector('.game-screen');
            if (gameScreen) gameScreen.classList.remove('corruption-border-effect');
            return;
        }
        
        if (level >= 2) {
            document.body.classList.add(`corruption-bg-${level}`);
        }
        
        if (level >= 1) {
            const gameScreen = document.querySelector('.game-screen');
            if (gameScreen) gameScreen.classList.add('corruption-border-effect');
        }
        
        const overlay = document.createElement('div');
        overlay.className = `corruption-overlay level-${level}`;
        document.body.appendChild(overlay);
        
        if (level >= 2) {
            for (let i = 0; i < 3; i++) {
                const line = document.createElement('div');
                line.className = `glitch-line level-${level}`;
                line.style.top = `${Math.random() * 100}%`;
                line.style.animationDelay = `${Math.random() * 5}s`;
                document.body.appendChild(line);
            }
        }
        
        if (window.ParticleSystem) {
            ParticleSystem.setCorruptionLevel(level);
        }
        
        if (window.MusicSystem) {
            MusicSystem.setCorruptionLevel(level);
        }
    },
    
    renderStartScreen() {
        const p = GameState.character ? PathSystem.getPathName() : '';
        const hasCharacter = !!GameState.character;
        
        // Build the menu based on whether a character is selected
        let menuButtons = '';
        if (hasCharacter) {
            menuButtons = `
                <button class="menu-option" onclick="window.showScreen('world')"><i class="fas fa-play"></i><span>CONTINUE YOUR ADVENTURE</span></button>
                <button class="menu-option" onclick="window.showScreen('daily')"><i class="fas fa-calendar-day"></i><span>DAILY QUESTS (${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal})</span></button>
                <button class="menu-option" onclick="window.showScreen('characters')"><i class="fas fa-gamepad"></i><span>JUGAR AHORA (cambiar clase)</span></button>
                <button class="menu-option" onclick="window.showScreen('settings')"><i class="fas fa-cog"></i><span>SETTINGS</span></button>
            `;
        } else {
            menuButtons = `
                <button class="menu-option" onclick="window.showScreen('characters')"><i class="fas fa-gamepad"></i><span>▶ JUGAR AHORA</span></button>
                <button class="menu-option" onclick="window.showScreen('settings')"><i class="fas fa-cog"></i><span>SETTINGS</span></button>
            `;
        }

        return `
            <div class="game-screen active">
                <h1 class="game-title">GOALQUEST</h1>
                <p style="text-align:center;color:var(--warning);margin:20px 0;">A Real-Life Transformation RPG</p>
                ${hasCharacter ? `
                    <div style="text-align:center;margin-bottom:20px;">
                        <div style="font-size:40px;color:${GameState.character.color}">${GameState.character.icon}</div>
                        <div style="color:${GameState.character.color};font-size:16px;margin-top:10px;">${p}</div>
                        <div style="color:#aaa;font-size:12px;margin-top:5px;">${PathSystem.getPathDescription()}</div>
                    </div>
                ` : ''}
                <div class="ff-menu">
                    ${menuButtons}
                </div>
                ${hasCharacter && GameState.stats.dailyStreak > 0 ? `
                    <div style="text-align:center;color:var(--warning);margin-top:30px;">🔥 Streak: ${GameState.stats.dailyStreak} days</div>
                ` : ''}
                <div style="position:absolute;bottom:20px;width:100%;text-align:center;color:#666;font-size:10px;">© 2024 GOALQUEST</div>
            </div>
        `;
    },
    
    renderCharacterScreen() {
        return `<div class="game-screen active"><button class="ff-button" onclick="window.showScreen('start')" style="margin-bottom:20px;">← BACK</button><h2 style="color:var(--primary);text-align:center;margin:20px 0;">CHOOSE YOUR CHARACTER</h2><div class="character-grid">${GAME_DATA.characters.map(c => { const s = GameState.character?.id === c.id; const f = CLASS_TO_FOCUS[c.id]; const p = CLASS_PATHS[f]; const i = asset(ASSETS.classes[c.id]); return `<div class="character-card ${s ? 'selected' : ''}" onclick="window.selectCharacter(${c.id})" style="--char-color:${c.color};--char-color-rgb:${c.colorRgb}"><div style="display:flex;align-items:center;gap:15px;margin-bottom:15px;"><div style="width:64px;height:64px;border-radius:12px;overflow:hidden;border:2px solid rgba(255,255,255,0.2);background:rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;"><img src="${i}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML='<div style=\\'font-size:32px\\'>${c.icon}</div>';"></div><div><h3 style="color:${c.color}">${c.name}</h3><p style="font-size:10px;color:#aaa;">${c.skill}</p><p style="font-size:8px;color:${c.color};margin-top:5px;">${p?.name || 'Camino'}</p></div></div><p style="margin:15px 0;font-size:12px;color:#ccc;flex-grow:1;">${c.description}</p><div style="display:flex;justify-content:space-between;margin-top:auto;"><div style="text-align:center;"><div style="color:var(--danger);font-size:11px;">HP</div><div style="font-size:14px;">${c.hp}</div></div><div style="text-align:center;"><div style="color:var(--primary);font-size:11px;">MP</div><div style="font-size:14px;">${c.mp}</div></div><div style="text-align:center;"><div style="color:var(--warning);font-size:11px;">HAB.</div><div style="font-size:10px;">${c.abilities[0]}</div></div></div></div>`; }).join('')}</div>${GameState.character ? `<div style="text-align:center;margin-top:30px;"><button class="ff-button" onclick="window.startAdventure()"><i class="fas fa-play"></i> START</button></div>` : `<div style="text-align:center;color:var(--warning);margin-top:30px;">⚠️ Choose a character</div>`}</div>`;
    },
    
    renderStatusBar() {
        const s = GameState.stats;
        const c = GameState.character;
        const p = Math.min(100, (s.dailyTasksCompleted / s.dailyTasksGoal) * 100);
        const i = asset(c?.id && ASSETS.classes[c.id] ? ASSETS.classes[c.id] : ASSETS.classes[1]);
        return `<div class="status-bar"><div style="display:flex;align-items:center;gap:15px;"><div style="width:48px;height:48px;border-radius:12px;overflow:hidden;border:2px solid rgba(255,255,255,0.2);background:rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;"><img src="${i}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML='<div style=\\'font-size:28px\\'>${c?.icon || '👤'}</div>';"></div><div><div style="color:var(--primary);font-weight:bold;">${c?.name || 'No character'}</div><div style="font-size:10px;color:#aaa;">${PathSystem.getPathName()}</div><div style="font-size:10px;color:var(--warning);">Level ${s.level}</div><div style="font-size:9px;color:var(--warning);">EXP: ${s.dailyExp}</div><div style="font-size:9px;color:${GameState.isTodayCompleted() ? 'var(--primary)' : 'var(--info)'};">${GameState.isTodayCompleted() ? '🏆 Day complete' : `📝 ${s.dailyTasksCompleted}/${s.dailyTasksGoal}`}</div>${GameState.hasCompletedRegionMissionToday() ? `<div style="font-size:9px;color:var(--warning);margin-top:5px;">🌙 Region complete</div>` : ''}</div></div><div style="display:flex;gap:20px;align-items:center;"><div><div style="font-size:10px;color:var(--danger);">HP</div><div class="stat-bar hp-bar"><div class="stat-fill" style="width:${(s.hp/s.maxHp)*100}%"><div class="stat-text">${s.hp}/${s.maxHp}</div></div></div></div><div><div style="font-size:10px;color:var(--primary);">MP</div><div class="stat-bar mp-bar"><div class="stat-fill" style="width:${(s.mp/s.maxMp)*100}%"><div class="stat-text">${s.mp}/${s.maxMp}</div></div></div></div><div><div style="font-size:10px;color:var(--warning);">EXP</div><div class="stat-bar exp-bar"><div class="stat-fill" style="width:${(s.exp/s.nextLevelExp)*100}%"><div class="stat-text">${s.exp}/${s.nextLevelExp}</div></div></div></div><div><div style="font-size:10px;color:var(--info);text-align:center;">DAILY</div><div class="daily-progress-bar"><div class="daily-progress-fill" style="width:${p}%"><div class="daily-progress-text">${s.dailyTasksCompleted}/${s.dailyTasksGoal}</div></div></div></div></div></div>`;
    },
    
    renderWorldScreen() {
        if (!GameState.character) { this.showScreen('characters'); return ''; }
        const p = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
        return `<div class="game-screen active">${this.renderStatusBar()}<h2 style="color:var(--primary);text-align:center;margin:20px 0;">${PathSystem.getPathName()}</h2><p style="text-align:center;color:#aaa;margin-bottom:10px;font-size:12px;">${PathSystem.getPathDescription()}</p><div class="daily-progress-container"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;"><div><div style="color:var(--warning);font-size:14px;">DAILY PROGRESS</div><div style="color:#aaa;font-size:10px;">${GameState.isTodayCompleted() ? '✅ Complete' : `${GameState.stats.dailyTasksGoal - GameState.stats.dailyTasksCompleted} remaining`}</div></div><div style="color:var(--warning);font-size:16px;">${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal}</div></div><div class="daily-progress-bar" style="width:100%;"><div class="daily-progress-fill" style="width:${p}%"><div class="daily-progress-text">${Math.round(p)}%</div></div></div>${GameState.isTodayCompleted() ? `<div style="color:var(--primary);text-align:center;margin-top:15px;font-size:12px;">🏆 Day complete</div>` : `<div style="color:var(--info);text-align:center;margin-top:15px;font-size:12px;">💪 Complete ${GameState.stats.dailyTasksGoal} quests</div>`}${GameState.hasCompletedRegionMissionToday() ? `<div style="color:var(--warning);text-align:center;margin-top:15px;font-size:12px;">🌙 Region Quest Complete</div>` : ''}<div class="button-container"><button class="ff-button" onclick="window.showScreen('daily')" style="padding:10px 20px;font-size:12px;">📅 DAILY QUESTS</button><button class="ff-button" onclick="window.showScreen('achievements')" style="padding:10px 20px;font-size:12px;background:var(--gold);">🏆 ACHIEVEMENTS</button></div></div><p style="text-align:center;color:#aaa;margin-bottom:30px;">7 quests per region to unlock the boss</p><div class="map-grid">${GAME_DATA.regions.map(r => { const u = GameState.isRegionUnlocked(r.id); const c = GameState.completedMissions[r.id]?.filter(m => m).length || 0; const ic = GameState.isRegionCompleted(r.id); const bd = GameState.isBossDefeated(r.id); const t = PathSystem.getRegionTheme(r.id); const img = asset(ASSETS.acts[r.id]); const n = GameState.getNextAvailableMission(r.id); return `<div class="region-tile ${u ? '' : 'locked'}" onclick="${u ? `window.enterRegion(${r.id})` : ''}" style="--region-color:${r.color};--region-color-rgb:${r.colorRgb}"><div><div style="width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-bottom:10px;"><img src="${img}" style="width:100%;height:100%;object-fit:cover;image-rendering:pixelated;" onerror="this.onerror=null;this.remove();this.parentElement.innerHTML='<div style=\\'font-size:40px;padding:10px;\\'>${r.icon}</div>';"></div><h4 style="color:${r.color};">${t}</h4><p style="color:#666;font-size:10px;margin-top:5px;">${r.name}</p></div>${u ? `<div style="margin:15px 0;"><div style="background:rgba(0,0,0,0.3);border-radius:5px;height:8px;"><div style="height:100%;background:${r.color};border-radius:5px;width:${(c/7)*100}%;"></div></div><div style="font-size:10px;color:#aaa;margin-top:5px;">${c}/7 quests</div>${!GameState.hasCompletedRegionMissionToday() && n !== -1 && !ic ? `<div style="font-size:9px;color:var(--warning);margin-top:5px;">🔥 Today: Day ${n+1}</div>` : ''}</div>${ic && !bd ? `<button class="ff-button" onclick="window.startCombat(${r.id});event.stopPropagation();" style="padding:8px 15px;font-size:11px;background:var(--danger);margin:5px 0;">⚔️ BOSS</button>` : ''}${bd ? `<div style="color:var(--warning);font-size:12px;margin-top:10px;">👑 Defeated</div>` : ''}${!ic ? `<div style="color:var(--primary);font-size:10px;margin-top:10px;">🎯 ${7-c} remaining</div>` : ''}` : `<div style="font-size:30px;margin:10px 0;">🔒</div><div style="font-size:10px;color:#aaa;">Complete the previous region</div>`}</div>`; }).join('')}</div><div class="button-container"><button class="ff-button" onclick="window.showScreen('daily')">📅 DAILY QUESTS</button><button class="ff-button" onclick="window.showScreen('rest')">🔥 REST</button><button class="ff-button" onclick="window.showScreen('start')">🏠 MENU</button></div></div>`;
    },
    
    renderDailyMissionsScreen() {
        if (!GameState.character) { this.showScreen('characters'); return ''; }
        GameState.generateDailyMissions();
        const a = GameState.getAvailableDailyMissions();
        const p = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
        return `<div class="game-screen active"><button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom:20px;">← BACK</button><div class="daily-missions-header"><div style="font-size:50px;color:var(--warning)">📅</div><div><h2 style="color:var(--warning);">DAILY QUESTS</h2><p style="color:#aaa;font-size:12px;">${GameState.dailyMissionsState.availableMissions.length} available today</p>${GameState.isTodayCompleted() ? '<p style="color:var(--primary);font-size:11px;margin-top:5px;">🏆 Day complete</p>' : `<p style="color:var(--warning);font-size:11px;margin-top:5px;">📝 ${GameState.stats.dailyTasksGoal - GameState.stats.dailyTasksCompleted} available</p>`}</div></div><div class="daily-progress-box"><div style="display:flex;justify-content:space-between;margin-bottom:10px;"><div style="color:var(--warning);">PROGRESS</div><div style="color:var(--warning);">${GameState.stats.dailyTasksCompleted}/${GameState.stats.dailyTasksGoal}</div></div><div class="daily-progress-bar" style="width:100%;"><div class="daily-progress-fill" style="width:${p}%;"></div></div><div style="color:var(--info);text-align:center;margin-top:10px;font-size:12px;">+50 EXP for completing the day</div></div><h3 style="color:var(--primary);margin-bottom:20px;text-align:center;">TODAY'S QUESTS</h3>${a.length > 0 ? `<div class="daily-mission-list">${a.map((m,i) => `<div class="daily-mission-item available" onclick="window.startDailyTask(${i})"><div style="width:24px;height:24px;border:2px solid ${m.categoryColor};border-radius:5px;display:flex;align-items:center;justify-content:center;">${m.type === 'timer' ? '⏰' : '📝'}</div><div style="flex:1;"><div style="color:var(--warning);font-size:12px;">${m.text}${m.type === 'timer' ? ` (${m.time} min)` : ''}</div><div style="color:${m.categoryColor};">${m.category}</div></div></div>`).join('')}</div><div style="text-align:center;margin-top:30px;color:#aaa;font-size:11px;">⭐ +25 EXP per quest</div>` : '<div style="background:rgba(26,26,46,0.95);padding:40px;text-align:center;border:2px solid var(--primary);"><div style="font-size:60px;color:var(--primary);">🏆</div><h3 style="color:var(--primary);">ALL QUESTS COMPLETE!</h3></div>'}<div class="button-container" style="margin-top:30px;"><button class="ff-button" onclick="window.showScreen('world')"><i class="fas fa-map"></i> BACK</button></div></div>`;
    },
    
    renderRegionScreen(r) {
        const rg = GAME_DATA.regions.find(x => x.id === r);
        if (!rg || !GameState.isRegionUnlocked(r)) { PathSystem.showClassNotification('Region locked', '🔒'); this.showScreen('world'); return ''; }
        const c = GameState.completedMissions[r] || [];
        const t = PathSystem.getRegionTheme(r);
        const n = GameState.getNextAvailableMission(r);
        const h = GameState.hasCompletedRegionMissionToday();
        return `<div class="game-screen active"><button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom:20px;">← BACK</button><div style="display:flex;align-items:center;justify-content:center;gap:20px;margin-bottom:30px;flex-wrap:wrap;"><div style="font-size:50px;color:${rg.color};">${rg.icon}</div><div><h2 style="color:${rg.color};">${t}</h2><p style="color:#666;font-size:12px;">${rg.name} | Difficulty: ${rg.boss.difficulty}</p><p style="color:var(--info);font-size:11px;margin-top:5px;">${c.filter(m => m).length}/7 quests</p>${h ? '<p style="color:var(--warning);font-size:11px;margin-top:5px;">🌙 Quest completed today</p>' : ''}${!h && n !== -1 ? `<p style="color:var(--warning);font-size:11px;margin-top:5px;">🔥 Today: Day ${n+1}</p>` : ''}${n === -1 && c.length === 7 ? '<p style="color:var(--primary);font-size:11px;margin-top:5px;">🏆 Challenge the boss!</p>' : ''}</div></div><h3 style="color:var(--primary);margin-bottom:20px;text-align:center;">WEEKLY QUESTS</h3><div class="mission-list">${Array.from({length:7}).map((_,i) => { const ic = c[i]; const isNext = i === n; const can = !h && !ic && isNext; const mt = PathSystem.getMissionText(r, i); let s = ''; if (ic) s = '<div style="color:var(--primary);font-size:10px;">✅ +25 EXP</div>'; else if (can) s = '<div style="color:var(--warning);font-size:10px;">🔥 AVAILABLE</div>'; else if (isNext && h) s = '<div style="color:var(--warning);font-size:10px;">🌙 Return tomorrow</div>'; else if (isNext) s = '<div style="color:var(--info);font-size:10px;">⏳ Tomorrow</div>'; else if (!ic && i < n) s = '<div style="color:var(--primary);font-size:10px;">✅ Complete</div>'; else if (!ic && i > n) s = '<div style="color:#aaa;font-size:10px;">🔒 Previous</div>'; return `<div class="mission-item ${ic ? 'completed' : ''} ${can ? 'today' : ''}" onclick="${can ? `window.startRegionTask(${r},${i})` : ''}"><div style="width:24px;height:24px;border:2px solid ${rg.color};border-radius:5px;display:flex;align-items:center;justify-content:center;background:${ic ? rg.color : 'transparent'};">${ic ? '✓' : isNext ? '🔥' : (rg.missionTypes[i] === 'timer' ? '⏰' : '📝')}</div><div style="flex:1;"><div style="color:${ic ? rg.color : (can ? 'var(--warning)' : 'white')};">Day ${i+1}: ${mt}</div>${s}</div></div>`; }).join('')}</div>${c.length === 7 && !GameState.isBossDefeated(r) ? `<div class="button-container" style="margin-top:30px;"><button class="ff-button" onclick="window.startCombat(${r})" style="background:var(--danger);">⚔️ CHALLENGE ${rg.boss.name}</button></div>` : ''}${c.length === 7 && GameState.isBossDefeated(r) ? `<div style="text-align:center;margin-top:30px;"><div style="color:var(--warning);padding:15px;background:rgba(255,209,102,0.1);border-radius:10px;border:2px solid var(--warning);">👑 Boss defeated</div></div>` : ''}<div class="button-container" style="margin-top:30px;"><button class="ff-button" onclick="window.showScreen('daily')" style="background:var(--warning);"><i class="fas fa-calendar-day"></i> DAILY QUESTS</button></div></div>`;
    },
    
    renderCombatScreen() {
        if (!GameState.currentCombat) { this.showScreen('world'); return ''; }
        const c = GameState.currentCombat;
        const r = GAME_DATA.regions.find(x => x.id === c.regionId);
        return `<div class="game-screen active"><button class="ff-button" onclick="window.fleeCombat()" style="margin-bottom:20px;">🏃 FLEE</button><div class="combat-arena"><div class="combat-context">⚔️ Face your fear today. ⚔️</div><h2 style="color:var(--danger);text-align:center;">VS ${r.boss.name}</h2><div style="display:flex;justify-content:space-around;margin:30px 0;flex-wrap:wrap;"><div style="text-align:center;"><div style="font-size:60px;">${GameState.character?.icon}</div><div>${GameState.character?.name}</div><div class="stat-bar hp-bar"><div class="stat-fill" style="width:${(c.playerHp/GameState.stats.maxHp)*100}%;"><div class="stat-text">${c.playerHp}/${GameState.stats.maxHp}</div></div></div></div><div style="font-size:40px;color:var(--danger);">⚔️</div><div style="text-align:center;"><div style="font-size:60px;">${r.boss.sprite}</div><div>${r.boss.name}</div><div class="stat-bar hp-bar"><div class="stat-fill" style="width:${(c.enemy.currentHp/c.enemy.hp)*100}%;"><div class="stat-text">${c.enemy.currentHp}/${c.enemy.hp}</div></div></div></div></div><div class="button-container" style="grid-template-columns:repeat(3,1fr);"><button class="ff-button" onclick="window.performAttack('weak')">⚡ LIGHT<br><small>10+EXP/10</small></button><button class="ff-button" onclick="window.performAttack('medium')">💥 MEDIUM<br><small>20+EXP/5</small></button><button class="ff-button" onclick="window.performAttack('strong')">🔥 HEAVY<br><small>30+EXP/3</small></button></div></div></div>`;
    },
    
    renderRestScreen() {
        const p = Math.min(100, (GameState.stats.dailyTasksCompleted / GameState.stats.dailyTasksGoal) * 100);
        return `<div class="game-screen active"><button class="ff-button" onclick="window.showScreen('world')" style="margin-bottom:20px;">← BACK</button><div style="text-align:center;margin:50px 0;"><div style="font-size:100px;">🔥</div><h2 style="color:var(--warning);">CAMP</h2><button class="ff-button" onclick="window.restAction()" style="font-size:16px;padding:20px 40px;">💤 REST<br><small>+30 HP, +10 MP</small></button></div><div style="background:rgba(26,26,46,0.95);border-radius:20px;padding:30px;border:3px solid var(--primary);"><h3 style="color:var(--warning);text-align:center;">STATUS</h3><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;"><div style="text-align:center;"><div style="color:var(--danger);">HP</div><div style="font-size:24px;">${GameState.stats.hp}/${GameState.stats.maxHp}</div></div><div style="text-align:center;"><div style="color:var(--primary);">MP</div><div style="font-size:24px;">${GameState.stats.mp}/${GameState.stats.maxMp}</div></div><div style="text-align:center;"><div style="color:var(--warning);">LEVEL</div><div style="font-size:24px;">${GameState.stats.level}</div></div><div style="text-align:center;"><div style="color:var(--secondary);">STREAK</div><div style="font-size:24px;">${GameState.stats.dailyStreak} days</div></div></div>${GameState.hasCompletedRegionMissionToday() ? '<div style="color:var(--warning);text-align:center;margin-top:20px;">🌙 Region complete</div>' : ''}</div></div>`;
    },
    
    renderSettingsScreen() {
        return `<div class="game-screen active"><button class="ff-button" onclick="window.showScreen('start')" style="margin-bottom:20px;">← BACK</button><h2 style="color:var(--primary);margin:30px 0;">SETTINGS</h2><div class="ff-menu"><div style="margin:20px 0;"><div style="color:var(--primary);">DAILY QUESTS (${GameState.stats.dailyTasksGoal})</div><input type="range" min="3" max="10" value="${GameState.stats.dailyTasksGoal}" onchange="window.changeDailyGoal(this.value)" style="width:100%;"></div><button class="ff-button" onclick="window.resetGame()" style="width:100%;background:var(--danger);">🔄 RESET</button></div></div>`;
    }
};

// ==================== FUNCIONES GLOBALES ====================
window.showScreen = (s, d) => RenderEngine.showScreen(s, d);
window.selectCharacter = (id) => { if (GameState.selectCharacter(id)) RenderEngine.showScreen('characters'); };
window.startAdventure = () => { if (!GameState.character) { PathSystem.showClassNotification('Choose a character', '❌'); return; } GameState.save(); RenderEngine.showScreen('world'); PathSystem.showClassNotification(`Welcome, ${GameState.character.name}!`, '🚀'); };
window.enterRegion = (id) => RenderEngine.showScreen('region', id);
window.startDailyTask = (i) => { if (GameState.startDailyTask(i)) GameState.showTaskPopup(GameState.currentTask); };
window.startRegionTask = (r, i) => { if (GameState.startRegionTask(r, i)) GameState.showTaskPopup(GameState.currentTask); };
window.saveTaskInput = (v) => GameState.saveUserInput(v);
window.finishTask = () => { if (GameState.completeTask()) { window.closeTaskPopup(); RenderEngine.showScreen(GameState.currentTask?.type === 'daily' ? 'daily' : (GameState.currentTask?.type === 'region' ? 'region' : 'world'), GameState.currentTask?.regionId); } };
window.pauseResumeTimer = () => { if (GameState.taskTimer) { clearInterval(GameState.taskTimer); GameState.taskTimer = null; } else GameState.startTimer(); };
window.resetTimer = () => { if (GameState.currentTask?.missionType === 'timer') { GameState.taskTimerSeconds = (GameState.currentTask.time || 5) * 60; if (GameState.taskTimer) { clearInterval(GameState.taskTimer); GameState.startTimer(); } } };
window.closeTaskPopup = () => { document.querySelector('.task-popup')?.remove(); if (GameState.taskTimer) { clearInterval(GameState.taskTimer); GameState.taskTimer = null; } GameState.currentTask = null; };
window.startCombat = (id) => { if (GameState.startCombat(id)) { RenderEngine.showScreen('combat'); PathSystem.showClassNotification(`Battle!`, '⚔️'); } };
window.performAttack = (t) => { const r = GameState.combatAttack(t); if (r) { if (r.victory) setTimeout(() => { RenderEngine.showScreen('world'); }, 1000); else setTimeout(() => { GameState.enemyTurn(); RenderEngine.showScreen('combat'); if (GameState.currentCombat?.playerHp <= 0) { setTimeout(() => { GameState.currentCombat = null; RenderEngine.showScreen('world'); }, 1000); } }, 1000); } };
window.fleeCombat = () => { if (confirm('Flee? -10% EXP')) { GameState.stats.exp = Math.max(0, Math.floor(GameState.stats.exp * 0.9)); GameState.currentCombat = null; RenderEngine.showScreen('world'); } };
window.restAction = () => { const r = GameState.rest(); PathSystem.showClassNotification(`+${r.hp} HP, +${r.mp} MP`, '💤'); RenderEngine.showScreen('rest'); };
window.changeDailyGoal = (g) => { GameState.stats.dailyTasksGoal = parseInt(g); GameState.save(); RenderEngine.showScreen('settings'); };
window.resetGame = () => { if (GameState.reset()) RenderEngine.showScreen('start'); };

// ==================== INITIALIZATION ====================
window.GameState = GameState;
window.ParticleSystem = ParticleSystem;
window.MusicSystem = MusicSystem;
window.AerilSystem = AerilSystem;
window.CORRUPTION_LEVELS = CORRUPTION_LEVELS;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        if (ls) {
            ls.style.opacity = '0';
            setTimeout(() => {
                ls.style.display = 'none';
                GameState.init();
                RenderEngine.showScreen('start');
                MusicSystem.init();
            }, 300);
        }
    }, 1500);
});
