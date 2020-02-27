<?php
require('functions.php');

set_exception_handler('handleError');
startUp();

require_once('db_connection.php');


if (!empty($_GET['day'] && !empty($_GET['city'])) && !empty($_GET['program'])) {
  $day = mysqli_real_escape_string( $conn,$_GET['day']);
  $city = mysqli_real_escape_string( $conn,$_GET['city']);
  $program = mysqli_real_escape_string( $conn, $_GET['program']);

  if($city !== 'CITY (optional)') {
    $query = "SELECT a.*, (f.program_id is not null) as favorite
              from AA as a
              left join Favorites as f on a.id = f.program_id
              WHERE `day` = '$day' AND `city` = '$city' AND `program` = '$program'";
  } else {
    $query = "SELECT a.*, (f.program_id is not null) as favorite
              from AA as a
              left join Favorites as f on a.id = f.program_id
              WHERE `day` = '$day' AND `program` = '$program'";
  }

}

  $result = mysqli_query($conn, $query);

  if(!$result) {
    throw new Exception('Error: no result returned: ' . mysqli_error($conn));
  }

  $data = [];
  while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }

  print(json_encode($data));



?>