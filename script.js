// Website Design-Only JavaScript
// This file contains only UI/UX functionality without real data manipulation

// Initialize design elements
document.addEventListener("DOMContentLoaded", () => {
  initializeDesignElements();
  initializeNavigationDesign();
  initializeAnimations();
  initializeInteractiveElements();
});

function initializeDesignElements() {
  // Add smooth transitions and animations
  addSmoothTransitions();

  // Initialize loading animations
  simulateLoadingStates();

  // Add ripple effects to buttons
  addRippleEffects();

  // Initialize scroll animations
  initializeScrollAnimations();
}

function initializeNavigationDesign() {
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");
  const mobileNav = document.getElementById("mobile-nav");

  // Navbar scroll effect (design only)
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // Enhanced hamburger menu functionality
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll(".nav-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        mobileNav.classList.contains("active") &&
        !hamburger.contains(e.target) &&
        !mobileNav.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("active")) {
        closeMobileMenu();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 968) {
        closeMobileMenu();
      }
    });
  }
}

function toggleMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");

  if (hamburger && mobileNav) {
    const isActive = mobileNav.classList.contains("active");

    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
}

function openMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");

  if (hamburger && mobileNav) {
    hamburger.classList.add("active");
    mobileNav.classList.add("active");
    document.body.style.overflow = "hidden";

    // Add entrance animation
    mobileNav.style.transform = "translateX(-100%)";
    setTimeout(() => {
      mobileNav.style.transform = "translateX(0)";
    }, 10);

    // Animate menu items
    const menuItems = mobileNav.querySelectorAll(".nav-link");
    menuItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 100 + index * 50);
    });
  }
}

function closeMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");

  if (hamburger && mobileNav) {
    hamburger.classList.remove("active");

    // Add exit animation
    mobileNav.style.transform = "translateX(-100%)";

    setTimeout(() => {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "auto";
    }, 300);
  }
}

function initializeAnimations() {
  // Counter animation for stats
  animateCounters();

  // Parallax effects
  initializeParallax();

  // Scroll reveal animations
  initializeScrollReveal();

  // Hover effects
  addHoverEffects();
}
function toggleFAQ(element) {
  // Obtener el contenedor del ítem FAQ
  const faqItem = element.closest(".faq-item");

  // Cerrar todos los demás FAQs
  document.querySelectorAll(".faq-item").forEach((item) => {
    if (item !== faqItem) {
      item.classList.remove("active");
      const answer = item.querySelector(".faq-answer");
      answer.style.maxHeight = null;
    }
  });

  // Alternar el estado del FAQ actual
  faqItem.classList.toggle("active");

  // Obtener el elemento de respuesta
  const answer = faqItem.querySelector(".faq-answer");

  // Alternar la visibilidad de la respuesta
  if (faqItem.classList.contains("active")) {
    answer.style.maxHeight = answer.scrollHeight + "px";
  } else {
    answer.style.maxHeight = null;
  }
}
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const text = counter.textContent;
          const target = Number.parseInt(text.replace(/[^\d]/g, ""));
          const suffix = text.replace(/[\d]/g, "");

          if (target > 0) {
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current) + suffix;
              }
            }, 50);
          }

          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

function initializeParallax() {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.pageYOffset;
      const heroVideo = document.querySelector(".hero-video");

      if (heroVideo && scrolled < window.innerHeight) {
        const speed = scrolled * 0.3;
        heroVideo.style.transform = `translateY(${speed}px)`;
      }
    }, 16)
  );
}

function initializeScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Add special animations for specific elements
        if (entry.target.classList.contains("achievement-card")) {
          entry.target.style.animationDelay = Math.random() * 0.3 + "s";
          entry.target.classList.add("fade-in-up");
        }

        if (entry.target.classList.contains("news-card")) {
          entry.target.style.animationDelay = Math.random() * 0.2 + "s";
          entry.target.classList.add("fade-in-up");
        }

        if (entry.target.classList.contains("benefit-card")) {
          entry.target.style.animationDelay = Math.random() * 0.2 + "s";
          entry.target.classList.add("fade-in-up");
        }

        if (entry.target.classList.contains("opportunity-stat")) {
          entry.target.style.animationDelay = Math.random() * 0.15 + "s";
          entry.target.classList.add("fade-in-up");
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".achievement-card, .news-card, .journey-item, .benefit-card, .opportunity-stat, .main-sponsor-card, .sponsor-card"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

function addHoverEffects() {
  // Card hover effects
  const cards = document.querySelectorAll(
    ".achievement-card, .news-card, .sponsor-card, .benefit-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "";
    });
  });
}

