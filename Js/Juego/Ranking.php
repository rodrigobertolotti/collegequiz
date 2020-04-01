<?php
//$connect= mysqli_connect("localhost", "rbertolotti", "iemanja995", "infoCollege");
$connect= mysqli_connect("localhost", "root", "", "college");
$query = "SELECT * FROM `ranking` ORDER BY puntaje DESC";
$resultado= mysqli_query($connect, $query);


while($row= mysqli_fetch_array($resultado)){
    $nombre= $row[1];
    $puntaje= $row[2];
    $liceo= $row[4];
    
    $return_arr[]= array(
    "nombre"=>$nombre,
    "puntaje"=>$puntaje,
    "liceo"=>$liceo,
);
}

echo json_encode($return_arr);
?>