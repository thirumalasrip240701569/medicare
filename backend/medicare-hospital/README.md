# MediCare Hospital Appointment Management System

## Overview
The MediCare Hospital Appointment Management System is a web application designed to facilitate the management of hospital appointments. This system allows patients to book appointments with doctors, manage their profiles, and view their appointment history. Doctors can also manage their schedules and view patient appointments.

## Features
- User authentication (login/logout)
- Appointment scheduling and management
- Doctor and patient management
- Responsive design for easy access on various devices
- Data validation and error handling

## Project Structure
```
medicare-hospital
├── config
│   ├── app.php
│   └── database.php
├── public
│   ├── index.php
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   └── js
│   │       └── app.js
│   └── uploads
├── src
│   ├── App.php
│   ├── Controllers
│   │   ├── AppointmentController.php
│   │   ├── AuthController.php
│   │   ├── DoctorController.php
│   │   └── PatientController.php
│   ├── Models
│   │   ├── Appointment.php
│   │   ├── Doctor.php
│   │   ├── Patient.php
│   │   └── User.php
│   ├── Services
│   │   ├── AppointmentService.php
│   │   └── AuthService.php
│   ├── Repository
│   │   ├── AppointmentRepository.php
│   │   └── PatientRepository.php
│   ├── Helpers
│   │   ├── Validator.php
│   │   └── ResponseHelper.php
│   └── Middleware
│       └── AuthMiddleware.php
├── templates
│   ├── layouts
│   │   └── main.php
│   ├── auth
│   │   └── login.php
│   ├── appointments
│   │   ├── index.php
│   │   └── create.php
│   ├── doctors
│   │   └── index.php
│   └── patients
│       └── index.php
├── database
│   ├── schema.sql
│   ├── seeders
│   │   └── sample_data.sql
│   └── migrations
│       └── 001_create_tables.sql
├── tests
│   └── AppointmentTest.php
├── .env.example
├── .gitignore
├── composer.json
├── README.md
└── phpunit.xml
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd medicare-hospital
   ```
3. Install dependencies using Composer:
   ```
   composer install
   ```
4. Configure your environment variables by copying `.env.example` to `.env` and updating the values as needed.

## Usage
- Start the server using PHP's built-in server:
  ```
  php -S localhost:8000 -t public
  ```
- Access the application in your web browser at `http://localhost:8000`.

## Testing
Run the tests using PHPUnit:
```
vendor/bin/phpunit
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.