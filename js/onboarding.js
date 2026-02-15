// ==================== GOALQUEST - SISTEMA DE ONBOARDING ====================
// Versión: 1.5 - TRANSICIONES SUAVES
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

    // ========== TRANSICIÓN SUAVE ENTRE PANTALLAS ==========
    transitionTo(index) {
        const container = document.getElementById('game-container');
        const currentOverlay = document.querySelector('.onboarding-overlay');
        
        if (!currentOverlay) {
            // Si no hay overlay, solo renderizar
            container.innerHTML = this.renderScreen(index);
            return;
        }

        // Fade out del contenido actual (solo el contenedor, no el overlay)
        const content = currentOverlay.querySelector('.onboarding-container');
        if (content) {
            content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            content.style.opacity = '0';
            content.style.transform = 'translateY(-10px)';
        }

        // Cambiar el hash después de la animación de salida
        setTimeout(() => {
            window.location.hash = `onboarding-${index}`;
            // El update se encargará del fade in
        }, 300);
    },

    renderScreen(index) {
        const screen = this.screens[index];
        const total = this.screens.length;
        
        let dots = '';
        for (let i = 0; i < total; i++) {
            dots += `<div class="onboarding-dot ${i === index ? 'active' : ''}"></div>`;
        }

        return `
            <div class="onboarding-overlay" style="animation: onboardingFadeIn 0.8s ease;">
                <div class="onboarding-container" style="animation: onboardingSlideIn 0.6s ease; opacity: 1; transform: translateY(0); transition: opacity 0.3s ease, transform 0.3s ease;">
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
            this.transitionTo(nextIndex);
        }
    },

    skip() {
        // Fade out completo antes de salir
        const overlay = document.querySelector('.onboarding-overlay');
        if (overlay) {
            overlay.style.transition = 'opacity 0.4s ease';
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                this.markAsSeen();
                window.location.hash = '';
                this.destroy();
                
                if (typeof window.showScreen !== 'undefined') {
                    window.showScreen('start');
                }
            }, 400);
        } else {
            this.markAsSeen();
            window.location.hash = '';
            this.destroy();
            if (typeof window.showScreen !== 'undefined') {
                window.showScreen('start');
            }
        }
    },

    // ========== TRANSICIÓN DE SALIDA SUAVE ==========
    start() {
        this.markAsSeen();
        
        const overlay = document.querySelector('.onboarding-overlay');
        
        if (overlay) {
            // Animación de salida
            overlay.style.transition = 'opacity 0.5s ease';
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                window.location.hash = '';
                this.destroy();
                
                // Pequeña pausa antes de mostrar personajes
                setTimeout(() => {
                    if (typeof window.showScreen !== 'undefined') {
                        window.showScreen('characters');
                        
                        setTimeout(() => {
                            if (typeof PowerFeedback !== 'undefined') {
                                PowerFeedback.showMessage('Tu leyenda comienza ahora.', 'var(--warning)');
                                PowerFeedback.flash('rgba(255, 215, 0, 0.5)');
                            }
                        }, 500);
                    }
                }, 100);
            }, 500);
            
        } else {
            // Fallback si no hay overlay
            window.location.hash = '';
            this.destroy();
            setTimeout(() => {
                if (typeof window.showScreen !== 'undefined') {
                    window.showScreen('characters');
                }
            }, 100);
        }
    },

    update() {
        const container = document.getElementById('game-container');
        const currentHash = window.location.hash;
        const currentIndex = parseInt(currentHash.replace('#onboarding-', '')) || 0;
        
        if (currentIndex >= 0 && currentIndex < this.screens.length) {
            // Reemplazar el contenido completamente (el fade in viene del CSS)
            container.innerHTML = this.renderScreen(currentIndex);
            
            // Asegurar que el nuevo contenido tenga opacidad 1
            const newContent = document.querySelector('.onboarding-container');
            if (newContent) {
                newContent.style.opacity = '1';
                newContent.style.transform = 'translateY(0)';
            }
        }
    },

    destroy() {
        const overlay = document.querySelector('.onboarding-overlay');
        if (overlay) {
            overlay.remove();
        }
    },

    init() {
        if (this.hasSeenOnboarding()) {
            return false;
        }

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
