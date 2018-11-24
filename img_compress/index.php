<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Resize</title>
</head>

<body>
	<div>
		<form action="" method="post" enctype="multipart/form-data">
			<input type="file" name="upload_image" required><br><br>
			<input type="submit" name="form_submit" value="Submit">
		</form>
	</div>

	<?php

	function resizeImage( $resourceType, $image_width, $image_height ) {
		if ( $image_width > $image_height ) { // Proporción en base al ancho
			if ( $image_width > 1920 ) { // El ancho máximo será de 1920
				$resizeWidth = 1920; // Nuevo valor del ancho
				$p = (( $resizeWidth * 100 / $image_width ) * 0.01); // Porcentaje de reducción
				$resizeHeight = (integer) ($p * $image_height); // Nuevo valor de la altura en base al nuevo ancho
			} else {
				$resizeWidth = $image_width; // La imagen conserva su ancho original
				$resizeHeight = $image_height; // La imagen conserva su altura original
			}
		} else { // Proporción en base a la altura
			if ( $image_height > 1920 ) { // La altura máxima será de 1920
				$resizeHeight = 1920; // Nuevo valor de la altura
				$p = (( $resizeHeight * 100 / $image_height ) * 0.01); // Porcentaje de reducción
				$resizeWidth = (integer) ($p * $image_height); // Nuevo valor de la altura en base a la nueva altura
			} else {
				$resizeWidth = $image_width; // La imagen conserva su ancho original
				$resizeHeight = $image_height; // La imagen conserva su altura original
			}
		}
		echo "<script>alert('X: ' + $resizeWidth + ' Y: ' + $resizeHeight)</script>";
		$imageLayer = imagecreatetruecolor( $resizeWidth, $resizeHeight );
		imagecopyresampled( $imageLayer, $resourceType, 0, 0, 0, 0, $resizeWidth, $resizeHeight, $image_width, $image_height );
		return $imageLayer;
	}

	if ( isset( $_POST[ "form_submit" ] ) ) {
		$imageProcess = 0;
		if ( is_array( $_FILES ) ) {
			$fileName = $_FILES[ 'upload_image' ][ 'tmp_name' ];
			$sourceProperties = getimagesize( $fileName );
			$resizeFileName = time();
			$uploadPath = "./uploads/";
			$fileExt = pathinfo( $_FILES[ 'upload_image' ][ 'name' ], PATHINFO_EXTENSION );
			$sourceImageWidth = $sourceProperties[ 0 ];
			$sourceImageHeight = $sourceProperties[ 1 ];
			$uploadImageType = $sourceProperties[ 2 ];
			switch ( $uploadImageType ) {
				case IMAGETYPE_JPEG:
					$resourceType = imagecreatefromjpeg( $fileName );
					$imageLayer = resizeImage( $resourceType, $sourceImageWidth, $sourceImageHeight );
					imagejpeg( $imageLayer, $uploadPath . "thump_" . $resizeFileName . '.' . $fileExt );
					break;

				case IMAGETYPE_GIF:
					$resourceType = imagecreatefromgif( $fileName );
					$imageLayer = resizeImage( $resourceType, $sourceImageWidth, $sourceImageHeight );
					imagegif( $imageLayer, $uploadPath . "thump_" . $resizeFileName . '.' . $fileExt );
					break;

				case IMAGETYPE_PNG:
					$resourceType = imagecreatefrompng( $fileName );
					$imageLayer = resizeImage( $resourceType, $sourceImageWidth, $sourceImageHeight );
					imagepng( $imageLayer, $uploadPath . "thump_" . $resizeFileName . '.' . $fileExt );
					break;

				default:
					$imageProcess = 0;
					break;
			}
			//move_uploaded_file( $fileName, $uploadPath . $resizeFileName . "." . $fileExt );
			$imageProcess = 1;
		}

		if ( $imageProcess == 1 ) {
			?>
	<b>Comprimida</b>

	<?php
	} else {
		?>
	<b>Error</b>
	<?php
	}
	$imageProcess = 0;
	}
	?>

</body>
</html>