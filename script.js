// Website Design-Only JavaScript
// This file contains only UI/UX functionality without real data manipulation

// Initialize design elements
document.addEventListener("DOMContentLoaded", () => {
  initializeDesignElements()
  initializeNavigationDesign()
  initializeAnimations()
  initializeInteractiveElements()
})

function initializeDesignElements() {
  // Add smooth transitions and animations
  addSmoothTransitions()

  // Initialize loading animations
  simulateLoadingStates()

  // Add ripple effects to buttons
  addRippleEffects()

  // Initialize scroll animations
  initializeScrollAnimations()
}

function initializeNavigationDesign() {
  const hamburger = document.getElementById("hamburger")
  const navbar = document.getElementById("navbar")
  const mobileNav = document.getElementById("mobile-nav")

  // Navbar scroll effect (design only)
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    }
  })

  // Enhanced hamburger menu functionality
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation()
      toggleMobileMenu()
    })

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll(".nav-link")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu()
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (mobileNav.classList.contains("active") && !hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        closeMobileMenu()
      }
    })

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("active")) {
        closeMobileMenu()
      }
    })

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 968) {
        closeMobileMenu()
      }
    })
  }
}

function toggleMobileMenu() {
  const hamburger = document.getElementById("hamburger")
  const mobileNav = document.getElementById("mobile-nav")

  if (hamburger && mobileNav) {
    const isActive = mobileNav.classList.contains("active")

    if (isActive) {
      closeMobileMenu()
    } else {
      openMobileMenu()
    }
  }
}

function openMobileMenu() {
  const hamburger = document.getElementById("hamburger")
  const mobileNav = document.getElementById("mobile-nav")

  if (hamburger && mobileNav) {
    hamburger.classList.add("active")
    mobileNav.classList.add("active")
    document.body.style.overflow = "hidden"

    // Add entrance animation
    mobileNav.style.transform = "translateX(-100%)"
    setTimeout(() => {
      mobileNav.style.transform = "translateX(0)"
    }, 10)

    // Animate menu items
    const menuItems = mobileNav.querySelectorAll(".nav-link")
    menuItems.forEach((item, index) => {
      item.style.opacity = "0"
      item.style.transform = "translateY(20px)"
      setTimeout(
        () => {
          item.style.opacity = "1"
          item.style.transform = "translateY(0)"
        },
        100 + index * 50,
      )
    })
  }
}

function closeMobileMenu() {
  const hamburger = document.getElementById("hamburger")
  const mobileNav = document.getElementById("mobile-nav")

  if (hamburger && mobileNav) {
    hamburger.classList.remove("active")

    // Add exit animation
    mobileNav.style.transform = "translateX(-100%)"

    setTimeout(() => {
      mobileNav.classList.remove("active")
      document.body.style.overflow = "auto"
    }, 300)
  }
}

function initializeAnimations() {
  // Counter animation for stats
  animateCounters()

  // Parallax effects
  initializeParallax()

  // Scroll reveal animations
  initializeScrollReveal()

  // Hover effects
  addHoverEffects()
}

function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const text = counter.textContent
          const target = Number.parseInt(text.replace(/[^\d]/g, ""))
          const suffix = text.replace(/[\d]/g, "")

          if (target > 0) {
            let current = 0
            const increment = target / 30
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                counter.textContent = target + suffix
                clearInterval(timer)
              } else {
                counter.textContent = Math.floor(current) + suffix
              }
            }, 50)
          }

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

function initializeParallax() {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.pageYOffset
      const heroVideo = document.querySelector(".hero-video")

      if (heroVideo && scrolled < window.innerHeight) {
        const speed = scrolled * 0.3
        heroVideo.style.transform = `translateY(${speed}px)`
      }
    }, 16),
  )
}

function initializeScrollReveal() {
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

        if (entry.target.classList.contains("benefit-card")) {
          entry.target.style.animationDelay = Math.random() * 0.2 + "s"
          entry.target.classList.add("fade-in-up")
        }

        if (entry.target.classList.contains("opportunity-stat")) {
          entry.target.style.animationDelay = Math.random() * 0.15 + "s"
          entry.target.classList.add("fade-in-up")
        }
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".achievement-card, .news-card, .journey-item, .benefit-card, .opportunity-stat, .main-sponsor-card, .sponsor-card",
  )

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

function addHoverEffects() {
  // Card hover effects
  const cards = document.querySelectorAll(".achievement-card, .news-card, .sponsor-card, .benefit-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Button hover effects
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary")

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = ""
    })
  })
}

function initializeInteractiveElements() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80
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
      const aboutSection = document.getElementById("about") || document.querySelector(".about-section")
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

