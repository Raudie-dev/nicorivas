// Global variables
const galleryData = [
  {
    src: "/placeholder.svg?height=300&width=400",
    title: "Victoria en Puebla",
    date: "17 Julio 2022",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    title: "Triunfo Aguascalientes",
    date: "2023",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    title: "Team Dynamic",
    date: "2021-2023",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    title: "Kartismo",
    date: "Desde los 12 años",
  },
]

// News data for modal
const newsData = {
  1: {
    title: "Triunfo en Aguascalientes marca el regreso al podio más alto",
    category: "Victoria",
    date: "15 Marzo 2024",
    author: "Por: Equipo de Prensa",
    image: "/images/victory-aguascalientes.jpg",
    content: `
      <p>En una carrera que será recordada como una de las mejores actuaciones de Nico Rivas en la temporada 2024, el piloto mexicano logró su segunda victoria del año en el Autódromo de Aguascalientes, demostrando una vez más por qué es considerado uno de los talentos más prometedores de Trucks México Series.</p>
      
      <p>La carrera comenzó con Nico partiendo desde la pole position, una posición que había conquistado el día anterior con una vuelta perfecta durante la clasificación. Desde el inicio, el piloto mostró un ritmo impecable, manteniendo el liderato durante las primeras 20 vueltas y estableciendo el tono para lo que sería una actuación dominante.</p>
      
      <p>"Sabíamos que teníamos un auto competitivo, pero la forma en que todo se desarrolló superó nuestras expectativas", comentó Nico después de la carrera. "El equipo hizo un trabajo excepcional en la preparación del vehículo, y pudimos ejecutar nuestra estrategia a la perfección."</p>
      
      <p>El momento clave de la carrera llegó en la vuelta 35, cuando una bandera amarilla por un incidente menor permitió a varios competidores acercarse al líder. Sin embargo, Nico demostró su madurez como piloto, manteniendo la calma y defendiendo su posición con autoridad en el reinicio.</p>
      
      <p>Esta victoria no solo representa un logro personal para Nico, sino que también consolida su posición en el campeonato, acercándolo significativamente a los líderes de la clasificación general. Con esta actuación, el piloto demuestra que está listo para luchar por el título en lo que resta de la temporada.</p>
    `,
    tags: ["Victoria", "Aguascalientes", "Pole Position", "Vuelta Rápida", "Campeonato"],
  },
  2: {
    title: "Análisis técnico: Claves del éxito en Aguascalientes",
    category: "Análisis",
    date: "1 Marzo 2024",
    author: "Por: Equipo Técnico",
    image: "/images/race-action-1.jpg",
    content: `
      <p>El triunfo de Nico Rivas en Aguascalientes no fue casualidad. Detrás de esta victoria hay un trabajo técnico meticuloso que comenzó semanas antes de la carrera, con el equipo analizando cada detalle del circuito y optimizando el setup del vehículo para las características específicas de esta pista.</p>
      
      <p>El Autódromo de Aguascalientes presenta desafíos únicos para los pilotos de Trucks México Series. Con sus curvas de alta velocidad y largas rectas, requiere un equilibrio perfecto entre velocidad punta y estabilidad aerodinámica. El equipo técnico de Nico trabajó incansablemente para encontrar la configuración ideal.</p>
      
      <p>"Nos enfocamos en tres áreas clave: aerodinámica, suspensión y estrategia de neumáticos", explica el ingeniero jefe del equipo. "Cada ajuste fue calculado para maximizar el rendimiento en las condiciones específicas que esperábamos encontrar el día de la carrera."</p>
      
      <p>La configuración aerodinámica fue crucial para el éxito. El equipo optó por un paquete de baja carga aerodinámica que permitió a Nico alcanzar velocidades superiores en las rectas, mientras que los ajustes en la suspensión garantizaron la estabilidad necesaria para atacar las curvas con confianza.</p>
      
      <p>La estrategia de neumáticos también jugó un papel fundamental. La decisión de usar compuestos más duros en las primeras etapas de la carrera permitió a Nico mantener un ritmo consistente cuando otros pilotos comenzaron a sufrir degradación, especialmente en los últimos 15 minutos de competencia.</p>
    `,
    tags: ["Análisis Técnico", "Aerodinámica", "Setup", "Estrategia", "Neumáticos"],
  },
  3: {
    title: "Mejoras aerodinámicas para el Gran Premio de México",
    category: "Técnico",
    date: "18 Marzo 2024",
    author: "Por: Departamento Técnico",
    image: "/images/race-action-2.jpg",
    content: `
      <p>Con miras al Gran Premio de México en el Autódromo Hermanos Rodríguez, el equipo de Nico Rivas ha implementado una serie de mejoras aerodinámicas significativas que prometen elevar aún más el rendimiento del vehículo en una de las pistas más desafiantes del calendario.</p>
      
      <p>Las modificaciones incluyen un nuevo diseño del alerón delantero, optimizado específicamente para las características de alta altitud del circuito capitalino. A 2,200 metros sobre el nivel del mar, la densidad del aire es considerablemente menor, lo que requiere ajustes precisos en la configuración aerodinámica.</p>
      
      <p>"El Hermanos Rodríguez es único en nuestro calendario", comenta el director técnico. "La altitud afecta no solo la aerodinámica, sino también el rendimiento del motor y el comportamiento de los neumáticos. Hemos trabajado en cada uno de estos aspectos."</p>
      
      <p>Entre las mejoras más notables se encuentra un nuevo difusor trasero que promete aumentar la carga aerodinámica en un 8% sin incrementar significativamente la resistencia al avance. Esta mejora es crucial para mantener la estabilidad en las curvas de alta velocidad del sector 2 del circuito.</p>
      
      <p>El equipo también ha desarrollado nuevos elementos de refrigeración, esenciales para manejar las altas temperaturas que se esperan durante la carrera. Estos componentes han sido probados extensivamente en el túnel de viento y en simulaciones computacionales.</p>
      
      <p>Las pruebas preliminares han mostrado resultados prometedores, con mejoras en los tiempos de vuelta que podrían traducirse en una ventaja competitiva significativa durante la clasificación y la carrera.</p>
    `,
    tags: ["Aerodinámica", "México", "Altitud", "Desarrollo", "Tecnología"],
  },
  4: {
    title: "El camino hacia el podio: Entrevista exclusiva",
    category: "Entrevista",
    date: "12 Marzo 2024",
    author: "Por: María González",
    image: "/images/podium-celebration.jpg",
    content: `
      <p>En una entrevista exclusiva, Nico Rivas comparte sus reflexiones sobre la temporada actual, sus objetivos para las próximas carreras y los desafíos que enfrenta como uno de los pilotos más jóvenes y prometedores de Trucks México Series.</p>
      
      <p><strong>¿Cómo evalúas tu rendimiento en lo que va de la temporada?</strong></p>
      <p>"Estoy muy satisfecho con el progreso que hemos logrado como equipo. Las dos victorias han sido especiales, pero lo que más me emociona es la consistencia que hemos mostrado. Cada carrera aprendemos algo nuevo y eso nos hace más fuertes."</p>
      
      <p><strong>¿Cuál ha sido el mayor desafío de esta temporada?</strong></p>
      <p>"Definitivamente la presión. Cuando empiezas a ganar carreras, las expectativas crecen. Pero he aprendido a canalizar esa presión de manera positiva. Mi familia y mi equipo han sido fundamentales en este proceso."</p>
      
      <p><strong>¿Qué objetivos te has planteado para el resto del año?</strong></p>
      <p>"El objetivo principal es seguir mejorando en cada carrera. Por supuesto, queremos luchar por el campeonato, pero sabemos que tenemos que ir paso a paso. Hay pilotos muy experimentados y equipos muy fuertes, así que debemos mantenernos enfocados."</p>
      
      <p><strong>¿Cómo ha evolucionado tu relación con Team Dynamic?</strong></p>
      <p>"Ha sido increíble. Desde el primer día me hicieron sentir como parte de la familia. La comunicación es excelente y eso se refleja en los resultados. Tenemos una química especial que espero mantener por muchos años."</p>
      
      <p><strong>¿Qué mensaje tienes para tus fanáticos?</strong></p>
      <p>"Que sigan apoyándonos como lo han hecho hasta ahora. Su energía se siente en cada carrera y es una motivación extra para dar siempre lo mejor. Esto apenas está comenzando."</p>
    `,
    tags: ["Entrevista", "Objetivos", "Temporada", "Team Dynamic", "Fanáticos"],
  },
  5: {
    title: "Team Dynamic renueva compromiso para 2024",
    category: "Equipo",
    date: "8 Marzo 2024",
    author: "Por: Comunicaciones Team Dynamic",
    image: "/images/team-dynamic-logo.jpg",
    content: `
      <p>Team Dynamic ha anunciado oficialmente la renovación de su compromiso con Nico Rivas para la temporada 2024, confirmando además una inversión significativa en nuevas tecnologías y equipamiento que fortalecerá aún más la competitividad del equipo en Trucks México Series.</p>
      
      <p>La decisión llega después de los excelentes resultados obtenidos en las primeras carreras de la temporada, donde la combinación del talento de Nico y la experiencia técnica del equipo ha demostrado ser una fórmula ganadora.</p>
      
      <p>"Estamos muy emocionados de continuar esta sociedad con Nico", declaró el director del equipo. "Su dedicación, profesionalismo y velocidad en pista han superado todas nuestras expectativas. Creemos firmemente que juntos podemos alcanzar grandes logros."</p>
      
      <p>La inversión anunciada incluye la adquisición de nuevo equipamiento de telemetría de última generación, que permitirá un análisis más detallado del rendimiento del vehículo durante las sesiones de práctica y carrera. También se ha confirmado la contratación de dos nuevos ingenieros especializados en aerodinámica.</p>
      
      <p>Además, Team Dynamic ha revelado planes para expandir su programa de desarrollo de jóvenes talentos, utilizando la experiencia adquirida con Nico como base para identificar y formar a la próxima generación de pilotos mexicanos.</p>
      
      <p>"Nuestro objetivo no es solo ganar carreras, sino contribuir al crecimiento del automovilismo mexicano", añadió el director. "Nico es un ejemplo perfecto de lo que se puede lograr cuando se combina talento natural con trabajo duro y el apoyo adecuado."</p>
      
      <p>La renovación del acuerdo garantiza la continuidad del proyecto deportivo hasta finales de 2024, con opciones de extensión que podrían prolongar la asociación por varios años más.</p>
    `,
    tags: ["Team Dynamic", "Renovación", "Inversión", "Tecnología", "Desarrollo"],
  },
  6: {
    title: "Preparativos intensos para la próxima fecha",
    category: "Preparación",
    date: "10 Marzo 2024",
    author: "Por: Staff Técnico",
    image: "/images/team-preparation.jpg",
    content: `
      <p>Con la próxima fecha del campeonato acercándose rápidamente, el equipo de Nico Rivas trabaja contra reloj para asegurar que cada detalle esté perfectamente ajustado. Los preparativos han sido intensos, con sesiones de trabajo que se extienden hasta altas horas de la noche.</p>
      
      <p>El proceso de preparación comenzó inmediatamente después de la última carrera, con un análisis exhaustivo de los datos recopilados durante el fin de semana de competencia. Cada vuelta, cada sector, cada frenada ha sido estudiada minuciosamente para identificar áreas de mejora.</p>
      
      <p>"No dejamos nada al azar", explica el jefe de mecánicos. "Cada componente del auto es inspeccionado, cada sistema es verificado múltiples veces. La preparación es tan importante como el talento del piloto."</p>
      
      <p>Una parte crucial de los preparativos involucra las sesiones de simulador, donde Nico ha pasado horas perfeccionando su conocimiento del próximo circuito. Estas sesiones no solo ayudan a memorizar la pista, sino que también permiten probar diferentes configuraciones de setup de manera virtual.</p>
      
      <p>El equipo también ha implementado nuevos protocolos de comunicación durante las carreras, basados en las lecciones aprendidas en competencias anteriores. La coordinación entre el piloto, los ingenieros y el equipo de boxes será clave para maximizar las oportunidades durante la carrera.</p>
      
      <p>Los mecánicos han trabajado en la optimización de los tiempos de pit stop, logrando reducir el tiempo promedio en varios segundos. En una serie tan competitiva como Trucks México, estos detalles pueden marcar la diferencia entre la victoria y el segundo lugar.</p>
      
      <p>"Cada miembro del equipo sabe exactamente cuál es su rol y cómo contribuir al éxito colectivo", añade el coordinador técnico. "Esta preparación meticulosa es lo que nos permite competir al más alto nivel."</p>
    `,
    tags: ["Preparación", "Análisis", "Simulador", "Pit Stop", "Trabajo en Equipo"],
  },
  7: {
    title: "Nuevas alianzas estratégicas para 2024",
    category: "Patrocinio",
    date: "5 Marzo 2024",
    author: "Por: Departamento Comercial",
    image: "/images/new-sponsors.jpg",
    content: `
      <p>El proyecto deportivo de Nico Rivas se fortalece significativamente con la incorporación de nuevos socios comerciales que han decidido apostar por el talento del joven piloto mexicano. Estas alianzas estratégicas no solo proporcionan el respaldo financiero necesario, sino que también aportan expertise técnico y logístico.</p>
      
      <p>Entre los nuevos patrocinadores se encuentra una reconocida empresa de tecnología automotriz que proporcionará sistemas avanzados de telemetría y análisis de datos. Esta colaboración permitirá al equipo acceder a herramientas de última generación para optimizar el rendimiento del vehículo.</p>
      
      <p>"Estamos muy emocionados de trabajar con marcas que comparten nuestra visión de excelencia", comenta el director comercial del equipo. "Estas alianzas van más allá del aspecto financiero; son verdaderas sociedades que nos ayudarán a alcanzar nuestros objetivos deportivos."</p>
      
      <p>Otro de los nuevos socios es una empresa especializada en componentes de alto rendimiento, que proporcionará piezas exclusivas desarrolladas específicamente para las necesidades del equipo. Esta colaboración técnica promete mejoras significativas en áreas clave como la aerodinámica y la eficiencia del motor.</p>
      
      <p>La estrategia comercial del equipo se ha enfocado en atraer socios que no solo busquen visibilidad, sino que también estén interesados en contribuir activamente al desarrollo técnico y deportivo del proyecto. Esta filosofía ha resultado en alianzas más sólidas y duraderas.</p>
      
      <p>Las nuevas asociaciones también incluyen oportunidades de activación de marca innovadoras, desde experiencias VIP en las carreras hasta contenido digital exclusivo que permitirá a los patrocinadores conectar de manera más efectiva con los fanáticos del automovilismo.</p>
      
      <p>"Nuestro objetivo es crear un ecosistema donde todos los involucrados se beneficien", explica el responsable de partnerships. "Los patrocinadores obtienen exposición y asociación con el éxito, mientras que nosotros recibimos el apoyo necesario para competir al más alto nivel."</p>
    `,
    tags: ["Patrocinio", "Alianzas", "Tecnología", "Desarrollo", "Marketing"],
  },
  8: {
    title: "Balance positivo del primer trimestre de 2024",
    category: "Balance",
    date: "2 Marzo 2024",
    author: "Por: Redacción",
    image: "/images/nico-portrait.jpg",
    content: `
      <p>Al concluir el primer trimestre de la temporada 2024, Nico Rivas y su equipo pueden sentirse satisfechos con los resultados obtenidos hasta el momento. Con dos victorias, cinco podios y una posición sólida en el campeonato, los números reflejan el trabajo constante y la dedicación de todo el equipo.</p>
      
      <p>Los primeros tres meses del año han estado marcados por una evolución constante tanto en el aspecto técnico como en el deportivo. El equipo ha demostrado capacidad de adaptación a diferentes tipos de circuitos y condiciones, una versatilidad que será crucial para el resto de la temporada.</p>
      
      <p>"Estamos muy contentos con lo logrado hasta ahora, pero sabemos que lo más difícil está por venir", reflexiona Nico. "Los primeros meses nos han dado confianza, pero también nos han mostrado las áreas donde todavía podemos mejorar."</p>
      
      <p>Uno de los aspectos más destacados ha sido la consistencia en los resultados. A diferencia de temporadas anteriores, donde los altibajos eran más frecuentes, este año el equipo ha logrado mantener un nivel competitivo alto en cada carrera, independientemente de las circunstancias.</p>
      
      <p>El desarrollo técnico también ha sido notable. Las mejoras implementadas en el vehículo han resultado en ganancias medibles de rendimiento, especialmente en áreas como la eficiencia aerodinámica y la gestión de neumáticos durante las carreras largas.</p>
      
      <p>Mirando hacia el futuro, el equipo se muestra optimista pero realista sobre los desafíos que se avecinan. La segunda mitad de la temporada incluye algunos de los circuitos más exigentes del calendario, donde la experiencia y la preparación serán fundamentales.</p>
      
      <p>"Nuestro objetivo sigue siendo el mismo: dar lo mejor en cada carrera y ver hasta dónde nos lleva", concluye el piloto. "Los resultados del primer trimestre nos dan una base sólida, pero sabemos que en este deporte nada está garantizado."</p>
    `,
    tags: ["Balance", "Trimestre", "Resultados", "Evolución", "Objetivos"],
  },
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeScrollEffects()
  initializeSmoothScroll()
  initializeVideoModal()
  initializeNewsModal()
  initializeMultimedia()
})

