const commonRules = [
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
  "No se puede usar shorts o faldas en lugares públicos o donde estén demasiadas personas o para salir. Solo se podrá usar donde estén pocas personas o en un lugar X donde no estén demasiadas personas.",
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
  'No se puede hablar o hacer alusión a ningún ser femenino en caso de Oscar con excepción de "La familia de Salo y mi mamá y familia" y de ningún ser masculino en el caso de Yuritzy con excepción de "Su papá y sus primos y familia".',
]

const rules = commonRules

const SUPABASE_URL = "https://skrlsxhzhaplwtezpdqg.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcmxzeGh6aGFwbHd0ZXpwZHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MTc3MjUsImV4cCI6MjA3ODk5MzcyNX0.nqlvzePycJfUFI9WMKAXWGp2Khr3228y3SF0J6_Ekd8"

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

let currentUser = null
let currentDate = new Date()
const ruleChecks = new Map()
let currentResultsData = null

const screens = {
  userSelection: document.getElementById("user-selection"),
  modeSelection: document.getElementById("mode-selection"),
  checking: document.getElementById("checking-screen"),
  results: document.getElementById("results-screen"),
}

function init() {
  createFloatingHearts()
  setupEventListeners()
}

function createFloatingHearts() {
  const container = document.getElementById("floating-hearts")
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div")
    heart.className = "floating-heart"
    const hearts = ["💕", "💖", "💝", "💗", "💓"]
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
    heart.style.left = Math.random() * 100 + "%"
    heart.style.top = Math.random() * 100 + "%"
    heart.style.animationDelay = i * 150 + "ms"
    container.appendChild(heart)
  }
}

function setupEventListeners() {
  const userBtns = document.querySelectorAll(".user-btn")
  const welcomeUser = document.getElementById("welcome-user")
  const dashboardUserImg = document.getElementById("dashboard-user-img")
  const checkModeBtn = document.getElementById("check-mode-btn")
  const viewModeBtn = document.getElementById("view-mode-btn")
  const backBtns = document.querySelectorAll(".back-btn")
  const viewOscarBtn = document.getElementById("view-oscar")
  const viewYuritzyBtn = document.getElementById("view-yuritzy")
  const logoutBtn = document.querySelector(".logout-btn")

  userBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentUser = btn.dataset.user
      welcomeUser.textContent = currentUser

      // Set dashboard image
      if (currentUser === "Oscar") {
        dashboardUserImg.src = "public/oscar.jpg"
      } else {
        dashboardUserImg.src = "public/yuritzy.jpg"
      }

      showScreen("modeSelection")
      loadDashboardStats()
    })
  })

  checkModeBtn.addEventListener("click", () => {
    document.getElementById("checking-user").textContent = `Control de Reglas - ${currentUser}`
    document.getElementById("current-date").textContent = new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    initCheckingMode()
    showScreen("checking")
  })

  viewModeBtn.addEventListener("click", () => {
    const targetUser = currentUser === "Oscar" ? "Yuritzy" : "Oscar" // Default to viewing other
    // Update toggle buttons
    if (viewOscarBtn && viewYuritzyBtn) {
      viewOscarBtn.classList.toggle("active", targetUser === "Oscar")
      viewYuritzyBtn.classList.toggle("active", targetUser === "Yuritzy")
    }

    initResultsMode()
    showScreen("results")
  })

  backBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      showScreen("modeSelection")
    })
  })

  document.getElementById("save-progress-btn").addEventListener("click", saveProgress)
  document.getElementById("complete-session-btn").addEventListener("click", completeSession)

  document.getElementById("prev-date-btn").addEventListener("click", () => changeResultsDate(-1))
  document.getElementById("next-date-btn").addEventListener("click", () => changeResultsDate(1))
  document.getElementById("download-pdf-btn").addEventListener("click", downloadPDF)

  if (viewOscarBtn && viewYuritzyBtn) {
    viewOscarBtn.addEventListener("click", () => {
      const targetUser = "Oscar"
      viewOscarBtn.classList.add("active")
      viewYuritzyBtn.classList.remove("active")
      loadAndDisplayResults(targetUser)
    })

    viewYuritzyBtn.addEventListener("click", () => {
      const targetUser = "Yuritzy"
      viewYuritzyBtn.classList.add("active")
      viewOscarBtn.classList.remove("active")
      loadAndDisplayResults(targetUser)
    })
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      console.log("[v0] Logout button clicked")
      currentUser = null
      showScreen("userSelection")
    })
  }
}

