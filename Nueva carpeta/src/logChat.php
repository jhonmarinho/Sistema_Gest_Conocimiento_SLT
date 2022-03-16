<?php
//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['search6'])){
    $search = $_POST['search6'];

    $asesorname=$search['asesorname'];
    $msg=$search['msg'];

    if (!empty($search)){

    $query1 = "INSERT INTO log_chat_slt (asesorname, msg, time_stamp) VALUES ('$asesorname','$msg',CURRENT_TIMESTAMP) 
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