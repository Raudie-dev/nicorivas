<?php
// api.php - API endpoints para el panel de administración
ob_start();
require_once 'config.php';
// Permitir CORS para desarrollo local
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');
    http_response_code(200);
    exit(0);
}


$database = new Database();
$db = $database->getConnection();

$request_method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

if (isset($_GET['endpoint'])) {
    $endpoint = $_GET['endpoint'];
    $id = isset($_GET['id']) ? $_GET['id'] : null;
} else {
    $endpoint = isset($path_parts[1]) ? $path_parts[1] : '';
    $id = isset($path_parts[2]) ? $path_parts[2] : null;
}

try {
    switch ($endpoint) {
        case 'videos':
            handleVideos($db, $request_method, $id);
            break;
        case 'photos':
            handlePhotos($db, $request_method, $id);
            break;
        case 'photos-upload':
            handlePhotoUpload($db);
            break;
        case 'news-photo-upload':
            handleNewsPhotoUpload($db);
            break;
        case 'news':
            handleNews($db, $request_method, $id);
            break;
        case 'pilot-info':
            handlePilotInfo($db, $request_method);
            break;
        case 'pilot-stats':
            handlePilotStats($db, $request_method);
            break;
        case 'config':
            handleConfig($db, $request_method);
            break;
        case 'races':
            handleRaces($db, $request_method, $id);
            break;
        case 'race-results':
            handleRaceResults($db, $request_method, $id);
            break;
        case 'season-stats':
            handleSeasonStats($db, $request_method, $id);
            break;
        case 'current-user':
            handleCurrentUser($db);
            break;
        default:
            jsonResponse(['error' => 'Endpoint no encontrado'], 404);
    }
} catch (Exception $e) {
    error_log("API Error: " . $e->getMessage());
    jsonResponse(['error' => 'Error interno del servidor: ' . $e->getMessage()], 500);
}

// Manejo de videos
function handleVideos($db, $method, $id)
{
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $db->prepare("SELECT * FROM videos WHERE id = ?");
                $stmt->execute([$id]);
                $video = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($video) {
                    jsonResponse($video);
                } else {
                    jsonResponse(['error' => 'Video no encontrado'], 404);
                }
            } else {
                $stmt = $db->prepare("SELECT * FROM videos ORDER BY created_at DESC");
                $stmt->execute();
                $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
                jsonResponse($videos);
            }
            break;
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            $missing = validateRequired($data, ['title', 'url', 'category']);
            if (!empty($missing)) jsonResponse(['error' => 'Campos requeridos: ' . implode(', ', $missing)], 400);
            $embed_id = extractYouTubeId($data['url']);
            if (!$embed_id) jsonResponse(['error' => 'URL de YouTube inválida'], 400);
            $stmt = $db->prepare("INSERT INTO videos (title, description, url, embed_id, category, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
            $stmt->execute([$data['title'], $data['description'] ?? '', $data['url'], $embed_id, $data['category']]);
            $newId = $db->lastInsertId();
            $stmt = $db->prepare("SELECT * FROM videos WHERE id = ?");
            $stmt->execute([$newId]);
            $video = $stmt->fetch(PDO::FETCH_ASSOC);
            jsonResponse($video, 201);
            break;
        case 'PUT':
            if (!$id) jsonResponse(['error' => 'ID requerido'], 400);
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            $embed_id = extractYouTubeId($data['url']);
            $stmt = $db->prepare("UPDATE videos SET title = ?, description = ?, url = ?, embed_id = ?, category = ? WHERE id = ?");
            $stmt->execute([$data['title'], $data['description'] ?? '', $data['url'], $embed_id, $data['category'], $id]);
            jsonResponse(['message' => 'Video actualizado']);
            break;
        case 'DELETE':
            if (!$id) jsonResponse(['error' => 'ID requerido'], 400);
            $stmt = $db->prepare("DELETE FROM videos WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(['message' => 'Video eliminado']);
            break;
    }
}

