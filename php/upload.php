<?php
    $file =($_FILES["fileToUpload"]["name"]);
    $dest = fopen("ftp://epiz_22932719:ellO55QT@ftpupload.net/htdocs/ClassHub/img/" . $file, "wb");
    $src = file_get_contents($_FILES["fileToUpload"]["tmp_name"]);
    fwrite($dest, $src, strlen($src));
    
    fclose($dest); 
?>