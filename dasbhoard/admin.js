// Admin Panel JavaScript

// Global variables
let currentEditingNews = null

// Initialize admin panel
document.addEventListener("DOMContentLoaded", () => {
  initializeAdmin()
  loadAllData()
})

function initializeAdmin() {
  // Initialize form handlers
  document.getElementById("video-form").addEventListener("submit", handleVideoSubmit)
  document.getElementById("photo-form").addEventListener("submit", handlePhotoSubmit)
  document.getElementById("news-form").addEventListener("submit", handleNewsSubmit)

  // Auto-save functionality
  if (localStorage.getItem("autoSave") !== "false") {
    setInterval(autoSave, 30000) // Auto-save every 30 seconds
  }
}

// Section Navigation
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.classList.remove("active")
  })

  // Remove active class from all tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show selected section
  document.getElementById(sectionName + "-section").classList.add("active")

  // Add active class to clicked tab
  event.target.classList.add("active")
}

// Modal Functions
function openVideoModal() {
  document.getElementById("video-modal").classList.add("active")
  document.getElementById("video-form").reset()
}

function openPhotoModal() {
  document.getElementById("photo-modal").classList.add("active")
  document.getElementById("photo-form").reset()
}

function openNewsModal(newsId = null) {
  const modal = document.getElementById("news-modal")
  const form = document.getElementById("news-form")

  if (newsId) {
    // Edit mode
    const news = getNewsById(newsId)
    if (news) {
      document.getElementById("news-modal-title").textContent = "Editar Noticia"
      document.getElementById("news-submit-text").textContent = "Actualizar Noticia"
      document.getElementById("news-id").value = newsId
      document.getElementById("news-title").value = news.title
      document.getElementById("news-category-select").value = news.category
      document.getElementById("news-image").value = news.image
      document.getElementById("news-excerpt").value = news.excerpt
      document.getElementById("news-content").value = news.content
      document.getElementById("news-author").value = news.author
      document.getElementById("news-tags").value = news.tags.join(", ")
      currentEditingNews = newsId
    }
  } else {
    // Add mode
    document.getElementById("news-modal-title").textContent = "Agregar Noticia"
    document.getElementById("news-submit-text").textContent = "Guardar Noticia"
    form.reset()
    document.getElementById("news-author").value = "Equipo de Prensa"
    currentEditingNews = null
  }

  modal.classList.add("active")
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active")
  currentEditingNews = null
}

// Video Management
function handleVideoSubmit(e) {
  e.preventDefault()

  const videoData = {
    id: Date.now().toString(),
    url: document.getElementById("video-url").value,
    title: document.getElementById("video-title").value,
    description: document.getElementById("video-description").value,
    category: document.getElementById("video-category").value,
    embedId: extractYouTubeId(document.getElementById("video-url").value),
    dateAdded: new Date().toISOString(),
  }

  if (!videoData.embedId) {
    showToast("error", "URL de YouTube inválida")
    return
  }

  addVideo(videoData)
  closeModal("video-modal")
  loadVideos()
  showToast("success", "Video agregado exitosamente")
}

function extractYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

function addVideo(videoData) {
  const videos = JSON.parse(localStorage.getItem("pilotVideos") || "[]")
  videos.push(videoData)
  localStorage.setItem("pilotVideos", JSON.stringify(videos))
}

function deleteVideo(videoId) {
  if (confirm("¿Estás seguro de que quieres eliminar este video?")) {
    let videos = JSON.parse(localStorage.getItem("pilotVideos") || "[]")
    videos = videos.filter((video) => video.id !== videoId)
    localStorage.setItem("pilotVideos", JSON.stringify(videos))
    loadVideos()
    showToast("success", "Video eliminado exitosamente")
  }
}

