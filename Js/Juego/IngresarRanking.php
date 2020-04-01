<?php
//header('Content-Type: application/json');
//$connect= mysqli_connect("localhost", "rbertolotti", "iemanja995", "infoCollege");
$connect= mysqli_connect("localhost", "root", "", "college");

$nombre = (string) $_POST['nombre'];
$puntajeNuevo = (int) $_POST['puntaje'];
$celular= (string) $_POST['celular'];
$liceo= (string) $_POST['liceo'];

$queryRes="SELECT * FROM `ranking` WHERE nombre='$nombre'";
$resultadoCant = mysqli_query($connect, $queryRes);
$row_cnt = mysqli_num_rows($resultadoCant);

if ($row_cnt<1){
$sqlAgregarPuntaje = "INSERT INTO `ranking` (`nombre`, `puntaje`, `celular`, `liceo`) VALUES ('$nombre',$puntajeNuevo,'$celular','$liceo')";
$result = mysqli_query($connect, $sqlAgregarPuntaje);
echo  "Agregue";
}else{
    $puntajeMaximo="SELECT * FROM `ranking` WHERE nombre='$nombre'";
    $resultadoMax = mysqli_query($connect, $puntajeMaximo);
    $row = $resultadoMax->fetch_array();
    $id= $row[0];
    $puntajeMaximoJugador= $row[2];
    if ($puntajeNuevo>$puntajeMaximoJugador){
        $resultUpdate = mysqli_query($connect, "UPDATE `ranking` SET puntaje=$puntajeNuevo WHERE id=$id");
        echo "Superaste tu puntaje maximo";
    }else{
        echo "No supero su puntaje maximo";
    }
}

?>
