<?php
header("Content-Type: text/php; charset=utf-8");
if (isset($_POST)) {

    include 'configsac.php'; 

    if (!$conectarSac) {
        echo "No se pudo conectar con el servidor (SAC)";
    }

   $data1= $_POST['search10'];
   $mes_N= $data1['MES_N'];
   $anio_N= $data1['ANIO'];
   
      
    $sqlSac = "select mv.nro_placa AS PLACA, SADS.NRO_ORDEN AS ORDEN, 
    sads.movil AS MOVIL_SATELITAL, TO_CHAR(SADS.FECHA_PROGRAMACION,'DD/MM/YYYY') AS FECHA, ct.descripcion AS EMPRESA
    from sad_servicio sads, ctempresa ct, mae_vehiculos mv
    where extract(YEAR from SADS.FECHA_PROGRAMACION)  = '$anio_N' AND  extract(month from SADS.FECHA_PROGRAMACION)  = '$mes_N' AND
    mv.nro_orden=sads.nro_orden 
    and mv.empresa=ct.empresa
    and sads.id_proveedor=3
    and sads.estado=1
    
    GROUP BY ct.descripcion, mv.nro_placa, SADS.NRO_ORDEN, sads.movil, SADS.FECHA_PROGRAMACION
     ORDER BY FECHA DESC";
    
    $prepararconexionsac = oci_parse($conectarSac, $sqlSac);
    $ejecutarSac = oci_execute($prepararconexionsac);
       
    $json1=array();

    while ($row1 = oci_fetch_array($prepararconexionsac)) {
        $json1 [] = array(

            'FECHA' => $row1 ['FECHA'],
            'NRO_MOVIL' => $row1 ['MOVIL_SATELITAL'],
            'NRO_ORDEN' => $row1 ['ORDEN'],
            'NRO_PLACA' => $row1 ['PLACA'],
            'EMPRESA' => $row1 ['EMPRESA'],
            'SERVICIO' => $row1 ['ct.descripcion']
           
        
        );
                    
    }

    

}

echo json_encode($json1);

?>