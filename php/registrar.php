<?php 
	require_once 'conexion.php';
	$funciones = new Funciones();
	$conexion = $funciones->conectar();
	$conexion->set_charset("utf8");

	$exp = $_GET['expediente'];
    $pass = $_GET['pass'];
    $nom = $_GET['nombre'];

	$ins = "INSERT INTO usuario (idRol, Contrasena, NomUsuario, expediente) VALUES (2, '$pass', '$nom', '$exp');";
	
	if ($conexion->query($ins) === TRUE) {
        echo "1";
    } else {
        echo($ins);
    }
	
 ?>