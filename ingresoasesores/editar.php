<?php
//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['id'])){
    
    $search = $_POST['id'];
    $search2 = $_POST['actualizadoname'];}

    if (!empty($search) && !empty($search2)){

    $query1 = "UPDATE dbo.asesornames SET asesorname='$search2',activo='SI' WHERE id='$search'";
    
    $result = sqlsrv_query($conectar, $query1);
    if (!$result) {
        die('Query error'.sqlsrv_errors($conectar));
   }

    else{
        echo "exitoso";
    }

                       
  //  }
    
    

    }
    




?>