function initializeInteractiveElements() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll indicator functionality
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection =
        document.getElementById("about") ||
        document.querySelector(".about-section");
      if (aboutSection) {
        const offsetTop = aboutSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
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
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    const closeButton = document.querySelector('.modal-close');
    
    if (playButton) {
        playButton.addEventListener('click', openVideoModal);
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', closeVideoModal);
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }
});
// Multimedia tab functionality (design only)
function showMultimediaTab(tab) {
  const videoTab = document.getElementById("videos-tab");
  const photoTab = document.getElementById("photos-tab");

  const buttons = document.querySelectorAll(".multimedia-tab");

  // Activar contenido
  if (tab === "videos") {
    videoTab.classList.add("active");
    photoTab.classList.remove("active");
  } else {
    photoTab.classList.add("active");
    videoTab.classList.remove("active");
  }

  // Activar botón correcto
  buttons.forEach((btn) => {
    if (
      btn.textContent.trim().includes(tab === "videos" ? "Videos" : "Fotos")
    ) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Visual effects
function addRippleEffects() {
  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .multimedia-tab"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

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
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

function addSmoothTransitions() {
  // Add CSS for smooth transitions
  const style = document.createElement("style");
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
  `;
  document.head.appendChild(style);
}

function simulateLoadingStates() {
  // Add loading animation to buttons when clicked
  document
    .querySelectorAll(".btn-primary, .btn-secondary")
    .forEach((button) => {
      button.addEventListener("click", function (e) {
        // Don't add loading state to navigation links
        if (
          this.getAttribute("href") &&
          this.getAttribute("href").startsWith("#")
        ) {
          return;
        }

        if (this.classList.contains("loading")) return;

        const originalText = this.innerHTML;
        this.classList.add("loading");
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        this.disabled = true;

        setTimeout(() => {
          this.innerHTML = originalText;
          this.classList.remove("loading");
          this.disabled = false;
        }, 1500);
      });
    });
}

// Performance optimization functions
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Loading screen
function showLoadingScreen() {
  const loadingOverlay = document.createElement("div");
  loadingOverlay.id = "loading-overlay";
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
  `;
  document.body.appendChild(loadingOverlay);

  // Remove loading overlay after content loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      const overlay = document.getElementById("loading-overlay");
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
          overlay.remove();
        }, 500);
      }
    }, 1200);
  });
}

// Initialize loading screen
document.addEventListener("DOMContentLoaded", showLoadingScreen);

// Modal event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Video modal events
  const modal = document.getElementById("videoModal");
  if (modal) {
    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeVideoModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.style.display === "block") {
        closeVideoModal();
      }
    });
  }
});

// Scroll to top functionality
function addScrollToTop() {
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
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
  `;

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener(
    "scroll",
    throttle(() => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = "1";
        scrollToTopBtn.style.visibility = "visible";
      } else {
        scrollToTopBtn.style.opacity = "0";
        scrollToTopBtn.style.visibility = "hidden";
      }
    }, 100)
  );
}

// Initialize scroll to top
document.addEventListener("DOMContentLoaded", addScrollToTop);

// Form validation visual feedback
function addFormValidation() {
  const inputs = document.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.borderColor = "#4ade80";
      this.style.boxShadow = "0 0 0 2px rgba(74, 222, 128, 0.2)";
    });

    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ef4444";
        this.style.boxShadow = "0 0 0 2px rgba(239, 68, 68, 0.2)";
      } else {
        this.style.borderColor = "#e5e7eb";
        this.style.boxShadow = "none";
      }
    });
  });
}

// Initialize form validation
document.addEventListener("DOMContentLoaded", addFormValidation);

// Preload critical images
function preloadImages() {
  const criticalImages = [
    "img/NR24-6-ok.png",
    "img/blanco-png-300x236.png",
    "img/A7400831-scaled.jpg",
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize image preloading
document.addEventListener("DOMContentLoaded", preloadImages);

// Export functions for global access
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.showMultimediaTab = showMultimediaTab;
window.toggleMobileMenu = toggleMobileMenu;
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;

function initializeScrollAnimations() {
  // Placeholder for scroll animations initialization
  //console.log("Scroll animations initialized")
}

// ==================== API HELPER FUNCTIONS ====================
// Configuración de la API
const API_BASE_URL = "admin/api.php";

async function apiRequest(endpoint, options = {}) {
  let url = `${API_BASE_URL}?endpoint=${endpoint}`;
  if (options.id) url += `&id=${options.id}`;
  if (options.type) url += `&type=${options.type}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      method: options.method || "GET",
      body: options.body || null,
    });

    const text = await response.text();

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch {
        throw new Error(
          `Respuesta inesperada del servidor: ${text.slice(0, 100)}...`
        );
      }
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("API request failed:", error);
    console.log("URL usada:", url);
    showToast("error", error.message || "Error de conexión");
    throw error;
  }
}

