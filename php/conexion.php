<?php 

class Funciones {
	public function conectar() {
		$host = "localhost";
		$user = "root";
		$pass = "";
		$db = "classhub";

		$conexion = new mysqli($host, $user, $pass, $db);



		if ($conexion-> connect_errno > 0) {
			echo "ERROR:".$conexion->error."<br>";
		} else {
			
			return $conexion;
		}
	}

	public function desconectar($conexion){
		mysql_close($conexion);
	}
}

 ?>