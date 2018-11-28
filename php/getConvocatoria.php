<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$id = $_GET['idCon'];

$select = "SELECT con.idConvocatoria, con.TipoConvocatoria, con.Descripcion, con.idImagen, con.Nombre, con.Status, im.ruta, im.idImagen  FROM convocatoria con, imagenes im WHERE con.idConvocatoria = '$id' AND im.idImagen = con.idImagen";
$result = $conexion->query($select);

if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()){
		  $response[] = $row;
	}
	echo json_encode($response);

} else {
	echo json_encode($select);
}

?>