// ==================== MULTIMEDIA MANAGEMENT ====================

async function loadVideos() {
  try {
    const videos = await apiRequest("videos");
    const container = document.getElementById("videos-list");

    if (!container) return;

    if (videos.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-video"></i>
          <h4>No hay videos</h4>
          <p>Agrega tu primer video de YouTube</p>
        </div>
      `;
      return;
    }

    container.innerHTML = videos
      .map(
        (video) => `
        <div class="media-item">
          <div class="media-thumbnail">
            <img src="https://img.youtube.com/vi/${video.embed_id}/maxresdefault.jpg" alt="${video.title}">
            <button class="preview-button" onclick="previewVideo('${video.embed_id}')">
              <i class="fas fa-play"></i>
            </button>
          </div>
          <div class="media-info">
            <h4>${video.title}</h4>
            <span class="media-category">${video.category}</span>
            <p>${video.description}</p>
          </div>
        </div>
      `
      )
      .join("");
  } catch (error) {
    const container = document.getElementById("videos-list");
    if (container) {
      container.innerHTML = `
        <div class="error-state">
          <i class="fas fa-exclamation-triangle"></i>
          <h4>Error al cargar videos</h4>
          <p>Intenta recargar la página</p>
        </div>
      `;
    }
  }
}

function previewVideo(embedId) {
  const modal = document.getElementById("preview-modal");
  const content = document.getElementById("preview-modal-content");

  if (!modal || !content) return;

  content.innerHTML = `
    <div class="video-preview">
      <div class="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/${embedId}?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

async function loadPhotos() {
  try {
    const photos = await apiRequest("photos");
    const container = document.getElementById("photos-list");

    if (!container) return;

    if (photos.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-images"></i>
          <h4>No hay fotos</h4>
          <p>Agrega tu primera foto</p>
        </div>
      `;
      return;
    }

    container.innerHTML = photos
      .map(
        (photo) => `
        <div class="media-item">
          <div class="media-thumbnail">
            <img src="admin/${photo.url}" alt="${photo.title}" onerror="this.src='/placeholder.svg?height=200&width=300'">
            <button class="preview-button" onclick="previewPhoto('${photo.url}', '${photo.title}')">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <div class="media-info">
            <h4>${photo.title}</h4>
            <span class="media-category">${photo.category}</span>
            <p>${photo.description}</p>
          </div>
        </div>
      `
      )
      .join("");
  } catch (error) {
    const container = document.getElementById("photos-list");
    if (container) {
      container.innerHTML = `
        <div class="error-state">
          <i class="fas fa-exclamation-triangle"></i>
          <h4>Error al cargar fotos</h4>
          <p>Intenta recargar la página</p>
        </div>
      `;
    }
  }
}

function previewPhoto(url, title = "") {
  const modal = document.getElementById("preview-modal");
  const content = document.getElementById("preview-modal-content");

  if (!modal || !content) return;

  content.innerHTML = `
    <div class="photo-preview">
      <img src="admin/${url}" alt="${title}" style="max-width: 100%; border-radius: 8px;">
      <h4 style="margin-top: 1rem;">${title}</h4>
    </div>
  `;

  modal.classList.add("active");
}

function closePreviewModal() {
  const modal = document.getElementById("preview-modal");
  const content = document.getElementById("preview-modal-content");

  if (modal && content) {
    modal.classList.remove("active");
    content.innerHTML = ""; // Elimina el iframe y detiene el video
  }
}

// ==================== NEWS MANAGEMENT ====================

async function loadNews() {
  const container = document.getElementById("news-list");
  if (!container) return;

  try {
    const items = await apiRequest("news");
    if (!items.length) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-newspaper"></i>
          <h4>No hay noticias</h4>
          <p>Agrega tu primera noticia</p>
        </div>
      `;
      return;
    }

    const escapeHtml = (str) =>
      String(str).replace(
        /[&<>"']/g,
        (m) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[m])
      );

    container.innerHTML = items
      .map((item) => {
        const title = escapeHtml(item.title);
        const excerpt = escapeHtml(item.excerpt);
        const author = escapeHtml(item.author);
        const date = formatDate(item.created_at);
        const cat = escapeHtml(item.category);

        const imgSrc = item.image || NEWS_PLACEHOLDER_IMG;
        const catBadge = `<span class="news-category">${cat}</span>`;

        const videoBtn = item.video
          ? `<button class="video-btn" onclick="previewVideo('${item.embed_id}')">
             <i class="fas fa-play"></i>
           </button>`
          : "";

        const tagsHtml = (item.tags || [])
          .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
          .join("");

        return `
        <div class="news-card${item.featured ? " featured" : ""}${
          item.clickable ? " clickable" : ""
        }">
          <div class="news-image">
            <img
              src="${imgSrc}"
              alt="${title}"
              onerror="this.src='${NEWS_PLACEHOLDER_IMG}'"
            />
            ${catBadge}
            ${videoBtn}
          </div>
          <div class="news-content">
            <h3>${title}</h3>
            <p>${excerpt}</p>
            <div class="news-meta">
              <span class="news-author">Por ${author}</span>
              <span class="news-date">${date}</span>
            </div>
            <div class="news-tags">${tagsHtml}</div>
            <div class="news-actions">
              <button class="btn btn-sm btn-primary" onclick="openNewsModal('${
                item.id
              }')">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-sm btn-danger" onclick="deleteNews('${
                item.id
              }')">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  } catch (e) {
    container.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Error al cargar noticias</h4>
        <p>Intenta recargar la página</p>
      </div>
    `;
  }
}

async function loadAllPublicNews() {
  const container = document.querySelector(".all-news-grid");
  if (!container) return;

  try {
    const items = await apiRequest("news");

    if (!items.length) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-newspaper"></i>
          <h4>No hay noticias</h4>
          <p>Pronto se publicarán novedades.</p>
        </div>`;
      return;
    }

    container.innerHTML = items
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((item) => {
        const imgSrc = item.image
          ? `admin/${item.image}`
          : item.embed_id
          ? `https://img.youtube.com/vi/${item.embed_id}/hqdefault.jpg`
          : "/placeholder.svg?height=200&width=350";

        const cat = item.category || "General";
        const date = formatDate(item.created_at);
        const excerpt = item.excerpt || "Sin resumen";
        const title = item.title || "Sin título";
        const author = item.author ? `Por: ${item.author}` : "";

        return `
          <article class="news-card clickable" onclick="showNewsModal(${item.id})">
            <div class="news-image">
              <img src="${imgSrc}" alt="${title}">
              <div class="news-category">${cat}</div>
            </div>
            <div class="news-content">
              <h3>${title}</h3>
              <p>${excerpt}</p>
              <div class="news-meta">
                <span class="news-date">${date}</span>
                <span class="news-author">${author}</span>
              </div>
            </div>
          </article>`;
      })
      .join("");
  } catch (error) {
    container.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Error al cargar noticias</h4>
        <p>Intenta recargar la página.</p>
      </div>`;
  }
}

async function showNewsModal(id) {
  const modal = document.getElementById("news-modal");
  const content = document.getElementById("news-modal-content");
  if (!modal || !content) return;

  // Mostrar loading state
  content.innerHTML = `
    <div class="news-loading">
      <div class="loading-spinner"></div>
      <p>Cargando noticia...</p>
    </div>
  `;
  modal.classList.add("active");

  try {
    const items = await apiRequest("news");
    const item = items.find((n) => n.id == id);
    if (!item) return;

    const hasImage = Boolean(item.image);
    const hasVideo = Boolean(item.video && item.embed_id);
    const imgSrc = hasImage ? `admin/${item.image}` : "";

    const createVideoEmbed = (embedId) => `
      <div class="news-video-container">
        <div class="news-video">
          <iframe
            src="https://www.youtube.com/embed/${embedId}?modestbranding=1&rel=0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `;

    const createImageBlock = (src, alt, className = "") => `
      <div class="${className}">
        <img src="${src}" alt="${alt}" loading="lazy" />
        <div class="image-overlay"></div>
      </div>
    `;

    let mediaContent = "";

    if (hasImage && hasVideo) {
      mediaContent =
        createImageBlock(imgSrc, item.title, "news-body-image") +
        createVideoEmbed(item.embed_id);
    } else if (hasImage) {
      mediaContent = createImageBlock(imgSrc, item.title, "news-body-image");
    } else if (hasVideo) {
      mediaContent = createVideoEmbed(item.embed_id);
    }

    const tagsHtml = (item.tags || [])
      .map((t) => `<span class="news-tag">${t}</span>`)
      .join("");

    const readingTime = Math.ceil((item.content?.length || 0) / 1000) || 1;

    content.innerHTML = `
      <button class="news-modal-close" onclick="closeNewsModal()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="news-modal-body">
        <div class="news-header-info">
          <div class="news-meta-top">
            <span class="news-date">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${formatDate(item.created_at)}
            </span>
            <span class="news-reading-time">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              ${readingTime} min de lectura
            </span>
          </div>
          ${
            tagsHtml ? `<div class="news-tags-container">${tagsHtml}</div>` : ""
          }
        </div>

        <h1 class="news-title">${item.title}</h1>

        ${
          item.excerpt && item.excerpt !== item.content
            ? `<p class="news-excerpt">${item.excerpt}</p>`
            : ""
        }

        <div class="news-content">
          <p>${item.content || item.excerpt || "Contenido no disponible"}</p>
        </div>

        ${mediaContent}

        <div class="news-actions">
          <button class="news-action-btn share-btn" onclick="shareNews('${
            item.title
          }')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16,6 12,2 8,6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Compartir
          </button>
        </div>
      </div>
    `;

    setTimeout(() => {
      content.classList.add("news-modal-loaded");
    }, 50);
  } catch (error) {
    content.innerHTML = `
      <div class="news-error">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <h3>Error al cargar</h3>
        <p>No se pudo cargar la noticia. Inténtalo de nuevo.</p>
        <button class="retry-btn" onclick="showNewsModal(${id})">Reintentar</button>
      </div>
    `;
  }
}

function closeNewsModal() {
  const modal = document.getElementById("news-modal");
  if (modal) {
    modal.classList.remove("active");
  }
}

function shareNews(title) {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: window.location.href,
    });
  } else {
    // Fallback para navegadores que no soportan Web Share API
    navigator.clipboard.writeText(window.location.href);
    // Aquí podrías mostrar un toast de confirmación
  }
}

