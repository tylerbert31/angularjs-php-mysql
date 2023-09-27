<?php
require 'db.php';

// Get the data from the AJAX POST request
$data = json_decode(file_get_contents("php://input"));
$prod_name = $data->name;
$quantity = $data->quantity;
$price = $data->price;
$sold = $data->sold;

// Prepare the SQL statement
$sql = "INSERT INTO products (prod_name, quantity, price, sold) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("siii", $prod_name, $quantity, $price, $sold);

// Execute the SQL statement
if ($stmt->execute()) {
    echo "Product added successfully";
    $response = array("status" => "success", "message" => "Product added successfully");

} else {
    echo "Error adding product: " . $conn->error;
    $response = array("status" => "error", "message" => "Error adding product: " . $conn->error);

}

// Close the database connection
$conn->close();
?>