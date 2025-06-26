// Admin Panel JavaScript con Base de Datos - Versión Limpia

// Configuración de la API
const API_BASE_URL = "api.php";

// Variables globales
let currentEditingNews = null;
let currentEditingRace = null;
let currentEditingResult = null;

// Inicializar panel de administración
document.addEventListener("DOMContentLoaded", () => {
  initializeAdmin();
  loadAllData();
});

function initializeAdmin() {
  // Inicializar manejadores de formularios
  initializeFormHandlers();

  // Inicializar manejadores de modales
  initializeModalHandlers();

  // Inicializar gestión de carreras
  initializeRaces();
}

function initializeFormHandlers() {
  // Formularios principales
  document
    .getElementById("video-form")
    ?.addEventListener("submit", handleVideoSubmit);
  document
    .getElementById("photo-form")
    ?.addEventListener("submit", handlePhotoSubmit);
  document
    .getElementById("news-form")
    ?.addEventListener("submit", handleNewsSubmit);
  document
    .getElementById("pilot-info-form")
    ?.addEventListener("submit", handlePilotInfoSubmit);
  document
    .getElementById("pilot-stats-form")
    ?.addEventListener("submit", handlePilotStatsSubmit);
  document
    .getElementById("config-form")
    ?.addEventListener("submit", handleConfigSubmit);

  // Formularios de carreras
  document
    .getElementById("race-form")
    ?.addEventListener("submit", handleRaceSubmit);
  document
    .getElementById("result-form")
    ?.addEventListener("submit", handleResultSubmit);
  document
    .getElementById("season-stats-form")
    ?.addEventListener("submit", handleSeasonStatsSubmit);
}

function initializeModalHandlers() {
  // Botones de cerrar modal
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      if (modal) {
        closeModal(modal.id);
      }
    });
  });

  // Cerrar modal al hacer clic fuera
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

// Cargar todos los datos al inicializar
async function loadAllData() {
  await Promise.all([
    loadVideos(),
    loadPhotos(),
    loadNews(),
    loadPilotInfo(),
    loadPilotStats(),
    loadConfig(),
    loadUpcomingRaces(),
    loadCompletedRaces(),
    loadRaceResults(),
    loadSeasonStats(),
    loadUserInfo(),
  ]);
}

// ==================== API HELPER FUNCTIONS ====================

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

// ==================== NAVIGATION ====================

function showSection(sectionName) {
  // Ocultar todas las secciones
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Remover clase activa de todas las pestañas
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Mostrar sección seleccionada
  document.getElementById(sectionName + "-section")?.classList.add("active");

  // Agregar clase activa a la pestaña clickeada
  event.target.classList.add("active");
}

// ==================== MODAL FUNCTIONS ====================

function openVideoModal() {
  document.getElementById("video-modal").classList.add("active");
  document.getElementById("video-form").reset();
}

function openPhotoModal() {
  document.getElementById("photo-modal").classList.add("active");
  document.getElementById("photo-form").reset();
}

async function openNewsModal(newsId = null) {
  const elems = getNewsFormElements();
  if (newsId) {
    // Modo edición
    try {
      const item = await apiRequest("news", { id: newsId });

      elems.idInput.value = newsId;
      elems.titleInput.value = item.title;
      elems.excerptInput.value = item.excerpt;
      elems.contentInput.value = item.content;
      elems.authorInput.value = item.author;
      elems.tagsInput.value = item.tags.join(", ");
      elems.categorySelect.value = item.category;
      elems.videoUrlInput.value = item.video || "";

      if (item.image) {
        elems.imgPreview.src = item.image;
        elems.imgPreview.style.display = "block";
      } else {
        elems.imgPreview.style.display = "none";
      }
      elems.photoInput.value = "";

      elems.modalTitle.textContent = "Editar Noticia";
      elems.submitText.textContent = "Actualizar Noticia";
      currentEditingNews = newsId;
    } catch (err) {
      showToast("error", err.message || "Error al cargar la noticia");
      return;
    }
  } else {
    // Modo agregar
    elems.formElement.reset();
    elems.authorInput.value = "Equipo de Prensa";
    elems.imgPreview.style.display = "none";
    elems.modalTitle.textContent = "Agregar Noticia";
    elems.submitText.textContent = "Guardar Noticia";
    currentEditingNews = null;
  }

  document.getElementById("news-modal").classList.add("active");
}

