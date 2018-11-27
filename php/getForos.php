<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");

$select = "SELECT * FROM foro";
$result = $conexion->query($select);

if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()){
		  $response[] = $row;
	}
	print_r($response);

} else {
	return $response = '0';
}

?>