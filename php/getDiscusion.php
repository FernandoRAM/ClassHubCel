<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$idF = $_GET['idF'];

$select = "SELECT f.idForo, f.Titulo, f.Descripcion,f.idimagen, im.ruta, im.idImagen  FROM foro f, imagenes im WHERE f.idForo = '$idF' AND im.idImagen = f.idImagen";
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