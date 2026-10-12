<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointments</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <div class="container">
        <h1>Appointments</h1>
        <a href="create.php" class="btn">Create New Appointment</a>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Patient Name</th>
                    <th>Doctor Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Fetch appointments from the database
                // Assuming $appointments is an array of appointment data
                foreach ($appointments as $appointment) {
                    echo "<tr>
                            <td>{$appointment['id']}</td>
                            <td>{$appointment['patient_name']}</td>
                            <td>{$appointment['doctor_name']}</td>
                            <td>{$appointment['date']}</td>
                            <td>{$appointment['time']}</td>
                            <td>
                                <a href='edit.php?id={$appointment['id']}' class='btn'>Edit</a>
                                <a href='delete.php?id={$appointment['id']}' class='btn'>Delete</a>
                            </td>
                          </tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
    <script src="/assets/js/app.js"></script>
</body>
</html>