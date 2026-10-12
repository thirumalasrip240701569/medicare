<?php

namespace App\Services;

use App\Repository\AppointmentRepository;

class AppointmentService
{
    protected $appointmentRepository;

    public function __construct(AppointmentRepository $appointmentRepository)
    {
        $this->appointmentRepository = $appointmentRepository;
    }

    public function createAppointment(array $data)
    {
        // Validate and create appointment logic
        return $this->appointmentRepository->create($data);
    }

    public function updateAppointment($id, array $data)
    {
        // Validate and update appointment logic
        return $this->appointmentRepository->update($id, $data);
    }

    public function deleteAppointment($id)
    {
        // Delete appointment logic
        return $this->appointmentRepository->delete($id);
    }

    public function getAppointment($id)
    {
        // Retrieve appointment logic
        return $this->appointmentRepository->find($id);
    }

    public function getAllAppointments()
    {
        // Retrieve all appointments logic
        return $this->appointmentRepository->findAll();
    }
}