// Manejo de fotos
function handlePhotos($db, $method, $id)
{
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $db->prepare("SELECT * FROM photos WHERE id = ?");
                $stmt->execute([$id]);
                $photo = $stmt->fetch(PDO::FETCH_ASSOC);
                jsonResponse($photo ?: ['error' => 'Foto no encontrada'], $photo ? 200 : 404);
            } else {
                $stmt = $db->prepare("SELECT * FROM photos ORDER BY created_at DESC");
                $stmt->execute();
                jsonResponse($stmt->fetchAll(PDO::FETCH_ASSOC));
            }
            break;
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            $missing = validateRequired($data, ['title', 'url', 'category']);
            if (!empty($missing)) jsonResponse(['error' => 'Campos requeridos: ' . implode(', ', $missing)], 400);
            $stmt = $db->prepare("INSERT INTO photos (title, description, url, category, created_at) VALUES (?, ?, ?, ?, NOW())");
            $stmt->execute([$data['title'], $data['description'] ?? '', $data['url'], $data['category']]);
            $newId = $db->lastInsertId();
            $stmt = $db->prepare("SELECT * FROM photos WHERE id = ?");
            $stmt->execute([$newId]);
            jsonResponse($stmt->fetch(PDO::FETCH_ASSOC), 201);
            break;
        case 'PUT':
            if (!$id) jsonResponse(['error' => 'ID requerido'], 400);
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            $stmt = $db->prepare("UPDATE photos SET title = ?, description = ?, url = ?, category = ? WHERE id = ?");
            $stmt->execute([$data['title'], $data['description'] ?? '', $data['url'], $data['category'], $id]);
            jsonResponse(['message' => 'Foto actualizada']);
            break;
        case 'DELETE':
            if (!$id) jsonResponse(['error' => 'ID requerido'], 400);

            // 1) Obtener la URL de la foto
            $stmt = $db->prepare("SELECT url FROM photos WHERE id = ?");
            $stmt->execute([$id]);
            $photo = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$photo) {
                jsonResponse(['error' => 'Foto no encontrada'], 404);
            }

            // 2) Construir la ruta absoluta
            $publicUrl = $photo['url']; // ej: "uploads/photos/photo_abc123.jpg"
            $filePath = __DIR__ . '/' . $publicUrl;

            // 3) Borrar el fichero si existe
            if (file_exists($filePath)) {
                if (!unlink($filePath)) {
                    // si falla el unlink, puedes optar por seguir o abortar
                    error_log("No se pudo borrar el archivo de foto: $filePath");
                    jsonResponse(['error' => 'No se pudo borrar el archivo de la foto'], 500);
                }
            }

            // 4) Ahora eliminas el registro de la base de datos
            $stmt = $db->prepare("DELETE FROM photos WHERE id = ?");
            $stmt->execute([$id]);

            jsonResponse(['message' => 'Foto y archivo eliminados'], 200);
            break;
    }
}

// Subida de imágenes
function handlePhotoUpload($db)
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') jsonResponse(['error' => 'Método no permitido'], 405);
    if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
        jsonResponse(['error' => 'Error al subir el archivo'], 400);
    }

    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $category = $_POST['category'] ?? '';

    if (empty($title) || empty($category)) {
        jsonResponse(['error' => 'Faltan campos requeridos: title y category'], 400);
    }

    $uploadDir = __DIR__ . '/uploads/photos/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

    $file = $_FILES['photo'];
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid('photo_', true) . '.' . strtolower($ext);
    $destination = $uploadDir . $filename;
    $publicUrl = 'uploads/photos/' . $filename;

    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        jsonResponse(['error' => 'Error al guardar la imagen'], 500);
    }

    $stmt = $db->prepare("INSERT INTO photos (title, description, url, category, created_at) VALUES (?, ?, ?, ?, NOW())");
    $stmt->execute([$title, $description, $publicUrl, $category]);

    jsonResponse(['message' => 'Foto subida correctamente', 'url' => $publicUrl], 201);
}

