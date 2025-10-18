import { supabase } from './supabaseClient.js';

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

let currentRule = 0;
let showHearts = false;
let currentUser = null;
let currentFilter = 'all';

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const ruleCounter = document.getElementById('rule-counter');
const currentRuleText = document.getElementById('current-rule-text');
const progressBar = document.getElementById('progress-bar');
const rulesGrid = document.getElementById('rules-grid');
const floatingHeartsContainer = document.getElementById('floating-hearts');
const sparkleEffectsContainer = document.getElementById('sparkle-effects');

function init() {
    createFloatingHearts();
    createSparkleEffects();
    generateRulesGrid();
    updateDisplay();
    setupEventListeners();
    startHeartAnimation();
    setupTabs();
    setupPlanilla();
    setupHistorial();
}

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

function updateDisplay() {
    ruleCounter.textContent = `Regla ${currentRule + 1} de ${rules.length}`;
    currentRuleText.textContent = rules[currentRule];
    const progress = ((currentRule + 1) / rules.length) * 100;
    progressBar.style.width = progress + '%';
    prevBtn.disabled = currentRule === 0;
    nextBtn.disabled = currentRule === rules.length - 1;

    const ruleItems = rulesGrid.querySelectorAll('.rule-item');
    ruleItems.forEach((item, index) => {
        if (index === currentRule) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

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

function startHeartAnimation() {
    setInterval(() => {
        showHearts = !showHearts;
        const hearts = document.querySelectorAll('.floating-heart');
        hearts.forEach(heart => {
            heart.style.opacity = showHearts ? '1' : '0';
        });
    }, 3000);

    setInterval(() => {
        createHeartBurst();
    }, 8000);
}

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

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`content-${tabName}`).classList.add('active');

            if (tabName === 'historial') {
                loadHistorial();
            }
        });
    });
}

function setupPlanilla() {
    const userSelectionBtns = document.querySelectorAll('.user-select-btn');
    const userSelection = document.getElementById('user-selection');
    const planillaForm = document.getElementById('planilla-form');
    const currentUserNameSpan = document.getElementById('current-user-name');
    const changeUserBtn = document.getElementById('change-user-btn');
    const planillaRulesList = document.getElementById('planilla-rules-list');
    const planillaRulesForm = document.getElementById('planilla-rules-form');

    userSelectionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentUser = btn.getAttribute('data-user');
            currentUserNameSpan.textContent = currentUser;
            userSelection.style.display = 'none';
            planillaForm.style.display = 'block';
            generatePlanillaForm();
        });
    });

    changeUserBtn.addEventListener('click', () => {
        currentUser = null;
        userSelection.style.display = 'block';
        planillaForm.style.display = 'none';
    });

    function generatePlanillaForm() {
        planillaRulesList.innerHTML = '';
        rules.forEach((rule, index) => {
            const ruleItem = document.createElement('div');
            ruleItem.className = 'planilla-rule-item';
            ruleItem.innerHTML = `
                <div class="planilla-rule-header">
                    <span class="planilla-rule-number">Regla ${index + 1}</span>
                    <p class="planilla-rule-text">${rule}</p>
                </div>
                <div class="planilla-rule-options">
                    <label class="radio-label cumple">
                        <input type="radio" name="rule-${index}" value="true" required>
                        <span class="radio-custom"></span>
                        <span>✅ Sí cumplo</span>
                    </label>
                    <label class="radio-label no-cumple">
                        <input type="radio" name="rule-${index}" value="false" required>
                        <span class="radio-custom"></span>
                        <span>❌ No cumplo</span>
                    </label>
                </div>
            `;
            planillaRulesList.appendChild(ruleItem);
        });
    }

    planillaRulesForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const responses = [];

        for (let i = 0; i < rules.length; i++) {
            const value = formData.get(`rule-${i}`);
            if (value === null) {
                alert(`Por favor responde la Regla ${i + 1}`);
                return;
            }
            responses.push({
                rule_number: i + 1,
                rule_text: rules[i],
                cumple: value === 'true'
            });
        }

        await savePlanilla(responses);
    });
}

