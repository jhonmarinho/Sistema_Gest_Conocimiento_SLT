                <html>
                <!-- favicon (icono en la pestaña de la página)-->
                <link rel="shortcut icon" href="https://www.tax-individual.com.co/wp-content/themes/tax-individual/img/logo.png?v=2">

                <body>

                    <?php
                    error_reporting(0);
                    //recuperar las variables
                    
                    $asesorname = $_POST['asesorname'];
                    $placa = $_POST['placa'];
                    $phone = $_POST['phone'];
                    $tipif = $_POST['tipif'];
                    $subtipif = $_POST['subtipif'];
                    $mensaje = $_POST['mensaje'];
                    $correo = $_POST['correo'];
                    $conductorname = $_POST['conductorname'];


                    //conectamos con el servidor
                    include 'configinfo.php';
                    //verificamos la conexión
                    if (!$conectar) {
                        echo "No se pudo conectar con el servidor";
                    }


                    if ($asesorname != NULL) {
                        include 'configinfo.php';
                        //hacemos la sentencia sql
                        $sql = "INSERT INTO dbo.reg_llam_conduct (fecha, asesorname, placa, phone, tipif, subtipif, mensaje, correo, vinculadoname, colorpvo, gestionado) VALUES(getdate(),'$asesorname','$placa','$phone','$tipif','$subtipif','$mensaje','$correo','$conductorname','rgba(0,0,0,0.0)','NO')";

                        //Ejecutar la sentencia de sql
                        $ejecutar = sqlsrv_query($conectar, $sql);
                    }
                    ?>
                    <div style="
                        width:100%;
                        height:100%;
                        background-color:gray;
                        display: flex;
                        align-items: center;
                        background-image: url('imagenes/medellin6231.png');
                        ">
                        <div style="width: 50%;
                        left:100px;
                        text-align: center;
                        border:1px solid darkgray;
                        background: white;
                        box-shadow: 0px 0px 0px darkgray;
                        padding: 15px 20px 15px;
                        border-radius: 15px;
                        color:rgb(53, 51, 51);
                        font-size:15px;
                        font-weight: 550;
                        font-family: Century gothic;
                        align-self:center;
                        box-sizing: border-box;
                        margin-left: auto;
                        margin-right: auto;
                        opacity: 0.75;
                        ">

                            <img style="width: 30%" id="logotax" src="https://www.tax-individual.com.co/wp-content/themes/tax-individual/img/logo.png?v=2" />


                            <?php

                            //Verificamos la ejecución
                            if (!$ejecutar) {
                                echo "<br><br> ¡Ups! Ocurrió un error y no se guardó el registro en la base de datos<br><a href='index.php'><br>Volver</a>";
                            } else {
                                echo "<br><br>¡Se registraron los datos exitosamente! <br><a href='index.php'><br>Volver</a>";
                            }

            
                            ?>

                        </div>
                    </div>
                </body>
                <?php

                ?>

                </html>