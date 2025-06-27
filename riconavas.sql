/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : riconavas

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 26/06/2025 23:11:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cache
-- ----------------------------
DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache
-- ----------------------------

-- ----------------------------
-- Table structure for cache_locks
-- ----------------------------
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache_locks
-- ----------------------------

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for job_batches
-- ----------------------------
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `cancelled_at` int NULL DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job_batches
-- ----------------------------

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED NULL DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `jobs_queue_index`(`queue` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO `migrations` VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2025_06_26_011827_create_news_table', 2);

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `excerpt` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category` enum('Victoria','Carrera','Entrevista','Equipo','Patrocinio','Preparación','Análisis','Balance') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'Equipo de Prensa',
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  `published` tinyint(1) NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `video` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `embed_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_news_category`(`category` ASC) USING BTREE,
  INDEX `idx_news_published`(`published` ASC) USING BTREE,
  INDEX `idx_news_created_at`(`created_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (7, 'Gran Victoria en la Carrera de Monterrey', 'Nico Rivas logra su primera victoria de la temporada en una carrera emocionante.', 'En una carrera llena de adrenalina y competencia intensa, Nico Rivas cruzó la meta en primer lugar demostrando su gran talento y preparación. Este triunfo marca un antes y un después en su carrera deportiva y eleva las expectativas para las próximas fechas.', 'uploads/news/news_7_685dcd15f2bdd3.99847929.png', 'Victoria', 'Equipo de Prensa', '[\"Triunfo\",\"Temporada 2024\",\"Monterrey\"]', 0, '2025-06-26 18:25:09', '2025-06-26 18:43:33', 'https://www.youtube.com/watch?v=BY41k184qqo&list=RDT3BRHQchJME&index=10', 'BY41k184qqo');
INSERT INTO `news` VALUES (8, 'Gran Victoria en la Carrera de Monterrey', 'Nico Rivas logra su primera victoria de la temporada en una carrera emocionante.', 'En una carrera llena de adrenalina y competencia intensa, Nico Rivas cruzó la meta en primer lugar demostrando su gran talento y preparación. Este triunfo marca un antes y un después en su carrera deportiva y eleva las expectativas para las próximas fechas.', 'uploads/news/news_8_685dcd2cdae528.98248384.webp', 'Victoria', 'Equipo de Prensa', '[\"Triunfo\",\"Temporada 2024\",\"Monterrey\"]', 0, '2025-06-26 18:37:59', '2025-06-26 18:54:20', NULL, NULL);
INSERT INTO `news` VALUES (9, 'Gran Victoria en la Carrera de Monterrey', 'Nico Rivas logra su primera victoria de la temporada en una carrera emocionante.', 'En una carrera llena de adrenalina y competencia intensa, Nico Rivas cruzó la meta en primer lugar demostrando su gran talento y preparación. Este triunfo marca un antes y un después en su carrera deportiva y eleva las expectativas para las próximas fechas.', 'uploads/news/news_9_685df18711eeb7.50331778.png', 'Victoria', 'Equipo de Prensa', '[\"Triunfo\",\"Temporada 2024\",\"Monterrey\"]', 0, '2025-06-26 18:38:00', '2025-06-26 21:19:03', 'https://www.youtube.com/watch?v=BY41k184qqo&list=RDT3BRHQchJME&index=10', 'BY41k184qqo');
INSERT INTO `news` VALUES (10, 'esto es una prueba', 'esto es una prueba', 'esto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una pruebaesto es una prueba', 'uploads/news/news_10_685df1b08fe3b6.47108354.png', 'Victoria', 'Equipo de Prensa', '[\"Triunfo\",\"Temporada 2024\",\"Monterrey\"]', 0, '2025-06-26 21:19:44', '2025-06-26 21:19:44', 'https://www.youtube.com/watch?v=BY41k184qqo&list=RDT3BRHQchJME&index=10', 'BY41k184qqo');

-- ----------------------------
-- Table structure for password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for photos
-- ----------------------------
DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category` enum('carrera','podio','equipo','personal','vehiculo') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_photos_category`(`category` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of photos
-- ----------------------------
INSERT INTO `photos` VALUES (12, 'asd', 'asdasd', 'uploads/photos/photo_685dc48849d099.10189029.png', 'carrera', '2025-06-26 18:07:04', '2025-06-26 18:07:04');
INSERT INTO `photos` VALUES (13, 'asdasd', 'asdasdasd', 'uploads/photos/photo_685dc490438467.77548488.png', 'podio', '2025-06-26 18:07:12', '2025-06-26 18:07:12');

-- ----------------------------
-- Table structure for pilot_info
-- ----------------------------
DROP TABLE IF EXISTS `pilot_info`;
CREATE TABLE `pilot_info`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `age` int NULL DEFAULT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pilot_info
-- ----------------------------
INSERT INTO `pilot_info` VALUES (1, 'Nico Rivas', 21, 'Desde los 91 años, las pistas han sido mi segundo hogar. Lo que comenzó como una pasión en el kartismo se ha convertido en una carrera profesional llena de logros y desafíos.', '2025-06-24 18:39:06', '2025-06-26 21:17:07');

-- ----------------------------
-- Table structure for pilot_stats
-- ----------------------------
DROP TABLE IF EXISTS `pilot_stats`;
CREATE TABLE `pilot_stats`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `victories` int NULL DEFAULT 0,
  `podiums` int NULL DEFAULT 0,
  `seasons` int NULL DEFAULT 0,
  `debut_year` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pilot_stats
-- ----------------------------
INSERT INTO `pilot_stats` VALUES (1, 10000, 8, 13, 2018, '2025-06-24 18:39:06', '2025-06-26 21:16:50');

-- ----------------------------
-- Table structure for race_results
-- ----------------------------
DROP TABLE IF EXISTS `race_results`;
CREATE TABLE `race_results`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `race_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `position` int NOT NULL,
  `date` date NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `laps` int NULL DEFAULT NULL,
  `time` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `highlights` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of race_results
-- ----------------------------
INSERT INTO `race_results` VALUES (1, 'Copa Aguascalientes', 1, '2024-02-28', 'Autódromo de Aguascalientes, AGS', 45, '1:45:32', '[\"Pole Position\", \"Vuelta Rápida\"]', 'Excelente carrera desde la pole', '2025-06-25 13:28:09', '2025-06-25 13:28:09');
INSERT INTO `race_results` VALUES (2, 'Gran Premio de Puebla', 3, '2024-02-14', 'Autódromo Miguel E. Abed, PUE', 50, '2:01:15', '[\"Pole Position\",\"Vuelta R\\u00e1pida\"]', 'Buena remontada desde la 5ta posición', '2025-06-25 13:28:09', '2025-06-25 13:49:11');
INSERT INTO `race_results` VALUES (6, 'Gran Premio de Puebla', 20, '2025-06-25', 'Autódromo Miguel E. Abed, PUE', 100, '1:38:45', '[\"Pole Position\",\"Vuelta R\\u00e1pida\",\"M\\u00e1s Vueltas al Frente\"]', '10', '2025-06-25 14:23:51', '2025-06-25 14:23:51');

-- ----------------------------
-- Table structure for races
-- ----------------------------
DROP TABLE IF EXISTS `races`;
CREATE TABLE `races`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` enum('upcoming','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'upcoming',
  `date` datetime NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `laps` int NULL DEFAULT NULL,
  `distance` decimal(6, 2) NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `broadcast` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_next` tinyint(1) NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of races
-- ----------------------------
INSERT INTO `races` VALUES (1, 'Gran Premio de México PRUEBA', 'upcoming', '2024-03-22 14:00:00', 'Autódromo Hermanos Rodríguez, CDMX', 45, 180.50, 'La carrera más importante del año', 'Transmisión en vivo', 0, '2025-06-25 13:28:09', '2025-06-25 17:02:04');
INSERT INTO `races` VALUES (2, 'Carrera de Guadalajara', 'upcoming', '2025-07-03 15:30:00', 'Óvalo de Guadalajara, JAL', 50, 200.00, 'Segunda fecha del campeonato', 'ESPN', 1, '2025-06-25 13:28:09', '2025-06-25 17:02:09');
INSERT INTO `races` VALUES (3, 'Desafío de Monterrey', 'upcoming', '2024-04-19 13:00:00', 'Autódromo de Monterrey, NL', 40, 160.00, 'Tercera fecha del campeonato', 'Fox Sports', 0, '2025-06-25 13:28:09', '2025-06-25 17:02:03');

-- ----------------------------
-- Table structure for season_stats
-- ----------------------------
DROP TABLE IF EXISTS `season_stats`;
CREATE TABLE `season_stats`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `championship_position` int NULL DEFAULT NULL,
  `total_points` int NULL DEFAULT NULL,
  `points_gap` int NULL DEFAULT NULL,
  `victories` int NULL DEFAULT 0,
  `podiums` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_year`(`year` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of season_stats
-- ----------------------------
INSERT INTO `season_stats` VALUES (1, 2024, 2, 100, 12, 0, 0, '2025-06-25 13:28:09', '2025-06-25 13:52:16');
INSERT INTO `season_stats` VALUES (2, 2025, 20, 1000, 120, 1, 1, '2025-06-25 13:31:33', '2025-06-25 17:06:10');
INSERT INTO `season_stats` VALUES (3, 2023, 2, 100, 12, 0, 0, '2025-06-25 13:52:37', '2025-06-25 13:52:37');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NULL DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sessions_user_id_index`(`user_id` ASC) USING BTREE,
  INDEX `sessions_last_activity_index`(`last_activity` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('tvdaL7uzZFwkQ2Rl9XtSI7x8BsUq2M8whNf3Ijee', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNUs0Y05hSmp5SXhhMmNxYU82TjFHeVVFWFdpQ3I3NW5MWFNub0hoMCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHA6Ly9sb2NhbGhvc3Qvcmljb25pdmFzdjMvbmljby1yaXZhcy9wdWJsaWMiO319', 1750901397);

-- ----------------------------
-- Table structure for site_config
-- ----------------------------
DROP TABLE IF EXISTS `site_config`;
CREATE TABLE `site_config`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `config_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `config_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `config_key`(`config_key` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 172 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of site_config
-- ----------------------------
INSERT INTO `site_config` VALUES (1, 'maintenance_mode', 'false', 'Modo de mantenimiento del sitio', '2025-06-24 18:39:06', '2025-06-24 18:39:06');
INSERT INTO `site_config` VALUES (2, 'email_notifications', 'true', 'Notificaciones por email', '2025-06-24 18:39:06', '2025-06-24 18:39:06');
INSERT INTO `site_config` VALUES (3, 'auto_save', 'true', 'Guardado automático', '2025-06-24 18:39:06', '2025-06-24 18:39:06');
INSERT INTO `site_config` VALUES (4, 'site_title', 'Nico Rivas', NULL, '2025-06-24 20:58:43', '2025-06-26 15:06:05');
INSERT INTO `site_config` VALUES (5, 'site_description', 'Piloto profesional de Trucks México Series desde 2018. Conquistando pistas mexicanas con pasión, determinación y excelencia deportiva.', NULL, '2025-06-24 20:58:43', '2025-06-26 15:06:05');
INSERT INTO `site_config` VALUES (6, 'contact_email', 'contactotest@riconavas.com', NULL, '2025-06-24 20:58:43', '2025-06-26 21:21:17');
INSERT INTO `site_config` VALUES (7, 'social_facebook', 'https://www.facebook.com/nicorivas24?mibextid=LQQJ4d', NULL, '2025-06-24 20:58:43', '2025-06-26 13:28:39');
INSERT INTO `site_config` VALUES (8, 'social_twitter', 'https://www.tiktok.com/@nicorz24?_t=8lQFZNnWgas&_r=1', NULL, '2025-06-24 20:58:43', '2025-06-26 13:28:39');
INSERT INTO `site_config` VALUES (9, 'social_instagram', 'https://www.instagram.com/nicorivasracing?igsh=b2ZoMW5zM294eXkx&utm_source=qr', NULL, '2025-06-24 20:58:43', '2025-06-26 13:28:39');
INSERT INTO `site_config` VALUES (10, 'social_youtube', '', NULL, '2025-06-24 20:58:43', '2025-06-26 21:21:00');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Administrador', 'admin@nicorivas.com', '$2y$10$2Az25v9drSMFtfTh1XWleOm2eAHk10q/TD3GY.Ckqcb6LF0hKjA26', '2025-06-26 01:29:43', '2025-06-26 01:29:43');

-- ----------------------------
-- Table structure for videos
-- ----------------------------
DROP TABLE IF EXISTS `videos`;
CREATE TABLE `videos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `embed_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category` enum('carrera','entrenamiento','entrevista','behind-scenes','highlights') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_videos_category`(`category` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of videos
-- ----------------------------
INSERT INTO `videos` VALUES (3, 'asd', 'asd', 'https://www.youtube.com/watch?v=RNonfByE9xc', 'RNonfByE9xc', 'carrera', '2025-06-26 18:04:28', '2025-06-26 18:04:28');
INSERT INTO `videos` VALUES (4, 'asd', 'asd', 'https://www.youtube.com/watch?v=RNonfByE9xc', 'RNonfByE9xc', 'carrera', '2025-06-26 18:06:40', '2025-06-26 18:06:40');
INSERT INTO `videos` VALUES (5, 'asdasd', 'asd', 'https://www.youtube.com/watch?v=RNonfByE9xc', 'RNonfByE9xc', 'carrera', '2025-06-26 18:06:46', '2025-06-26 18:06:46');

SET FOREIGN_KEY_CHECKS = 1;
