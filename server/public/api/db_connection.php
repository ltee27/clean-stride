<?php

$conn = mysqli_connect('localhost', 'root', 'root', 'c519cleanstride', 3306);

if(!$conn) {
    print("error: ".mysqli_connect_error());
}

?>
