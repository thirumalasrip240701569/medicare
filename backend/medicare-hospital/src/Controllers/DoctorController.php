<?php

namespace App\Controllers;

use App\Models\Doctor;
use App\Services\DoctorService;

class DoctorController
{
    protected $doctorService;

    public function __construct()
    {
        $this->doctorService = new DoctorService();
    }

    public function index()
    {
        $doctors = $this->doctorService->getAllDoctors();
        require_once '../templates/doctors/index.php';
    }

    public function create()
    {
        require_once '../templates/doctors/create.php';
    }

    public function store($data)
    {
        $this->doctorService->createDoctor($data);
        header('Location: /doctors');
    }

    public function edit($id)
    {
        $doctor = $this->doctorService->getDoctorById($id);
        require_once '../templates/doctors/edit.php';
    }

    public function update($id, $data)
    {
        $this->doctorService->updateDoctor($id, $data);
        header('Location: /doctors');
    }

    public function delete($id)
    {
        $this->doctorService->deleteDoctor($id);
        header('Location: /doctors');
    }
}