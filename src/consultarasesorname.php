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

    $query1 = "SELECT id, asesorname, activo FROM dbo.asesornames WHERE activo = '$search' ORDER BY asesorname; 
     ";
    $result = sqlsrv_query($conectar, $query1);
    if (!$result) {
        die('Query error'.sqlsrv_errors($conectar));
    }

    $json=array ();
    while ($row = sqlsrv_fetch_array($result)) {
        $json [] = array(

            
            'asesorname' => $row ['asesorname'],
            'id' => $row ['id'],
            'activo' => $row ['activo'],

        );
                    
    }
    echo $jsonstring = json_encode($json);
    

    }
    
}



?>