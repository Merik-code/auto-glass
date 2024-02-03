<?php
// connection
$servername = "localhost";
$username = "id20453600_admin";
$password = "Admin_123";
$database = "id20453600_message";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// handle
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $name = $_POST['name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $subject = $_POST['subject'];

    // Sanitize the data
    $name = mysqli_real_escape_string($conn, $name);
    $email = mysqli_real_escape_string($conn, $email);
    $message = mysqli_real_escape_string($conn, $message);
    $subject = mysqli_real_escape_string($conn, $subject);
    $last_name = mysqli_real_escape_string($conn, $last_name);

    // Insert data into the table
    $sql_insert = "INSERT INTO contacts (name, last_name, email, subject, message) VALUES ('$name', '$last_name', '$email', '$subject', '$message')";

    if (mysqli_query($conn, $sql_insert)) {
        echo "Дякуємо за ваше звернення!<br>";
    } else {
        echo "Помилка, спробуйте пізніше." . mysqli_error($conn) . "<br>";
    }
}
?>

<!--
<!DOCTYPE html>
<html>
<head>
    <title>Contact Us Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    <form method="post" action="/database/contact_handler.php">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required><br>

        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required><br>

        <label for="message">Message:</label>
        <textarea name="message" id="message" required></textarea><br>

        <button type="submit">Submit</button>
    </form>
</body>
</html> -->