function loadDashboardStats() {
  // In a real app, fetch this from Supabase
  // For now, we'll just show some encouraging numbers or randoms for demo
  document.getElementById("streak-value").textContent = Math.floor(Math.random() * 10) + 1
  document.getElementById("total-checks").textContent = Math.floor(Math.random() * 50) + 10
  document.getElementById("last-check-date").textContent = "Hoy"
}

function showScreen(screenName) {
  // Handle both string names and element references
  const screenElement = typeof screenName === "string" ? screens[screenName] : screenName

  Object.values(screens).forEach((screen) => {
    if (screen) screen.classList.remove("active")
  })

  if (screenElement) screenElement.classList.add("active")
}

async function initCheckingMode() {
  document.getElementById("checking-user").textContent = `Control de Reglas - ${currentUser}`
  document.getElementById("current-date").textContent = formatDate(currentDate)

  ruleChecks.clear()

  const checklistContainer = document.getElementById("rules-checklist")
  checklistContainer.innerHTML = '<div class="loading-spinner">Cargando reglas...</div>'

  try {
    await loadExistingChecks()
  } catch (error) {
    console.error("Error loading checks, continuing with empty state:", error)
  }

  renderRulesChecklist()
  updateProgress()
}

async function loadExistingChecks() {
  const dateStr = formatDateISO(currentDate)

  try {
    const { data, error } = await supabase
      .from("rule_checks")
      .select("*")
      .eq("user_name", currentUser)
      .eq("check_date", dateStr)

    if (error) {
      console.error("Error loading checks:", error)
      return
    }

    if (data) {
      data.forEach((check) => {
        ruleChecks.set(check.rule_number, check.is_completed)
      })
    }
  } catch (e) {
    console.error("Supabase connection error:", e)
  }
}

function renderRulesChecklist() {
  const container = document.getElementById("rules-checklist")
  container.innerHTML = ""

  rules.forEach((rule, index) => {
    const ruleNumber = index + 1
    const status = ruleChecks.get(ruleNumber)

    let statusClass = ""
    let statusIcon = ""
    if (status === true) {
      statusClass = "completed"
      statusIcon = "✅"
    } else if (status === false) {
      statusClass = "not-completed"
      statusIcon = "❎"
    }

    const item = document.createElement("div")
    item.className = `rule-check-item ${statusClass}`
    item.innerHTML = `
            <div class="status-buttons">
                <button class="status-btn status-yes ${status === true ? "active" : ""}" data-rule="${ruleNumber}" data-status="true">
                    ✅
                </button>
                <button class="status-btn status-no ${status === false ? "active" : ""}" data-rule="${ruleNumber}" data-status="false">
                    ❎
                </button>
            </div>
            <div class="rule-check-content">
                <div class="rule-check-number">Regla ${ruleNumber}</div>
                <div class="rule-check-text">${rule}</div>
            </div>
        `

    container.appendChild(item)
  })

  document.querySelectorAll(".status-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      const ruleNumber = Number.parseInt(btn.getAttribute("data-rule"))
      const newStatus = btn.getAttribute("data-status") === "true"
      setRuleStatus(ruleNumber, newStatus)
    })
  })
}

function setRuleStatus(ruleNumber, status) {
  const currentStatus = ruleChecks.get(ruleNumber)
  if (currentStatus === status) {
    ruleChecks.delete(ruleNumber)
  } else {
    ruleChecks.set(ruleNumber, status)
  }
  renderRulesChecklist()
  updateProgress()
}

function updateProgress() {
  const marked = ruleChecks.size
  const total = rules.length

  document.getElementById("checked-count").textContent = marked
  document.getElementById("total-rules").textContent = total
  const progressBar = document.getElementById("checking-progress")
  progressBar.style.width = `${(marked / total) * 100}%`

  const completeBtn = document.getElementById("complete-session-btn")
  completeBtn.disabled = marked !== total
}

