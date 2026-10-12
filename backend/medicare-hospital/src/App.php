<?php

class App {
    private $config;

    public function __construct() {
        $this->config = require_once __DIR__ . '/../config/app.php';
        $this->initialize();
    }

    private function initialize() {
        // Load necessary components, services, and middleware
        $this->loadServices();
        $this->loadMiddleware();
    }

    private function loadServices() {
        // Initialize services like AppointmentService, AuthService, etc.
    }

    private function loadMiddleware() {
        // Initialize middleware like AuthMiddleware
    }

    public function run() {
        // Start the application and handle requests
    }
}

$app = new App();
$app->run();