// Modal functionality (design only)
function openVideoModal() {
  const modal = document.getElementById("videoModal")
  const modalVideo = document.getElementById("modalVideo")

  if (modal) {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"

    // Add entrance animation
    modal.style.opacity = "0"
    setTimeout(() => {
      modal.style.opacity = "1"
    }, 10)

    if (modalVideo) {
      // Simulate video play for design purposes
      modalVideo.currentTime = 0
    }
  }
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal")
  const modalVideo = document.getElementById("modalVideo")

  if (modal) {
    modal.style.opacity = "0"
    setTimeout(() => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }, 200)

    if (modalVideo) {
      modalVideo.pause()
      modalVideo.currentTime = 0
    }
  }
}

// Multimedia tab functionality (design only)
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

  // Show corresponding content with animation
  const targetContent = document.getElementById(tabName + "-tab")
  if (targetContent) {
    targetContent.style.opacity = "0"
    targetContent.classList.add("active")

    setTimeout(() => {
      targetContent.style.opacity = "1"
    }, 50)
  }
}

// Visual effects
function addRippleEffects() {
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .multimedia-tab")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
}

function addSmoothTransitions() {
  // Add CSS for smooth transitions
  const style = document.createElement("style")
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .fade-in-up {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    .multimedia-content {
      transition: opacity 0.3s ease;
    }
    
    .nav-link {
      transition: all 0.3s ease;
    }
    
    .mobile-nav .nav-link {
      transition: all 0.3s ease;
    }
    
    .mobile-nav {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hamburger .bar {
      transition: all 0.3s ease;
    }
    
    .modal {
      transition: opacity 0.3s ease;
    }
    
    .card-hover-effect {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .button-hover-effect {
      transition: all 0.3s ease;
    }
  `
  document.head.appendChild(style)
}

function simulateLoadingStates() {
  // Add loading animation to buttons when clicked
  document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
    button.addEventListener("click", function (e) {
      // Don't add loading state to navigation links
      if (this.getAttribute("href") && this.getAttribute("href").startsWith("#")) {
        return
      }

      if (this.classList.contains("loading")) return

      const originalText = this.innerHTML
      this.classList.add("loading")
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...'
      this.disabled = true

      setTimeout(() => {
        this.innerHTML = originalText
        this.classList.remove("loading")
        this.disabled = false
      }, 1500)
    })
  })
}

// Performance optimization functions
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

// Loading screen
function showLoadingScreen() {
  const loadingOverlay = document.createElement("div")
  loadingOverlay.id = "loading-overlay"
  loadingOverlay.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #111827, #1f2937);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      flex-direction: column;
      gap: 1.5rem;
    ">
      <div style="
        width: 60px;
        height: 60px;
        border: 4px solid #374151;
        border-top: 4px solid #4ade80;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      "></div>
      <div style="
        color: white;
        font-family: Inter, sans-serif;
        text-align: center;
      ">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.2rem; font-weight: 600;">Nico Rivas</h3>
        <p style="margin: 0; font-size: 0.9rem; opacity: 0.8;">Cargando experiencia...</p>
      </div>
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
    }, 1200)
  })
}

// Initialize loading screen
document.addEventListener("DOMContentLoaded", showLoadingScreen)

// Modal event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Video modal events
  const modal = document.getElementById("videoModal")
  if (modal) {
    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeVideoModal()
      }
    })

    // Close modal with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.style.display === "block") {
        closeVideoModal()
      }
    })
  }
})

// Scroll to top functionality
function addScrollToTop() {
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>'
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--accent-green);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
  `

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  document.body.appendChild(scrollToTopBtn)

  // Show/hide scroll to top button
  window.addEventListener(
    "scroll",
    throttle(() => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = "1"
        scrollToTopBtn.style.visibility = "visible"
      } else {
        scrollToTopBtn.style.opacity = "0"
        scrollToTopBtn.style.visibility = "hidden"
      }
    }, 100),
  )
}

// Initialize scroll to top
document.addEventListener("DOMContentLoaded", addScrollToTop)

// Form validation visual feedback
function addFormValidation() {
  const inputs = document.querySelectorAll("input, textarea, select")

  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.borderColor = "#4ade80"
      this.style.boxShadow = "0 0 0 2px rgba(74, 222, 128, 0.2)"
    })

    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ef4444"
        this.style.boxShadow = "0 0 0 2px rgba(239, 68, 68, 0.2)"
      } else {
        this.style.borderColor = "#e5e7eb"
        this.style.boxShadow = "none"
      }
    })
  })
}

// Initialize form validation
document.addEventListener("DOMContentLoaded", addFormValidation)

// Preload critical images
function preloadImages() {
  const criticalImages = ["img/NR24-6-ok.png", "img/blanco-png-300x236.png", "img/A7400831-scaled.jpg"]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Initialize image preloading
document.addEventListener("DOMContentLoaded", preloadImages)

// Export functions for global access
window.openVideoModal = openVideoModal
window.closeVideoModal = closeVideoModal
window.showMultimediaTab = showMultimediaTab
window.toggleMobileMenu = toggleMobileMenu
window.openMobileMenu = openMobileMenu
window.closeMobileMenu = closeMobileMenu

function initializeScrollAnimations() {
  // Placeholder for scroll animations initialization
  console.log("Scroll animations initialized")
}