/**
 * POST /api.php?endpoint=news-photo-upload
 * Recibe 'news_id' y $_FILES['photo'], guarda el archivo
 * y actualiza directamente el campo 'image' en la tabla 'news'.
 */
function handleNewsPhotoUpload($db)
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(['error' => 'Método no permitido'], 405);
    }
    $newsId = isset($_POST['news_id']) ? (int)$_POST['news_id'] : 0;
    if ($newsId <= 0) {
        jsonResponse(['error' => 'ID de noticia inválido'], 400);
    }
    if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
        jsonResponse(['error' => 'Error al subir el archivo'], 400);
    }

    $uploadDir = __DIR__ . '/uploads/news/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $file     = $_FILES['photo'];
    $ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid("news_{$newsId}_", true) . '.' . strtolower($ext);
    $dest     = $uploadDir . $filename;
    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        jsonResponse(['error' => 'No se pudo guardar la imagen'], 500);
    }
    $publicUrl = 'uploads/news/' . $filename;

    $stmt = $db->prepare("UPDATE news SET image = ? WHERE id = ?");
    $stmt->execute([$publicUrl, $newsId]);

    jsonResponse([
        'message'   => 'Imagen de noticia actualizada correctamente',
        'news_id'   => $newsId,
        'image_url' => $publicUrl
    ], 200);
}

// Manejo de noticias
function handleNews($db, $method, $id)
{
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $db->prepare("SELECT * FROM news WHERE id = ?");
                $stmt->execute([$id]);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$row) {
                    return jsonResponse(['error' => 'Noticia no encontrada'], 404);
                }
                $row['tags']     = json_decode($row['tags'], true) ?: [];
                jsonResponse($row);
            } else {
                $stmt = $db->prepare("SELECT * FROM news ORDER BY created_at DESC");
                $stmt->execute();
                $all = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach ($all as &$row) {
                    $row['tags'] = json_decode($row['tags'], true) ?: [];
                }
                jsonResponse($all);
            }
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                return jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            }
            // Campos requeridos
            $missing = validateRequired($data, ['title', 'excerpt', 'content', 'category']);
            if ($missing) {
                return jsonResponse(['error' => 'Faltan campos: ' . implode(', ', $missing)], 400);
            }
            // Preparar valores
            $tags    = isset($data['tags']) ? json_encode($data['tags']) : json_encode([]);
            $video   = trim($data['video'] ?? '');
            $embedId = $video ? extractYouTubeId($video) : null;
            // Insertar
            $stmt = $db->prepare("
                INSERT INTO news
                  (title, excerpt, content, image, category, author, tags, published, created_at, video, embed_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, 0, NOW(), ?, ?)
            ");
            $stmt->execute([
                $data['title'],
                $data['excerpt'],
                $data['content'],
                $data['image']   ?? '',
                $data['category'],
                $data['author']  ?? 'Equipo de Prensa',
                $tags,
                $video,
                $embedId
            ]);
            $newId = $db->lastInsertId();
            $stmt  = $db->prepare("SELECT * FROM news WHERE id = ?");
            $stmt->execute([$newId]);
            $row   = $stmt->fetch(PDO::FETCH_ASSOC);
            $row['tags'] = json_decode($row['tags'], true) ?: [];
            return jsonResponse($row, 201);

        case 'PUT':
            if (!$id) {
                return jsonResponse(['error' => 'ID requerido'], 400);
            }
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                return jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            }
            $tags    = isset($data['tags']) ? json_encode($data['tags']) : json_encode([]);
            $video   = trim($data['video'] ?? '');
            $embedId = $video ? extractYouTubeId($video) : null;
            $stmt = $db->prepare("
                UPDATE news SET
                  title     = ?,
                  excerpt   = ?,
                  content   = ?,
                  image     = ?,
                  category  = ?,
                  author    = ?,
                  tags      = ?,
                  video     = ?,
                  embed_id  = ?,
                  updated_at = NOW()
                WHERE id = ?
            ");
            $stmt->execute([
                $data['title'],
                $data['excerpt'],
                $data['content'],
                $data['image']   ?? '',
                $data['category'],
                $data['author']  ?? 'Equipo de Prensa',
                $tags,
                $video,
                $embedId,
                $id
            ]);
            return jsonResponse(['message' => 'Noticia actualizada']);

        case 'DELETE':
            if (!$id) {
                return jsonResponse(['error' => 'ID requerido'], 400);
            }

            // Obtener la imagen asociada
            $stmt = $db->prepare("SELECT image FROM news WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                return jsonResponse(['error' => 'Noticia no encontrada'], 404);
            }

            // Eliminar el archivo de imagen si existe
            if (!empty($row['image'])) {
                $imagePath = __DIR__ . '/' . $row['image']; // Asume que $row['image'] es algo como "uploads/news/imagen.jpg"
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }

            // Eliminar la noticia
            $stmt = $db->prepare("DELETE FROM news WHERE id = ?");
            $stmt->execute([$id]);

            return jsonResponse(['message' => 'Noticia eliminada']);
    }
}

