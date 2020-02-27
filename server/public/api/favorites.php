<?php
require_once('db_connection.php');

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');
if ($method == 'POST') {
  http_response_code(201);
  $itemConverted = json_decode($item);

  
  $sql =  "INSERT INTO `Favorites` (program_id)
            VALUES ($itemConverted->id)";
  $return_value = mysqli_query($conn, $sql);
  print(json_encode([
      'success' => $return_value
  ]));
} else if ($method == 'GET') {
    http_response_code(201);
    $query = "SELECT a.*, (f.program_id is not null) as favorite
              from AA as a
              right join Favorites as f on a.id = f.program_id";

    $result = mysqli_query($conn, $query);

    if(!$result) {
        throw new Exception('Error: no result returned: ' . mysqli_error($conn));
    }

    $data = [];
    while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
    }

    print(json_encode($data));
} else if ($method == 'DELETE'){
  http_response_code(204);
  $itemConverted = json_decode($item);
  $query = "DELETE FROM `Favorites` WHERE `program_id` = '$itemConverted->id'";
  

  $return_value = mysqli_query($conn, $query);

  if(!$return_value) {
    throw new Exception('Error: no deletion occured: '. mysqli_error($conn));
}

  print(json_encode([
      'success' => $return_value
  ]));



} else {
  http_response_code(404);
  print(json_encode([
    'error' => 'Not Found',
    'message' => "Cannot $method /api/favorites.php"
  ]));
}

?>