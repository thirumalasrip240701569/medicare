<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function createUser(array $data)
    {
        // Validate and process user data
        // Create a new user in the database
        $user = new User();
        $user->name = $data['name'];
        $user->email = $data['email'];
        // Additional processing and validation can be added here
        $user->save();

        return $user;
    }

    public function getUser(int $id)
    {
        // Retrieve user by ID
        return User::find($id);
    }

    public function updateUser(int $id, array $data)
    {
        // Update user information
        $user = User::find($id);
        if ($user) {
            $user->name = $data['name'] ?? $user->name;
            $user->email = $data['email'] ?? $user->email;
            // Additional processing can be added here
            $user->save();
        }

        return $user;
    }

    public function deleteUser(int $id)
    {
        // Delete user by ID
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return true;
        }

        return false;
    }
}