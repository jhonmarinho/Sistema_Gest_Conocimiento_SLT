<?php
header("Content-Type: text/php; charset=utf-8");


    include 'configinfo.php';

    if (isset($_POST['search5'])) {

        $data= $_POST['search5'];
        $tema=$data['tema'];
        $descripcion=$data['descripcion'];

        if ($tema !== '' && $descripcion !== ''){

        $query1 = "INSERT INTO dbo.buscadorslt (tema,descripcion) VALUES ('$tema', '$descripcion')";
    
        $result = sqlsrv_query($conectar, $query1);
        
        if (!$result) {
            echo "error aqui";
            //die('Query error'.sqlsrv_errors($conectar));
        }
    
        else{
            echo "exitoso";
        }

        }

    
    }


