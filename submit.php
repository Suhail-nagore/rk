<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

try {
    // Create connection
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO enquiry (fullname, email, phone, city, no_of_guests, event_type, date_of_event) 
                            VALUES (:fullname, :email, :phone, :city, :no_of_guests, :event_type, :date_of_event)");

    // Bind the parameters
    $stmt->bindParam(':fullname', $_POST['fullname']);
    $stmt->bindParam(':email', $_POST['email']);
    $stmt->bindParam(':phone', $_POST['phone']);
    $stmt->bindParam(':city', $_POST['city']);
    $stmt->bindParam(':no_of_guests', $_POST['no-of-guests']);
    $stmt->bindParam(':event_type', $_POST['event-type']);
    $stmt->bindParam(':date_of_event', $_POST['date-of-event']);

    // Execute the statement
    $stmt->execute();

    // Redirect to a thank you page or display a success message
    header("Location: success.html");
    exit();
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the connection
$conn = null;
?>