async function openRaceModal(raceId = null) {
  const elements = getRaceFormElements();

  if (raceId) {
    // Modo edición
    try {
      const race = await apiRequest("races", { id: raceId });

      elements.idInput.value = raceId;
      elements.nameInput.value = race.name;
      elements.typeSelect.value = race.type;
      elements.dateInput.value = race.date;
      elements.locationInput.value = race.location;
      elements.lapsInput.value = race.laps || "";
      elements.distanceInput.value = race.distance || "";
      elements.descriptionInput.value = race.description || "";
      elements.broadcastInput.value = race.broadcast || "";

      elements.modalTitle.textContent = "Editar Carrera";
      elements.submitText.textContent = "Actualizar Carrera";
      currentEditingRace = raceId;
    } catch (error) {
      showToast("error", "Error al cargar la carrera");
      return;
    }
  } else {
    // Modo agregar
    document.getElementById("race-form").reset();
    elements.modalTitle.textContent = "Agregar Carrera";
    elements.submitText.textContent = "Guardar Carrera";
    currentEditingRace = null;
  }

  document.getElementById("race-modal").classList.add("active");
}

async function openResultModal(resultId = null) {
  if (resultId) {
    // Modo edición
    try {
      const result = await apiRequest("race-results", { id: resultId });

      document.getElementById("result-id").value = resultId;
      document.getElementById("result-race-name").value = result.race_name;
      document.getElementById("result-position").value = result.position;
      document.getElementById("result-date").value = result.date;
      document.getElementById("result-location").value = result.location;
      document.getElementById("result-laps").value = result.laps || "";
      document.getElementById("result-time").value = result.time || "";
      document.getElementById("result-notes").value = result.notes || "";

      // Checkboxes
      document.getElementById("pole-position").checked =
        result.highlights.includes("Pole Position");
      document.getElementById("fastest-lap").checked =
        result.highlights.includes("Vuelta Rápida");
      document.getElementById("most-laps-led").checked =
        result.highlights.includes("Más Vueltas al Frente");

      document.getElementById("result-modal-title").textContent =
        "Editar Resultado";
      document.getElementById("result-submit-text").textContent =
        "Actualizar Resultado";
      currentEditingResult = resultId;
    } catch (error) {
      showToast("error", "Error al cargar el resultado");
      return;
    }
  } else {
    // Modo agregar
    document.getElementById("result-form").reset();
    document.getElementById("result-modal-title").textContent =
      "Agregar Resultado";
    document.getElementById("result-submit-text").textContent =
      "Guardar Resultado";
    currentEditingResult = null;
  }

  document.getElementById("result-modal").classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId)?.classList.remove("active");

  // Resetear variables de edición
  currentEditingNews = null;
  currentEditingRace = null;
  currentEditingResult = null;
}

// ==================== VIDEO MANAGEMENT ====================

async function handleVideoSubmit(e) {
  e.preventDefault();

  const videoData = {
    url: document.getElementById("video-url").value,
    title: document.getElementById("video-title").value,
    description: document.getElementById("video-description").value,
    category: document.getElementById("video-category").value,
  };

  try {
    await apiRequest("videos", {
      method: "POST",
      body: JSON.stringify(videoData),
    });

    closeModal("video-modal");
    loadVideos();
    showToast("success", "Video agregado exitosamente");
  } catch (error) {
    // Error ya mostrado en apiRequest
  }
}