async function saveProgress() {
  const dateStr = formatDateISO(currentDate)
  const btn = document.getElementById("save-progress-btn")
  const originalText = btn.textContent
  btn.textContent = "💾 Guardando..."
  btn.disabled = true

  try {
    const deletePromises = []
    for (let i = 1; i <= rules.length; i++) {
      if (!ruleChecks.has(i)) {
        deletePromises.push(
          supabase
            .from("rule_checks")
            .delete()
            .eq("user_name", currentUser)
            .eq("check_date", dateStr)
            .eq("rule_number", i),
        )
      }
    }
    await Promise.all(deletePromises)

    for (const [ruleNumber, isCompleted] of ruleChecks.entries()) {
      const { error } = await supabase.from("rule_checks").upsert(
        {
          user_name: currentUser,
          rule_number: ruleNumber,
          is_completed: isCompleted,
          check_date: dateStr,
        },
        {
          onConflict: "user_name,check_date,rule_number",
        },
      )

      if (error) throw error
    }

    btn.textContent = "✅ Guardado"
    setTimeout(() => {
      btn.textContent = originalText
      btn.disabled = false
    }, 2000)
  } catch (error) {
    console.error("Error saving progress:", error)
    btn.textContent = "❌ Error"
    setTimeout(() => {
      btn.textContent = originalText
      btn.disabled = false
    }, 2000)
  }
}

async function completeSession() {
  const dateStr = formatDateISO(currentDate)
  const btn = document.getElementById("complete-session-btn")
  const originalText = btn.textContent
  btn.textContent = "✨ Completando..."
  btn.disabled = true

  try {
    const deletePromises = []
    for (let i = 1; i <= rules.length; i++) {
      if (!ruleChecks.has(i)) {
        deletePromises.push(
          supabase
            .from("rule_checks")
            .delete()
            .eq("user_name", currentUser)
            .eq("check_date", dateStr)
            .eq("rule_number", i),
        )
      }
    }
    await Promise.all(deletePromises)

    for (const [ruleNumber, isCompleted] of ruleChecks.entries()) {
      const { error: checkError } = await supabase.from("rule_checks").upsert(
        {
          user_name: currentUser,
          rule_number: ruleNumber,
          is_completed: isCompleted,
          check_date: dateStr,
        },
        {
          onConflict: "user_name,check_date,rule_number",
        },
      )

      if (checkError) throw checkError
    }

    const { error: sessionError } = await supabase.from("daily_sessions").upsert(
      {
        user_name: currentUser,
        session_date: dateStr,
        is_completed: true,
        completed_at: new Date().toISOString(),
      },
      {
        onConflict: "user_name,session_date",
      },
    )

    if (sessionError) throw sessionError

    btn.textContent = "✅ Completado"
    setTimeout(() => {
      showScreen("modeSelection")
      btn.textContent = originalText
      btn.disabled = false
    }, 2000)
  } catch (error) {
    console.error("Error completing session:", error)
    btn.textContent = "❌ Error"
    setTimeout(() => {
      btn.textContent = originalText
      btn.disabled = false
    }, 2000)
  }
}

async function initResultsMode() {
  const targetUser = currentUser === "Oscar" ? "Yuritzy" : "Oscar"
  document.getElementById("target-user").textContent = targetUser

  currentDate = new Date()
  await loadAndDisplayResults(targetUser)
}

async function loadAndDisplayResults(targetUser) {
  const dateStr = formatDateISO(currentDate)
  document.getElementById("selected-date").textContent = formatDate(currentDate)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selectedDate = new Date(currentDate)
  selectedDate.setHours(0, 0, 0, 0)

  document.getElementById("next-date-btn").disabled = selectedDate >= today

  const { data: sessionData, error: sessionError } = await supabase
    .from("daily_sessions")
    .select("*")
    .eq("user_name", targetUser)
    .eq("session_date", dateStr)
    .maybeSingle()

  if (sessionError) {
    console.error("Error loading session:", sessionError)
    showResultsStatus("error", "Error al cargar los datos")
    return
  }

  if (!sessionData || !sessionData.is_completed) {
    showResultsStatus("not-found", `${targetUser} aún no ha completado el registro para esta fecha`)
    document.getElementById("results-list").innerHTML = ""
    return
  }

  const { data: checksData, error: checksError } = await supabase
    .from("rule_checks")
    .select("*")
    .eq("user_name", targetUser)
    .eq("check_date", dateStr)
    .order("rule_number")

  if (checksError) {
    console.error("Error loading checks:", checksError)
    showResultsStatus("error", "Error al cargar los resultados")
    return
  }

  const completedCount = checksData.filter((c) => c.is_completed).length
  showResultsStatus("completed", `✅ Sesión completada - ${completedCount}/${rules.length} reglas cumplidas`)

  currentResultsData = {
    targetUser,
    date: currentDate,
    checksData,
    completedCount,
  }

  renderResults(checksData)
}

