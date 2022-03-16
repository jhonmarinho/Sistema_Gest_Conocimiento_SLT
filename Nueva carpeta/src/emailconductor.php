<?php
header("Content-Type: text/php; charset=utf-8");
if (isset($_POST)) {

    include 'configsac.php'; 

    if (!$conectarSac) {
        echo "No se pudo conectar con el servidor (SAC)";
    }

    $data= $_POST['search3'];
    $nombre=$data['NOMBRE'];
    $placa=$data['PLACA'];
    $divNombre=explode(" ",$nombre);
    $nombreApellidos=$divNombre[0].' '.$divNombre[1];


    if (empty($nombre)) {
        die('No existe correo para el nombre ingresado');
    }
    if (empty($placa)) {
        die('No existe correo para la placa ingresada');
    }

    $sqlSac = "SELECT mae_afiliados.nombres,mae_afiliados.apellidos,mae_afiliados.email,mae_vehiculos.nro_placa FROM mae_vehiculos 
    INNER JOIN mov_vafiliado ON mae_vehiculos.nro_orden=mov_vafiliado.nro_orden
    INNER JOIN mae_afiliados ON mov_vafiliado.codigo_afiliado = mae_afiliados.codigo_afiliado
    WHERE mae_vehiculos.nro_placa=UPPER('$placa') AND mov_vafiliado.estadoa = 1 AND
     mov_vafiliado.estadov = 1 AND CONCAT(mae_afiliados.nombres,mae_afiliados.apellidos) LIKE'$nombreApellidos%'";
    
    
    $prepararconexionsac = oci_parse($conectarSac, $sqlSac);
    $ejecutarSac = oci_execute($prepararconexionsac);
       
    $json1=array();

    while ($row1 = oci_fetch_array($prepararconexionsac)) {
        $json1 [] = array(
            
            'EMAIL' => $row1 ['EMAIL']
        
        );
                    
    }

    

}



echo json_encode($json1);
