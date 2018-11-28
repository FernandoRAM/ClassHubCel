<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$id = $_GET['idCom'];

$select = "SELECT com.idComentario, com.idForo, com.Comentario, com.idUsuario, u.NomUsuario FROM comentarios com, usuario u WHERE idForo = '$id' and com.idUsuario = u.idUsuario";
$result = $conexion->query($select);

if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()){
		  $response[] = $row;
	}
	echo json_encode($select);

} else {
	echo json_encode('0');
}

?>