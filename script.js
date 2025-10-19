// Rules data
const rules = [
    "No me gusta que tengas más amigos aparte de los que ya algo he sabido. No más amigos ni amiguitos.",
    "No reaccionar a fotos de amig@s.",
    "No subir, etiquetar o mencionar a amig@s en publicaciones de cualquier red social.",
    "Si un amig@ que ya tiene tiempo sin comunicación vuelve a buscarnos, contarlo el uno al otro.",
    "Si alguien gusta o demuestra intenciones que no son, debemos decirlo y eliminarlo de nuestras vidas.",
    "No abrazar a nuestr@s amig@s.",
    "Decir si invitan a salir y no salir con amig@s; informar con quién estarás o qué harás.",
    "Nadie más puede tener nuestros celulares, solamente Yuritzy y Oscar. con la excepción de salo y yamis",
    "Si hay problemas o enojos, hay que hablar y solucionarlo el mismo día.",
    "Compartir cuáles son nuestras redes sociales será siempre por confianza y para sentirnos tranquil@s.",
    "No compartir publicaciones, memes ni ningún tipo de contenido con amig@s.",
    "Cuando no nos agrade algún amig@, decir lo que sentimos y alejarnos de esa amistad.",
    "Prohibido usar ropa corta (shorts, faldas) en espacios públicos de cualquier tipo.",
    "Prohibido publicar fotos nuestras en redes sociales, excepto si son de los dos juntos o aprobadas por ambos.",
    "Nada de apodos ni aceptar que amig@s nos digan apodos. Solo hablar por el nombre (sin diminutivos).",
    "Debes comer antes de cualquier actividad física (entrenamiento, box, gym), así como en desayuno, almuerzo y cena.",
    "Desayunar antes de ir a la universidad y cumplir con las demás comidas en su tiempo correspondiente.",
    "No chatear con amig@s.",
    "No se puede hacer ni recibir llamadas de amig@s en general, con excepción de familiares y Esme, hasta que hagamos llamada.",
    "Siempre avisar cuando lleguemos a casa o a cualquier lugar, para estar tranquil@s.",
    "Dedicar al menos un momento al día para hablar, aunque estemos ocupados.",
    "No dejar en visto ni ignorar mensajes; siempre responder aunque sea con algo breve.",
    "Avisar siempre si vamos a salir de viaje o a un lugar diferente del habitual.",
    "Cuando haya celos o incomodidad, hablarlo de inmediato sin ocultar nada.",
    "Priorizar tiempo juntos antes que tiempo con otras personas.",
    "No usar excusas para ocultar cosas, siempre hablar con sinceridad.",
    "No usar emojis con nadie ni registrar a nadie con emojis en el celular.",
    "No seguir a chic@s ni reaccionar a publicaciones de ninguna red social.",
    "No se puede hablar o hacer alusión a ningún ser femenino en caso de Oscar con excepción de \"La familia de Salo y mi mamá y familia\" y de ningún ser masculino en el caso de Yuritzy con excepción de \"Su papá y sus primos y familia\"."
];

// Global state
let currentRule = 0;
let showHearts = false;

// DOM elements
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const ruleCounter = document.getElementById('rule-counter');
const currentRuleText = document.getElementById('current-rule-text');
const progressBar = document.getElementById('progress-bar');
const rulesGrid = document.getElementById('rules-grid');
const floatingHeartsContainer = document.getElementById('floating-hearts');
const sparkleEffectsContainer = document.getElementById('sparkle-effects');

// Initialize the app
function init() {
    createFloatingHearts();
    createSparkleEffects();
    generateRulesGrid();
    updateDisplay();
    setupEventListeners();
    startHeartAnimation();
}

// Create floating hearts
function createFloatingHearts() {
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        const hearts = ['💕', '💖', '💝', '💗', '💓', '💘', '💞', '💟'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = (i * 150) + 'ms';
        heart.style.opacity = '0';
        floatingHeartsContainer.appendChild(heart);
    }
}

// Create sparkle effects
function createSparkleEffects() {
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        const sparkles = ['✨', '⭐', '🌟', '💫', '⚡'];
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = (i * 200) + 'ms';
        sparkleEffectsContainer.appendChild(sparkle);
    }
}

