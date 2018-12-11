<?php
header("Access-Control-Allow-Origin: *");
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$desc = $_GET['desc'];
$id = $_GET['idU'];
$tit = $_GET['tituloR'];
$f = $_GET['fecha'];
$r = $_GET['ruta'];

$ins = "INSERT INTO reporte (Descripcion, idUsuario, Titulo, fecha, ruta) VALUES ('$desc', '$id', '$tit', '$f', '$r'); ";

if ($conexion->query($ins) === TRUE) {
    echo "1";
} else {
    echo '0';
}


?>