<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Próximas Carreras - Nico Rivas</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-left">
                <a href="index.php" class="nav-link">HOME</a>
                <a href="patrocinadores.php" class="nav-link">PATROCINADORES</a>
            </div>
            
           <div class="nav-logo">
                <img src="img/NR24-6-ok.png" alt="logo Nico Rivas" class="nav-logo-img">
            </div>
            
            <div class="nav-right">
                <a href="carreras.php" class="nav-link active">PRÓXIMAS CARRERAS</a>
                <a href="contacto.php" class="nav-link">CONTÁCTANOS</a>
            </div>
            
            <div class="hamburger" id="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
        
        <!-- Header Video GIF -->
        <div class="header-video">
            <video autoplay muted loop playsinline>
                <source src="/placeholder.mp4" type="video/mp4">
            </video>
            <div class="header-video-overlay"></div>
        </div>
    </nav>

    <!-- Page Hero -->
    <section class="page-hero">
        <div class="container">
            <div class="page-hero-content">
                <h1>Próximas Carreras</h1>
                <p>Calendario de competencias y resultados de la temporada 2024</p>
            </div>
        </div>
    </section>

    <!-- Season Overview -->
    <section class="season-overview">
        <div class="container">
            <div class="overview-content">
                <div class="overview-text">
                    <h2>Temporada 2024</h2>
                    <p class="lead">Una temporada llena de desafíos y oportunidades para demostrar el talento mexicano en las pistas más exigentes del país.</p>
                    
                    <div class="season-highlights">
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="highlight-content">
                                <h4>2 Victorias</h4>
                                <p>En lo que va de la temporada</p>
                            </div>
                        </div>
                        
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-medal"></i>
                            </div>
                            <div class="highlight-content">
                                <h4>5 Podios</h4>
                                <p>Consistencia en resultados</p>
                            </div>
                        </div>
                        
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="highlight-content">
                                <h4>3° Posición</h4>
                                <p>En el campeonato actual</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="overview-visual">
                    <div class="championship-position">
                        <div class="position-number">3°</div>
                        <div class="position-label">Posición en el Campeonato</div>
                        <div class="points-info">
                            <span class="points">195 puntos</span>
                            <span class="gap">-25 pts del líder</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Upcoming Races -->
    <section class="upcoming-races">
        <div class="container">
            <div class="section-header">
                <h2>Próximas Carreras</h2>
                <p>Calendario de competencias 2024</p>
            </div>
            
            <div class="races-timeline">
                <div class="race-card upcoming next">
                    <div class="race-status-badge">Próxima Carrera</div>
                    <div class="race-date">
                        <div class="date-day">22</div>
                        <div class="date-month">MAR</div>
                        <div class="date-year">2024</div>
                    </div>
                    <div class="race-info">
                        <h3>Gran Premio de México</h3>
                        <div class="race-details">
                            <div class="detail-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Autódromo Hermanos Rodríguez, CDMX</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <span>14:00 hrs</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-tv"></i>
                                <span>Transmisión en vivo</span>
                            </div>
                        </div>
                    </div>
                    <div class="race-actions">
                        <a href="#" class="btn-secondary">Ver detalles</a>
                    </div>
                </div>
                
                <div class="race-card upcoming">
                    <div class="race-date">
                        <div class="date-day">05</div>
                        <div class="date-month">ABR</div>
                        <div class="date-year">2024</div>
                    </div>
                    <div class="race-info">
                        <h3>Carrera de Guadalajara</h3>
                        <div class="race-details">
                            <div class="detail-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Óvalo de Guadalajara, JAL</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <span>15:30 hrs</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="race-card upcoming">
                    <div class="race-date">
                        <div class="date-day">19</div>
                        <div class="date-month">ABR</div>
                        <div class="date-year">2024</div>
                    </div>
                    <div class="race-info">
                        <h3>Desafío de Monterrey</h3>
                        <div class="race-details">
                            <div class="detail-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Autódromo de Monterrey, NL</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <span>13:00 hrs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Recent Results -->
    <section class="recent-results">
        <div class="container">
            <div class="section-header">
                <h2>Resultados Recientes</h2>
                <p>Últimas competencias de la temporada</p>
            </div>
            
            <div class="results-grid">
                <div class="result-card victory">
                    <div class="result-position">
                        <div class="position-number">1°</div>
                        <div class="position-label">Victoria</div>
                    </div>
                    <div class="result-info">
                        <h3>Copa Aguascalientes</h3>
                        <div class="result-date">28 Febrero 2024</div>
                        <div class="result-location">Autódromo de Aguascalientes, AGS</div>
                        <div class="result-stats">
                            <span>45 Vueltas</span>
                            <span>180 km</span>
                            <span>1:45:32</span>
                        </div>
                    </div>
                    <div class="result-highlights">
                        <span class="highlight-tag">Pole Position</span>
                        <span class="highlight-tag">Vuelta Rápida</span>
                    </div>
                </div>
                
                <div class="result-card podium">
                    <div class="result-position">
                        <div class="position-number">2°</div>
                        <div class="position-label">Podio</div>
                    </div>
                    <div class="result-info">
                        <h3>Gran Premio de Puebla</h3>
                        <div class="result-date">14 Febrero 2024</div>
                        <div class="result-location">Autódromo Miguel E. Abed, PUE</div>
                        <div class="result-stats">
                            <span>50 Vueltas</span>
                            <span>200 km</span>
                            <span>2:01:15</span>
                        </div>
                    </div>
                </div>
                
                <div class="result-card points">
                    <div class="result-position">
                        <div class="position-number">5°</div>
                        <div class="position-label">Puntos</div>
                    </div>
                    <div class="result-info">
                        <h3>Apertura de Temporada</h3>
                        <div class="result-date">31 Enero 2024</div>
                        <div class="result-location">Autódromo de León, GTO</div>
                        <div class="result-stats">
                            <span>40 Vueltas</span>
                            <span>160 km</span>
                            <span>1:38:45</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- All News Section -->
    <section id="noticias" class="all-news-section">
        <div class="container">
            <div class="section-header">
                <h2>Todas las Noticias</h2>
                <p>Mantente al día con todas las actualizaciones del piloto</p>
            </div>
            
            <div class="all-news-grid">
                <article class="news-card clickable" onclick="openNewsModal(1)">
                    <div class="news-image">
                        <img src="/images/victory-aguascalientes.jpg" alt="Victoria en Aguascalientes">
                        <div class="news-category">Victoria</div>
                    </div>
                    <div class="news-content">
                        <h3>Triunfo en Aguascalientes marca el regreso al podio más alto</h3>
                        <p>Una carrera perfecta que demuestra la evolución constante del piloto mexicano en la serie más competitiva del país.</p>
                        <div class="news-meta">
                            <span class="news-date">15 Marzo 2024</span>
                            <span class="news-author">Por: Equipo de Prensa</span>
                        </div>
                    </div>
                </article>
                
                <article class="news-card clickable" onclick="openNewsModal(2)">
                    <div class="news-image">
                        <img src="/images/race-action-1.jpg" alt="Análisis técnico">
                        <div class="news-category">Análisis</div>
                    </div>
                    <div class="news-content">
                        <h3>Análisis técnico: Claves del éxito en Aguascalientes</h3>
                        <p>Desglosamos los factores que llevaron a Nico Rivas a conseguir su segunda victoria de la temporada.</p>
                        <div class="news-meta">
                            <span class="news-date">1 Marzo 2024</span>
                            <span class="news-author">Por: Equipo Técnico</span>
                        </div>
                    </div>
                </article>
                
                <article class="news-card clickable" onclick="openNewsModal(3)">
                    <div class="news-image">
                        <img src="/images/race-action-2.jpg" alt="Mejoras aerodinámicas">
                        <div class="news-category">Técnico</div>
                    </div>
                    <div class="news-content">
                        <h3>Mejoras aerodinámicas para el Gran Premio de México</h3>
                        <p>El equipo implementa nuevas mejoras en el paquete aerodinámico pensando en las características del Autódromo Hermanos Rodríguez.</p>
                        <div class="news-meta">
                            <span class="news-date">18 Marzo 2024</span>
                            <span class="news-author">Por: Departamento Técnico</span>
                        </div>
                    </div>
                </article>
                
                <article class="news-card clickable" onclick="openNewsModal(4)">
                    <div class="news-image">
                        <img src="/images/podium-celebration.jpg" alt="Entrevista exclusiva">
                        <div class="news-category">Entrevista</div>
                    </div>
                    <div class="news-content">
                        <h3>El camino hacia el podio: Entrevista exclusiva</h3>
                        <p>Nico Rivas comparte sus pensamientos sobre la temporada actual y sus objetivos para las próximas carreras.</p>
                        <div class="news-meta">
                            <span class="news-date">12 Marzo 2024</span>
                            <span class="news-author">Por: María González</span>
                        </div>
                    </div>
                </article>
                
                <article class="news-card clickable" onclick="openNewsModal(5)">
                    <div class="news-image">
                        <img src="/images/team-dynamic-logo.jpg" alt="Team Dynamic">
                        <div class="news-category">Equipo</div>
                    </div>
                    <div class="news-content">
                        <h3>Team Dynamic renueva compromiso para 2024</h3>
                        <p>El equipo oficial confirma su apoyo continuo y anuncia nuevas inversiones en tecnología para la temporada.</p>
                        <div class="news-meta">
                            <span class="news-date">8 Marzo 2024</span>
                            <span class="news-author">Por: Comunicaciones Team Dynamic</span>
                        </div>
                    </div>
                </article>
                
                <article class="news-card clickable" onclick="openNewsModal(6)">
                    <div class="news-image">
                        <img src="/images/team-preparation.jpg" alt="Preparación intensiva">
                        <div class="news-category">Preparación</div>
                    </div>
                    <div class="news-content">
                        <h3>Preparativos intensos para la próxima fecha</h3>
                        <p>El equipo trabaja sin descanso para optimizar el rendimiento del vehículo de cara a las próximas competencias.</p>
                        <div class="news-meta">
                            <span class="news-date">10 Marzo 2024</span>
                            <span class="news-author">Por: Staff Técnico</span>
                        </div>
                    </div>
                </article>
                
                <article class="news-card clickable" onclick="openNewsModal(7)">
                    <div class="news-image">
                        <img src="/images/new-sponsors.jpg" alt="Nuevos patrocinadores">
                        <div class="news-category">Patrocinio</div>
                    </div>
                    <div class="news-content">
                        <h3>Nuevas alianzas estratégicas para 2024</h3>
                        <p>Importantes marcas se suman al proyecto deportivo de Nico Rivas, fortaleciendo el equipo para la temporada.</p>
                        <div class="news-meta">
                            <span class="news-date">5 Marzo 2024</span>
                            <span class="news-author">Por: Departamento Comercial</span>
                        </div>
                    </div>
                </article>
                
                <article class="news-card clickable" onclick="openNewsModal(8)">
                    <div class="news-image">
                        <img src="/images/nico-portrait.jpg" alt="Balance de temporada">
                        <div class="news-category">Balance</div>
                    </div>
                    <div class="news-content">
                        <h3>Balance positivo del primer trimestre de 2024</h3>
                        <p>Nico Rivas analiza los primeros meses de competencia y comparte sus expectativas para el resto del año.</p>
                        <div class="news-meta">
                            <span class="news-date">2 Marzo 2024</span>
                            <span class="news-author">Por: Redacción</span>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>No te pierdas ninguna carrera</h2>
                <p>Síguenos en redes sociales para estar al día con todas las competencias, entrenamientos y noticias del equipo</p>
                <div class="cta-buttons">
                    <a href="#" class="btn-primary">Seguir en Instagram</a>
                    <a href="contacto.php" class="btn-secondary">Contactar</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-main">
                    <div class="footer-logo">
                        <div class="logo-symbol">NR</div>
                        <div class="logo-text">
                            <span class="logo-name">NICO</span>
                            <span class="logo-surname">RIVAS</span>
                        </div>
                    </div>
                    <p>Piloto profesional de Trucks México Series. Representando el talento mexicano en las pistas más importantes del país.</p>
                    
                    <div class="social-links">
                        <a href="#" class="social-link">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="social-link">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="#" class="social-link">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-link">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
                
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Navegación</h4>
                        <ul>
                            <li><a href="index.php">Home</a></li>
                            <li><a href="patrocinadores.php">Patrocinadores</a></li>
                            <li><a href="carreras.php">Próximas Carreras</a></li>
                            <li><a href="contacto.php">Contáctanos</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Información</h4>
                        <ul>
                            <li><a href="#about">Mi Historia</a></li>
                            <li><a href="#">Prensa</a></li>
                            <li><a href="#">Galería</a></li>
                            <li><a href="#">Calendario</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 Nico Rivas. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- News Modal -->
    <div id="newsModal" class="modal">
        <div class="modal-content news-modal-content">
            <span class="modal-close" onclick="closeNewsModal()">&times;</span>
            <div class="news-modal-header">
                <img id="modalNewsImage" src="/placeholder.svg" alt="">
                <div class="modal-news-category" id="modalNewsCategory"></div>
            </div>
            <div class="news-modal-body">
                <h2 id="modalNewsTitle"></h2>
                <div class="modal-news-meta">
                    <span id="modalNewsDate"></span>
                    <span id="modalNewsAuthor"></span>
                </div>
                <div class="modal-news-content" id="modalNewsContent"></div>
                <div class="modal-news-tags" id="modalNewsTags"></div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