// Navigation functionality
function initializeNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navbar = document.getElementById("navbar")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    }
  })

  // Hamburger menu (for mobile - to be implemented)
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      // Mobile menu functionality can be added here
      console.log("Mobile menu clicked")
    })
  }
}

// Scroll effects and animations
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"

        // Add special animations for specific elements
        if (entry.target.classList.contains("achievement-card")) {
          entry.target.style.animationDelay = Math.random() * 0.3 + "s"
          entry.target.classList.add("fade-in-up")
        }

        if (entry.target.classList.contains("news-card")) {
          entry.target.style.animationDelay = Math.random() * 0.2 + "s"
          entry.target.classList.add("fade-in-up")
        }
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".achievement-card, .news-card, .journey-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Smooth scroll functionality
function initializeSmoothScroll() {
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Scroll indicator functionality
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        const offsetTop = aboutSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  }
}

// Video modal functionality
function initializeVideoModal() {
  const modal = document.getElementById("videoModal")
  const modalVideo = document.getElementById("modalVideo")

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeVideoModal()
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && modal.style.display === "block") {
      closeVideoModal()
    }
  })
}

// News modal functionality
function initializeNewsModal() {
  const modal = document.getElementById("newsModal")

  if (modal) {
    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeNewsModal()
      }
    })

    // Close modal with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal && modal.style.display === "block") {
        closeNewsModal()
      }
    })
  }
}