async function savePlanilla(responses) {
    try {
        const submitBtn = document.querySelector('.submit-planilla-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '💝 Guardando... 💝';

        const { data: planilla, error: planillaError } = await supabase
            .from('planillas')
            .insert([{ user_name: currentUser }])
            .select()
            .single();

        if (planillaError) throw planillaError;

        const items = responses.map(response => ({
            planilla_id: planilla.id,
            ...response
        }));

        const { error: itemsError } = await supabase
            .from('planilla_items')
            .insert(items);

        if (itemsError) throw itemsError;

        alert('¡Planilla guardada exitosamente! 💕');

        document.getElementById('planilla-rules-form').reset();
        document.getElementById('user-selection').style.display = 'block';
        document.getElementById('planilla-form').style.display = 'none';
        currentUser = null;

        submitBtn.disabled = false;
        submitBtn.textContent = '💝 Guardar Planilla 💝';

        document.getElementById('tab-historial').click();

    } catch (error) {
        console.error('Error al guardar planilla:', error);
        alert('Error al guardar la planilla. Por favor intenta de nuevo.');
        const submitBtn = document.querySelector('.submit-planilla-btn');
        submitBtn.disabled = false;
        submitBtn.textContent = '💝 Guardar Planilla 💝';
    }
}

function setupHistorial() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadHistorial();
        });
    });
}

async function loadHistorial() {
    const historialList = document.getElementById('historial-list');
    historialList.innerHTML = '<div class="loading-message">Cargando historial...</div>';

    try {
        let query = supabase
            .from('planillas')
            .select(`
                *,
                planilla_items (*)
            `)
            .order('completed_at', { ascending: false });

        if (currentFilter !== 'all') {
            query = query.eq('user_name', currentFilter);
        }

        const { data: planillas, error } = await query;

        if (error) throw error;

        if (!planillas || planillas.length === 0) {
            historialList.innerHTML = '<div class="no-data-message">No hay planillas registradas aún 💕</div>';
            return;
        }

        historialList.innerHTML = '';

        planillas.forEach(planilla => {
            const cumplidas = planilla.planilla_items.filter(item => item.cumple).length;
            const total = planilla.planilla_items.length;
            const porcentaje = Math.round((cumplidas / total) * 100);

            const date = new Date(planilla.completed_at);
            const formattedDate = date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const planillaCard = document.createElement('div');
            planillaCard.className = 'historial-card';
            planillaCard.innerHTML = `
                <div class="historial-card-header">
                    <h3 class="historial-user">${planilla.user_name}</h3>
                    <span class="historial-date">${formattedDate}</span>
                </div>
                <div class="historial-stats">
                    <div class="stat-item">
                        <span class="stat-label">Cumplidas:</span>
                        <span class="stat-value cumplidas">${cumplidas}/${total}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Porcentaje:</span>
                        <span class="stat-value">${porcentaje}%</span>
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${porcentaje}%"></div>
                </div>
                <button class="view-details-btn" data-planilla-id="${planilla.id}">Ver Detalles</button>
                <div class="planilla-details" id="details-${planilla.id}" style="display: none;">
                    ${generateDetailsHTML(planilla.planilla_items)}
                </div>
            `;

            historialList.appendChild(planillaCard);
        });

        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const planillaId = e.target.getAttribute('data-planilla-id');
                const details = document.getElementById(`details-${planillaId}`);
                if (details.style.display === 'none') {
                    details.style.display = 'block';
                    e.target.textContent = 'Ocultar Detalles';
                } else {
                    details.style.display = 'none';
                    e.target.textContent = 'Ver Detalles';
                }
            });
        });

    } catch (error) {
        console.error('Error al cargar historial:', error);
        historialList.innerHTML = '<div class="error-message">Error al cargar el historial 😢</div>';
    }
}

function generateDetailsHTML(items) {
    const sortedItems = [...items].sort((a, b) => a.rule_number - b.rule_number);

    return `
        <div class="details-list">
            ${sortedItems.map(item => `
                <div class="detail-item ${item.cumple ? 'cumple' : 'no-cumple'}">
                    <span class="detail-icon">${item.cumple ? '✅' : '❌'}</span>
                    <div class="detail-content">
                        <span class="detail-rule-number">Regla ${item.rule_number}</span>
                        <p class="detail-rule-text">${item.rule_text}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', init);
