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

    $query1 = "SELECT tema, descripcion FROM dbo.buscadorslt 
    WHERE tema LIKE '%$search%' 
    OR descripcion LIKE '%$search%'
    OR tema LIKE '%$search %' 
    OR descripcion LIKE '%$search %' 
    OR tema LIKE '% $search%' 
    OR descripcion LIKE '% $search%' 
     ";
    $result = sqlsrv_query($conectar, $query1);
    if (!$result) {
        die('Query error'.sqlsrv_errors($conectar));
    }

    $json=array ();
    while ($row = sqlsrv_fetch_array($result)) {
        $json [] = array(

            'tema' => $row ['tema'],
            'descripcion' => $row ['descripcion']

        );
                    
    }
    echo $jsonstring = json_encode($json);
    

    }
    
}



?>