<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Compresión</title>
</head>

<body>
	<form action="" method="post" enctype="multipart/form-data">
		<input type="file" name="upload_image"><br><br>
		<input type="submit" name="form_submit" value="Submit">
	</form>

	<?php

	function resizeImage( $resourceType, $imageWidth, $imageHeight ) {
		$resizeWidth = 250;
		$resizeHeight = 250;
		$imageLayer = imagecreatetruecolor( $resizeWidth, $resizeHeight );
		imagecopyresampled( $imageLayer, $resourceType, 0, 0, 0, 0, $resizeWidth, $resizeHeight, $imageWidth, $imageHeight );
		return $imageLayer;
	}

	if ( isset( $_POST[ 'form_submit' ] ) ) {
		$imageProcess = 0;
		if ( is_array( $_FILES ) ) {
			$fileName = $_FILES[ 'upload_image' ][ 'tmp_name' ];
			$sourceProperties = getimagesize( $fileName );
			$resizeFileName = time();
			$uploadPath = './uploads/';
			$fileExt = pathinfo( $_FILES[ 'upload_image' ][ 'name' ], PATHINFO_EXTENSION );
			$sourceImageWidth = $sourceProperties[ 0 ];
			$sourceImageHeight = $sourceProperties[ 1 ];
			$uploadImageType = $sourceProperties[ 2 ];

			switch ( $uploadImageType ) {
				case IMAGETYPE_JPEG:
					$resourceType = imagecreatefromjpeg( $fileName );
					$imageLayer = resizeImage( $resourceType, $resourceImageWidth, $resourceImageHeight );
					imagejpeg( $imageLayer, $uploadPath . "thump_" . $resizeFileName . "." . $fileExt );
					break;

				case IMAGETYPE_GIF:
					$resourceType = imagecreatefromgif( $fileName );
					$imageLayer = resizeImage( $resourceType, $resourceImageWidth, $resourceImageHeight );
					imagegif( $imageLayer, $uploadPath . "thump_" . $resizeFileName . "." . $fileExt );
					break;

				case IMAGETYPE_PNG:
					$resourceType = imagecreatefrompng( $fileName );
					$imageLayer = resizeImage( $resourceType, $resourceImageWidth, $resourceImageHeight );
					imagepng( $imageLayer, $uploadPath . "thump_" . $resizeFileName . "." . $fileExt );
					break;
					
				default:
					$imageProcess = 0;
					break;
			}
			
			move_uploaded_file($file, $uploadPath . $resizeFileName . "." . $fileExt);
			$imageProcess = 1;
		
		}
		
		if($imageProcess == 1) {
		?>
	
		<br><br>
		<b>Imagen comprimida con éxito</b>
		}
		
	}
	
</body>
</html>