async function deleteVideo(videoId) {
  if (confirm("¿Estás seguro de que quieres eliminar este video?")) {
    try {
      await apiRequest("videos", {
        method: "DELETE",
        id: videoId,
      });

      loadVideos();
      showToast("success", "Video eliminado exitosamente");
    } catch (error) {
      // Error ya mostrado en apiRequest
    }
  }
}

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
            <div class="media-overlay">
              <button class="btn-icon" onclick="previewVideo('${video.embed_id}')">
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
      <iframe
        src="https://www.youtube.com/embed/${embedId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="width:100%; height:100%; min-height:300px;"
      ></iframe>
    </div>
  `;

  modal.classList.add("active");
}

// ==================== PHOTO MANAGEMENT ====================

async function handlePhotoSubmit(e) {
  e.preventDefault();

  const fileInput = document.getElementById("photo-file");
  const title = document.getElementById("photo-title").value;
  const description = document.getElementById("photo-description").value;
  const category = document.getElementById("photo-category").value;

  const file = fileInput.files[0];
  if (!file) {
    showToast("error", "Selecciona una imagen para subir.");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);

  try {
    const response = await fetch(`${API_BASE_URL}?endpoint=photos-upload`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Error al subir la foto");
    }

    closeModal("photo-modal");
    loadPhotos();
    showToast("success", "Foto subida exitosamente");
  } catch (error) {
    console.error(error);
    showToast("error", error.message);
  }
}

async function deletePhoto(photoId) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta foto?")) return;
  try {
    await apiRequest("photos", {
      method: "DELETE",
      id: photoId,
    });
    loadPhotos();
    showToast("success", "Foto eliminada exitosamente");
  } catch (error) {
    // Error ya mostrado en apiRequest
  }
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

function previewPhoto(url, title) {
  const modal = document.getElementById("preview-modal");
  const content = document.getElementById("preview-modal-content");

  if (!modal || !content) return;

  content.innerHTML = `
    <div class="photo-preview">
      <img src="${url}" alt="${title}">
      <h3 class="preview-title">${title}</h3>
    </div>
  `;

  modal.classList.add("active");
}

// ==================== NEWS MANAGEMENT ====================

async function handleNewsSubmit(e) {
  e.preventDefault();
  const elems = getNewsFormElements();

  const tags = elems.tagsInput.value
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t);

  let imageUrl = "";
  if (currentEditingNews && elems.imgPreview.src) {
    imageUrl = elems.imgPreview.src;
  }

  const videoUrl = elems.videoUrlInput.value.trim() || null;

  const newsData = {
    title: elems.titleInput.value.trim(),
    excerpt: elems.excerptInput.value.trim(),
    content: elems.contentInput.value.trim(),
    image: imageUrl,
    video: videoUrl,
    category: elems.categorySelect.value,
    author: elems.authorInput.value.trim(),
    tags,
  };

  let newsId;
  try {
    if (currentEditingNews) {
      await apiRequest("news", {
        method: "PUT",
        id: currentEditingNews,
        body: JSON.stringify(newsData),
      });
      newsId = currentEditingNews;
      showToast("success", "Noticia actualizada exitosamente");
    } else {
      const created = await apiRequest("news", {
        method: "POST",
        body: JSON.stringify(newsData),
      });
      newsId = created.id;
      showToast("success", "Noticia agregada exitosamente");
    }

    if (elems.photoInput.files.length > 0) {
      const newUrl = await uploadNewsPhoto(elems.photoInput.files[0], newsId);
      elems.imgPreview.src = newUrl;
      elems.imgPreview.style.display = "block";
    }

    closeModal("news-modal");
    loadNews();
  } catch (err) {
    showToast("error", err.message);
  }
}

function getNewsFormElements() {
  const form = document.getElementById("news-form");
  return {
    formElement: form,
    idInput: document.getElementById("news-id"),
    titleInput: document.getElementById("news-title"),
    excerptInput: document.getElementById("news-excerpt"),
    contentInput: document.getElementById("news-content"),
    categorySelect: document.getElementById("news-category-select"),
    authorInput: document.getElementById("news-author"),
    tagsInput: document.getElementById("news-tags"),
    videoUrlInput: document.getElementById("news-video-url"),
    photoInput: document.getElementById("news-photo"),
    imgPreview: document.getElementById("news-image-preview"),
    modalTitle: document.getElementById("news-modal-title"),
    submitText: document.getElementById("news-submit-text"),
  };
}

async function uploadNewsPhoto(file, newsId) {
  const formData = new FormData();
  formData.append("photo", file);
  formData.append("news_id", newsId);

  const res = await fetch(`${API_BASE_URL}?endpoint=news-photo-upload`, {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  if (!res.ok)
    throw new Error(json.error || "Error subiendo la foto de noticia");
  return json.image_url;
}

async function deleteNews(newsId) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta noticia?")) return;
  try {
    await apiRequest("news", {
      method: "DELETE",
      id: newsId,
    });
    showToast("success", "Noticia eliminada exitosamente");
    loadNews();
  } catch {
    // Error ya manejado en apiRequest
  }
}

const NEWS_PLACEHOLDER_IMG = "/placeholder.svg?height=200&width=300";

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

// ==================== RACES MANAGEMENT ====================

function initializeRaces() {
  // Los event listeners ya se configuran en initializeFormHandlers()
  // Solo necesitamos cargar los datos iniciales si los elementos existen
  if (document.getElementById("upcoming-races-list")) {
    loadUpcomingRaces();
  }
  if (document.getElementById("completed-races-list")) {
    loadCompletedRaces();
  }
  if (document.getElementById("race-results-list")) {
    loadRaceResults();
  }
  if (document.getElementById("season-year")) {
    loadSeasonStats();
  }
}

async function handleRaceSubmit(e) {
  e.preventDefault();

  const raceData = {
    name: document.getElementById("race-name").value,
    type: document.getElementById("race-type").value,
    date: document.getElementById("race-date").value,
    location: document.getElementById("race-location").value,
    laps: Number.parseInt(document.getElementById("race-laps").value) || null,
    distance:
      Number.parseFloat(document.getElementById("race-distance").value) || null,
    description: document.getElementById("race-description").value,
    broadcast: document.getElementById("race-broadcast").value,
  };

  try {
    if (currentEditingRace) {
      await apiRequest("races", {
        method: "PUT",
        id: currentEditingRace,
        body: JSON.stringify(raceData),
      });
      showToast("success", "Carrera actualizada exitosamente");
    } else {
      await apiRequest("races", {
        method: "POST",
        body: JSON.stringify(raceData),
      });
      showToast("success", "Carrera agregada exitosamente");
    }

    closeModal("race-modal");
    loadUpcomingRaces();
    loadCompletedRaces();
  } catch (error) {
    showToast("error", error.message);
  }
}

function getRaceFormElements() {
  return {
    idInput: document.getElementById("race-id"),
    nameInput: document.getElementById("race-name"),
    typeSelect: document.getElementById("race-type"),
    dateInput: document.getElementById("race-date"),
    locationInput: document.getElementById("race-location"),
    lapsInput: document.getElementById("race-laps"),
    distanceInput: document.getElementById("race-distance"),
    descriptionInput: document.getElementById("race-description"),
    broadcastInput: document.getElementById("race-broadcast"),
    modalTitle: document.getElementById("race-modal-title"),
    submitText: document.getElementById("race-submit-text"),
  };
}

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

async function handleResultSubmit(e) {
  e.preventDefault();

  const highlights = [];
  if (document.getElementById("pole-position")?.checked)
    highlights.push("Pole Position");
  if (document.getElementById("fastest-lap")?.checked)
    highlights.push("Vuelta Rápida");
  if (document.getElementById("most-laps-led")?.checked)
    highlights.push("Más Vueltas al Frente");

  const resultData = {
    race_name: document.getElementById("result-race-name").value,
    position: Number.parseInt(document.getElementById("result-position").value),
    date: document.getElementById("result-date").value,
    location: document.getElementById("result-location").value,
    laps: Number.parseInt(document.getElementById("result-laps").value) || null,
    time: document.getElementById("result-time").value,
    highlights: highlights,
    notes: document.getElementById("result-notes").value,
  };

  try {
    if (currentEditingResult) {
      await apiRequest("race-results", {
        method: "PUT",
        id: currentEditingResult,
        body: JSON.stringify(resultData),
      });
      showToast("success", "Resultado actualizado exitosamente");
    } else {
      await apiRequest("race-results", {
        method: "POST",
        body: JSON.stringify(resultData),
      });
      showToast("success", "Resultado agregado exitosamente");
    }

    closeModal("result-modal");
    loadRaceResults();
  } catch (error) {
    showToast("error", error.message);
  }
}

async function loadRaceResults() {
  const container = document.getElementById("race-results-list");
  if (!container) return;

  try {
    const results = await apiRequest("race-results");

    if (results.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-trophy"></i>
          <h4>No hay resultados</h4>
          <p>Agrega los resultados de las carreras</p>
        </div>
      `;
      return;
    }

    container.innerHTML = results
      .map((result) => {
        const positionClass = getPositionClass(result.position);
        const highlightTags = result.highlights
          .map((h) => `<span class="highlight-tag">${h}</span>`)
          .join("");

        return `
          <div class="result-admin-item ${positionClass}">
            <div class="result-position">
              <div class="position-number">${result.position}°</div>
              <div class="position-label">${getPositionLabel(
                result.position
              )}</div>
            </div>
            <div class="result-info">
              <h4>${result.race_name}</h4>
              <div class="result-details">
                <span><i class="fas fa-calendar"></i> ${formatDate(
                  new Date(result.date)
                )}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${
                  result.location
                }</span>
                ${
                  result.time
                    ? `<span><i class="fas fa-clock"></i> ${result.time}</span>`
                    : ""
                }
              </div>
              ${
                highlightTags
                  ? `<div class="result-highlights">${highlightTags}</div>`
                  : ""
              }
            </div>
            <div class="result-actions">
              <button class="btn-sm btn-primary" onclick="openResultModal('${
                result.id
              }')">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-sm btn-danger" onclick="deleteResult('${
                result.id
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
        <h4>Error al cargar resultados</h4>
        <p>Intenta recargar la página</p>
      </div>
    `;
  }
}

