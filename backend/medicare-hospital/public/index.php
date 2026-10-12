<?php
require_once '../config/app.php';
require_once '../config/database.php';
require_once '../src/App.php';

$app = new App();

// Define routes
$app->get('/', function() {
    // Load the main page or dashboard
    require '../templates/layouts/main.php';
});

// Additional routes can be defined here

$app->run();
?>