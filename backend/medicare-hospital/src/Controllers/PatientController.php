<?php

namespace App\Controllers;

use App\Models\Patient;
use App\Services\PatientService;

class PatientController
{
    protected $patientService;

    public function __construct()
    {
        $this->patientService = new PatientService();
    }

    public function index()
    {
        $patients = $this->patientService->getAllPatients();
        // Load the view to display patients
        require_once '../templates/patients/index.php';
    }

    public function create()
    {
        // Load the view to create a new patient
        require_once '../templates/patients/create.php';
    }

    public function store($data)
    {
        $result = $this->patientService->createPatient($data);
        if ($result) {
            // Redirect to the patient index page
            header('Location: /patients');
        } else {
            // Handle error
            echo "Error creating patient.";
        }
    }

    public function edit($id)
    {
        $patient = $this->patientService->getPatientById($id);
        // Load the view to edit the patient
        require_once '../templates/patients/edit.php';
    }

    public function update($id, $data)
    {
        $result = $this->patientService->updatePatient($id, $data);
        if ($result) {
            // Redirect to the patient index page
            header('Location: /patients');
        } else {
            // Handle error
            echo "Error updating patient.";
        }
    }

    public function delete($id)
    {
        $result = $this->patientService->deletePatient($id);
        if ($result) {
            // Redirect to the patient index page
            header('Location: /patients');
        } else {
            // Handle error
            echo "Error deleting patient.";
        }
    }
}