<?php
    //CREDENCIALES SAC
    $username = ('Taxi');
    $password = ('taxi');
    $connection_string = ('192.168.1.227:1521/sac');
    $conectarSac = oci_connect($username, $password, $connection_string);