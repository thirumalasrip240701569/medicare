<?php

namespace App\Controllers;

use App\Models\Appointment;
use App\Services\AppointmentService;
use App\Helpers\ResponseHelper;

class AppointmentController
{
    protected $appointmentService;

    public function __construct()
    {
        $this->appointmentService = new AppointmentService();
    }

    public function createAppointment($data)
    {
        $appointment = $this->appointmentService->create($data);
        return ResponseHelper::json($appointment);
    }

    public function updateAppointment($id, $data)
    {
        $appointment = $this->appointmentService->update($id, $data);
        return ResponseHelper::json($appointment);
    }

    public function deleteAppointment($id)
    {
        $this->appointmentService->delete($id);
        return ResponseHelper::json(['message' => 'Appointment deleted successfully']);
    }

    public function listAppointments()
    {
        $appointments = $this->appointmentService->getAll();
        return ResponseHelper::json($appointments);
    }

    public function getAppointment($id)
    {
        $appointment = $this->appointmentService->getById($id);
        return ResponseHelper::json($appointment);
    }
}