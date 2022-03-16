<?php
//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['search'])){
    $search = $_POST['search'];

    if (!empty($search)){

    $query1 = "SELECT TOP (1000) [novedad_id]
    ,[fecha]
    ,[asesorname]
    ,[placa]
    ,[vinculadoname]
    ,[phone]
    ,[tipif]
    ,[subtipif]
    ,[mensaje]
    ,[correo]
    ,[colorpvo]
    ,[gestionado]
    ,[liderpvo]
    ,[numeropvo]
    ,[expedida_sac]
    FROM dbo.reg_llam_conduct WHERE gestionado = 'SI' AND (subtipif LIKE '%21%' OR subtipif LIKE '%18%' OR subtipif LIKE '%19%')  ORDER BY novedad_id desc; 
     ";
    $result = sqlsrv_query($conectar, $query1);
    if (!$result) {
        die('Query error'.sqlsrv_errors($conectar));
    }

    $json=array ();
    while ($row = sqlsrv_fetch_array($result)) {
        $json [] = array(

            'novedad_id' => $row ['novedad_id'],
            'fecha' => $row ['fecha'],
            'asesorname' => $row ['asesorname'],
            'placa' => $row ['placa'],
            'vinculadoname' => $row ['vinculadoname'],
            'subtipif' => $row ['subtipif'],
            'mensaje' => $row ['mensaje'],
            'correo' => $row ['correo'],
            'liderpvo' => $row ['liderpvo'],
            'numeropvo' => $row ['numeropvo'],
            'expedida_sac' => $row ['expedida_sac'],

        );
                    
    }
    echo $jsonstring = json_encode($json);
    

    }
    
}



?>