<?php
// Include the database connection
require 'db.php';

// Define the SQL query to fetch all data from the "products" table
$query = "SELECT * FROM products";

// Execute the query
$result = mysqli_query($conn, $query);

// Check if the query was successful
if (!$result) {
    $response = array('error' => 'Query failed: ' . mysqli_error($conn));
} else {
    // Fetch all rows from the result set
    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }

    // Close the database connection
    mysqli_close($conn);

    // Create a response array
    $response = array('data' => $rows);
}

// Convert the response to JSON format
$jsonResponse = json_encode($response);

// Set the content type to JSON
header('Content-Type: application/json');

// Output the JSON response
echo $jsonResponse;
?>