function loadVideos() {
  const videos = JSON.parse(localStorage.getItem("pilotVideos") || "[]")
  const container = document.getElementById("videos-list")

  if (videos.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-video"></i>
                <h4>No hay videos</h4>
                <p>Agrega tu primer video de YouTube</p>
            </div>
        `
    return
  }

  container.innerHTML = videos
    .map(
      (video) => `
        <div class="media-item">
            <div class="media-thumbnail">
                <img src="https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg" alt="${video.title}">
                <div class="media-overlay">
                    <button class="btn-icon" onclick="previewVideo('${video.embedId}')">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn-icon btn-danger" onclick="deleteVideo('${video.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="media-info">
                <h4>${video.title}</h4>
                <span class="media-category">${video.category}</span>
                <p>${video.description}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

// Photo Management
function handlePhotoSubmit(e) {
  e.preventDefault()

  const photoData = {
    id: Date.now().toString(),
    url: document.getElementById("photo-url").value,
    title: document.getElementById("photo-title").value,
    description: document.getElementById("photo-description").value,
    category: document.getElementById("photo-category").value,
    dateAdded: new Date().toISOString(),
  }

  addPhoto(photoData)
  closeModal("photo-modal")
  loadPhotos()
  showToast("success", "Foto agregada exitosamente")
}

function addPhoto(photoData) {
  const photos = JSON.parse(localStorage.getItem("pilotPhotos") || "[]")
  photos.push(photoData)
  localStorage.setItem("pilotPhotos", JSON.stringify(photos))
}

function deletePhoto(photoId) {
  if (confirm("¿Estás seguro de que quieres eliminar esta foto?")) {
    let photos = JSON.parse(localStorage.getItem("pilotPhotos") || "[]")
    photos = photos.filter((photo) => photo.id !== photoId)
    localStorage.setItem("pilotPhotos", JSON.stringify(photos))
    loadPhotos()
    showToast("success", "Foto eliminada exitosamente")
  }
}

function loadPhotos() {
  const photos = JSON.parse(localStorage.getItem("pilotPhotos") || "[]")
  const container = document.getElementById("photos-list")

  if (photos.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-images"></i>
                <h4>No hay fotos</h4>
                <p>Agrega tu primera foto</p>
            </div>
        `
    return
  }

  container.innerHTML = photos
    .map(
      (photo) => `
        <div class="media-item">
            <div class="media-thumbnail">
                <img src="${photo.url}" alt="${photo.title}" onerror="this.src='/placeholder.svg?height=200&width=300'">
                <div class="media-overlay">
                    <button class="btn-icon" onclick="previewPhoto('${photo.url}', '${photo.title}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-danger" onclick="deletePhoto('${photo.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="media-info">
                <h4>${photo.title}</h4>
                <span class="media-category">${photo.category}</span>
                <p>${photo.description}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

// News Management
function handleNewsSubmit(e) {
  e.preventDefault()

  const newsId = document.getElementById("news-id").value
  const newsData = {
    id: newsId || Date.now().toString(),
    title: document.getElementById("news-title").value,
    category: document.getElementById("news-category-select").value,
    image: document.getElementById("news-image").value,
    excerpt: document.getElementById("news-excerpt").value,
    content: document.getElementById("news-content").value,
    author: document.getElementById("news-author").value,
    tags: document
      .getElementById("news-tags")
      .value.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    date: newsId
      ? getNewsById(newsId).date
      : new Date().toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    dateAdded: newsId ? getNewsById(newsId).dateAdded : new Date().toISOString(),
  }

  if (newsId) {
    updateNews(newsData)
    showToast("success", "Noticia actualizada exitosamente")
  } else {
    addNews(newsData)
    showToast("success", "Noticia agregada exitosamente")
  }

  closeModal("news-modal")
  loadNews()
}

function addNews(newsData) {
  const news = JSON.parse(localStorage.getItem("pilotNews") || "[]")
  news.unshift(newsData) // Add to beginning
  localStorage.setItem("pilotNews", JSON.stringify(news))
}

function updateNews(newsData) {
  const news = JSON.parse(localStorage.getItem("pilotNews") || "[]")
  const index = news.findIndex((item) => item.id === newsData.id)
  if (index !== -1) {
    news[index] = newsData
    localStorage.setItem("pilotNews", JSON.stringify(news))
  }
}

function deleteNews(newsId) {
  if (confirm("¿Estás seguro de que quieres eliminar esta noticia?")) {
    let news = JSON.parse(localStorage.getItem("pilotNews") || "[]")
    news = news.filter((item) => item.id !== newsId)
    localStorage.setItem("pilotNews", JSON.stringify(news))
    loadNews()
    showToast("success", "Noticia eliminada exitosamente")
  }
}

function getNewsById(newsId) {
  const news = JSON.parse(localStorage.getItem("pilotNews") || "[]")
  return news.find((item) => item.id === newsId)
}

function loadNews() {
  const news = JSON.parse(localStorage.getItem("pilotNews") || "[]")
  const container = document.getElementById("news-list")

  if (news.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-newspaper"></i>
                <h4>No hay noticias</h4>
                <p>Agrega tu primera noticia</p>
            </div>
        `
    return
  }

  container.innerHTML = news
    .map(
      (item) => `
        <div class="news-admin-item">
            <div class="news-admin-image">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='/placeholder.svg?height=150&width=200'">
                <span class="news-admin-category">${item.category}</span>
            </div>
            <div class="news-admin-content">
                <h4>${item.title}</h4>
                <p>${item.excerpt}</p>
                <div class="news-admin-meta">
                    <span><i class="fas fa-calendar"></i> ${item.date}</span>
                    <span><i class="fas fa-user"></i> ${item.author}</span>
                </div>
                <div class="news-admin-tags">
                    ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                </div>
            </div>
            <div class="news-admin-actions">
                <button class="btn-icon" onclick="openNewsModal('${item.id}')" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deleteNews('${item.id}')" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

// Preview Functions
function previewVideo(embedId) {
  const modal = document.createElement("div")
  modal.className = "preview-modal"
  modal.innerHTML = `
        <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
        <div class="modal-container">
            <div class="modal-header">
                <h3>Vista Previa del Video</h3>
                <button class="modal-close" onclick="this.closest('.preview-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/${embedId}" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    `
  document.body.appendChild(modal)
  modal.classList.add("active")
}

function previewPhoto(url, title) {
  const modal = document.createElement("div")
  modal.className = "preview-modal"
  modal.innerHTML = `
        <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
        <div class="modal-container">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="this.closest('.preview-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <img src="${url}" alt="${title}" style="max-width: 100%; height: auto;">
            </div>
        </div>
    `
  document.body.appendChild(modal)
  modal.classList.add("active")
}

// Data Management
function loadAllData() {
  loadVideos()
  loadPhotos()
  loadNews()
  loadPilotInfo()
}

function loadPilotInfo() {
  const pilotInfo = JSON.parse(localStorage.getItem("pilotInfo") || "{}")
  const pilotStats = JSON.parse(localStorage.getItem("pilotStats") || "{}")

  // Load pilot info
  if (pilotInfo.name) document.getElementById("pilot-name").value = pilotInfo.name
  if (pilotInfo.age) document.getElementById("pilot-age").value = pilotInfo.age
  if (pilotInfo.bio) document.getElementById("pilot-bio").value = pilotInfo.bio

  // Load pilot stats
  if (pilotStats.victories) document.getElementById("victories").value = pilotStats.victories
  if (pilotStats.podiums) document.getElementById("podiums").value = pilotStats.podiums
  if (pilotStats.seasons) document.getElementById("seasons").value = pilotStats.seasons
  if (pilotStats.debutYear) document.getElementById("debut-year").value = pilotStats.debutYear
}

function saveAllData() {
  // Save pilot info
  const pilotInfo = {
    name: document.getElementById("pilot-name").value,
    age: document.getElementById("pilot-age").value,
    bio: document.getElementById("pilot-bio").value,
  }
  localStorage.setItem("pilotInfo", JSON.stringify(pilotInfo))

  // Save pilot stats
  const pilotStats = {
    victories: document.getElementById("victories").value,
    podiums: document.getElementById("podiums").value,
    seasons: document.getElementById("seasons").value,
    debutYear: document.getElementById("debut-year").value,
  }
  localStorage.setItem("pilotStats", JSON.stringify(pilotStats))

  showToast("success", "Todos los datos guardados exitosamente")
}

function autoSave() {
  saveAllData()
  console.log("Auto-save completed")
}

function clearAllData() {
  if (confirm("¿Estás seguro de que quieres eliminar TODOS los datos? Esta acción no se puede deshacer.")) {
    localStorage.removeItem("pilotVideos")
    localStorage.removeItem("pilotPhotos")
    localStorage.removeItem("pilotNews")
    localStorage.removeItem("pilotInfo")
    localStorage.removeItem("pilotStats")

    loadAllData()
    showToast("success", "Todos los datos han sido eliminados")
  }
}

function resetToDefaults() {
  if (confirm("¿Estás seguro de que quieres restaurar los valores por defecto?")) {
    clearAllData()

    // Set default values
    document.getElementById("pilot-name").value = "Nico Rivas"
    document.getElementById("pilot-age").value = "21"
    document.getElementById("pilot-bio").value =
      "Piloto profesional de Trucks México Series desde 2018. Conquistando pistas mexicanas con pasión, determinación y excelencia deportiva."
    document.getElementById("victories").value = "3"
    document.getElementById("podiums").value = "11"
    document.getElementById("seasons").value = "6"
    document.getElementById("debut-year").value = "2018"

    saveAllData()
    showToast("success", "Valores por defecto restaurados")
  }
}

// Toast Notifications
function showToast(type, message) {
  const toast = document.getElementById(type + "-toast")
  const messageElement = document.getElementById(type + "-message")

  messageElement.textContent = message
  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Export data for main site
function getMultimediaData() {
  return {
    videos: JSON.parse(localStorage.getItem("pilotVideos") || "[]"),
    photos: JSON.parse(localStorage.getItem("pilotPhotos") || "[]"),
    news: JSON.parse(localStorage.getItem("pilotNews") || "[]"),
    pilotInfo: JSON.parse(localStorage.getItem("pilotInfo") || "{}"),
    pilotStats: JSON.parse(localStorage.getItem("pilotStats") || "{}"),
  }
}

// Make functions available globally
window.showSection = showSection
window.openVideoModal = openVideoModal
window.openPhotoModal = openPhotoModal
window.openNewsModal = openNewsModal
window.closeModal = closeModal
window.deleteVideo = deleteVideo
window.deletePhoto = deletePhoto
window.deleteNews = deleteNews
window.previewVideo = previewVideo
window.previewPhoto = previewPhoto
window.saveAllData = saveAllData
window.clearAllData = clearAllData
window.resetToDefaults = resetToDefaults
window.getMultimediaData = getMultimediaData
