<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$titulo = $_GET['titulo'];
$desc = $_GET['desc'];
$id = $_GET['idU'];

$ins = "INSERT INTO foro (Titulo, Descripcion, idUsuario) VALUES ('$titulo', '$desc', '$id'); ";

if ($conexion->query($ins) === TRUE) {
    echo "1";
} else {
    echo($ins);
}


?>