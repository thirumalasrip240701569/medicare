<?php

class Patient {
    private $id;
    private $name;
    private $email;
    private $phone;
    private $dateOfBirth;
    private $createdAt;
    private $updatedAt;

    public function __construct($name, $email, $phone, $dateOfBirth) {
        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
        $this->dateOfBirth = $dateOfBirth;
        $this->createdAt = new DateTime();
        $this->updatedAt = new DateTime();
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getPhone() {
        return $this->phone;
    }

    public function getDateOfBirth() {
        return $this->dateOfBirth;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function getUpdatedAt() {
        return $this->updatedAt;
    }

    public function setName($name) {
        $this->name = $name;
        $this->updatedAt = new DateTime();
    }

    public function setEmail($email) {
        $this->email = $email;
        $this->updatedAt = new DateTime();
    }

    public function setPhone($phone) {
        $this->phone = $phone;
        $this->updatedAt = new DateTime();
    }

    public function setDateOfBirth($dateOfBirth) {
        $this->dateOfBirth = $dateOfBirth;
        $this->updatedAt = new DateTime();
    }
}