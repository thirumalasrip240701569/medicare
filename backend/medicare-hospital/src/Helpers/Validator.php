<?php

class Validator {
    public static function validateRequired($data, $fields) {
        $errors = [];
        foreach ($fields as $field) {
            if (empty($data[$field])) {
                $errors[$field] = "$field is required.";
            }
        }
        return $errors;
    }

    public static function validateEmail($email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "Invalid email format.";
        }
        return null;
    }

    public static function validatePhone($phone) {
        if (!preg_match('/^[0-9]{10}$/', $phone)) {
            return "Phone number must be 10 digits.";
        }
        return null;
    }

    public static function validateDate($date) {
        $d = DateTime::createFromFormat('Y-m-d', $date);
        if ($d && $d->format('Y-m-d') === $date) {
            return null;
        }
        return "Invalid date format. Use YYYY-MM-DD.";
    }
}