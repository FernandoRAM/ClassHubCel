<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$idF = $_GET['idForo'];
$comentario = $_GET['Com'];
$id = $_GET['idU'];

$ins = "INSERT INTO comentarios (idForo, Comentario, idUsuario ) VALUES ('$idF', '$comentario', '$id'); ";

if ($conexion->query($ins) === TRUE) {
    echo "1";
} else {
    echo('0');
}


?>