<?php

namespace App\Repository;

use App\Models\Appointment;
use PDO;

class AppointmentRepository
{
    private $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function createAppointment(array $data): bool
    {
        $stmt = $this->db->prepare("INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (:patient_id, :doctor_id, :appointment_date, :status)");
        return $stmt->execute([
            ':patient_id' => $data['patient_id'],
            ':doctor_id' => $data['doctor_id'],
            ':appointment_date' => $data['appointment_date'],
            ':status' => $data['status']
        ]);
    }

    public function getAppointmentById(int $id): ?Appointment
    {
        $stmt = $this->db->prepare("SELECT * FROM appointments WHERE id = :id");
        $stmt->execute([':id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? new Appointment($data) : null;
    }

    public function updateAppointment(int $id, array $data): bool
    {
        $stmt = $this->db->prepare("UPDATE appointments SET patient_id = :patient_id, doctor_id = :doctor_id, appointment_date = :appointment_date, status = :status WHERE id = :id");
        return $stmt->execute([
            ':id' => $id,
            ':patient_id' => $data['patient_id'],
            ':doctor_id' => $data['doctor_id'],
            ':appointment_date' => $data['appointment_date'],
            ':status' => $data['status']
        ]);
    }

    public function deleteAppointment(int $id): bool
    {
        $stmt = $this->db->prepare("DELETE FROM appointments WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    public function getAllAppointments(): array
    {
        $stmt = $this->db->query("SELECT * FROM appointments");
        $appointments = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $appointments[] = new Appointment($row);
        }
        return $appointments;
    }
}