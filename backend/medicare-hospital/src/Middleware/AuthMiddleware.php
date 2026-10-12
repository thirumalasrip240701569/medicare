<?php

namespace Middleware;

use Closure;
use Exception;

class AuthMiddleware
{
    public function handle($request, Closure $next)
    {
        if (!$this->isAuthenticated()) {
            throw new Exception('Unauthorized access. Please log in.');
        }

        return $next($request);
    }

    private function isAuthenticated()
    {
        // Implement your authentication logic here
        return isset($_SESSION['user_id']);
    }
}