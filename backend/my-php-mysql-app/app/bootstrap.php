<?php
require_once __DIR__ . '/config/database.php';

function autoload($className) {
    $file = __DIR__ . '/' . str_replace('\\', '/', $className) . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
}

spl_autoload_register('autoload');

// Additional initialization code can go here
?>