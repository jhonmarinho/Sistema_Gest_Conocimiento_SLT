<?php
header("Content-Type: text/php; charset=utf-8");
if (isset($_POST)) {

    include 'configsac.php';

    $conectarSac = oci_connect($username, $password, $connection_string);

    if (!$conectarSac) {
        echo "No se pudo conectar con el servidor (SAC)";
    }
    $valorplaca2 = $_POST['search'];
        
    if (empty($valorplaca2)) {
        die('No existe la placa ingresada'.oci_error($conectarSac));
    }

    $sqlSac = "SELECT mae_afiliados.nombres,mae_afiliados.apellidos, mae_vehiculos.nro_orden
    FROM mae_vehiculos INNER JOIN mov_vafiliado ON mae_vehiculos.nro_orden=mov_vafiliado.nro_orden
    INNER JOIN mae_afiliados ON mov_vafiliado.codigo_afiliado = mae_afiliados.codigo_afiliado WHERE mae_vehiculos.nro_placa=UPPER('$valorplaca2') AND mov_vafiliado.estadoa = 1 AND mov_vafiliado.estadov = 1";
    
    $prepararconexionsac = oci_parse($conectarSac, $sqlSac);
    $ejecutarSac = oci_execute($prepararconexionsac);
       
    $json1=array();

    while ($row1 = oci_fetch_array($prepararconexionsac)) {
        $json1 [] = array(

            'NOMBRES' => $row1 ['NOMBRES'],
            'APELLIDOS' => $row1 ['APELLIDOS']
        );
                    
    }
    echo json_encode($json1);
    

}


