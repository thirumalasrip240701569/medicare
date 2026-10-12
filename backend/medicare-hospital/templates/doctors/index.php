<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doctors List</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <header>
        <h1>Doctors List</h1>
        <a href="/doctors/create.php">Add New Doctor</a>
    </header>
    <main>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Assuming $doctors is an array of doctor objects fetched from the database
                foreach ($doctors as $doctor) {
                    echo "<tr>
                            <td>{$doctor->id}</td>
                            <td>{$doctor->name}</td>
                            <td>{$doctor->specialization}</td>
                            <td>
                                <a href='/doctors/edit.php?id={$doctor->id}'>Edit</a>
                                <a href='/doctors/delete.php?id={$doctor->id}'>Delete</a>
                            </td>
                          </tr>";
                }
                ?>
            </tbody>
        </table>
    </main>
</body>
</html>