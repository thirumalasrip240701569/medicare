<?php

namespace App\Controllers;

use App\Services\AuthService;

class AuthController
{
    private $authService;

    public function __construct()
    {
        $this->authService = new AuthService();
    }

    public function login($request)
    {
        $credentials = $request->getParsedBody();
        $user = $this->authService->authenticate($credentials);

        if ($user) {
            // Set user session or token
            return [
                'status' => 'success',
                'message' => 'Login successful',
                'user' => $user
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Invalid credentials'
        ];
    }

    public function logout()
    {
        // Logic to log out the user
        return [
            'status' => 'success',
            'message' => 'Logout successful'
        ];
    }
}