<?php
//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['search1'])){
    $search = $_POST['search1'];

    if (!empty($search)){

    $query1 = "INSERT INTO [Sist_Atenc_Gest_SLT].[dbo].[asesornames] VALUES ('$search', 'SI');
     ";
    $result = sqlsrv_query($conectar, $query1);
    if (!$result) {
        die('Query error'.sqlsrv_errors($conectar));
    }

    else{
        echo "exitoso";
    }

                       
    }
    
    

    }
    




?>