function showResultsStatus(type, message) {
  const statusDiv = document.getElementById("results-status")
  statusDiv.className = `results-status ${type}`
  statusDiv.textContent = message
}

function renderResults(checksData) {
  const container = document.getElementById("results-list")
  container.innerHTML = ""

  const checksMap = new Map()
  checksData.forEach((check) => {
    checksMap.set(check.rule_number, check.is_completed)
  })

  const targetUser = currentResultsData.targetUser
  const targetRules = commonRules

  targetRules.forEach((rule, index) => {
    const ruleNumber = index + 1
    const isCompleted = checksMap.get(ruleNumber) || false

    const item = document.createElement("div")
    item.className = `result-item ${isCompleted ? "completed" : "not-completed"}`
    item.innerHTML = `
            <div class="result-icon">
                ${isCompleted ? "✅" : "❌"}
            </div>
            <div class="result-content">
                <div class="result-number">Regla ${ruleNumber}</div>
                <div class="result-text">${rule}</div>
            </div>
        `
    container.appendChild(item)
  })
}

async function changeResultsDate(days) {
  currentDate.setDate(currentDate.getDate() + days)
  const targetUser = currentUser === "Oscar" ? "Yuritzy" : "Oscar"
  await loadAndDisplayResults(targetUser)
}