// Manejo de información del piloto
function handlePilotInfo($db, $method)
{
    switch ($method) {
        case 'GET':
            $stmt = $db->prepare("SELECT * FROM pilot_info ORDER BY id DESC LIMIT 1");
            $stmt->execute();
            $info = $stmt->fetch(PDO::FETCH_ASSOC);
            jsonResponse($info ?: []);
            break;

        case 'POST':
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            }

            // Verificar si existe un registro
            $stmt = $db->prepare("SELECT id FROM pilot_info LIMIT 1");
            $stmt->execute();
            $existing = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existing) {
                // Actualizar
                $stmt = $db->prepare("UPDATE pilot_info SET name = ?, age = ?, bio = ? WHERE id = ?");
                $stmt->execute([$data['name'], $data['age'], $data['bio'], $existing['id']]);
            } else {
                // Insertar
                $stmt = $db->prepare("INSERT INTO pilot_info (name, age, bio) VALUES (?, ?, ?)");
                $stmt->execute([$data['name'], $data['age'], $data['bio']]);
            }

            jsonResponse(['message' => 'Información actualizada']);
            break;
    }
}

// Manejo de estadísticas del piloto
function handlePilotStats($db, $method)
{
    switch ($method) {
        case 'GET':
            $stmt = $db->prepare("SELECT * FROM pilot_stats ORDER BY id DESC LIMIT 1");
            $stmt->execute();
            $stats = $stmt->fetch(PDO::FETCH_ASSOC);
            jsonResponse($stats ?: []);
            break;

        case 'POST':
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            }

            // Verificar si existe un registro
            $stmt = $db->prepare("SELECT id FROM pilot_stats LIMIT 1");
            $stmt->execute();
            $existing = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existing) {
                // Actualizar
                $stmt = $db->prepare("UPDATE pilot_stats SET victories = ?, podiums = ?, seasons = ?, debut_year = ? WHERE id = ?");
                $stmt->execute([$data['victories'], $data['podiums'], $data['seasons'], $data['debut_year'], $existing['id']]);
            } else {
                // Insertar
                $stmt = $db->prepare("INSERT INTO pilot_stats (victories, podiums, seasons, debut_year) VALUES (?, ?, ?, ?)");
                $stmt->execute([$data['victories'], $data['podiums'], $data['seasons'], $data['debut_year']]);
            }

            jsonResponse(['message' => 'Estadísticas actualizadas']);
            break;
    }
}

