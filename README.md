# MediCare

MediCare is a responsive hospital platform for finding doctors and booking **in-person hospital appointments**. It does not provide video, online, or chat consultations.

## Stack

- Vanilla HTML, CSS and JavaScript
- Node.js and Express REST API
- MySQL and Sequelize
- JWT authentication and bcrypt password hashing

The application uses MySQL for persistent data and keeps a local demo fallback available when MySQL is unavailable.

## Database collections

The database uses `User`, `Patient`, `Doctor`, `Appointment`, `Department`, `Prescription`, and `MedicalRecord` collections. Public registration creates a patient `User` and matching `Patient` record; staff accounts use the same `User` collection with `doctor`, `receptionist`, or `admin` roles.

## Role-based login

The login form requires a role selection. The API verifies that the selected role matches the account before issuing a JWT, and the frontend routes users to the matching dashboard. Dashboard pages redirect unauthenticated users to login and prevent cross-role access.

## Run locally

1. Install Node.js and MySQL.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set the MySQL connection values and `JWT_SECRET`.
4. Run `npm run dev`.
5. Open `http://localhost:5000`.

The API is available at `http://localhost:5000/api`. Frontend pages are served by Express, so browser requests use the same origin.

## Main endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/doctors`
- `GET /api/doctors/:id`
- `POST|GET|PUT|DELETE /api/appointments`
- `GET|POST|PUT|DELETE /api/departments`
- `POST /api/prescriptions`, `GET /api/prescriptions/:patientId`
- `POST /api/medical-records`, `GET /api/medical-records/:patientId`

## Roles

Registration creates patient accounts. Doctor, receptionist and admin accounts should be provisioned by an administrator in production. Role middleware protects management endpoints.

## Future improvements

Add appointment slot locking, email reminders, audited admin activity, production validation, seeded departments, and a dedicated deployment configuration.
