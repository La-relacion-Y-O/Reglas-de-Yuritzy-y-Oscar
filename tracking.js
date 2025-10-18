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

const SUPABASE_URL = 'https://mskwsfqwmmchnwnddssc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za3dzZnF3bW1jaG53bmRkc3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3OTcyMjMsImV4cCI6MjA3NjM3MzIyM30.oHZeqqixFXVZG076tu72JrCc-GSaPIJ07BXBj7NfqiA';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let currentDate = new Date();
let ruleChecks = new Map();

const screens = {
    userSelection: document.getElementById('user-selection'),
    modeSelection: document.getElementById('mode-selection'),
    checking: document.getElementById('checking-screen'),
    results: document.getElementById('results-screen')
};

function init() {
    createFloatingHearts();
    setupEventListeners();
}

function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        const hearts = ['💕', '💖', '💝', '💗', '💓'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = (i * 150) + 'ms';
        container.appendChild(heart);
    }
}

function setupEventListeners() {
    document.querySelectorAll('.user-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentUser = btn.getAttribute('data-user');
            showScreen('modeSelection');
            document.getElementById('welcome-user').textContent = `Hola ${currentUser} 💕`;
        });
    });

    document.getElementById('check-mode-btn').addEventListener('click', () => {
        showScreen('checking');
        initCheckingMode();
    });

    document.getElementById('view-mode-btn').addEventListener('click', () => {
        showScreen('results');
        initResultsMode();
    });

    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', goBack);
    });

    document.getElementById('save-progress-btn').addEventListener('click', saveProgress);
    document.getElementById('complete-session-btn').addEventListener('click', completeSession);

    document.getElementById('prev-date-btn').addEventListener('click', () => changeResultsDate(-1));
    document.getElementById('next-date-btn').addEventListener('click', () => changeResultsDate(1));
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function goBack() {
    const activeScreen = Object.entries(screens).find(([_, screen]) =>
        screen.classList.contains('active')
    )?.[0];

    if (activeScreen === 'modeSelection') {
        showScreen('userSelection');
        currentUser = null;
    } else if (activeScreen === 'checking' || activeScreen === 'results') {
        showScreen('modeSelection');
    }
}

async function initCheckingMode() {
    document.getElementById('checking-user').textContent = `Control de Reglas - ${currentUser}`;
    document.getElementById('current-date').textContent = formatDate(currentDate);

    ruleChecks.clear();

    await loadExistingChecks();
    renderRulesChecklist();
    updateProgress();
}

async function loadExistingChecks() {
    const dateStr = formatDateISO(currentDate);

    const { data, error } = await supabase
        .from('rule_checks')
        .select('*')
        .eq('user_name', currentUser)
        .eq('check_date', dateStr);

    if (error) {
        console.error('Error loading checks:', error);
        return;
    }

    if (data) {
        data.forEach(check => {
            ruleChecks.set(check.rule_number, check.is_completed);
        });
    }
}

function renderRulesChecklist() {
    const container = document.getElementById('rules-checklist');
    container.innerHTML = '';

    rules.forEach((rule, index) => {
        const ruleNumber = index + 1;
        const isCompleted = ruleChecks.get(ruleNumber) || false;

        const item = document.createElement('div');
        item.className = `rule-check-item ${isCompleted ? 'completed' : ''}`;
        item.innerHTML = `
            <div class="checkbox-custom">
                ${isCompleted ? '✓' : ''}
            </div>
            <div class="rule-check-content">
                <div class="rule-check-number">Regla ${ruleNumber}</div>
                <div class="rule-check-text">${rule}</div>
            </div>
        `;

        item.addEventListener('click', () => toggleRule(ruleNumber));
        container.appendChild(item);
    });
}

function toggleRule(ruleNumber) {
    const currentValue = ruleChecks.get(ruleNumber) || false;
    ruleChecks.set(ruleNumber, !currentValue);
    renderRulesChecklist();
    updateProgress();
}

function updateProgress() {
    const completed = Array.from(ruleChecks.values()).filter(v => v).length;
    const total = rules.length;

    document.getElementById('checked-count').textContent = completed;
    const progressBar = document.getElementById('checking-progress');
    progressBar.style.width = `${(completed / total) * 100}%`;

    const completeBtn = document.getElementById('complete-session-btn');
    completeBtn.disabled = completed !== total;
}

