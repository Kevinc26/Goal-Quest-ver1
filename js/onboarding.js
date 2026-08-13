// ==================== GOALQUEST - ONBOARDING SYSTEM ====================
// Version: 1.0
// First impression. Identity. Call to adventure.
// ============================================================================

const OnboardingSystem = {
    // localStorage flag
    STORAGE_KEY: 'goalquest_onboarding_seen',
    
    // Core onboarding copy
    screens: [
        {
            icon: '⚔️',
            title: 'WHAT IS GOALQUEST?',
            text: '<span class="onboarding-highlight">A real-life RPG.</span><br>Turn your goals into quests and make real progress. This is your story.'
        },
        {
            icon: '📜',
            title: 'HOW IT WORKS',
            text: 'Choose a class, take on real-world quests, and complete them.<br><span class="onboarding-highlight">Earn XP. Level up. Keep growing.</span>'
        },
        {
            icon: '🦁',
            title: 'BUILD YOUR HERO',
            text: 'Every completed quest builds the person you choose to become.<br><span class="onboarding-highlight">Small wins shape your new identity.</span>'
        },
        {
            icon: '🌅',
            title: 'YOUR ADVENTURE AWAITS',
            text: 'Complete daily quests to build streaks. Earn XP, level up, and unlock new regions.<br><span class="onboarding-highlight" style="font-size: 20px;">Your journey begins today.</span>'
        }
    ],

    // Check whether onboarding has been seen
    hasSeenOnboarding() {
        return localStorage.getItem(this.STORAGE_KEY) === 'true';
    },

    // Mark as seen
    markAsSeen() {
        localStorage.setItem(this.STORAGE_KEY, 'true');
    },

    // Reset onboarding (for testing)
    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
    },

    // Render the current screen
    renderScreen(index) {
        const screen = this.screens[index];
        const total = this.screens.length;
        
        // Create progress dots
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
                            CONTINUE
                        </button>
                        <div class="onboarding-skip" onclick="OnboardingSystem.skip()">
                            Skip intro
                        </div>
                    ` : `
                        <button class="onboarding-button" onclick="OnboardingSystem.start()">
                            BEGIN MY ADVENTURE
                        </button>
                    `}
                </div>
            </div>
        `;
    },

    // Next screen
    next() {
        const currentHash = window.location.hash;
        const currentIndex = parseInt(currentHash.replace('#onboarding-', '')) || 0;
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < this.screens.length) {
            window.location.hash = `onboarding-${nextIndex}`;
            this.update();
        }
    },

    // Skip onboarding
    skip() {
        this.markAsSeen();
        window.location.hash = '';
        this.destroy();
        
        // Start the game normally
        if (typeof GameState !== 'undefined' && GameState.character) {
            RenderEngine.showScreen('world');
        } else {
            RenderEngine.showScreen('start');
        }
    },

    // Begin adventure
    start() {
        this.markAsSeen();
        window.location.hash = '';
        this.destroy();
        
        // Go to character selection
        RenderEngine.showScreen('characters');
        
        // Epic message (first time only)
        setTimeout(() => {
            if (typeof PowerFeedback !== 'undefined') {
                PowerFeedback.showMessage('Your legend begins now.', 'var(--warning)');
                PowerFeedback.flash('rgba(255, 215, 0, 0.5)');
            }
        }, 500);
    },

    // Update the DOM
    update() {
        const container = document.getElementById('game-container');
        const currentHash = window.location.hash;
        const currentIndex = parseInt(currentHash.replace('#onboarding-', '')) || 0;
        
        if (currentIndex >= 0 && currentIndex < this.screens.length) {
            container.innerHTML = this.renderScreen(currentIndex);
        }
    },

    // Remove onboarding
    destroy() {
        const overlay = document.querySelector('.onboarding-overlay');
        if (overlay) {
            overlay.style.animation = 'onboardingFadeIn 0.3s ease reverse';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    },

    // Initialize onboarding
    init() {
        // Do not show onboarding again
        if (this.hasSeenOnboarding()) {
            return false;
        }

        // Set the initial hash
        window.location.hash = 'onboarding-0';
        
        // Render the first screen
        const container = document.getElementById('game-container');
        container.innerHTML = this.renderScreen(0);
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            this.update();
        });

        return true;
    }
};

// Expose globally
window.OnboardingSystem = OnboardingSystem;