// Open video modal
function openVideoModal() {
  const modal = document.getElementById("videoModal")
  const modalVideo = document.getElementById("modalVideo")

  if (modal && modalVideo) {
    modal.style.display = "block"
    modalVideo.play()
    document.body.style.overflow = "hidden"
  }
}

// Close video modal
function closeVideoModal() {
  const modal = document.getElementById("videoModal")
  const modalVideo = document.getElementById("modalVideo")

  if (modal && modalVideo) {
    modal.style.display = "none"
    modalVideo.pause()
    modalVideo.currentTime = 0
    document.body.style.overflow = "auto"
  }
}

// Open news modal
function openNewsModal(newsId) {
  const modal = document.getElementById("newsModal")
  const news = newsData[newsId]

  if (modal && news) {
    // Populate modal content
    document.getElementById("modalNewsImage").src = news.image
    document.getElementById("modalNewsImage").alt = news.title
    document.getElementById("modalNewsCategory").textContent = news.category
    document.getElementById("modalNewsTitle").textContent = news.title
    document.getElementById("modalNewsDate").textContent = news.date
    document.getElementById("modalNewsAuthor").textContent = news.author
    document.getElementById("modalNewsContent").innerHTML = news.content

    // Populate tags
    const tagsContainer = document.getElementById("modalNewsTags")
    tagsContainer.innerHTML = ""
    news.tags.forEach((tag) => {
      const tagElement = document.createElement("span")
      tagElement.className = "news-tag"
      tagElement.textContent = tag
      tagsContainer.appendChild(tagElement)
    })

    // Show modal
    modal.style.display = "block"
    document.body.style.overflow = "hidden"

    // Add fade in effect
    setTimeout(() => {
      modal.style.opacity = "1"
    }, 10)
  }
}

