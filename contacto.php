<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contáctanos - Nico Rivas</title>
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
                <a href="carreras.php" class="nav-link">PRÓXIMAS CARRERAS</a>
                <a href="contacto.php" class="nav-link active">CONTÁCTANOS</a>
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
                <h1>Contáctanos</h1>
                <p>Conecta con el equipo Nico Rivas Racing</p>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
        <div class="container">
            <div class="contact-content">
                <div class="contact-info">
                    <h2>Hablemos</h2>
                    <p class="lead">¿Interesado en patrocinio, colaboraciones o simplemente quieres saludar? Estamos aquí para escucharte.</p>

                    <div class="contact-methods">
                        <div class="contact-method">
                            <div class="method-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="method-content">
                                <h4>Email</h4>
                                <p id="contact-email">info@nicorivass.com</p> <!-- ESTO SE CAMBIA SEGUN EL ADMIN PANEL -->
                            </div>
                        </div>

                        <div class="contact-method">
                            <div class="method-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="method-content">
                                <h4>Teléfono</h4>
                                <p>+52 (55) 1234-5678</p>
                                <p class="method-note">Lun - Vie: 9:00 - 18:00</p>
                            </div>
                        </div>

                        <div class="contact-method">
                            <div class="method-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="method-content">
                                <h4>Ubicación</h4>
                                <p>Ciudad de México</p>
                                <p>México</p>
                            </div>
                        </div>
                    </div>

                    <div class="social-contact">
                        <h4>Síguenos en redes sociales</h4>
                        <div class="social-grid">
                            <a target="_blank" class="social-instagram social-item">
                                <div class="social-icon">
                                    <i class="fab fa-instagram"></i>
                                </div>
                                <div class="social-info">
                                    <div class="social-name">Instagram</div>
                                    <div class="social-handle">@nicorivasracing</div>
                                </div>
                            </a>

                            <a target="_blank" class="social-facebook social-item">
                                <div class="social-icon">
                                    <i class="fab fa-facebook"></i>
                                </div>
                                <div class="social-info">
                                    <div class="social-name">Facebook</div>
                                    <div class="social-handle">Nico Rivas 24</div>
                                </div>
                            </a>

                            <a target="_blank" class="social-item social-twitter">
                                <div class="social-icon">
                                    <i class="fab fa-tiktok"></i>
                                </div>
                                <div class="social-info">
                                    <div class="social-name">Tiktok</div>
                                    <div class="social-handle">@nicorz24</div>
                                </div>
                            </a>

                            <a target="_blank" class="social-item social-youtube">
                                <div class="social-icon">
                                    <i class="fab fa-youtube"></i>
                                </div>
                                <div class="social-info">
                                    <div class="social-name">YouTube</div>
                                    <div class="social-handle">Nico Rivas Racing</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="contact-form-container">
                    <form class="contact-form" id="contactForm">
                        <h3>Envía un mensaje</h3>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Nombre completo</label>
                                <input type="text" id="name" name="name" required>
                            </div>

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="phone">Teléfono (Opcional)</label>
                                <input type="tel" id="phone" name="phone">
                            </div>

                            <div class="form-group">
                                <label for="subject">Asunto</label>
                                <select id="subject" name="subject" required>
                                    <option value="">Selecciona un asunto</option>
                                    <option value="patrocinio">Oportunidades de Patrocinio</option>
                                    <option value="prensa">Consultas de Prensa</option>
                                    <option value="colaboracion">Colaboraciones</option>
                                    <option value="general">Consulta General</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="message">Mensaje</label>
                            <textarea id="message" name="message" rows="6" required placeholder="Cuéntanos más sobre tu consulta..."></textarea>
                        </div>

                        <button type="submit" class="btn-primary submit-btn">
                            <span>Enviar mensaje</span>
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
        <div class="container">
            <div class="section-header">
                <h2>Preguntas Frecuentes</h2>
                <p>Respuestas a las consultas más comunes</p>
            </div>

            <div class="faq-grid">
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h4>¿Cómo puedo convertirme en patrocinador?</h4>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Contáctanos a través del formulario o directamente al email patrocinios@nicorivass.com. Tenemos diferentes paquetes de patrocinio adaptados a distintos presupuestos y objetivos de marketing. Nuestro equipo te ayudará a encontrar la opción perfecta para tu marca.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h4>¿Dónde puedo ver las carreras?</h4>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Las carreras de Trucks México Series se transmiten por televisión nacional y plataformas de streaming. Síguenos en redes sociales para conocer los horarios exactos y canales de transmisión de cada carrera. También compartimos highlights y contenido exclusivo.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h4>¿Ofrecen experiencias VIP en las carreras?</h4>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Sí, ofrecemos paquetes VIP para patrocinadores y invitados especiales que incluyen acceso al paddock, meet & greet con el piloto, experiencias exclusivas durante los eventos de carrera, y oportunidades de networking con otros profesionales del automovilismo.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h4>¿Cómo puedo solicitar una entrevista o material de prensa?</h4>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Para consultas de prensa, entrevistas o material multimedia, contáctanos seleccionando "Consultas de Prensa" en el formulario o escribe directamente a info@nicorivass.com. Tenemos un kit de prensa completo disponible y facilitamos entrevistas según disponibilidad.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h4>¿Qué incluye el material promocional?</h4>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Nuestro material promocional incluye fotos de alta resolución, videos de carreras, biografía del piloto, estadísticas actualizadas, logos en diferentes formatos, y contenido personalizado según las necesidades específicas de cada colaboración.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <h4>¿Cuál es el tiempo de respuesta?</h4>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Nos comprometemos a responder todas las consultas en un plazo máximo de 48 horas durante días hábiles. Para consultas urgentes de prensa o patrocinio, puedes contactarnos directamente por teléfono para una respuesta más rápida.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <?php
    include 'footer.php'
    ?>
    <script>

    </script>
    <script src="script.js"></script>
</body>

</html>