async function saveProgress() {
    const dateStr = formatDateISO(currentDate);
    const btn = document.getElementById('save-progress-btn');
    const originalText = btn.textContent;
    btn.textContent = '💾 Guardando...';
    btn.disabled = true;

    try {
        for (const [ruleNumber, isCompleted] of ruleChecks.entries()) {
            const { error } = await supabase
                .from('rule_checks')
                .upsert({
                    user_name: currentUser,
                    rule_number: ruleNumber,
                    is_completed: isCompleted,
                    check_date: dateStr
                }, {
                    onConflict: 'user_name,check_date,rule_number'
                });

            if (error) throw error;
        }

        btn.textContent = '✅ Guardado';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('Error saving progress:', error);
        btn.textContent = '❌ Error';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

async function completeSession() {
    const dateStr = formatDateISO(currentDate);
    const btn = document.getElementById('complete-session-btn');
    const originalText = btn.textContent;
    btn.textContent = '✨ Completando...';
    btn.disabled = true;

    try {
        for (const [ruleNumber, isCompleted] of ruleChecks.entries()) {
            const { error: checkError } = await supabase
                .from('rule_checks')
                .upsert({
                    user_name: currentUser,
                    rule_number: ruleNumber,
                    is_completed: isCompleted,
                    check_date: dateStr
                }, {
                    onConflict: 'user_name,check_date,rule_number'
                });

            if (checkError) throw checkError;
        }

        const { error: sessionError } = await supabase
            .from('daily_sessions')
            .upsert({
                user_name: currentUser,
                session_date: dateStr,
                is_completed: true,
                completed_at: new Date().toISOString()
            }, {
                onConflict: 'user_name,session_date'
            });

        if (sessionError) throw sessionError;

        btn.textContent = '✅ Completado';
        setTimeout(() => {
            showScreen('modeSelection');
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('Error completing session:', error);
        btn.textContent = '❌ Error';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

async function initResultsMode() {
    const targetUser = currentUser === 'Oscar' ? 'Yuritzy' : 'Oscar';
    document.getElementById('target-user').textContent = targetUser;

    currentDate = new Date();
    await loadAndDisplayResults(targetUser);
}

async function loadAndDisplayResults(targetUser) {
    const dateStr = formatDateISO(currentDate);
    document.getElementById('selected-date').textContent = formatDate(currentDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(currentDate);
    selectedDate.setHours(0, 0, 0, 0);

    document.getElementById('next-date-btn').disabled = selectedDate >= today;

    const { data: sessionData, error: sessionError } = await supabase
        .from('daily_sessions')
        .select('*')
        .eq('user_name', targetUser)
        .eq('session_date', dateStr)
        .maybeSingle();

    if (sessionError) {
        console.error('Error loading session:', sessionError);
        showResultsStatus('error', 'Error al cargar los datos');
        return;
    }

    if (!sessionData || !sessionData.is_completed) {
        showResultsStatus('not-found', `${targetUser} aún no ha completado el registro para esta fecha`);
        document.getElementById('results-list').innerHTML = '';
        return;
    }

    const { data: checksData, error: checksError } = await supabase
        .from('rule_checks')
        .select('*')
        .eq('user_name', targetUser)
        .eq('check_date', dateStr)
        .order('rule_number');

    if (checksError) {
        console.error('Error loading checks:', checksError);
        showResultsStatus('error', 'Error al cargar los resultados');
        return;
    }

    const completedCount = checksData.filter(c => c.is_completed).length;
    showResultsStatus('completed', `✅ Sesión completada - ${completedCount}/${rules.length} reglas cumplidas`);

    renderResults(checksData);
}

function showResultsStatus(type, message) {
    const statusDiv = document.getElementById('results-status');
    statusDiv.className = `results-status ${type}`;
    statusDiv.textContent = message;
}

function renderResults(checksData) {
    const container = document.getElementById('results-list');
    container.innerHTML = '';

    const checksMap = new Map();
    checksData.forEach(check => {
        checksMap.set(check.rule_number, check.is_completed);
    });

    rules.forEach((rule, index) => {
        const ruleNumber = index + 1;
        const isCompleted = checksMap.get(ruleNumber) || false;

        const item = document.createElement('div');
        item.className = `result-item ${isCompleted ? 'completed' : 'not-completed'}`;
        item.innerHTML = `
            <div class="result-icon">
                ${isCompleted ? '✅' : '❌'}
            </div>
            <div class="result-content">
                <div class="result-number">Regla ${ruleNumber}</div>
                <div class="result-text">${rule}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

async function changeResultsDate(days) {
    currentDate.setDate(currentDate.getDate() + days);
    const targetUser = currentUser === 'Oscar' ? 'Yuritzy' : 'Oscar';
    await loadAndDisplayResults(targetUser);
}

function formatDate(date) {
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDateISO(date) {
    return date.toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', init);
