<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$titulo = $_GET['titulo'];
$desc = $_GET['desc'];
$id = $_GET['idU'];

$select = "SELECT * FROM eventosimportantes ORDER BY Fecha";
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