// ==================== GOALQUEST - ONBOARDING ====================
// Versión: 1.8 - CORREGIDO Y VERIFICADO
// ================================================================

const OnboardingSystem = {
    STORAGE_KEY: 'goalquest_onboarding_seen',
    
    screens: [
        {
            image: './assets/onboarding/1-que-es.png',
            title: '¿QUÉ ES GOALQUEST?',
            text: '<span class="onboarding-highlight">Un RPG de vida real.</span><br>Tus objetivos son misiones. Tu progreso es real. No es un juego. Es tu historia.'
        },
        {
            image: './assets/onboarding/2-como-funciona.png',
            title: 'CÓMO FUNCIONA',
            text: 'Eliges una clase que resuena contigo. Recibes misiones reales. Las cumples.<br><span class="onboarding-highlight">Ganas EXP. Subes nivel. Te conviertes.</span>'
        },
        {
            image: './assets/onboarding/3-identidad.png',
            title: 'IDENTIDAD',
            text: 'No se trata de lo que haces.<br>Se trata de <span class="onboarding-highlight">quien eliges ser</span>.<br>Cada misión no es una tarea. Es un paso hacia tu nueva identidad.'
        },
        {
            image: './assets/onboarding/4-mundo-te-espera.png',
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

    init() {
        if (this.hasSeenOnboarding()) {
            return false;
        }

        // Versión simplificada para pruebas
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0a0a1a; display: flex; justify-content: center; align-items: center; z-index: 10000;">
                <div style="background: #1a1a2e; border: 3px solid #4dff91; padding: 40px; max-width: 500px; text-align: center;">
                    <h1 style="color: #4dff91; font-size: 24px; margin-bottom: 20px;">BIENVENIDO A GOALQUEST</h1>
                    <p style="color: white; margin-bottom: 30px;">Presiona el botón para comenzar.</p>
                    <button onclick="OnboardingSystem.start()" style="background: #4dff91; border: none; color: black; padding: 15px 30px; font-size: 16px; cursor: pointer;">COMENZAR</button>
                </div>
            </div>
        `;

        return true;
    },

    start() {
        this.markAsSeen();
        document.querySelector('.onboarding-overlay')?.remove();
        if (typeof window.showScreen !== 'undefined') {
            window.showScreen('characters');
        }
    }
};

window.OnboardingSystem = OnboardingSystem;
