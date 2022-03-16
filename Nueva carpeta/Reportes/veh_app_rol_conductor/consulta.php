<?php
header("Content-Type: text/php; charset=utf-8");
if (isset($_POST)) {

    include 'configsac.php'; 

    if (!$conectarSac) {
        echo "No se pudo conectar con el servidor (SAC)";
    }

   $data1= $_POST['search10'];
         
    $sqlSac = "select ma.nro_placa AS PLACA,
    mva.NRO_ORDEN AS ORDEN,
    ma.empresa AS EMPRESA,
    ct.descripcion AS DESCRIPCION,
    maf.nro_documento AS NRO_DOCUMENTO,
    maf.nombres AS NOMBRES,
    maf.apellidos AS APELLIDOS,
    mva.identificador AS IDENTIFICADOR,
    mr.rol AS ROL,
    mr.conduce AS CONDUCE,
    maf.telefono AS TELEFONO,
    maf.celular AS CELULAR
    from mov_vafiliado mva, MAE_VEHICULOS ma, mae_afiliados maf, mae_roles mr, ctempresa ct, sad_servicio sads
    where
    sads.nro_orden=mva.nro_orden
    and mva.NRO_ORDEN=ma.NRO_ORDEN
    and mva.codigo_afiliado=maf.codigo_afiliado
    and ma.empresa=ct.empresa
    and sads.id_proveedor=3
    and sads.estado=1
    and mva.estadov=1
    and mva.estadoa=1
    and ma.estado=1
    --and ma.empresa=5
    AND mva.IDENTIFICADOR in ('D', 'F', 'E', 'U', 'H', 'A', 'P', 'C')
    and mr.conduce in ('S')
    and mva.identificador=mr.identificador
    GROUP BY ma.nro_placa, mva.NRO_ORDEN, ma.empresa, ct.descripcion, maf.nro_documento,  maf.nombres, maf.apellidos, mva.identificador, mr.rol, mr.conduce, maf.telefono, maf.celular
    order by 2, 6 asc";
    
    $prepararconexionsac = oci_parse($conectarSac, $sqlSac);
    $ejecutarSac = oci_execute($prepararconexionsac);
       
    $json1=array();

    while ($row1 = oci_fetch_array($prepararconexionsac)) {
        
        $json1 [] = array(

            'PLACA' => $row1 ['PLACA'],
            'ORDEN' => $row1 ['ORDEN'],
            'EMPRESA' => $row1 ['EMPRESA'],
            'DESCRIPCION' => $row1 ['DESCRIPCION'],
            'NRO_DOCUMENTO' => $row1 ['NRO_DOCUMENTO'],
            'NOMBRES' => $row1 ['NOMBRES'],
            'APELLIDOS' => $row1 ['APELLIDOS'],
            'IDENTIFICADOR' => $row1 ['IDENTIFICADOR'],
            'ROL' => $row1 ['ROL'],
            'CONDUCE' => $row1 ['CONDUCE'],
            'TELEFONO' => $row1 ['TELEFONO'],
            'CELULAR' => $row1 ['CELULAR']


                    
        );
                    
    }

    

}

echo json_encode($json1);

?>