// Close news modal
function closeNewsModal() {
  const modal = document.getElementById("newsModal")
  if (modal) {
    modal.style.opacity = "0"
    setTimeout(() => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }, 200)
  }
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.textContent)
          let current = 0
          const increment = target / 30

          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              counter.textContent = target
              clearInterval(timer)
            } else {
              counter.textContent = Math.floor(current)
            }
          }, 50)

          counterObserver.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// Initialize counter animation
document.addEventListener("DOMContentLoaded", animateCounters)

// Parallax effect for hero video
function initializeParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroVideo = document.querySelector(".hero-video")

    if (heroVideo && scrolled < window.innerHeight) {
      const speed = scrolled * 0.5
      heroVideo.style.transform = `translateY(${speed}px)`
    }
  })
}

// Initialize parallax
document.addEventListener("DOMContentLoaded", initializeParallax)

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
  // Additional scroll handling can go here
}, 16)

window.addEventListener("scroll", throttledScroll)

// Preload video for better performance
function preloadVideo() {
  const heroVideo = document.querySelector(".hero-video video")
  if (heroVideo) {
    heroVideo.load()
  }
}

// Initialize preloading
window.addEventListener("load", preloadVideo)

// Add loading state management
function showLoading() {
  const loadingOverlay = document.createElement("div")
  loadingOverlay.id = "loading-overlay"
  loadingOverlay.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #111827;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            flex-direction: column;
            gap: 1rem;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid #374151;
                border-top: 3px solid #4ade80;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
            <p style="color: white; font-family: Inter, sans-serif;">Cargando...</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `
  document.body.appendChild(loadingOverlay)

  // Remove loading overlay after content loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      const overlay = document.getElementById("loading-overlay")
      if (overlay) {
        overlay.style.opacity = "0"
        overlay.style.transition = "opacity 0.5s ease"
        setTimeout(() => {
          overlay.remove()
        }, 500)
      }
    }, 1000)
  })
}

// Show loading on page load
document.addEventListener("DOMContentLoaded", showLoading)

// Add smooth reveal animation for sections
function addRevealAnimation() {
  const sections = document.querySelectorAll("section")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    revealObserver.observe(section)
  })
}

// Add CSS for revealed sections
const revealStyle = document.createElement("style")
revealStyle.textContent = `
    section.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`
document.head.appendChild(revealStyle)

// Initialize video autoplay handling
document.addEventListener("DOMContentLoaded", handleVideoAutoplay)

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Modal functionality
function openModal(index) {
  const modal = document.getElementById("modal")
  const modalImage = document.getElementById("modal-image")
  const modalTitle = document.getElementById("modal-title")
  const modalDate = document.getElementById("modal-date")

  if (modal && modalImage && modalTitle && modalDate) {
    const data = galleryData[index]

    modalImage.src = data.src
    modalImage.alt = data.title
    modalTitle.textContent = data.title
    modalDate.textContent = data.date

    modal.style.display = "block"
    document.body.style.overflow = "hidden"

    // Add fade in effect
    setTimeout(() => {
      modal.style.opacity = "1"
    }, 10)
  }
}

function closeModal() {
  const modal = document.getElementById("modal")
  if (modal) {
    modal.style.opacity = "0"
    setTimeout(() => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }, 200)
  }
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal")
  if (event.target === modal) {
    closeModal()
  }
})

// Keyboard navigation
document.addEventListener("keydown", (event) => {
  const modal = document.getElementById("modal")
  if (modal && modal.style.display === "block" && event.key === "Escape") {
    closeModal()
  }
})

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
  // Any additional scroll handling can go here
}, 10)

window.addEventListener("scroll", debouncedScroll)

// Carousel functionality
let currentSlideIndex = 0
const slides = document.querySelectorAll(".carousel-item")
const indicators = document.querySelectorAll(".indicator")

function initializeCarousel() {
  if (slides.length > 0) {
    showSlide(currentSlideIndex)

    // Auto-play carousel
    setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length
      showSlide(currentSlideIndex)
    }, 5000)
  }
}

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => slide.classList.remove("active"))
  indicators.forEach((indicator) => indicator.classList.remove("active"))

  // Show current slide
  if (slides[index]) {
    slides[index].classList.add("active")
  }
  if (indicators[index]) {
    indicators[index].classList.add("active")
  }
}

function changeSlide(direction) {
  currentSlideIndex += direction

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1
  }

  showSlide(currentSlideIndex)
}

function currentSlide(index) {
  currentSlideIndex = index - 1
  showSlide(currentSlideIndex)
}

// Contact form functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Basic validation
      if (!name || !email || !subject || !message) {
        alert("Por favor, completa todos los campos.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un email válido.")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector(".submit-btn")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Enviando..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("¡Mensaje enviado exitosamente! Te contactaremos pronto.")
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
}

// FAQ functionality
function initializeFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement
      const isActive = faqItem.classList.contains("active")

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active")
      }
    })
  })
}

function toggleFAQ(element) {
  const faqItem = element.parentElement
  const isActive = faqItem.classList.contains("active")

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active")
  }
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".sponsor-card, .race-card, .video-item, .contact-item")

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Preload images for better performance
function preloadImages() {
  const images = [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=200&width=350",
    "/placeholder.svg?height=100&width=200",
  ]

  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Initialize preloading
document.addEventListener("DOMContentLoaded", preloadImages)

// Initialize contact form and FAQ
document.addEventListener("DOMContentLoaded", () => {
  initializeContactForm()
  initializeFAQ()
})

// =============================================
// MULTIMEDIA FUNCTIONALITY
// =============================================

// Initialize multimedia section
function initializeMultimedia() {
  loadMultimediaContent()
}

// Show multimedia tab
function showMultimediaTab(tabName) {
  // Remove active class from all tabs
  document.querySelectorAll(".multimedia-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Remove active class from all content
  document.querySelectorAll(".multimedia-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Add active class to clicked tab
  event.target.classList.add("active")

  // Show corresponding content
  document.getElementById(tabName + "-tab").classList.add("active")
}

// Load multimedia content from localStorage
function loadMultimediaContent() {
  loadVideosGallery()
  loadPhotosGallery()
}

// Load videos gallery
function loadVideosGallery() {
  const videos = JSON.parse(localStorage.getItem("pilotVideos") || "[]")
  const container = document.getElementById("videos-gallery")

  if (videos.length === 0) {
    container.innerHTML = `
      <div class="multimedia-empty">
        <i class="fas fa-video"></i>
        <h3>No hay videos disponibles</h3>
        <p>Los videos se mostrarán aquí una vez que sean agregados desde el panel de administración.</p>
      </div>
    `
    return
  }

  container.innerHTML = videos
    .map(
      (video) => `
    <div class="multimedia-item video-item" onclick="playVideo('${video.embedId}', '${video.title}')">
      <div class="multimedia-thumbnail">
        <img src="https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg" alt="${video.title}">
        <div class="multimedia-overlay">
          <div class="play-icon">
            <i class="fas fa-play"></i>
          </div>
        </div>
        <div class="multimedia-category">${video.category}</div>
      </div>
      <div class="multimedia-info">
        <h4>${video.title}</h4>
        <p>${video.description}</p>
        <div class="multimedia-meta">
          <span><i class="fas fa-calendar"></i> ${new Date(video.dateAdded).toLocaleDateString("es-ES")}</span>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

// Load photos gallery
function loadPhotosGallery() {
  const photos = JSON.parse(localStorage.getItem("pilotPhotos") || "[]")
  const container = document.getElementById("photos-gallery")

  if (photos.length === 0) {
    container.innerHTML = `
      <div class="multimedia-empty">
        <i class="fas fa-images"></i>
        <h3>No hay fotos disponibles</h3>
        <p>Las fotos se mostrarán aquí una vez que sean agregadas desde el panel de administración.</p>
      </div>
    `
    return
  }

  container.innerHTML = photos
    .map(
      (photo) => `
    <div class="multimedia-item photo-item" onclick="openPhotoModal('${photo.url}', '${photo.title}', '${photo.description}')">
      <div class="multimedia-thumbnail">
        <img src="${photo.url}" alt="${photo.title}" onerror="this.src='/placeholder.svg?height=300&width=400'">
        <div class="multimedia-overlay">
          <div class="view-icon">
            <i class="fas fa-eye"></i>
          </div>
        </div>
        <div class="multimedia-category">${photo.category}</div>
      </div>
      <div class="multimedia-info">
        <h4>${photo.title}</h4>
        <p>${photo.description}</p>
        <div class="multimedia-meta">
          <span><i class="fas fa-calendar"></i> ${new Date(photo.dateAdded).toLocaleDateString("es-ES")}</span>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

// Play video in modal
function playVideo(embedId, title) {
  const modal = document.createElement("div")
  modal.className = "multimedia-modal"
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="this.closest('.multimedia-modal').remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-content">
        <div class="video-container">
          <iframe src="https://www.youtube.com/embed/${embedId}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay"></iframe>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  // Close modal with escape key
  const closeModal = (e) => {
    if (e.key === "Escape") {
      modal.remove()
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", closeModal)
    }
  }
  document.addEventListener("keydown", closeModal)
}

// Open photo modal
function openPhotoModal(url, title, description) {
  const modal = document.createElement("div")
  modal.className = "multimedia-modal"
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="this.closest('.multimedia-modal').remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-content">
        <img src="${url}" alt="${title}" style="max-width: 100%; height: auto; border-radius: 8px;">
        ${description ? `<p style="margin-top: 1rem; color: #6b7280; text-align: center;">${description}</p>` : ""}
      </div>
    </div>
  `
  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  // Close modal with escape key
  const closeModal = (e) => {
    if (e.key === "Escape") {
      modal.remove()
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", closeModal)
    }
  }
  document.addEventListener("keydown", closeModal)
}

// Refresh multimedia content (called from admin panel)
function refreshMultimediaContent() {
  loadMultimediaContent()
}

// Make functions available globally
window.showMultimediaTab = showMultimediaTab
window.playVideo = playVideo
window.openPhotoModal = openPhotoModal
window.refreshMultimediaContent = refreshMultimediaContent