function bookmarkNews(id) {
  // Implementar lógica de guardado
  console.log("Guardando noticia:", id);
  // Aquí podrías cambiar el ícono o mostrar confirmación
}

async function loadPublicNews() {
  const container = document.querySelector(".news-grid");
  if (!container) return;

  try {
    const items = await apiRequest("news");
    const latestNews = items
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3); // Solo las 3 más recientes

    if (!latestNews.length) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-newspaper"></i>
          <h4>No hay noticias</h4>
          <p>Pronto se publicarán novedades.</p>
        </div>`;
      return;
    }

    container.innerHTML = latestNews
      .map((item, index) => {
        const imgSrc = item.image
          ? `admin/${item.image}`
          : item.embed_id
          ? `https://img.youtube.com/vi/${item.embed_id}/hqdefault.jpg`
          : "/placeholder.svg?height=200&width=350";
        const cat = item.category || "General";
        const date = formatDate(item.created_at);

        return `
    <article class="news-card ${
      index === 0 ? "featured" : ""
    }" onclick="showNewsModal(${item.id})">
      <div class="news-image">
        <img src="${imgSrc}" alt="${item.title}" />
        <div class="news-category">${cat}</div>
      </div>
      <div class="news-content">
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <div class="news-meta">
          <span class="news-date">${date}</span>
        </div>
      </div>
    </article>`;
      })
      .join("");
  } catch (error) {
    container.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Error al cargar noticias</h4>
        <p>Intenta recargar la página.</p>
      </div>`;
  }
}

function closeNewsModal() {
  const modal = document.getElementById("news-modal");
  const content = document.getElementById("news-modal-content");
  if (modal && content) {
    modal.classList.remove("active");
    content.innerHTML = "";
  }
}

// ==================== RACES MANAGEMENT ====================

async function loadUpcomingRaces() {
  const container = document.getElementById("upcoming-races-list");
  if (!container) return;

  try {
    const races = await apiRequest("races", { type: "upcoming" });

    if (races.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-calendar-plus"></i>
          <h4>No hay carreras programadas</h4>
          <p>Agrega la próxima carrera del calendario</p>
        </div>
      `;
      return;
    }

    container.innerHTML = races
      .map((race) => {
        const raceDate = new Date(race.date);

        return `
          <div class="race-admin-item ${race.is_next ? "next-race" : ""}">
            <div class="race-date-badge">
              <div class="date-day">${raceDate.getDate()}</div>
              <div class="date-month">${getMonthName(raceDate.getMonth())}</div>
            </div>
            <div class="race-info">
              <h4>${race.name}</h4>
              <div class="race-details">
                <span><i class="fas fa-map-marker-alt"></i> ${
                  race.location
                }</span>
                <span><i class="fas fa-clock"></i> ${formatTime(
                  raceDate
                )}</span>
                ${
                  race.broadcast
                    ? `<span><i class="fas fa-tv"></i> ${race.broadcast}</span>`
                    : ""
                }
              </div>
            </div>
            <div class="race-actions">
              <button class="btn-sm btn-primary" onclick="openRaceModal('${
                race.id
              }')">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-sm btn-danger" onclick="deleteRace('${
                race.id
              }')">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    container.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Error al cargar carreras</h4>
        <p>Intenta recargar la página</p>
      </div>
    `;
  }
}

