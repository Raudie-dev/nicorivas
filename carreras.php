<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Próximas Carreras - Nico Rivas</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="icon" href="./img/blanco-png-300x236.png" type="image/x-icon" />
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

    </nav>

    <!-- Page Hero -->
    <section class="page-hero">
        <div class="container">
            <div class="page-hero-content">
                <h1>Próximas Carreras</h1>
                <p>Calendario de competencias y resultados de la temporada <?= date('Y') ?></p>
            </div>
        </div>
    </section>

    <!-- Season Overview -->
    <section class="season-overview">
        <div class="container">
            <div class="overview-content">
                <div class="overview-text">
                    <h2>Temporada <span id="season-year-display"><?= date('Y') ?></span></h2>
                    <p class="lead">
                        Una temporada llena de desafíos y oportunidades para demostrar el talento mexicano en las pistas más exigentes del país.
                    </p>

                    <div class="season-highlights">
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="highlight-content">
                                <h4><span id="victories-count">0</span> Victorias</h4>
                                <p>En lo que va de la temporada</p>
                            </div>
                        </div>

                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-medal"></i>
                            </div>
                            <div class="highlight-content">
                                <h4><span id="podiums-count">0</span> Podios</h4>
                                <p>Consistencia en resultados</p>
                            </div>
                        </div>

                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="highlight-content">
                                <h4><span id="position-rank">-</span> Posición</h4>
                                <p>En el campeonato actual</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="overview-visual">
                    <div class="championship-position">
                        <div class="position-number" id="position-number">-</div>
                        <div class="position-label">Posición en el Campeonato</div>
                        <div class="points-info">
                            <span class="points" id="points-count">0 puntos</span>
                            <span class="gap">
                                <span id="points-gap">-25</span>
                                <span>pts del líder</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- Upcoming Races -->
    <section class="upcoming-races">
        <div class="container">
            <div id="calendario" class="section-header">
                <h2>Próximas Carreras</h2>
                <p>Calendario de competencias <span id="calendar-year"><?= date('Y') ?></span></p>
            </div>

            <div class="races-timeline" id="upcoming-races-list">
                <!-- Se cargará dinámicamente -->
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

            <div class="results-grid" id="race-results-list">
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
                    <a class="btn-primary social-instagram" target="_blank">Seguir en Instagram</a>
                    <a href="contacto.php" class="btn-secondary">Contactar</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <?php
    include 'footer.php'
    ?>

    <!-- News Modal -->
    <div id="news-modal" class="preview-modal">
        <div id="news-modal-content" class="preview-modal-content"></div>
    </div>
    <script src="script.js"></script>
</body>

</html>