<?php

// First, connect to the database
require_once('./dbconnect.php');

// Create the SQL query to retrieve all events
$query = "SELECT * FROM commodities";

// Execute the query and retrieve the results
$result = $con->query($query);

$data = array();
if ($result!= NULL) {

  while ($row =$result->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
    
  }
}
// Create the output
  echo json_encode($data);
