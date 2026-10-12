<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MediCare Hospital</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <header>
        <h1>MediCare Hospital Appointment Management System</h1>
        <nav>
            <ul>
                <li><a href="/appointments">Appointments</a></li>
                <li><a href="/doctors">Doctors</a></li>
                <li><a href="/patients">Patients</a></li>
                <li><a href="/auth/login">Login</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <?php include($content); ?>
    </main>
    <footer>
        <p>&copy; <?php echo date("Y"); ?> MediCare Hospital. All rights reserved.</p>
    </footer>
    <script src="/assets/js/app.js"></script>
</body>
</html>