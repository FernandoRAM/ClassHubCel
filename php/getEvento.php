<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$id = $_GET['idE'];

$select = "SELECT ev.idEvento, ev.Nombre, ev.Fecha, ev.Hora, ev.Descripcion, ev.idImagen, im.idImagen, im.ruta FROM eventosimportantes ev,imagenes im  WHERE ev.idEvento = '$id' AND ev.idImagen = im.idImagen;";
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