<?php
//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['search4'])){
    $search = $_POST['search4'];

    if (!empty($search)){

    $query1 = "SELECT colorpvo FROM dbo.reg_llam_conduct WHERE novedad_id = '$search'; 
     ";
    $result = sqlsrv_query($conectar, $query1);
    if (!$result) {
        die('Query error'.sqlsrv_errors($conectar));
    }

    
    echo $result;
    

    }
    
}



?>