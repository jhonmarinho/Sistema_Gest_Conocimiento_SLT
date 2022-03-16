<?php
header("Content-Type: text/php; charset=utf-8");
if (isset($_POST)) {

    include 'configsac.php'; 

    if (!$conectarSac) {
        echo "No se pudo conectar con el servidor (SAC)";
    }

    $sqlSac = "select ctmovimiento.nroorden,mae_vehiculos.nro_placa,ctempresa.descripcion, mae_transitos.nombre_tto,(case mae_vehiculos.estado 
    when '1' then 'Vinculado' when '2' then 'Desvinculado'end) as estado, 'Ninguna' as nota, sum(decode(saldo,0,saldoap,saldo)) 
    as saldo_favor from ctmovimiento
    inner join mae_vehiculos on ctmovimiento.nroorden=mae_vehiculos.nro_orden 
    inner join mae_transitos on mae_vehiculos.codigo_ttoto=mae_transitos.codigo_tto
    inner join ctempresa on mae_vehiculos.empresa=ctempresa.empresa
    where not nvl(estadoap,'A') = 'C' and dh= 'H' and ca = 'N' and ctempresa.empresa=5
    group by ctmovimiento.nroorden,mae_vehiculos.nro_placa,ctempresa.descripcion,mae_transitos.nombre_tto, mae_vehiculos.estado order by 7 desc";
    
    
    $prepararconexionsac = oci_parse($conectarSac, $sqlSac);
    $ejecutarSac = oci_execute($prepararconexionsac);
       
    $json1=array();

    while ($row1 = oci_fetch_array($prepararconexionsac)) {
        $json1 [] = array(
            
            'NRO_ORDEN' => $row1 ['NROORDEN'],
            'NRO_PLACA' => $row1 ['NRO_PLACA'],
            'EMPRESA' => $row1 ['DESCRIPCION'],
            'TRANSITO' => $row1 ['NOMBRE_TTO'],
            'NOTA' => $row1 ['NOTA'],
            'SALDO_FAVOR' => $row1 ['SALDO_FAVOR']
            
        );
                    
    }

    

}



echo json_encode($json1);
