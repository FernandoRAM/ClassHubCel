<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$desc = $_GET['desc'];
$id = $_GET['idU'];

$ins = "INSERT INTO reporte (Descripcion, idUsuario) VALUES ('$desc', '$id'); ";

if ($conexion->query($ins) === TRUE) {
    echo "1";
} else {
    echo '0';
}


?>