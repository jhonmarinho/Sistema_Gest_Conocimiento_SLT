<?php
//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['search2'])){
    $search = $_POST['search2'];

    if (!empty($search)){

    $query1 = "DELETE FROM [Sist_Atenc_Gest_SLT].[dbo].[asesornames] WHERE id ='$search'";
     
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