// Manejo de configuración
function handleConfig($db, $method)
{
    session_start();

    switch ($method) {
        case 'GET':
            $stmt = $db->prepare("SELECT config_key, config_value FROM site_config");
            $stmt->execute();
            $configs = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $result = [];
            foreach ($configs as $config) {
                $result[$config['config_key']] = $config['config_value'];
            }

            jsonResponse($result);
            break;

        case 'POST':
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            }

            // Validar sesión del usuario
            if (!isset($_SESSION['username'])) {
                jsonResponse(['error' => 'Usuario no autenticado'], 401);
            }

            // Actualizar contraseña si se indica
            if (!empty($data['new_password'])) {
                if (strlen($data['new_password']) < 6) {
                    jsonResponse(['error' => 'La contraseña debe tener al menos 6 caracteres'], 400);
                }

                $hashedPassword = password_hash($data['new_password'], PASSWORD_DEFAULT);
                $stmt = $db->prepare("UPDATE users SET password = ? WHERE username = ?");
                $stmt->execute([$hashedPassword, $_SESSION['username']]);
            }

            // Guardar las demás configuraciones
            foreach ($data as $key => $value) {
                if ($key === 'new_password') continue;

                $stmt = $db->prepare("
                    INSERT INTO site_config (config_key, config_value)
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE config_value = ?
                ");
                $stmt->execute([$key, $value, $value]);
            }

            jsonResponse(['message' => 'Configuración actualizada']);
            break;
    }
}