async function deleteRace(raceId) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta carrera?")) return;

  try {
    await apiRequest("races", {
      method: "DELETE",
      id: raceId,
    });
    showToast("success", "Carrera eliminada exitosamente");
    loadUpcomingRaces();
  } catch (error) {
    showToast("error", error.message);
  }
}

async function deleteResult(resultId) {
  if (!confirm("¿Estás seguro de que quieres eliminar este resultado?")) return;

  try {
    await apiRequest("race-results", {
      method: "DELETE",
      id: resultId,
    });
    showToast("success", "Resultado eliminado exitosamente");
    loadRaceResults();
  } catch (error) {
    showToast("error", error.message);
  }
}

// ==================== SEASON STAT MANAGEMENT ====================

async function handleSeasonStatsSubmit(e) {
  e.preventDefault();

  const year = Number.parseInt(document.getElementById("season-year").value);

  // Paso 1: Obtener los datos existentes
  let existingData = {};
  try {
    const response = await fetch(`api/season-stats.php?year=${year}`);
    if (response.ok) {
      existingData = await response.json();
    }
  } catch (err) {
    console.error("Error al obtener estadísticas existentes:", err);
  }

  // Paso 2: Tomar valores del formulario, usar existentes si están vacíos
  const statsData = {
    year: year,
    championship_position:
      parseInt(document.getElementById("championship-position").value) ||
      existingData.championship_position,
    total_points:
      parseInt(document.getElementById("season-points").value) ||
      existingData.total_points,
    victories:
      parseInt(document.getElementById("victories-season").value) ||
      existingData.victories ||
      0,
    podiums:
      parseInt(document.getElementById("podiums-season").value) ||
      existingData.podiums ||
      0,
    points_gap:
      parseInt(document.getElementById("points-gap").value) ||
      existingData.points_gap,
  };

  // Paso 3: Enviar al backend
  try {
    await apiRequest("season-stats", {
      method: "POST",
      body: JSON.stringify(statsData),
    });
    showToast("success", "Estadísticas de temporada actualizadas");
  } catch (error) {
    showToast("error", error.message);
  }
}

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