async function loadCompletedRaces() {
  const container = document.getElementById("race-completed-results-list");
  if (!container) return;

  try {
    const races = await apiRequest("races", { type: "completed" });

    if (races.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-calendar-plus"></i>
          <h4>No hay carreras completadas</h4>
        </div>
      `;
      return;
    }

    container.innerHTML = races
      .map((race) => {
        const raceDate = new Date(race.date);

        return `
          <div class="race-admin-item ${race.is_next ? "next-race" : ""}">
            <div class="race-date-badge">
              <div class="date-day">${raceDate.getDate()}</div>
              <div class="date-month">${getMonthName(raceDate.getMonth())}</div>
            </div>
            <div class="race-info">
              <h4>${race.name}</h4>
              <div class="race-details">
                <span><i class="fas fa-map-marker-alt"></i> ${
                  race.location
                }</span>
                <span><i class="fas fa-clock"></i> ${formatTime(
                  raceDate
                )}</span>
                ${
                  race.broadcast
                    ? `<span><i class="fas fa-tv"></i> ${race.broadcast}</span>`
                    : ""
                }
              </div>
            </div>
            <div class="race-actions">
              <button class="btn-sm btn-primary" onclick="openRaceModal('${
                race.id
              }')">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-sm btn-danger" onclick="deleteRace('${
                race.id
              }')">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    container.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Error al cargar carreras</h4>
        <p>Intenta recargar la página</p>
      </div>
    `;
  }
}

async function loadPublicUpcomingRaces() {
  const container = document.getElementById("upcoming-races-list");
  if (!container) return;

  try {
    const races = await apiRequest("races", { type: "upcoming" });

    if (!Array.isArray(races) || races.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-calendar-times"></i>
          <h4>No hay carreras programadas</h4>
          <p>Muy pronto anunciaremos nuevas fechas</p>
        </div>
      `;
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Para comparar sin hora

    // ✅ Filtrar, ordenar y limitar
    const upcoming = races
      .filter((r) => new Date(r.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 10); // Máximo 10

    if (upcoming.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-calendar-check"></i>
          <h4>No hay carreras futuras</h4>
          <p>Por ahora no hay fechas confirmadas a partir de hoy</p>
        </div>
      `;
      return;
    }

    container.innerHTML = upcoming
      .map((race) => {
        const date = new Date(race.date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = getMonthName(date.getMonth());
        const year = date.getFullYear();
        const time = formatTime(date);

        return `
          <div class="race-card upcoming ${race.is_next ? "next" : ""}">
            ${
              race.is_next
                ? `<div class="race-status-badge">Próxima Carrera</div>`
                : ""
            }
            <div class="race-date">
              <div class="date-day">${day}</div>
              <div class="date-month">${month}</div>
              <div class="date-year">${year}</div>
            </div>
            <div class="race-info">
              <h3>${race.name}</h3>
              <div class="race-details">
                <div class="detail-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>${race.location}</span>
                </div>
                <div class="detail-item">
                  <i class="fas fa-clock"></i>
                  <span>${time}</span>
                </div>
                ${
                  race.broadcast
                    ? `<div class="detail-item">
                         <i class="fas fa-tv"></i>
                         <span>${race.broadcast}</span>
                       </div>`
                    : ""
                }
              </div>
            </div>
            <div class="race-actions">
              <a href="#" class="btn-secondary">Ver detalles</a>
            </div>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Error al cargar las próximas carreras:", error);
    container.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Error al cargar carreras</h4>
        <p>Intenta recargar la página</p>
      </div>
    `;
  }
}

async function loadRaceResults() {
  const container = document.getElementById("race-results-list");
  if (!container) return;

  try {
    const results = await apiRequest("race-results");

    if (!Array.isArray(results) || results.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-trophy"></i>
          <h4>No hay resultados</h4>
          <p>Muy pronto se publicarán los resultados de las últimas carreras</p>
        </div>
      `;
      return;
    }

    // ✅ Ordenar por fecha descendente y tomar solo los 3 más recientes
    const latestResults = results
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    container.innerHTML = latestResults
      .map((result) => {
        const date = new Date(result.date);
        const formattedDate = formatLongDate(date); // Ej: 28 Febrero 2024
        const positionClass = getPositionClass(result.position); // victory, podium, points

        const highlights = (result.highlights || [])
          .map((h) => `<span class="highlight-tag">${h}</span>`)
          .join("");

        return `
          <div class="result-card ${positionClass}">
            <div class="result-position">
              <div class="position-number">${result.position}°</div>
              <div class="position-label">${getPositionLabel(result.position)}</div>
            </div>
            <div class="result-info">
              <h3>${result.race_name}</h3>
              <div class="result-date">${formattedDate}</div>
              <div class="result-location">${result.location}</div>
              <div class="result-stats">
                <span>${result.laps} Vueltas</span>
                <!-- <span>${result.distance} km</span> -->
                <span>${result.time}</span>
              </div>
            </div>
            ${
              highlights
                ? `<div class="result-highlights">${highlights}</div>`
                : ""
            }
          </div>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Error al cargar resultados:", error);
    container.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Error al cargar resultados</h4>
        <p>Intenta recargar la página</p>
      </div>
    `;
  }
}

// ==================== UTILITY FUNCTIONS ====================

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("es-ES", options);
}

function formatRaceDate(date) {
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date) {
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getMonthName(monthIndex) {
  const months = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];
  return months[monthIndex];
}

function getPositionClass(position) {
  if (position === 1) return "victory";
  if (position <= 3) return "podium";
  if (position <= 10) return "points";
  return "finish";
}

function getPositionLabel(position) {
  if (position === 1) return "Lugar";
  if (position <= 3) return "Lugar";
  if (position <= 10) return "Lugar";
  return "Lugar";
}

function formatLongDate(date) {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
// ==================== SEASON STAT MANAGEMENT ====================

async function loadSeasonStats(year) {
  try {
    if (!year) {
      clearSeasonStatsForm();
      return;
    }

    const stats = await apiRequest(`season-stats&year=${year}`);

    if (stats) {
      document.getElementById("season-year").value = stats.year || year;
      document.getElementById("championship-position").value =
        stats.championship_position ?? "";
      document.getElementById("season-points").value = stats.total_points ?? "";
      document.getElementById("points-gap").value = stats.points_gap ?? "";
      document.getElementById("victories-season").value = stats.victories ?? "";
      document.getElementById("podiums-season").value = stats.podiums ?? "";
    } else {
      clearSeasonStatsForm();
    }
  } catch (error) {
    console.error("Error loading season stats:", error);
    clearSeasonStatsForm();
  }
}

async function loadPublicSeasonOverview() {
  const year = new Date().getFullYear();
  try {
    const stats = await apiRequest(`season-stats&year=${year}`);
    if (!stats) return;

    document.getElementById("season-year-display").textContent =
      stats.year || year;
    document.getElementById("victories-count").textContent =
      stats.victories ?? "0";
    document.getElementById("podiums-count").textContent = stats.podiums ?? "0";

    document.getElementById("position-rank").textContent =
      stats.championship_position ? `${stats.championship_position}°` : "-";
    document.getElementById("position-number").textContent =
      stats.championship_position ? `${stats.championship_position}°` : "-";

    document.getElementById("points-count").textContent = stats.total_points
      ? `${stats.total_points} puntos`
      : "0 puntos";
    document.getElementById("points-gap").textContent = stats.points_gap ?? "-";
  } catch (err) {
    console.error("Error al cargar estadísticas públicas de temporada:", err);
  }
}

// ==================== PILOT MANAGEMENT ====================

async function loadPilotInfo() {
  try {
    const info = await apiRequest("pilot-info");

    if (info && info.name) {
      const nameInput = document.getElementById("pilot-name");
      const ageInput = document.getElementById("pilot-age");
      const bioInput = document.getElementById("pilot-bio");

      if (nameInput) nameInput.textContent = info.name || "";
      if (ageInput) ageInput.textContent = info.age || "";
      if (bioInput) bioInput.textContent = info.bio || "";
    }
  } catch (error) {
    console.error("Error loading pilot info:", error);
  }
}

async function loadPilotStats() {
  try {
    const stats = await apiRequest("pilot-stats");

    if (stats && stats.victories !== undefined) {
      const victoriesInput = document.getElementById("pilot-victories");
      const podiumsInput = document.getElementById("pilot-podiums");
      const seasonsInput = document.getElementById("pilot-seasons");
      const debutInput = document.getElementById("pilot-debut");

      if (victoriesInput) victoriesInput.textContent = stats.victories || 0;
      if (podiumsInput) podiumsInput.textContent = stats.podiums || 0;
      if (seasonsInput) seasonsInput.textContent = stats.seasons || 0;
      if (debutInput)
        debutInput.textContent = stats.debut_year || new Date().getFullYear();
    }
  } catch (error) {
    console.error("Error loading pilot stats:", error);
  }
}

// ==================== TOAST NOTIFICATIONS ====================

function showToast(type, message) {
  // Remover toasts existentes
  const existingToasts = document.querySelectorAll(".toast");
  existingToasts.forEach((toast) => toast.remove());

  // Crear elemento toast
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas fa-${
        type === "success" ? "check-circle" : "exclamation-circle"
      }"></i>
      <span>${message}</span>
    </div>
  `;

  // Agregar al DOM
  document.body.appendChild(toast);

  // Activar animación
  setTimeout(() => toast.classList.add("show"), 100);

  // Remover después de 5 segundos
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 5000);
}

// ==================== HERO STATS ====================

async function loadHeroStats() {
  try {
    // Obtener las estadísticas del piloto desde la API
    const stats = await apiRequest("pilot-stats");

    // Seleccionar el contenedor de estadísticas
    const heroStatsContainer = document.querySelector(".hero-stats");

    if (!heroStatsContainer) return;

    // Actualizar el HTML con los datos de la API
    heroStatsContainer.innerHTML = `
      <div class="stat-item">
        <div class="stat-number">${stats.victories || 0}</div>
        <div class="stat-label">Victorias</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.podiums || 0}</div>
        <div class="stat-label">Podios</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.seasons || 0}</div>
        <div class="stat-label">Temporadas</div>
      </div>
    `;
  } catch (error) {
    console.error("Error loading hero stats:", error);
    // Mostrar valores por defecto en caso de error
    const heroStatsContainer = document.querySelector(".hero-stats");
    if (heroStatsContainer) {
      heroStatsContainer.innerHTML = `
        <div class="stat-item">
          <div class="stat-number">0</div>
          <div class="stat-label">Victorias</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">0</div>
          <div class="stat-label">Podios</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">0</div>
          <div class="stat-label">Temporadas</div>
        </div>
      `;
    }
  }
}

async function loadConfig() {
  try {
    const config = await apiRequest("config");

    // Configuración general editable
    Object.keys(config).forEach((key) => {
      const element = document.getElementById(
        `config-${key.replace("_", "-")}`
      );
      if (element) {
        element.value = config[key] || "";
      }
    });

    // Configuración para actualizar elementos visibles
    const configMapping = {
      site_title: [{ selector: "#site-title", attribute: "textContent" }],
      contact_email: [{ selector: "#contact-email", attribute: "textContent" }],
      site_description: [
        { selector: "#site-description", attribute: "textContent" },
        { selector: "#site-description-footer", attribute: "textContent" },
      ],
      social_facebook: [
        { selector: ".social-facebook", attribute: "href", multiple: true },
      ],
      social_twitter: [
        { selector: ".social-twitter", attribute: "href", multiple: true },
      ],
      social_instagram: [
        { selector: ".social-instagram", attribute: "href", multiple: true },
      ],
      social_youtube: [
        { selector: ".social-youtube", attribute: "href", multiple: true },
      ],
    };

    Object.entries(configMapping).forEach(([key, entries]) => {
      entries.forEach(({ selector, attribute, prefix, multiple }) => {
        if (!config[key]) return;

        if (multiple) {
          document.querySelectorAll(selector).forEach((el) => {
            el[attribute] = prefix ? prefix + config[key] : config[key];
          });
        } else {
          const element = document.querySelector(selector);
          if (element) {
            element[attribute] = prefix ? prefix + config[key] : config[key];
          }
        }
      });
    });
  } catch (error) {
    console.error("Error loading config:", error);
  }
}

// Llamar a la función cuando se cargue la página
document.addEventListener("DOMContentLoaded", () => {
  loadHeroStats();
  loadConfig();
  loadPilotInfo();
  loadVideos();
  loadPhotos();
  loadPilotStats();
  loadPublicNews();
  loadAllPublicNews();
  loadPublicSeasonOverview();
  loadPublicUpcomingRaces();
  loadRaceResults();
});
