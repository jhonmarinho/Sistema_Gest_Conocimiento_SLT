<?php
//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['id'])){
    
    $search = $_POST['id'];
    $search2 = $_POST['actualizadoname'];
    $search3 = $_POST['numeropvo'];
    $search4 = $_POST['expedida_sac'];
}

    if (!empty($search) && !empty($search2) && !empty($search2)){

    $query1 = "UPDATE reg_llam_conduct SET gestionado='SI', liderpvo = '$search2', numeropvo = '$search3', expedida_sac = '$search4'  WHERE novedad_id='$search'";
    
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