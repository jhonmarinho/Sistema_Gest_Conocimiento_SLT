<?php
//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['id'])){
    
    $search = $_POST['id'];
    $search2 = $_POST['mensaje'];}

    if (!empty($search)){

    $query1 = "UPDATE dbo.reg_llam_conduct SET mensaje='$search2' WHERE novedad_id='$search'";
    
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