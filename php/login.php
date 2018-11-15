<?php 
	require_once 'conexion.php';
	$funciones = new Funciones();
	$conexion = $funciones->conectar();
	$conexion->set_charset("utf8");


	$exp = $_GET['expediente'];
	$pass = $_GET['pass'];

	$select = "SELECT NomUsuario FROM usuario WHERE expediente = '$exp' AND Contrasena = '$pass'";
	$res = $conexion->query($select);
	
	
	if(mysqli_num_rows($res)>0){
		session_start();
		$resultado = $res->fetch_object();
		$_SESSION["usuario"] = $resultado->NomUsuario ;
		echo ($resultado->NomUsuario);

	}else{
		echo("0");
	}
	

 ?>