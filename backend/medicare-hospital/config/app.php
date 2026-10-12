<?php
return [
    'app_name' => 'MediCare Hospital Appointment Management System',
    'app_env' => getenv('APP_ENV') ?: 'development',
    'app_debug' => getenv('APP_DEBUG') ?: true,
    'app_url' => getenv('APP_URL') ?: 'http://localhost',
    'app_timezone' => 'UTC',
    'app_locale' => 'en',
    'app_key' => getenv('APP_KEY') ?: 'base64:your-app-key-here',
    'log_channel' => getenv('LOG_CHANNEL') ?: 'stack',
];
