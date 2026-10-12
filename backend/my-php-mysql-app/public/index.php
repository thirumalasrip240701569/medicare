<?php
require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\UserController;

$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

$userController = new UserController();

switch ($requestMethod) {
    case 'GET':
        if ($requestUri === '/api/users') {
            $userController->getUser();
        }
        break;
    case 'POST':
        if ($requestUri === '/api/users') {
            $userController->createUser();
        }
        break;
    case 'PUT':
        if (preg_match('/^\/api\/users\/(\d+)$/', $requestUri, $matches)) {
            $userController->updateUser($matches[1]);
        }
        break;
    case 'DELETE':
        if (preg_match('/^\/api\/users\/(\d+)$/', $requestUri, $matches)) {
            $userController->deleteUser($matches[1]);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method Not Allowed']);
        break;
}