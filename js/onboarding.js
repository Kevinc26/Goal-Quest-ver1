// ==================== GOALQUEST - SISTEMA DE ONBOARDING ====================
// Versión: 1.0
// Primera impresión. Identidad. Llamado a la aventura.
// ============================================================================

const OnboardingSystem = {
    // Flag en localStorage
    STORAGE_KEY: 'goalquest_onboarding_seen',
    
    // Textos épicos - NO MODIFICAR SIN CONVICCIÓN
    screens: [
        {
            icon: '⚔️',
            title: '¿QUÉ ES GOALQUEST?',
            text: '<span class="onboarding-highlight">Un RPG de vida real.</span><br>Tus objetivos son misiones. Tu progreso es real. No es un juego. Es tu historia.'
        },
        {
            icon: '📜',
            title: 'CÓMO FUNCIONA',
            text: 'Eliges una clase que resuena contigo. Recibes misiones reales. Las cumples.<br><span class="onboarding-highlight">Ganas EXP. Subes nivel. Te conviertes.</span>'
        },
        {
            icon: '🦁',
            title: 'IDENTIDAD',
            text: 'No se trata de lo que haces.<br>Se trata de <span class="onboarding-highlight">quien eliges ser</span>.<br>Cada misión no es una tarea. Es un paso hacia tu nueva identidad.'
        },
        {
            icon: '🌅',
            title: 'EL MUNDO TE ESPERA',
            text: 'El caos reina cuando dejamos de avanzar.<br>La fortuna sonríe a los valientes.<br><span class="onboarding-highlight" style="font-size: 20px;">Hoy empiezas.</span>'
        }
    ],

    // Verificar si ya vio onboarding
    hasSeenOnboarding() {
        return localStorage.getItem(this.STORAGE_KEY) === 'true';
    },

    // Marcar como visto
    markAsSeen() {
        localStorage.setItem(this.STORAGE_KEY, 'true');
    },

    // Reiniciar onboarding (para pruebas)
    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
    },

    // Renderizar pantalla actual
    renderScreen(index) {
        const screen = this.screens[index];
        const total = this.screens.length;
        
        // Crear dots de progreso
        let dots = '';
        for (let i = 0; i < total; i++) {
            dots += `<div class="onboarding-dot ${i === index ? 'active' : ''}"></div>`;
        }

        return `
            <div class="onboarding-overlay">
                <div class="onboarding-container">
                    <div class="onboarding-icon">${screen.icon}</div>
                    <h1 class="onboarding-title">${screen.title}</h1>
                    <div class="onboarding-text">
                        ${screen.text}
                    </div>
                    
                    <div class="onboarding-progress">
                        ${dots}
                    </div>
                    
                    ${index < total - 1 ? `
                        <button class="onboarding-button" onclick="OnboardingSystem.next()">
                            CONTINUAR
                        </button>
                        <div class="onboarding-skip" onclick="OnboardingSystem.skip()">
                            Omitir introducción
                        </div>
                    ` : `
                        <button class="onboarding-button" onclick="OnboardingSystem.start()">
                            COMENZAR MI CAMINO
                        </button>
                    `}
                </div>
            </div>
        `;
    },

    // Siguiente pantalla
    next() {
        const currentHash = window.location.hash;
        const currentIndex = parseInt(currentHash.replace('#onboarding-', '')) || 0;
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < this.screens.length) {
            window.location.hash = `onboarding-${nextIndex}`;
            this.update();
        }
    },

    // Saltar onboarding
    skip() {
        this.markAsSeen();
        window.location.hash = '';
        this.destroy();
        
        // Iniciar el juego normalmente
        if (typeof GameState !== 'undefined' && GameState.character) {
            RenderEngine.showScreen('world');
        } else {
            RenderEngine.showScreen('start');
        }
    },

    // Comenzar aventura
    start() {
        this.markAsSeen();
        window.location.hash = '';
        this.destroy();
        
        // Ir a selección de personaje
        RenderEngine.showScreen('characters');
        
        // Mensaje épico (solo primera vez)
        setTimeout(() => {
            if (typeof PowerFeedback !== 'undefined') {
                PowerFeedback.showMessage('Tu leyenda comienza ahora.', 'var(--warning)');
                PowerFeedback.flash('rgba(255, 215, 0, 0.5)');
            }
        }, 500);
    },

    // Actualizar DOM
    update() {
        const container = document.getElementById('game-container');
        const currentHash = window.location.hash;
        const currentIndex = parseInt(currentHash.replace('#onboarding-', '')) || 0;
        
        if (currentIndex >= 0 && currentIndex < this.screens.length) {
            container.innerHTML = this.renderScreen(currentIndex);
        }
    },

    // Destruir onboarding
    destroy() {
        const overlay = document.querySelector('.onboarding-overlay');
        if (overlay) {
            overlay.style.animation = 'onboardingFadeIn 0.3s ease reverse';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    },

    // Iniciar onboarding
    init() {
        // Si ya vio onboarding, no mostrar
        if (this.hasSeenOnboarding()) {
            return false;
        }

        // Configurar hash inicial
        window.location.hash = 'onboarding-0';
        
        // Renderizar primera pantalla
        const container = document.getElementById('game-container');
        container.innerHTML = this.renderScreen(0);
        
        // Escuchar cambios en hash
        window.addEventListener('hashchange', () => {
            this.update();
        });

        return true;
    }
};

// Exponer globalmente
window.OnboardingSystem = OnboardingSystem;
