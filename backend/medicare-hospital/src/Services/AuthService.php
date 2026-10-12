<?php

namespace Services;

use Models\User;

class AuthService
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    public function register($data)
    {
        // Logic for user registration
        // Validate data, hash password, and save user to the database
    }

    public function login($email, $password)
    {
        // Logic for user login
        // Verify user credentials and return user data or error
    }

    public function logout()
    {
        // Logic for user logout
        // Clear session or token
    }

    public function isAuthenticated()
    {
        // Logic to check if the user is authenticated
        // Return true or false based on session or token
    }
}