// ==================== GOALQUEST - SISTEMA DE ONBOARDING ====================
// Versión: 1.3 - DEBUG (muestra errores en consola)
// ============================================================================

const OnboardingSystem = {
    STORAGE_KEY: 'goalquest_onboarding_seen',
    
    screens: [
        {
            icon: '⚔️🛡️',
            title: '¿QUÉ ES GOALQUEST?',
            text: '<span class="onboarding-highlight">Un RPG de vida real.</span><br>Tus objetivos son misiones. Tu progreso es real. No es un juego. Es tu historia.'
        },
        {
            icon: '📜⚡',
            title: 'CÓMO FUNCIONA',
            text: 'Eliges una clase que resuena contigo. Recibes misiones reales. Las cumples.<br><span class="onboarding-highlight">Ganas EXP. Subes nivel. Te conviertes.</span>'
        },
        {
            icon: '🦁👑',
            title: 'IDENTIDAD',
            text: 'No se trata de lo que haces.<br>Se trata de <span class="onboarding-highlight">quien eliges ser</span>.<br>Cada misión no es una tarea. Es un paso hacia tu nueva identidad.'
        },
        {
            icon: '🌅⚔️',
            title: 'EL MUNDO TE ESPERA',
            text: 'El caos reina cuando dejamos de avanzar.<br>La fortuna sonríe a los valientes.<br><span class="onboarding-highlight" style="font-size: 20px;">Hoy empiezas.</span>'
        }
    ],

    hasSeenOnboarding() {
        return localStorage.getItem(this.STORAGE_KEY) === 'true';
    },

    markAsSeen() {
        localStorage.setItem(this.STORAGE_KEY, 'true');
    },

    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
    },

    renderScreen(index) {
        const screen = this.screens[index];
        const total = this.screens.length;
        
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

    next() {
        const currentHash = window.location.hash;
        const currentIndex = parseInt(currentHash.replace('#onboarding-', '')) || 0;
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < this.screens.length) {
            window.location.hash = `onboarding-${nextIndex}`;
            this.update();
        }
    },

    skip() {
        console.log('🔹 Omitir onboarding');
        this.markAsSeen();
        window.location.hash = '';
        this.destroy();
        
        if (typeof RenderEngine !== 'undefined') {
            console.log('✅ RenderEngine encontrado, volviendo a start');
            RenderEngine.showScreen('start');
        } else {
            console.error('❌ RenderEngine NO encontrado');
        }
    },

    // ========== VERSIÓN DEBUG ==========
    start() {
        console.log('🔹 Iniciando juego desde onboarding');
        
        // Marcar como visto
        this.markAsSeen();
        console.log('✅ localStorage marcado');
        
        // Limpiar hash
        window.location.hash = '';
        console.log('✅ Hash limpiado');
        
        // Destruir overlay
        this.destroy();
        console.log('✅ Overlay destruido');
        
        // VERIFICAR QUE RenderEngine EXISTE
        if (typeof RenderEngine === 'undefined') {
            console.error('❌ ERROR CRÍTICO: RenderEngine no está definido');
            console.log('🔄 Intentando recuperar...');
            
            // Si no existe, esperar un momento y reintentar
            setTimeout(() => {
                if (typeof RenderEngine !== 'undefined') {
                    console.log('✅ RenderEngine apareció después de esperar');
                    RenderEngine.showScreen('characters');
                    
                    setTimeout(() => {
                        if (typeof PowerFeedback !== 'undefined') {
                            PowerFeedback.showMessage('Tu leyenda comienza ahora.', 'var(--warning)');
                            PowerFeedback.flash('rgba(255, 215, 0, 0.5)');
                        }
                    }, 500);
                } else {
                    console.error('❌ RenderEngine sigue sin existir. Recarga manual.');
                }
            }, 500);
            
            return;
        }
        
        // Si existe, proceder normal
        console.log('✅ RenderEngine encontrado, navegando a characters');
        RenderEngine.showScreen('characters');
        
        // Mensaje épico
        setTimeout(() => {
            if (typeof PowerFeedback !== 'undefined') {
                PowerFeedback.showMessage('Tu leyenda comienza ahora.', 'var(--warning)');
                PowerFeedback.flash('rgba(255, 215, 0, 0.5)');
            }
        }, 500);
    },

    update() {
        const container = document.getElementById('game-container');
        const currentHash = window.location.hash;
        const currentIndex = parseInt(currentHash.replace('#onboarding-', '')) || 0;
        
        if (currentIndex >= 0 && currentIndex < this.screens.length) {
            container.innerHTML = this.renderScreen(currentIndex);
        }
    },

    destroy() {
        const overlay = document.querySelector('.onboarding-overlay');
        if (overlay) {
            overlay.style.animation = 'onboardingFadeIn 0.3s ease reverse';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    },

    init() {
        console.log('🔹 Inicializando onboarding');
        
        if (this.hasSeenOnboarding()) {
            console.log('✅ Onboarding ya visto, omitiendo');
            return false;
        }

        console.log('✅ Mostrando onboarding por primera vez');
        window.location.hash = 'onboarding-0';
        
        const container = document.getElementById('game-container');
        container.innerHTML = this.renderScreen(0);
        
        window.addEventListener('hashchange', () => {
            this.update();
        });

        return true;
    }
};

window.OnboardingSystem = OnboardingSystem;
console.log('✅ OnboardingSystem cargado correctamente');