function clearSeasonStatsForm() {
  document.getElementById("championship-position").value = "";
  document.getElementById("season-points").value = "";
  document.getElementById("points-gap").value = "";
  document.getElementById("victories-season").value = "";
  document.getElementById("podiums-season").value = "";
}

document.getElementById("season-year").addEventListener("input", (e) => {
  const year = parseInt(e.target.value);
  if (year >= 2010 && year <= 2040) {
    loadSeasonStats(year);
  } else {
    clearSeasonStatsForm();
  }
});

// ==================== PILOT MANAGEMENT ====================

async function handlePilotInfoSubmit(e) {
  e.preventDefault();

  const pilotData = {
    name: document.getElementById("pilot-name").value,
    age: Number.parseInt(document.getElementById("pilot-age").value),
    bio: document.getElementById("pilot-bio").value,
  };

  try {
    await apiRequest("pilot-info", {
      method: "POST",
      body: JSON.stringify(pilotData),
    });

    showToast("success", "Información del piloto actualizada");
    loadPilotInfo();
  } catch (error) {
    // Error ya mostrado en apiRequest
  }
}

async function loadPilotInfo() {
  try {
    const info = await apiRequest("pilot-info");

    if (info && info.name) {
      const nameInput = document.getElementById("pilot-name");
      const ageInput = document.getElementById("pilot-age");
      const bioInput = document.getElementById("pilot-bio");

      if (nameInput) nameInput.value = info.name || "";
      if (ageInput) ageInput.value = info.age || "";
      if (bioInput) bioInput.value = info.bio || "";
    }
  } catch (error) {
    console.error("Error loading pilot info:", error);
  }
}

