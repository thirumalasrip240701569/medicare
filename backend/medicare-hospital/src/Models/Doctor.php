<?php

namespace Models;

use Database\Database;

class Doctor
{
    private $db;
    private $table = 'doctors';

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function getAllDoctors()
    {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getDoctorById($id)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function createDoctor($data)
    {
        $query = "INSERT INTO " . $this->table . " (name, specialization, contact) VALUES (:name, :specialization, :contact)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':specialization', $data['specialization']);
        $stmt->bindParam(':contact', $data['contact']);
        return $stmt->execute();
    }

    public function updateDoctor($id, $data)
    {
        $query = "UPDATE " . $this->table . " SET name = :name, specialization = :specialization, contact = :contact WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':specialization', $data['specialization']);
        $stmt->bindParam(':contact', $data['contact']);
        return $stmt->execute();
    }

    public function deleteDoctor($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}