function formatDate(date) {
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatDateISO(date) {
  return date.toISOString().split("T")[0]
}

async function downloadPDF() {
  if (!currentResultsData) {
    alert("No hay resultados para descargar")
    return
  }

  const btn = document.getElementById("download-pdf-btn")
  const originalText = btn.textContent
  btn.textContent = "📥 Generando PDF..."
  btn.disabled = true

  try {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    const contentWidth = pageWidth - 2 * margin

    function drawPageBackground() {
      doc.setFillColor(26, 0, 51)
      doc.rect(0, 0, pageWidth, pageHeight, "F")

      for (let i = 0; i < 15; i++) {
        const x = Math.random() * pageWidth
        const y = Math.random() * pageHeight
        const size = Math.random() * 3 + 1
        doc.setFillColor(255, 20, 147, 0.1)
        doc.circle(x, y, size, "F")
      }

      const heartSymbols = ["❤", "💕", "💖", "💗"]
      doc.setTextColor(255, 20, 147)
      doc.setFontSize(8)
      for (let i = 0; i < 8; i++) {
        const x = 5 + Math.random() * (pageWidth - 10)
        const y = 5 + Math.random() * (pageHeight - 10)
        doc.text(heartSymbols[Math.floor(Math.random() * heartSymbols.length)], x, y)
      }
    }

    drawPageBackground()

    let yPos = 25

    doc.setTextColor(255, 105, 180)
    doc.setFontSize(26)
    doc.setFont("helvetica", "bold")
    doc.text(`Resultados de ${currentResultsData.targetUser}`, pageWidth / 2, yPos, { align: "center" })

    yPos += 3
    doc.setFontSize(18)
    doc.text("💕", pageWidth / 2 - 35, yPos)
    doc.text("💕", pageWidth / 2 + 35, yPos)

    yPos += 7
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(255, 182, 193)
    const formattedDate = formatDate(currentResultsData.date)
    doc.text(formattedDate, pageWidth / 2, yPos, { align: "center" })

    yPos += 12

    const percentage = ((currentResultsData.completedCount / rules.length) * 100).toFixed(1)
    const gradientHeight = 18

    for (let i = 0; i < gradientHeight; i++) {
      const ratio = i / gradientHeight
      const r = Math.round(34 + (0 - 34) * ratio)
      const g = Math.round(197 + (100 - 197) * ratio)
      const b = Math.round(94 + (0 - 94) * ratio)
      doc.setFillColor(r, g, b)
      doc.rect(margin, yPos + i, contentWidth, 1, "F")
    }

    doc.setDrawColor(34, 255, 94)
    doc.setLineWidth(2)
    doc.roundedRect(margin, yPos, contentWidth, gradientHeight, 4, 4, "D")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(13)
    doc.setFont("helvetica", "bold")
    doc.text(
      `✨ Sesion completada - ${currentResultsData.completedCount}/${rules.length} reglas cumplidas (${percentage}%) ✨`,
      pageWidth / 2,
      yPos + 12,
      { align: "center" },
    )

    yPos += 26

    const checksMap = new Map()
    currentResultsData.checksData.forEach((check) => {
      checksMap.set(check.rule_number, check.is_completed)
    })

    const targetUser = currentResultsData.targetUser
    const targetRules = commonRules

    targetRules.forEach((rule, index) => {
      const ruleNumber = index + 1
      const isCompleted = checksMap.get(ruleNumber) || false

      const textLines = doc.splitTextToSize(rule, contentWidth - 22)
      const ruleHeight = Math.max(12, 8 + textLines.length * 4)

      if (yPos + ruleHeight > pageHeight - 25) {
        doc.addPage()
        drawPageBackground()
        yPos = 20
      }

      if (ruleNumber === targetRules.length) {
        for (let offset = 0; offset < 3; offset++) {
          doc.setDrawColor(255, 20 + offset * 10, 147)
          doc.setLineWidth(1.5)
          doc.roundedRect(margin - offset, yPos - offset, contentWidth + offset * 2, ruleHeight + offset * 2, 3, 3, "D")
        }

        doc.setFillColor(139, 0, 139)
        doc.roundedRect(margin, yPos, contentWidth, ruleHeight, 3, 3, "F")

        doc.setTextColor(255, 215, 0)
        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.text("💕", margin + 3, yPos + 7)
        doc.text("💕", contentWidth + margin - 5, yPos + 7)

        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.text(`Regla ${ruleNumber} ✨`, margin + 13, yPos + 5)

        doc.setTextColor(255, 255, 255)
        doc.setFont("helvetica", "bold")
        doc.setFontSize(8)
        doc.text(textLines, margin + 13, yPos + 10)

        doc.setTextColor(255, 20, 147)
        doc.setFontSize(7)
        doc.text("❤ Nuestra promesa eterna ❤", pageWidth / 2, yPos + ruleHeight - 2, { align: "center" })
      } else {
        doc.setFillColor(0, 0, 0)
        if (isCompleted) {
          doc.setDrawColor(34, 197, 94)
        } else {
          doc.setDrawColor(239, 68, 68)
        }
        doc.setLineWidth(1.5)
        doc.roundedRect(margin, yPos, contentWidth, ruleHeight, 3, 3, "FD")

        doc.setFontSize(15)
        doc.text(isCompleted ? "✅" : "❌", margin + 3, yPos + 6)

        if (isCompleted) {
          doc.setTextColor(100, 255, 150)
        } else {
          doc.setTextColor(255, 120, 120)
        }
        doc.setFontSize(8)
        doc.setFont("helvetica", "bold")
        doc.text(`Regla ${ruleNumber}`, margin + 13, yPos + 5)

        doc.setTextColor(255, 255, 255)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(7.5)
        doc.text(textLines, margin + 13, yPos + 10)
      }

      yPos += ruleHeight + 3
    })

    const totalPages = doc.internal.pages.length - 1
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFillColor(139, 0, 139)
      doc.rect(0, pageHeight - 12, pageWidth, 12, "F")

      doc.setTextColor(255, 182, 193)
      doc.setFontSize(9)
      doc.setFont("helvetica", "italic")
      doc.text("Generado con amor 💕 Ø=Ü", pageWidth / 2, pageHeight - 5, { align: "center" })
    }

    const fileName = `reglas_${currentResultsData.targetUser}_${formatDateISO(currentResultsData.date)}.pdf`
    doc.save(fileName)

    btn.textContent = "✅ Descargado"
    setTimeout(() => {
      btn.textContent = originalText
      btn.disabled = false
    }, 2000)
  } catch (error) {
    console.error("Error generating PDF:", error)
    btn.textContent = "❌ Error"
    setTimeout(() => {
      btn.textContent = originalText
      btn.disabled = false
    }, 2000)
  }
}

document.addEventListener("DOMContentLoaded", init)
