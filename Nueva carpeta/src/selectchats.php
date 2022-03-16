<?php
//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['search7'])){
    $search = $_POST['search7'];

    if (!empty($search)){

    $query1 = "SELECT TOP 30 dt.asesorname,dt.msg,dt.time_stamp FROM (SELECT TOP 30 id, asesorname,msg,time_stamp FROM dbo.log_chat_slt ORDER BY id DESC) dt ORDER BY id ASC
    
     ";
    $result = sqlsrv_query($conectar, $query1);
    if (!$result) {
        die('Query error'.sqlsrv_errors($conectar));
    }

    $json=array ();
    while ($row = sqlsrv_fetch_array($result)) {
        $json [] = array(

            'asesorname' => $row ['asesorname'],
            'msg' => $row ['msg'],
            'time_stamp' => $row ['time_stamp']


        );
                    
    }
    echo $jsonstring = json_encode($json);
    

    }
    
}



?>