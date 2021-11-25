<?php

//conectamos con el servidor
include 'configinfo.php';
//verificamos la conexión
if (!$conectar) {
    echo "No se pudo conectar con el servidor";
}

if(isset($_POST['username'])){

    $search1 = $_POST['username'];
    $search2 = $_POST['password_user'];

    if (!empty($search1)){

    $query1 = "SELECT id, usuario, password_user, nombre, apellidos FROM dbo.adm_users WHERE usuario = '$search1' AND password_user = '$search2' ";
    $result = sqlsrv_query($conectar, $query1);

    if (!$result) {
        die('Query error'.sqlsrv_errors($conectar));
    }

    $json=array ();
    while ($row = sqlsrv_fetch_array($result)) {
        $json [] = array(

            'id' => $row ['id'],
            'usuario' => $row ['usuario'],
            'password' => $row ['password_user'],
            'nombre' => $row ['nombre'],
            'apellidos' => $row ['apellidos'],

        );
                    
    }
   
echo $jsonstring = json_encode($json);;
    

    }
    
}



?>
