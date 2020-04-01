<?php
header('Content-Type: application/json');
//$connect= mysqli_connect("localhost", "rbertolotti", "iemanja995", "infoCollege");
$connect= mysqli_connect("localhost", "root", "", "college");
$query = "SELECT * FROM `preguntas` ORDER BY RAND() LIMIT 1";
$resultado= mysqli_query($connect, $query);


while($row= mysqli_fetch_array($resultado)){
    $pregunta= $row["pregunta"];
    $opcion1= $row["opcion1"];
    $opcion2= $row["opcion2"];
    $opcion3= $row["opcion3"];
    $correcta=$row["correcta"];
    $imagen=$row["imagen"];
    $dificultad=$row["dificultad"];
    
    $return_arr[]= array(
    "pregunta"=>$pregunta,
    "opcion1"=>$opcion1,
    "opcion2"=>$opcion2,
    "opcion3"=>$opcion3,
    "correcta"=>$correcta,
    "imagen"=>$imagen,
    "dificultad"=>$dificultad,
);
}

echo json_encode($return_arr);
?>