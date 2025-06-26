// Admin Panel Design-Only JavaScript
// This file contains only UI/UX functionality without real data manipulation

// Initialize admin panel
document.addEventListener("DOMContentLoaded", () => {
  initializeDesignElements()
  initializeFormHandlers()
})

function initializeDesignElements() {
  // Add smooth transitions and animations
  addSmoothTransitions()

  // Initialize tooltips
  initializeTooltips()

  // Add loading states simulation
  simulateLoadingStates()
}

function initializeFormHandlers() {
  // Add form submission handlers (design only)
  const forms = ["video-form", "photo-form", "news-form", "race-form", "result-form"]

  forms.forEach((formId) => {
    const form = document.getElementById(formId)
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault()
        showSaveToast()
        closeModal(this.closest(".admin-modal").id)
      })
    }
  })
}

// Section Navigation
function showSection(sectionName) {
  // Hide all sections with fade effect
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.style.opacity = "0"
    setTimeout(() => {
      section.classList.remove("active")
    }, 150)
  })

  // Remove active class from all tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show selected section with fade effect
  setTimeout(() => {
    const targetSection = document.getElementById(sectionName + "-section")
    targetSection.classList.add("active")
    targetSection.style.opacity = "1"
  }, 150)

  // Add active class to clicked tab
  event.target.classList.add("active")

  // Add ripple effect to tab
  addRippleEffect(event.target)
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.classList.add("active")

  // Add entrance animation
  const modalContainer = modal.querySelector(".modal-container")
  modalContainer.style.transform = "scale(0.9) translateY(-20px)"
  modalContainer.style.opacity = "0"

  setTimeout(() => {
    modalContainer.style.transform = "scale(1) translateY(0)"
    modalContainer.style.opacity = "1"
  }, 10)

  // Focus first input
  setTimeout(() => {
    const firstInput = modal.querySelector("input, textarea, select")
    if (firstInput) firstInput.focus()
  }, 300)
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  const modalContainer = modal.querySelector(".modal-container")

  // Add exit animation
  modalContainer.style.transform = "scale(0.9) translateY(-20px)"
  modalContainer.style.opacity = "0"

  setTimeout(() => {
    modal.classList.remove("active")
    // Reset form
    const form = modal.querySelector("form")
    if (form) form.reset()
  }, 200)
}

// Toast Notifications
function showToast(type, message) {
  const toast = document.getElementById(type + "-toast")
  const messageElement = document.getElementById(type + "-message")

  messageElement.textContent = message
  toast.classList.add("show")

  // Auto hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Predefined toast functions for design demo
function showSaveToast() {
  showToast("success", "Cambios guardados exitosamente")
}

function showDeleteToast() {
  showToast("error", "Elemento eliminado")
}

function showPreviewToast() {
  showToast("success", "Abriendo vista previa...")
}

// Visual Effects
function addRippleEffect(element) {
  const ripple = document.createElement("span")
  ripple.classList.add("ripple")
  ripple.style.position = "absolute"
  ripple.style.borderRadius = "50%"
  ripple.style.background = "rgba(255, 255, 255, 0.3)"
  ripple.style.transform = "scale(0)"
  ripple.style.animation = "ripple 0.6s linear"
  ripple.style.left = "50%"
  ripple.style.top = "50%"
  ripple.style.width = "20px"
  ripple.style.height = "20px"
  ripple.style.marginLeft = "-10px"
  ripple.style.marginTop = "-10px"

  element.style.position = "relative"
  element.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

function addSmoothTransitions() {
  // Add CSS for ripple animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .admin-section {
      transition: opacity 0.3s ease;
    }
    
    .modal-container {
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .media-item:hover {
      transform: translateY(-4px);
      transition: transform 0.3s ease;
    }
    
    .btn-icon:hover {
      transform: scale(1.1);
      transition: transform 0.2s ease;
    }
    
    .admin-card:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
    }
  `
  document.head.appendChild(style)
}

function initializeTooltips() {
  // Simple tooltip implementation
  document.querySelectorAll("[title]").forEach((element) => {
    element.addEventListener("mouseenter", showTooltip)
    element.addEventListener("mouseleave", hideTooltip)
  })
}

function showTooltip(event) {
  const tooltip = document.createElement("div")
  tooltip.className = "tooltip"
  tooltip.textContent = event.target.getAttribute("title")
  tooltip.style.cssText = `
    position: absolute;
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

  document.body.appendChild(tooltip)

  const rect = event.target.getBoundingClientRect()
  tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"
  tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + "px"

  setTimeout(() => {
    tooltip.style.opacity = "1"
  }, 10)

  event.target._tooltip = tooltip
}

function hideTooltip(event) {
  if (event.target._tooltip) {
    event.target._tooltip.style.opacity = "0"
    setTimeout(() => {
      if (event.target._tooltip) {
        event.target._tooltip.remove()
        delete event.target._tooltip
      }
    }, 300)
  }
}

function simulateLoadingStates() {
  // Add loading animation to buttons when clicked
  document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
    button.addEventListener("click", function () {
      if (this.classList.contains("loading")) return

      const originalText = this.innerHTML
      this.classList.add("loading")
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...'
      this.disabled = true

      setTimeout(() => {
        this.innerHTML = originalText
        this.classList.remove("loading")
        this.disabled = false
      }, 1500)
    })
  })
}

// Form validation visual feedback
function addFormValidation() {
  document.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ef4444"
        this.style.boxShadow = "0 0 0 2px rgba(239, 68, 68, 0.2)"
      } else {
        this.style.borderColor = "#4ade80"
        this.style.boxShadow = "0 0 0 2px rgba(74, 222, 128, 0.2)"
      }
    })

    field.addEventListener("focus", function () {
      this.style.borderColor = "#4ade80"
      this.style.boxShadow = "0 0 0 2px rgba(74, 222, 128, 0.2)"
    })
  })
}

// Initialize form validation
document.addEventListener("DOMContentLoaded", () => {
  addFormValidation()
})

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  // Escape to close modals
  if (event.key === "Escape") {
    document.querySelectorAll(".admin-modal.active").forEach((modal) => {
      closeModal(modal.id)
    })
  }

  // Ctrl+S to save
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault()
    showSaveToast()
  }
})

// Auto-resize textareas
document.querySelectorAll("textarea").forEach((textarea) => {
  textarea.addEventListener("input", function () {
    this.style.height = "auto"
    this.style.height = this.scrollHeight + "px"
  })
})

// Card animations on scroll
function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  })

  document.querySelectorAll(".admin-card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
}

// Initialize all design features
document.addEventListener("DOMContentLoaded", () => {
  initializeScrollAnimations()
})

// Export functions for global access
window.showSection = showSection
window.openModal = openModal
window.closeModal = closeModal
window.showSaveToast = showSaveToast
window.showDeleteToast = showDeleteToast
window.showPreviewToast = showPreviewToast