// Manejo de carreras
function handleRaces($db, $method, $id)
{
    switch ($method) {
        case 'GET':
            if ($id) {
                // Obtener una carrera específica
                $stmt = $db->prepare("SELECT * FROM races WHERE id = ?");
                $stmt->execute([$id]);
                $race = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($race) {
                    jsonResponse($race);
                } else {
                    jsonResponse(['error' => 'Carrera no encontrada'], 404);
                }
            } else {
                // Obtener todas las carreras o filtrar por tipo
                $type = $_GET['type'] ?? null;

                if ($type) {
                    $stmt = $db->prepare("SELECT * FROM races WHERE type = ? ORDER BY date ASC");
                    $stmt->execute([$type]);
                } else {
                    $stmt = $db->prepare("SELECT * FROM races ORDER BY date ASC");
                    $stmt->execute();
                }

                $races = $stmt->fetchAll(PDO::FETCH_ASSOC);
                jsonResponse($races);
            }
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            }

            $missing = validateRequired($data, ['name', 'type', 'date', 'location']);
            if (!empty($missing)) {
                jsonResponse(['error' => 'Campos requeridos: ' . implode(', ', $missing)], 400);
            }

            $stmt = $db->prepare("
        INSERT INTO races (name, type, date, location, laps, distance, description, broadcast, is_next, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");

            $stmt->execute([
                $data['name'],
                $data['type'],
                $data['date'],
                $data['location'],
                $data['laps'] ?? null,
                $data['distance'] ?? null,
                $data['description'] ?? '',
                $data['broadcast'] ?? '',
                $data['is_next'] ?? false
            ]);

            // Marcar automáticamente la próxima carrera según la fecha
            $db->exec("UPDATE races SET is_next = FALSE");
            $stmt = $db->prepare("
        SELECT id FROM races 
        WHERE date >= CURDATE()
        ORDER BY date ASC
        LIMIT 1
    ");
            $stmt->execute();
            $nextRace = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($nextRace) {
                $stmt = $db->prepare("UPDATE races SET is_next = TRUE WHERE id = ?");
                $stmt->execute([$nextRace['id']]);
            }

            $newId = $db->lastInsertId();
            $stmt = $db->prepare("SELECT * FROM races WHERE id = ?");
            $stmt->execute([$newId]);
            $race = $stmt->fetch(PDO::FETCH_ASSOC);

            jsonResponse($race, 201);
            break;
        case 'PUT':
            if (!$id) {
                jsonResponse(['error' => 'ID requerido'], 400);
            }

            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            }

            $stmt = $db->prepare("
        UPDATE races SET 
            name = ?, type = ?, date = ?, location = ?, 
            laps = ?, distance = ?, description = ?, broadcast = ?, 
            is_next = ?, updated_at = NOW()
        WHERE id = ?
    ");

            $stmt->execute([
                $data['name'],
                $data['type'],
                $data['date'],
                $data['location'],
                $data['laps'] ?? null,
                $data['distance'] ?? null,
                $data['description'] ?? '',
                $data['broadcast'] ?? '',
                $data['is_next'] ?? false,
                $id
            ]);

            // Marcar automáticamente la próxima carrera según la fecha
            $db->exec("UPDATE races SET is_next = FALSE");
            $stmt = $db->prepare("
        SELECT id FROM races 
        WHERE date >= CURDATE()
        ORDER BY date ASC
        LIMIT 1
    ");
            $stmt->execute();
            $nextRace = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($nextRace) {
                $stmt = $db->prepare("UPDATE races SET is_next = TRUE WHERE id = ?");
                $stmt->execute([$nextRace['id']]);
            }

            jsonResponse(['message' => 'Carrera actualizada']);
            break;


        case 'DELETE':
            if (!$id) {
                jsonResponse(['error' => 'ID requerido'], 400);
            }

            $stmt = $db->prepare("DELETE FROM races WHERE id = ?");
            $stmt->execute([$id]);

            jsonResponse(['message' => 'Carrera eliminada']);
            break;
    }
}

// Manejo de resultados de carreras
function handleRaceResults($db, $method, $id)
{
    switch ($method) {
        case 'GET':
            if ($id) {
                // Obtener un resultado específico
                $stmt = $db->prepare("SELECT * FROM race_results WHERE id = ?");
                $stmt->execute([$id]);
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($result) {
                    // Decodificar highlights JSON
                    $result['highlights'] = json_decode($result['highlights'], true) ?: [];
                    jsonResponse($result);
                } else {
                    jsonResponse(['error' => 'Resultado no encontrado'], 404);
                }
            } else {
                // Obtener todos los resultados
                $stmt = $db->prepare("SELECT * FROM race_results ORDER BY date DESC");
                $stmt->execute();
                $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

                // Decodificar highlights para cada resultado
                foreach ($results as &$result) {
                    $result['highlights'] = json_decode($result['highlights'], true) ?: [];
                }

                jsonResponse($results);
            }
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            }

            $missing = validateRequired($data, ['race_name', 'position', 'date', 'location']);
            if (!empty($missing)) {
                jsonResponse(['error' => 'Campos requeridos: ' . implode(', ', $missing)], 400);
            }

            $highlights = json_encode($data['highlights'] ?? []);

            $stmt = $db->prepare("
                INSERT INTO race_results (race_name, position, date, location, laps, time, highlights, notes, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
            ");

            $stmt->execute([
                $data['race_name'],
                $data['position'],
                $data['date'],
                $data['location'],
                $data['laps'] ?? null,
                $data['time'] ?? '',
                $highlights,
                $data['notes'] ?? ''
            ]);

            $newId = $db->lastInsertId();
            $stmt = $db->prepare("SELECT * FROM race_results WHERE id = ?");
            $stmt->execute([$newId]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $result['highlights'] = json_decode($result['highlights'], true) ?: [];

            jsonResponse($result, 201);
            break;

        case 'PUT':
            if (!$id) {
                jsonResponse(['error' => 'ID requerido'], 400);
            }

            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            }

            $highlights = json_encode($data['highlights'] ?? []);

            $stmt = $db->prepare("
                UPDATE race_results SET 
                    race_name = ?, position = ?, date = ?, location = ?, 
                    laps = ?, time = ?, highlights = ?, notes = ?, updated_at = NOW()
                WHERE id = ?
            ");

            $stmt->execute([
                $data['race_name'],
                $data['position'],
                $data['date'],
                $data['location'],
                $data['laps'] ?? null,
                $data['time'] ?? '',
                $highlights,
                $data['notes'] ?? '',
                $id
            ]);

            jsonResponse(['message' => 'Resultado actualizado']);
            break;

        case 'DELETE':
            if (!$id) {
                jsonResponse(['error' => 'ID requerido'], 400);
            }

            $stmt = $db->prepare("DELETE FROM race_results WHERE id = ?");
            $stmt->execute([$id]);

            jsonResponse(['message' => 'Resultado eliminado']);
            break;
    }
}

// Manejo de estadísticas de temporada
function handleSeasonStats($db, $method, $id = null)
{
    switch ($method) {
        case 'GET':
            $year = $_GET['year'] ?? date('Y');

            $stmt = $db->prepare("SELECT * FROM season_stats WHERE year = ? ORDER BY id DESC LIMIT 1");
            $stmt->execute([$year]);
            $stats = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$stats) {
                // Si no hay estadísticas para el año, crear un registro vacío
                $stats = [
                    'year' => (int)$year,
                    'championship_position' => null,
                    'total_points' => null,
                    'points_gap' => null,
                    'victories' => 0,
                    'podiums' => 0
                ];
            }

            jsonResponse($stats);
            break;

        case 'POST':
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                jsonResponse(['error' => 'Datos JSON inválidos'], 400);
            }

            // Validar que todos los campos requeridos existan y no estén vacíos
            $requiredFields = [
                'year',
                'championship_position',
                'total_points',
                'points_gap',
                'victories',
                'podiums'
            ];

            foreach ($requiredFields as $field) {
                if (!isset($data[$field]) || $data[$field] === '' || $data[$field] === null) {
                    jsonResponse(['error' => "El campo '$field' es requerido"], 400);
                }
            }

            $year = $data['year'];

            // Verificar si existe un registro para este año
            $stmt = $db->prepare("SELECT id FROM season_stats WHERE year = ?");
            $stmt->execute([$year]);
            $existing = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existing) {
                // Actualizar registro existente
                $stmt = $db->prepare("
                    UPDATE season_stats SET 
                        championship_position = ?, 
                        total_points = ?, 
                        points_gap = ?, 
                        victories = ?, 
                        podiums = ?,
                        updated_at = NOW()
                    WHERE year = ?
                ");

                $stmt->execute([
                    $data['championship_position'],
                    $data['total_points'],
                    $data['points_gap'],
                    $data['victories'],
                    $data['podiums'],
                    $year
                ]);
            } else {
                // Crear nuevo registro
                $stmt = $db->prepare("
                    INSERT INTO season_stats (year, championship_position, total_points, points_gap, victories, podiums, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, NOW())
                ");

                $stmt->execute([
                    $year,
                    $data['championship_position'],
                    $data['total_points'],
                    $data['points_gap'],
                    $data['victories'],
                    $data['podiums']
                ]);
            }

            jsonResponse(['message' => 'Estadísticas de temporada actualizadas']);
            break;

        case 'DELETE':
            if (!$id) {
                jsonResponse(['error' => 'ID requerido'], 400);
            }

            $stmt = $db->prepare("DELETE FROM season_stats WHERE id = ?");
            $stmt->execute([$id]);

            jsonResponse(['message' => 'Estadísticas eliminadas']);
            break;
    }
}

//Funcion para obtener el usuario
function handleCurrentUser($db)
{
    session_start();

    if (!isset($_SESSION['user_logged_in']) || $_SESSION['user_logged_in'] !== true) {
        jsonResponse(['error' => 'No autorizado'], 401);
    }

    $username = $_SESSION['username'] ?? null;

    if (!$username) {
        jsonResponse(['error' => 'Sesión inválida'], 400);
    }

    // Obtener datos del usuario desde la base de datos
    $stmt = $db->prepare("SELECT id, username, email FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        jsonResponse(['error' => 'Usuario no encontrado'], 404);
    }

    jsonResponse([
        'id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email']
    ]);
}

// Funciones auxiliares
function jsonResponse($data, $status = 200)
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function validateRequired($data, $required)
{
    $missing = [];
    foreach ($required as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $missing[] = $field;
        }
    }
    return $missing;
}

function extractYouTubeId($url)
{
    $pattern = '/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/';
    preg_match($pattern, $url, $matches);
    return isset($matches[1]) ? $matches[1] : false;
}
