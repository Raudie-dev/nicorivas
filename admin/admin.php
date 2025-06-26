<?php
// admin.php - Panel de Administración
require_once 'config.php';

// Verificar autenticación (opcional - puedes implementar login)
session_start();

//autenticación básica
if (!isset($_SESSION['user_logged_in']) || $_SESSION['user_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}

// Obtener configuración del sitio para mostrar en el panel
$database = new Database();
$db = $database->getConnection();

// Obtener información básica para el dashboard
try {
    // Contar elementos
    $stmt = $db->prepare("SELECT COUNT(*) as count FROM videos");
    $stmt->execute();
    $videos_count = $stmt->fetch()['count'];

    $stmt = $db->prepare("SELECT COUNT(*) as count FROM photos");
    $stmt->execute();
    $photos_count = $stmt->fetch()['count'];

    $stmt = $db->prepare("SELECT COUNT(*) as count FROM news");
    $stmt->execute();
    $news_count = $stmt->fetch()['count'];

    // Obtener información del piloto
    $stmt = $db->prepare("SELECT * FROM pilot_info ORDER BY id DESC LIMIT 1");
    $stmt->execute();
    $pilot_info = $stmt->fetch();

    // Obtener estadísticas del piloto
    $stmt = $db->prepare("SELECT * FROM pilot_stats ORDER BY id DESC LIMIT 1");
    $stmt->execute();
    $pilot_stats = $stmt->fetch();
} catch (Exception $e) {
    error_log("Error loading admin data: " . $e->getMessage());
    $videos_count = 0;
    $photos_count = 0;
    $news_count = 0;
    $pilot_info = null;
    $pilot_stats = null;
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Control - Nico Rivas</title>
    <link rel="stylesheet" href="../styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        /* Estilos adicionales específicos para el admin */
        .admin-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: var(--card-bg);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            border: 1px solid var(--border-color);
        }

        .stat-number {
            font-size: 2rem;
            font-weight: 800;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }

        .stat-label {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        .last-updated {
            background: var(--surface-color);
            border-radius: 8px;
            padding: 1rem;
            margin-top: 1rem;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
    </style>
</head>

<body class="admin-body">
    <!-- Admin Header -->
    <header class="admin-header">
        <div class="container">
            <div class="admin-header-content">
                <div class="admin-logo">
                    <div class="nav-logo">
                        <img src="../img/NR24-6-ok.png" alt="logo Nico Rivas" class="nav-logo-img">
                    </div>
                    <div class="logo-text">
                        <span class="logo-name">PANEL DE</span>
                        <span class="logo-surname">CONTROL</span>
                    </div>
                </div>

                <div class="admin-actions">
                    <a href="../index.php" class="btn-secondary" target="_blank">
                        <i class="fas fa-eye"></i>
                        Ver Sitio Web
                    </a>
                    <button class="btn-primary" onclick="location.reload()">
                        <i class="fas fa-sync-alt"></i>
                        Actualizar
                    </button>
                    <a href="logout.php" class="btn-primary">
                        Cerrar Sesión
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Admin Navigation -->
    <nav class="admin-nav">
        <div class="container">
            <div class="admin-nav-tabs">
                <button class="nav-tab active" onclick="showSection('dashboard')">
                    <i class="fas fa-tachometer-alt"></i>
                    Dashboard
                </button>
                <button class="nav-tab" onclick="showSection('multimedia')">
                    <i class="fas fa-photo-video"></i>
                    Multimedia
                </button>
                <button class="nav-tab" onclick="showSection('noticias')">
                    <i class="fas fa-newspaper"></i>
                    Noticias
                </button>
                <button class="nav-tab" onclick="showSection('carreras')">
                    <i class="fas fa-car"></i>
                    Carreras
                </button>
                <button class="nav-tab" onclick="showSection('perfil')">
                    <i class="fas fa-user"></i>
                    Perfil del Piloto
                </button>
                <button class="nav-tab" onclick="showSection('configuracion')">
                    <i class="fas fa-cog"></i>
                    Configuración
                </button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="admin-main">
        <div class="container">
            <!-- Dashboard Section -->
            <section id="dashboard-section" class="admin-section active">
                <div class="section-header">
                    <h2>Dashboard</h2>
                    <p>Resumen general del sitio web</p>
                </div>

                <!-- Statistics Cards -->
                <div class="admin-stats">
                    <div class="stat-card">
                        <div class="stat-number"><?php echo $videos_count; ?></div>
                        <div class="stat-label">Videos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number"><?php echo $photos_count; ?></div>
                        <div class="stat-label">Fotos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number"><?php echo $news_count; ?></div>
                        <div class="stat-label">Noticias</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number"><?php echo $pilot_stats ? $pilot_stats['victories'] : 0; ?></div>
                        <div class="stat-label">Victorias</div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="admin-grid">
                    <div class="admin-card">
                        <div class="card-header">
                            <h3><i class="fas fa-bolt"></i> Acciones Rápidas</h3>
                        </div>
                        <div class="card-content">
                            <div style="display: grid; gap: 1rem;">
                                <button class="btn-primary" onclick="openVideoModal()">
                                    <i class="fas fa-video"></i>
                                    Agregar Video
                                </button>
                                <button class="btn-primary" onclick="openPhotoModal()">
                                    <i class="fas fa-image"></i>
                                    Agregar Foto
                                </button>
                                <button class="btn-primary" onclick="openNewsModal()">
                                    <i class="fas fa-newspaper"></i>
                                    Nueva Noticia
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="admin-card">
                        <div class="card-header">
                            <h3><i class="fas fa-info-circle"></i> Información del Sistema</h3>
                        </div>
                        <div class="card-content">
                            <div class="last-updated">
                                <strong>Versión PHP:</strong> <?php echo PHP_VERSION; ?>
                            </div>
                            <div class="last-updated">
                                <strong>Estado de la base de datos:</strong>
                                <span class="color: var(--success-color);">Conectada</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Multimedia Section -->
            <section id="multimedia-section" class="admin-section">
                <div class="section-header">
                    <h2>Gestión de Multimedia</h2>
                    <p>Administra fotos y videos del piloto</p>
                </div>

                <div class="admin-grid">
                    <!-- Videos Section -->
                    <div class="admin-card">
                        <div class="card-header">
                            <h3><i class="fas fa-video"></i> Videos de YouTube</h3>
                            <button class="btn-primary btn-sm" onclick="openVideoModal()">
                                <i class="fas fa-plus"></i>
                                Agregar Video
                            </button>
                        </div>
                        <div class="card-content">
                            <div id="videos-list" class="media-grid">
                                <!-- Videos will be loaded here -->
                            </div>
                        </div>
                    </div>

                    <!-- Photos Section -->
                    <div class="admin-card">
                        <div class="card-header">
                            <h3><i class="fas fa-images"></i> Galería de Fotos</h3>
                            <button class="btn-primary btn-sm" onclick="openPhotoModal()">
                                <i class="fas fa-plus"></i>
                                Agregar Foto
                            </button>
                        </div>
                        <div class="card-content">
                            <div id="photos-list" class="media-grid">
                                <!-- Photos will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Noticias Section -->
            <section id="noticias-section" class="admin-section">
                <div class="section-header">
                    <h2>Gestión de Noticias</h2>
                    <p>Administra las noticias y actualizaciones del piloto</p>
                </div>

                <div class="admin-card">
                    <div class="card-header">
                        <h3><i class="fas fa-newspaper"></i> Noticias</h3>
                        <button class="btn-primary btn-sm" onclick="openNewsModal()">
                            <i class="fas fa-plus"></i>
                            Nueva Noticia
                        </button>
                    </div>
                    <div class="card-content">
                        <div id="news-list" class="news-admin-grid">
                            <!-- News will be loaded here -->
                        </div>
                    </div>
                </div>
            </section>

            <!-- Carreras Section - Reemplaza la sección vacía en tu admin.php -->
            <section id="carreras-section" class="admin-section">
                <div class="section-header">
                    <h2>Gestión de Carreras</h2>
                    <p>Administra las carreras, resultados y calendario de competencias</p>
                </div>

                <div class="admin-grid">
                    <!-- Próximas Carreras -->
                    <div class="admin-card">
                        <div class="card-header">
                            <h3><i class="fas fa-calendar-plus"></i> Próximas Carreras</h3>
                            <button class="btn-primary btn-sm" onclick="openRaceModal()">
                                <i class="fas fa-plus"></i>
                                Nueva Carrera
                            </button>
                        </div>
                        <div class="card-content">
                            <div id="upcoming-races-list" class="races-admin-list">
                                <!-- Próximas carreras se cargarán aquí -->
                            </div>
                        </div>
                    </div>

                    <!-- Resultados Recientes -->
                    <div class="admin-card">
                        <div class="card-header">
                            <h3><i class="fas fa-trophy"></i> Resultados</h3>
                            <button class="btn-primary btn-sm" onclick="openResultModal()">
                                <i class="fas fa-plus"></i>
                                Agregar Resultado
                            </button>
                        </div>
                        <div class="card-content">
                            <div id="race-results-list" class="results-admin-list">
                                <!-- Resultados se cargarán aquí -->
                            </div>
                        </div>
                    </div>

                    <!-- Carreras Completadas -->
                    <div class="admin-card">
                        <div class="card-header">
                            <h3><i class="fas fa-trophy"></i> Carreras Completadas</h3>
                            <button class="btn-primary btn-sm" onclick="openRaceModal()">
                                <i class="fas fa-plus"></i>
                                Nueva Carrera
                            </button>
                        </div>
                        <div class="card-content">
                            <div id="race-completed-results-list" class="results-admin-list">
                                <!-- Resultados se cargarán aquí -->
                            </div>
                        </div>
                    </div>

                    <!-- Estadísticas de Temporada -->
                    <div class="admin-card">
                        <div class="card-header">
                            <h3><i class="fas fa-chart-bar"></i> Estadísticas de Temporada</h3>
                        </div>
                        <div class="card-content">
                            <form id="season-stats-form" class="admin-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="season-year">Temporada</label>
                                        <input type="number" id="season-year" min="2010" max="2040">
                                    </div>
                                    <div class="form-group">
                                        <label for="championship-position">Posición en Campeonato</label>
                                        <input type="number" id="championship-position" min="1" max="150">
                                    </div>
                                    <div class="form-group">
                                        <label for="victories-season">Victorias Totales</label>
                                        <input type="number" id="victories-season">
                                    </div>
                                    <div class="form-group">
                                        <label for="podiums-season">Podios Totales</label>
                                        <input type="number" id="podiums-season">
                                    </div>
                                    <div class="form-group">
                                        <label for="season-points">Puntos Totales</label>
                                        <input type="number" id="season-points">
                                    </div>
                                    <div class="form-group">
                                        <label for="points-gap">Diferencia con Líder</label>
                                        <input type="number" id="points-gap">
                                    </div>
                                </div>

                                <button type="submit" class="btn-primary">
                                    <i class="fas fa-save"></i>
                                    Actualizar Estadísticas
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


            <!-- Perfil Section -->
            <section id="perfil-section" class="admin-section">
                <div class="section-header">
                    <h2>Perfil del Piloto</h2>
                    <p>Actualiza la información personal y estadísticas</p>
                </div>

                <div class="admin-grid">
                    <div class="admin-card">
                        <div class="card-header">
                            <h3><i class="fas fa-user"></i> Información Personal</h3>
                        </div>
                        <div class="card-content">
                            <form id="pilot-info-form" class="admin-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="pilot-name">Nombre Completo</label>
                                        <input type="text" id="pilot-name" value="<?php echo $pilot_info ? htmlspecialchars($pilot_info['name']) : 'Nico Rivas'; ?>">
                                    </div>
                                    <div class="form-group">
                                        <label for="pilot-age">Edad</label>
                                        <input type="number" id="pilot-age" value="<?php echo $pilot_info ? $pilot_info['age'] : 21; ?>">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="pilot-bio">Biografía</label>
                                    <textarea id="pilot-bio" rows="4"><?php echo $pilot_info ? htmlspecialchars($pilot_info['bio']) : 'Piloto profesional de Trucks México Series desde 2018. Conquistando pistas mexicanas con pasión, determinación y excelencia deportiva.'; ?></textarea>
                                </div>
                                <button type="submit" class="btn-primary">
                                    <i class="fas fa-save"></i>
                                    Guardar Información
                                </button>
                            </form>
                        </div>
                    </div>

                    <div class="admin-card">
                        <div class="card-header">
                            <h3><i class="fas fa-trophy"></i> Estadísticas</h3>
                        </div>
                        <div class="card-content">
                            <form id="pilot-stats-form" class="admin-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="pilot-victories">Victorias</label>
                                        <input type="number" id="pilot-victories" value="<?php echo $pilot_stats ? $pilot_stats['victories'] : 3; ?>">
                                    </div>
                                    <div class="form-group">
                                        <label for="pilot-podiums">Podios</label>
                                        <input type="number" id="pilot-podiums" value="<?php echo $pilot_stats ? $pilot_stats['podiums'] : 11; ?>">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="pilot-seasons">Temporadas</label>
                                        <input type="number" id="pilot-seasons" value="<?php echo $pilot_stats ? $pilot_stats['seasons'] : 6; ?>">
                                    </div>
                                    <div class="form-group">
                                        <label for="pilot-debut">Año de Debut</label>
                                        <input type="number" id="pilot-debut" value="<?php echo $pilot_stats ? $pilot_stats['debut_year'] : 2018; ?>">
                                    </div>
                                </div>
                                <button type="submit" class="btn-primary">
                                    <i class="fas fa-save"></i>
                                    Guardar Estadísticas
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Configuración Section -->
            <section id="configuracion-section" class="admin-section">
                <div class="section-header">
                    <h2>Configuración del Sitio</h2>
                    <p>Ajustes generales y configuraciones</p>
                </div>

                <div class="admin-card">
                    <div class="card-header">
                        <h3><i class="fas fa-cog"></i> Configuración General</h3>
                    </div>
                    <div class="card-content">
                        <form id="config-form" class="admin-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="config-site-title">Título del Sitio</label>
                                    <input type="text" id="config-site-title" placeholder="Nico Rivas - Piloto Profesional">
                                </div>
                                <div class="form-group">
                                    <label for="config-contact-email">Email de Contacto</label>
                                    <input type="email" id="config-contact-email" placeholder="contacto@nicorivas.com">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="config-site-description">Descripción del Sitio</label>
                                <textarea id="config-site-description" rows="3" placeholder="Sitio oficial del piloto Nico Rivas..."></textarea>
                            </div>

                            <h4 style="margin-top: 2rem; margin-bottom: 1rem;">Redes Sociales</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="config-social-facebook">Facebook</label>
                                    <input type="url" id="config-social-facebook" placeholder="https://facebook.com/nicorivas">
                                </div>
                                <div class="form-group">
                                    <label for="config-social-twitter">Twitter</label>
                                    <input type="url" id="config-social-twitter" placeholder="https://twitter.com/nicorivas">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="config-social-instagram">Instagram</label>
                                    <input type="url" id="config-social-instagram" placeholder="https://instagram.com/nicorivas">
                                </div>
                                <div class="form-group">
                                    <label for="config-social-youtube">YouTube</label>
                                    <input type="url" id="config-social-youtube" placeholder="https://youtube.com/nicorivas">
                                </div>
                            </div>
                            <hr style="margin: 2rem 0;">

                            <h4>Cuenta de Usuario</h4>
                            <div class="form-group">
                                <label for="config-username">Usuario</label>
                                <input type="text" id="config-username" readonly>
                            </div>

                            <div class="form-group">
                                <label for="config-new-password">Nueva Contraseña</label>
                                <input type="password" id="config-new-password" placeholder="Dejar en blanco para no cambiar">
                            </div>

                            <div class="form-group">
                                <label for="config-confirm-password">Confirmar Nueva Contraseña</label>
                                <input type="password" id="config-confirm-password" placeholder="Repite la nueva contraseña">
                            </div>

                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save"></i>
                                Guardar Configuración
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </main>

    <!-- Video Modal -->
    <div id="video-modal" class="admin-modal">
        <div class="modal-backdrop" onclick="closeModal('video-modal')"></div>
        <div class="modal-container">
            <div class="modal-header">
                <h3><i class="fas fa-video"></i> Agregar Video de YouTube</h3>
                <button class="modal-close" onclick="closeModal('video-modal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <form id="video-form" class="admin-form">
                    <div class="form-group">
                        <label for="video-url">URL de YouTube</label>
                        <input type="url" id="video-url" placeholder="https://www.youtube.com/watch?v=..." required>
                        <small>Pega la URL completa del video de YouTube</small>
                    </div>
                    <div class="form-group">
                        <label for="video-title">Título del Video</label>
                        <input type="text" id="video-title" placeholder="Título descriptivo del video" required>
                    </div>
                    <div class="form-group">
                        <label for="video-description">Descripción</label>
                        <textarea id="video-description" rows="3" placeholder="Descripción del video..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="video-category">Categoría</label>
                        <select id="video-category" required>
                            <option value="">Seleccionar categoría</option>
                            <option value="carrera">Carrera</option>
                            <option value="entrenamiento">Entrenamiento</option>
                            <option value="entrevista">Entrevista</option>
                            <option value="behind-scenes">Detrás de Cámaras</option>
                            <option value="highlights">Highlights</option>
                        </select>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" onclick="closeModal('video-modal')">
                            Cancelar
                        </button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-plus"></i>
                            Agregar Video
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Photo Modal -->
    <div id="photo-modal" class="admin-modal">
        <div class="modal-backdrop" onclick="closeModal('photo-modal')"></div>
        <div class="modal-container">
            <div class="modal-header">
                <h3><i class="fas fa-image"></i> Agregar Foto</h3>
                <button class="modal-close" onclick="closeModal('photo-modal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <form id="photo-form" class="admin-form" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="photo-url">Imagen</label>
                        <input type="file" id="photo-file" accept="image/*" required>
                        <small>Selecciona una imagen desde tu equipo</small>
                    </div>
                    <div class="form-group">
                        <label for="photo-title">Título de la Foto</label>
                        <input type="text" id="photo-title" placeholder="Título descriptivo" required>
                    </div>
                    <div class="form-group">
                        <label for="photo-description">Descripción</label>
                        <textarea id="photo-description" rows="3" placeholder="Descripción de la foto..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="photo-category">Categoría</label>
                        <select id="photo-category" required>
                            <option value="">Seleccionar categoría</option>
                            <option value="carrera">Carrera</option>
                            <option value="podio">Podio</option>
                            <option value="equipo">Equipo</option>
                            <option value="personal">Personal</option>
                            <option value="vehiculo">Vehículo</option>
                        </select>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" onclick="closeModal('photo-modal')">
                            Cancelar
                        </button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-plus"></i>
                            Agregar Foto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal de Noticias -->
    <div id="news-modal" class="admin-modal">
        <div class="modal-backdrop" onclick="closeModal('news-modal')"></div>
        <div class="modal-container large">
            <div class="modal-header">
                <h3><i class="fas fa-newspaper"></i>
                    <span id="news-modal-title">Agregar Noticia</span>
                </h3>
                <button class="modal-close" onclick="closeModal('news-modal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <form id="news-form" class="admin-form">
                    <input type="hidden" id="news-id">

                    <!-- Título y Categoría -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="news-title">Título de la Noticia</label>
                            <input type="text" id="news-title" placeholder="Título de la noticia" required>
                        </div>
                        <div class="form-group">
                            <label for="news-category-select">Categoría</label>
                            <select id="news-category-select" required>
                                <option value="">Seleccionar categoría</option>
                                <option value="Victoria">Victoria</option>
                                <option value="Carrera">Carrera</option>
                                <option value="Entrevista">Entrevista</option>
                                <option value="Equipo">Equipo</option>
                                <option value="Patrocinio">Patrocinio</option>
                                <option value="Preparación">Preparación</option>
                                <option value="Análisis">Análisis</option>
                                <option value="Balance">Balance</option>
                            </select>
                        </div>
                    </div>

                    <!-- Imagen Actual y Cambio de Foto -->
                    <div class="form-group">
                        <label>Imagen Actual</label>
                        <div>
                            <img
                                id="news-image-preview"
                                src=""
                                alt="Previsualización"
                                style="max-width: 100%; border: 1px solid var(--border-color); border-radius: 4px; display: none;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="news-photo">Cambiar Foto (opcional)</label>
                        <input type="file" id="news-photo" accept="image/*">
                    </div>

                    <!-- Vídeo -->
                    <div class="form-group">
                        <label for="news-video-url">URL de Vídeo YouTube (opcional)</label>
                        <input type="url" id="news-video-url" placeholder="https://youtu.be/...">
                    </div>

                    <!-- Resumen y Contenido -->
                    <div class="form-group">
                        <label for="news-excerpt">Resumen</label>
                        <textarea
                            id="news-excerpt"
                            rows="3"
                            placeholder="Breve resumen de la noticia..."
                            required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="news-content">Contenido Completo</label>
                        <textarea
                            id="news-content"
                            rows="8"
                            placeholder="Contenido completo de la noticia..."
                            required></textarea>
                    </div>

                    <!-- Autor y Tags -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="news-author">Autor</label>
                            <input
                                type="text"
                                id="news-author"
                                placeholder="Nombre del autor"
                                value="Equipo de Prensa">
                        </div>
                        <div class="form-group">
                            <label for="news-tags">Tags (separados por coma)</label>
                            <input type="text" id="news-tags" placeholder="tag1, tag2, tag3">
                        </div>
                    </div>

                    <!-- Botones -->
                    <div class="modal-actions">
                        <button
                            type="button"
                            class="btn-secondary"
                            onclick="closeModal('news-modal')">
                            Cancelar
                        </button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save"></i>
                            <span id="news-submit-text">Guardar Noticia</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal para Carreras -->
    <div id="race-modal" class="admin-modal">
        <div class="modal-backdrop" onclick="closeModal('race-modal')"></div>
        <div class="modal-container large">
            <div class="modal-header">
                <h3><i class="fas fa-flag-checkered"></i>
                    <span id="race-modal-title">Agregar Carrera</span>
                </h3>
                <button class="modal-close" onclick="closeModal('race-modal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                <form id="race-form" class="admin-form">
                    <input type="hidden" id="race-id">

                    <div class="form-row">
                        <div class="form-group">
                            <label for="race-name">Nombre de la Carrera</label>
                            <input type="text" id="race-name" placeholder="Gran Premio de México" required>
                        </div>
                        <div class="form-group">
                            <label for="race-type">Tipo</label>
                            <select id="race-type" required>
                                <option value="">Seleccionar tipo</option>
                                <option value="upcoming">Próxima Carrera</option>
                                <option value="completed">Carrera Completada</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="race-date">Fecha</label>
                            <input type="datetime-local" id="race-date" required>
                        </div>
                        <div class="form-group">
                            <label for="race-location">Ubicación</label>
                            <input type="text" id="race-location" placeholder="Autódromo Hermanos Rodríguez, CDMX" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="race-laps">Vueltas</label>
                            <input type="number" id="race-laps" min="1">
                        </div>
                        <div class="form-group">
                            <label for="race-distance">Distancia (km)</label>
                            <input type="number" id="race-distance" min="1" step="0.1">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="race-description">Descripción</label>
                        <textarea id="race-description" rows="3" placeholder="Descripción de la carrera..."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="race-broadcast">Transmisión</label>
                        <input type="text" id="race-broadcast" placeholder="Canal de TV o plataforma">
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" onclick="closeModal('race-modal')">
                            Cancelar
                        </button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save"></i>
                            <span id="race-submit-text">Guardar Carrera</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal para Resultados -->
    <div id="result-modal" class="admin-modal" role="dialog" aria-modal="true" aria-labelledby="result-modal-title">
        <div class="modal-backdrop" onclick="closeModal('result-modal')"></div>
        <div class="modal-container">
            <div class="modal-header">
                <h3 id="result-modal-title">
                    <i class="fas fa-trophy"></i> Agregar Resultado
                </h3>
                <button class="modal-close" onclick="closeModal('result-modal')" aria-label="Cerrar modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="modal-content">
                <form id="result-form" class="admin-form">
                    <input type="hidden" id="result-id">

                    <!-- Carrera y Posición -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="result-race-name">Nombre de la Carrera</label>
                            <input type="text" id="result-race-name" placeholder="Copa Aguascalientes" required>
                        </div>
                        <div class="form-group">
                            <label for="result-position">Posición Final</label>
                            <input type="number" id="result-position" min="1" max="50" placeholder="1" required>
                        </div>
                    </div>

                    <!-- Fecha y Ubicación -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="result-date">Fecha</label>
                            <input type="date" id="result-date" required>
                        </div>
                        <div class="form-group">
                            <label for="result-location">Ubicación</label>
                            <input type="text" id="result-location" placeholder="Autódromo de Aguascalientes, AGS" required>
                        </div>
                    </div>

                    <!-- Vueltas y Tiempo -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="result-laps">Vueltas Completadas</label>
                            <input type="number" id="result-laps" min="1" placeholder="75">
                        </div>
                        <div class="form-group">
                            <label for="result-time">Tiempo Total</label>
                            <input type="text" id="result-time" placeholder="1:45:32">
                        </div>
                    </div>

                    <!-- Destacados -->
                    <div class="form-group">
                        <label>Destacados</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" id="pole-position">
                                <span>Pole Position</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="fastest-lap">
                                <span>Vuelta Rápida</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="most-laps-led">
                                <span>Más Vueltas al Frente</span>
                            </label>
                        </div>
                    </div>

                    <!-- Notas -->
                    <div class="form-group">
                        <label for="result-notes">Notas</label>
                        <textarea id="result-notes" rows="3" placeholder="Notas adicionales sobre el resultado..."></textarea>
                    </div>

                    <!-- Acciones -->
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" onclick="closeModal('result-modal')">
                            Cancelar
                        </button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save"></i>
                            <span id="result-submit-text">Guardar Resultado</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div id="preview-modal" class="admin-modal">
        <div class="modal-backdrop" onclick="closeModal('preview-modal')"></div>
        <div class="modal-container">
            <div class="modal-header">
                <button class="modal-close" onclick="closeModal('preview-modal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content" id="preview-modal-content">
                <!-- Aquí inyectaremos foto o vídeo -->
            </div>
        </div>
    </div>
    <!-- Toast Container -->
    <div id="toast-container"></div>

    <!-- JavaScript -->
    <script src="admin.js"></script>
</body>

</html>