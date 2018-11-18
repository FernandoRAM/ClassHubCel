<?php


    //print_r($_FILES);
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['files'])) {
            $errors = [];
            $path = 'uploads/';
            $extensions = ['jpg', 'jpeg', 'png', 'gif'];
    
            $all_files = count($_FILES['files']['tmp_name']);
    
            for ($i = 0; $i < $all_files; $i++) {  
                $file_name = $_FILES['files']['name'][$i];
                $file_tmp = $_FILES['files']['tmp_name'][$i];
                $file_type = $_FILES['files']['type'][$i];
                $file_size = $_FILES['files']['size'][$i];
                $file_ext = strtolower(end(explode('.', $_FILES['files']['name'][$i])));
    
                $file = $path . $file_name;
    
                if (!in_array($file_ext, $extensions)) {
                    $errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
                    echo('extension');
                }
    
                if ($file_size > 2097152) {
                    $errors[] = 'File size exceeds limit: ' . $file_name . ' ' . $file_type;
                    echo('tamaño');
                }
    
                if (empty($errors)) {
                    //move_uploaded_file($file_tmp, $file);
                    $dest = fopen("ftp://epiz_22932719:ellO55QT@ftpupload.net/htdocs/ClassHub/img/" . $file_name, "wb");
                    $src = file_get_contents($file_tmp);
                    fwrite($dest, $src, strlen($src));
                    
                    fclose($dest); 
                    echo("1");
                }
            }
    
            if ($errors) echo($errors);

        }
    }
    // $file =($_POST["fileToUpload"]["name"]);
    // $dest = fopen("ftp://epiz_22932719:ellO55QT@ftpupload.net/htdocs/ClassHub/img/" . $file, "wb");
    // $src = file_get_contents($_FILES["fileToUpload"]["tmp_name"]);
    // fwrite($dest, $src, strlen($src));
    
    // fclose($dest); 
?>