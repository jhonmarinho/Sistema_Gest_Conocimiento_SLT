<?php
header("Content-Type: text/php; charset=utf-8");
if (isset($_POST)) {

    include 'configsac.php'; 

    if (!$conectarSac) {
        echo "No se pudo conectar con el servidor (SAC)";
    }

   $placa= $_POST['search11'];

   
      
    $sqlSac = "SELECT 
    MAE_VEHICULOS.NRO_PLACA
    , (SELECT MAE_TRANSITOS.NOMBRE_TTO 
      FROM MAE_TRANSITOS 
      WHERE MAE_TRANSITOS.CODIGO_TTO = MAE_VEHICULOS.CODIGO_TTOTO) AS ZONAOPERACION
    , MOV_SOLICITUDES.OBSERVACION
    , TO_CHAR(MOV_SOLICITUDES.FECHA,'DD/MM/YYYY') AS FECHA
    FROM MOV_SOLICITUDES 
      LEFT OUTER JOIN MAE_VEHICULOS ON MOV_SOLICITUDES.NRO_ORDEN = MAE_VEHICULOS.NRO_ORDEN 
      LEFT OUTER JOIN MAE_AFILIADOS ON MOV_SOLICITUDES.CODIGO_AFILIADO = MAE_AFILIADOS.CODIGO_AFILIADO 
      LEFT OUTER JOIN MAE_USUARIOS ON MOV_SOLICITUDES.USUARIO = MAE_USUARIOS.USUARIO 
      LEFT OUTER JOIN MAE_SERVICIOS ON MOV_SOLICITUDES.CODIGO_SERVICIO = MAE_SERVICIOS.CODIGO_SERVICIO
    WHERE MAE_VEHICULOS.NRO_PLACA = '$placa' AND MOV_SOLICITUDES.FECHA >= TO_DATE('2006/01/01','YYYY/MM/DD') AND  ( MAE_SERVICIOS.DESCRIPCION = 'VENTA E INSTALACION APP CONDUCTOR' OR MAE_SERVICIOS.DESCRIPCION = 'PROGRAMACION APP CONDUCTOR') ORDER BY FECHA_INICIO ASC";
    
    $prepararconexionsac = oci_parse($conectarSac, $sqlSac);
    $ejecutarSac = oci_execute($prepararconexionsac);
       
    $json1=array();

    while ($row1 = oci_fetch_array($prepararconexionsac)) {
        $json1 [] = array(

            'FECHA' => $row1 ['FECHA'],
                      
        
        );
                    
    }

    

}

echo json_encode($json1);

?>