// Generate rules grid
function generateRulesGrid() {
    rulesGrid.innerHTML = '';
    rules.forEach((rule, index) => {
        const ruleItem = document.createElement('button');
        ruleItem.className = 'rule-item';
        ruleItem.innerHTML = `
            <div class="rule-item-header">
                <span>💖</span>
                <span class="rule-item-title">Regla ${index + 1}</span>
            </div>
            <p class="rule-item-preview">${rule.substring(0, 80)}...</p>
        `;
        ruleItem.addEventListener('click', () => {
            currentRule = index;
            updateDisplay();
        });
        rulesGrid.appendChild(ruleItem);
    });
}

// Update display
function updateDisplay() {
    // Update rule counter
    ruleCounter.textContent = `Regla ${currentRule + 1} de ${rules.length}`;
    
    // Update current rule text
    currentRuleText.textContent = rules[currentRule];
    
    // Update progress bar
    const progress = ((currentRule + 1) / rules.length) * 100;
    progressBar.style.width = progress + '%';
    
    // Update navigation buttons
    prevBtn.disabled = currentRule === 0;
    nextBtn.disabled = currentRule === rules.length - 1;
    
    // Update rules grid
    const ruleItems = rulesGrid.querySelectorAll('.rule-item');
    ruleItems.forEach((item, index) => {
        if (index === currentRule) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    prevBtn.addEventListener('click', () => {
        if (currentRule > 0) {
            currentRule--;
            updateDisplay();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentRule < rules.length - 1) {
            currentRule++;
            updateDisplay();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentRule > 0) {
            currentRule--;
            updateDisplay();
        } else if (e.key === 'ArrowRight' && currentRule < rules.length - 1) {
            currentRule++;
            updateDisplay();
        }
    });
}

// Start heart animation
function startHeartAnimation() {
    setInterval(() => {
        showHearts = !showHearts;
        const hearts = document.querySelectorAll('.floating-heart');
        hearts.forEach(heart => {
            heart.style.opacity = showHearts ? '1' : '0';
        });
    }, 3000);
    
    // Add random heart bursts
    setInterval(() => {
        createHeartBurst();
    }, 8000);
}

// Create heart burst effect
function createHeartBurst() {
    const burstContainer = document.createElement('div');
    burstContainer.style.position = 'absolute';
    burstContainer.style.left = Math.random() * 100 + '%';
    burstContainer.style.top = Math.random() * 100 + '%';
    burstContainer.style.pointerEvents = 'none';
    burstContainer.style.zIndex = '5';
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'absolute';
        heart.style.fontSize = '1.5rem';
        heart.style.color = '#ff1493';
        heart.style.animation = `heartBurst 2s ease-out forwards`;
        heart.style.animationDelay = (i * 100) + 'ms';
        
        const angle = (i / 8) * 360;
        heart.style.transform = `rotate(${angle}deg)`;
        
        burstContainer.appendChild(heart);
    }
    
    document.body.appendChild(burstContainer);
    
    setTimeout(() => {
        document.body.removeChild(burstContainer);
    }, 2500);
}

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', () => {
    const goldenRule = document.querySelector('.golden-rule');
    if (goldenRule) {
        goldenRule.addEventListener('click', () => {
            goldenRule.classList.add('celebrating');
            createConfettiExplosion();
            createHeartExplosion();
            playMagicalSound();

            setTimeout(() => {
                goldenRule.classList.remove('celebrating');
            }, 2000);
        });
    }
});

function createConfettiExplosion() {
    const colors = ['#ff1493', '#ffd700', '#ff69b4', '#8b008b', '#fbbf24', '#ffffff'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;

            const angle = (Math.random() * 360) * (Math.PI / 180);
            const velocity = 200 + Math.random() * 300;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            confetti.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) scale(0.5) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: 1500 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 2500);
        }, i * 3);
    }
}

function createHeartExplosion() {
    const heartEmojis = ['💕', '💖', '💝', '💗', '💓', '💘', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.filter = 'drop-shadow(0 0 10px #ff1493)';

            const angle = (Math.random() * 360) * (Math.PI / 180);
            const velocity = 150 + Math.random() * 250;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            heart.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0.5) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) scale(1.5) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'ease-out'
            });

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 15);
    }
}

function playMagicalSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((frequency, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }, index * 150);
    });
}

