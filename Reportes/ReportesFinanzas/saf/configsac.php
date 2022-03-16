    <?php
    //CREDENCIALES SAC
    $username = ('taxi');
    $password = ('taxi');
    $connection_string = ('192.168.1.8:1521/sac');
    $conectarSac = oci_connect($username, $password, $connection_string);