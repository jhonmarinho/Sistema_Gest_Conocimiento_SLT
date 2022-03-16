<?php
header("Content-Type: text/php; charset=utf-8");
if (isset($_POST)) {

    include 'configsac.php'; 

    if (!$conectarSac) {
        echo "No se pudo conectar con el servidor (SAC)";
    }

   $data1= $_POST['search10'];
   
      
    $sqlSac = "select mv.nro_placa AS PLACA, SADS.NRO_ORDEN AS ORDEN, sads.movil AS MOVIL_SATELITAL, SADS.FECHA_PROGRAMACION AS FECHA, ct.descripcion
    AS EMPRESA from sad_servicio sads, ctempresa ct, mae_vehiculos mv
    where mv.nro_orden=sads.nro_orden
    and mv.empresa=ct.empresa
    and sads.id_proveedor=3
    and sads.estado=1
    GROUP BY ct.descripcion, mv.nro_placa, SADS.NRO_ORDEN, sads.movil, SADS.FECHA_PROGRAMACION
    ORDER BY 1, 2
    ";
    
    $prepararconexionsac = oci_parse($conectarSac, $sqlSac);
    $ejecutarSac = oci_execute($prepararconexionsac);
       
    $json1=array();

    while ($row1 = oci_fetch_array($prepararconexionsac)) {
        $json1 [] = array(

            'PLACA' => $row1 ['PLACA'],
            'ORDEN' => $row1 ['ORDEN'],
            'MOVIL_SATELITAL' => $row1 ['MOVIL_SATELITAL'],
            'FECHA' => $row1 ['FECHA'],
            'EMPRESA' => $row1 ['EMPRESA']
           
        
        );
                    
    }

    

}

echo json_encode($json1);

?>