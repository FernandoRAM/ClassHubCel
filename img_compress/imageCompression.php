<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Compresión</title>
</head>

<body>
	<form action="" method="post" enctype="multipart/form-data">
		<input type="file" name="upload_image" required><br><br>
		<input type="submit" name="form_submit" value="Submit">
	</form>

	<?php

	function resizeImage( $resourceType, $image_width, $image_height ) {
		$resizeWidth = 100;
		$resizeHeight = 100;
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
			$uploadImageType = $sourceProperties[ 2 ];
			$sourceImageWidth = $sourceProperties[ 0 ];
			$sourceImageHeight = $sourceProperties[ 1 ];
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
			move_uploaded_file( "e", $uploadPath . $resizeFileName . "." . $fileExt );
			$imageProcess = 1;
		}

		if ( $imageProcess == 1 ) {
			echo( "<br><b>Comprimida</b>" );
		} else {
			echo( "<br><b>No comprimida</b>" );
		}
		$imageProcess = 0;
	}
	?>

</body>
</html>