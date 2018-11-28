<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$id = $_GET['idT'];

$select = "SELECT t.nombre, t.correo, t.cubiculo, t.idImagen, t.horarios, im.ruta, im.idImagen  FROM tutores t, imagenes im WHERE idTutor = '$id' AND im.idImagen = t.idImagen";
$result = $conexion->query($select);

if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()){
		  $response[] = $row;
	}
	echo json_encode($response);

} else {
	echo json_encode('0');
}

?>