async function handlePilotStatsSubmit(e) {
  e.preventDefault();

  const statsData = {
    victories: Number.parseInt(
      document.getElementById("pilot-victories").value
    ),
    podiums: Number.parseInt(document.getElementById("pilot-podiums").value),
    seasons: Number.parseInt(document.getElementById("pilot-seasons").value),
    debut_year: Number.parseInt(document.getElementById("pilot-debut").value),
  };

  try {
    await apiRequest("pilot-stats", {
      method: "POST",
      body: JSON.stringify(statsData),
    });

    showToast("success", "Estadísticas del piloto actualizadas");
    loadPilotStats();
  } catch (error) {
    // Error ya mostrado en apiRequest
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

      if (victoriesInput) victoriesInput.value = stats.victories || 0;
      if (podiumsInput) podiumsInput.value = stats.podiums || 0;
      if (seasonsInput) seasonsInput.value = stats.seasons || 0;
      if (debutInput)
        debutInput.value = stats.debut_year || new Date().getFullYear();
    }
  } catch (error) {
    console.error("Error loading pilot stats:", error);
  }
}

// ==================== CONFIGURATION MANAGEMENT ====================

async function handleConfigSubmit(e) {
  e.preventDefault();

  const newPassword = document.getElementById("config-new-password")?.value || "";
  const confirmPassword = document.getElementById("config-confirm-password")?.value || "";

  if (newPassword !== "") {
    if (newPassword.length < 6) {
      showToast("error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("error", "Las contraseñas no coinciden");
      return;
    }
  }

  const configData = {
    site_title: document.getElementById("config-site-title")?.value || "",
    site_description: document.getElementById("config-site-description")?.value || "",
    contact_email: document.getElementById("config-contact-email")?.value || "",
    social_facebook: document.getElementById("config-social-facebook")?.value || "",
    social_twitter: document.getElementById("config-social-twitter")?.value || "",
    social_instagram: document.getElementById("config-social-instagram")?.value || "",
    social_youtube: document.getElementById("config-social-youtube")?.value || "",
    ...(newPassword !== "" && { new_password: newPassword })
  };

  try {
    await apiRequest("config", {
      method: "POST",
      body: JSON.stringify(configData),
    });

    showToast("success", "Configuración actualizada");
    document.getElementById("config-new-password").value = "";
    document.getElementById("config-confirm-password").value = "";
  } catch (error) {
    // Error ya mostrado en apiRequest
  }
}


async function loadConfig() {
  try {
    const config = await apiRequest("config");

    Object.keys(config).forEach((key) => {
      const element = document.getElementById(
        `config-${key.replace("_", "-")}`
      );
      if (element) {
        element.value = config[key] || "";
      }
    });
  } catch (error) {
    console.error("Error loading config:", error);
  }
}

async function loadUserInfo() {
  try {
    const user = await apiRequest("current-user");
    if (user) {
      document.getElementById("config-username").value = user.username || "";
    }
  } catch (err) {
    console.error("Error al cargar datos del usuario", err);
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

// ==================== DRAG AND DROP ====================

function initDragAndDrop(elementId, callback) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.addEventListener("dragover", (e) => {
    e.preventDefault();
    element.classList.add("drag-over");
  });

  element.addEventListener("dragleave", () => {
    element.classList.remove("drag-over");
  });

  element.addEventListener("drop", (e) => {
    e.preventDefault();
    element.classList.remove("drag-over");
    const files = e.dataTransfer.files;
    if (files.length > 0 && callback) {
      callback(files[0]);
    }
  });
}

// ==================== GLOBAL EXPORTS ====================

// Exportar funciones para acceso global
window.showSection = showSection;
window.openVideoModal = openVideoModal;
window.openPhotoModal = openPhotoModal;
window.openNewsModal = openNewsModal;
window.openRaceModal = openRaceModal;
window.openResultModal = openResultModal;
window.closeModal = closeModal;
window.deleteVideo = deleteVideo;
window.deletePhoto = deletePhoto;
window.deleteNews = deleteNews;
window.deleteRace = deleteRace;
window.deleteResult = deleteResult;
window.previewVideo = previewVideo;
window.previewPhoto = previewPhoto;
