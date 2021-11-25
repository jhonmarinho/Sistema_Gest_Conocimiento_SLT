<?php
header("Content-Type: text/php; charset=utf-8");
if (isset($_POST)) {

    include 'configsac.php';

    $conectarSac = oci_connect($username, $password, $connection_string);

    if (!$conectarSac) {
        echo "No se pudo conectar con el servidor (SAC)";
    }
    
    $data= $_POST['search5'];
    $placa=$data['PLACA'];
    $nombre=$data['NOMBRE'];
    
    $divNombre=explode(" ",$nombre);
    $nombreApellidos=$divNombre[0].' '.$divNombre[1];



    $sqlSac = "SELECT mae_vehiculos.nro_placa,mae_afiliados.nombres,mae_afiliados.apellidos, mae_vehiculos.nro_orden, mov_vafiliado.autorizadop
    FROM mae_vehiculos INNER JOIN mov_vafiliado ON mae_vehiculos.nro_orden=mov_vafiliado.nro_orden
    INNER JOIN mae_afiliados ON mov_vafiliado.codigo_afiliado = mae_afiliados.codigo_afiliado WHERE mae_vehiculos.nro_placa=UPPER('$placa') AND CONCAT(mae_afiliados.nombres,mae_afiliados.apellidos) LIKE'$nombreApellidos%'";
    
    $prepararconexionsac = oci_parse($conectarSac, $sqlSac);
    $ejecutarSac = oci_execute($prepararconexionsac);
       
    $json1=array();

    while ($row1 = oci_fetch_array($prepararconexionsac)) {
        $json1 [] = array(
            
            'AUTORIZADOP' => $row1 ['AUTORIZADOP']
        
        );
                    
    }

    echo json_encode($json1);
    

}
