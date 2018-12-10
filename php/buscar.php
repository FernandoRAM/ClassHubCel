<?php
require_once 'conexion.php';
$funciones = new Funciones();
$conexion = $funciones->conectar();
$conexion->set_charset("utf8");


$val = $_GET['valor'];

$select = "SELECT (SELECT CONCAT(s.edificio, s.numero) FROM salones s, clases c, materias m WHERE (c.nombreProfesor LIKE '%$val%' OR m.nombre LIKE '%$val%' LIMIT 1) AND c.idMateria = m.idMateria AND c.idSalon2 = s.idSalon) as salon2, c.idClase, c.idSalon, c.idSalon2, c.idMateria, c.nombreProfesor, c.horaInicio, c.horaFin, c.dias, c.grupo, m.idMateria, m.nombre, m.carrera,
m.bloque, s.edificio, s.numero  FROM materias m, clases c, salones s WHERE (c.nombreProfesor LIKE '%$val%' OR m.nombre LIKE '%$val%') AND c.idMateria = m.idMateria AND c.idSalon = s.idSalon;";
$result = $conexion->query($select);

if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()){
		  $response[] = $row;
	}
	echo json_encode($response);

} else {
	echo json_encode('0');
}

?>