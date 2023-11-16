<?php

// First, connect to the database
require_once('./dbconnect.php');

$id=$_POST['id'];
//$name=$_POST['name'];
// Create the SQL query to retrieve all events
$query = "SELECT * FROM commodities where id=$id";

// Execute the query and retrieve the results
$result = $con->query($query);

$data = array();
if ($result!= NULL) {

  while ($row =$result->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
    //echo  "name= ".$row['name']  . ", " ;
    //echo "information= ".$row['information'] . " " ;
  }
}
// Create the output
echo json_encode($data);