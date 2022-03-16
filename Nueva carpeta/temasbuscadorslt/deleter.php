<?php
//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['search5'])){
    
    $search = $_POST['search5'];

    if (!empty($search)){

    $query1 = "DELETE FROM dbo.buscadorslt WHERE id = '$search'; 
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