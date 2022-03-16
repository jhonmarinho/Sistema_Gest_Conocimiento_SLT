<?php
header("Content-Type: text/php; charset=utf-8");
if (isset($_POST)) {

    include 'configsac.php';

    $conectarSac = oci_connect($username, $password, $connection_string);

    if (!$conectarSac) {
        echo "No se pudo conectar con el servidor (SAC)";
    }
    
    $data= $_POST['search4'];
    $placa=$data['PLACA'];
    $nombre=$data['NOMBRE'];
    
    $divNombre=explode(" ",$nombre);
    $nombreApellidos=$divNombre[0].' '.$divNombre[1];



    $sqlSac = "SELECT mov_tarjetascont.fecha_vto_tc, mae_vehiculos.nro_placa,mae_afiliados.nombres,mae_afiliados.apellidos, mae_vehiculos.nro_orden
    FROM mae_vehiculos INNER JOIN mov_tarjetascont ON mae_vehiculos.nro_orden=mov_tarjetascont.nro_orden
    INNER JOIN mae_afiliados ON mov_tarjetascont.codigo_afiliado = mae_afiliados.codigo_afiliado WHERE 
    mae_vehiculos.nro_placa=UPPER('$placa') AND CONCAT(mae_afiliados.nombres,mae_afiliados.apellidos) LIKE UPPER('$nombreApellidos%') ORDER BY mov_tarjetascont.fecha_vto_tc ASC";
    
    $prepararconexionsac = oci_parse($conectarSac, $sqlSac);
    $ejecutarSac = oci_execute($prepararconexionsac);
       
    $json1=array();

    while ($row1 = oci_fetch_array($prepararconexionsac)) {
        $json1 [] = array(
            
            'FECHA_VTO_TC' => $row1 ['FECHA_VTO_TC']
        
        );
                    
    }

    echo json_encode($json1);
    

}
