<!DOCTYPE html>
<html lang="es">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>

  <!-- favicon (icono en la pestaña de la página)-->
  <link rel="shortcut icon" href="https://www.tax-individual.com.co/wp-content/themes/tax-individual/img/logo.png?v=2">



  <!--Eliminar los subrayados de los vínculos-->
  <style type="text/css">
    a:link,
    a:visited,
    a:active {
      text-decoration: none;
    }
  </style>
  <meta charset="utf-8" />
  <title>Módulo de gestión del conocimiento SLT</title>
  <link rel=" stylesheet" href="estilos.css" />
  <script src="jquery-3.6.0.js"></script>


  <script defer src="https://use.fontawesome.com/releases/v5.0.4/js/all.js"></script>
  <script defer src="https://use.fontawesome.com/releases/v5.0.4/js/v4-shims.js"></script>
  <script defer src="https://use.fontawesome.com/releases/v5.0.4/js/fontawesome.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
</head>
<script>
  //  <!--campo phone Solo acepta números (código ASCII)-->

  function solonumeros(evt) {
    if (window.event) {
      keynum = evt.keyCode;
    } else {
      keynum = evt.which;
    }

    if ((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13) {
      return true;
    } else {
      alert("Ingresar solo números en el campo teléfono");
      return false;
    }
  }
</script>

<body>

<!--Ventana de ingreso de datos de expedición PVO:-->

<div id= "modal_pvo" class="modal_wrap">

  <div id="form_pvo" class="mensaje_modal">
 
  <div id="botones">
    
    <button onclick="guardardatosPVO()" id="btnSavePvo"><span id="spansave" class="fa fa-save"></span></button>
    <button onclick="ocultardatosPVO()" id="btnClosePvo"><span id="spancerrar" class="fa fa-close"></span></button>
</div>
  
    <h2 style="margin: 0px;text-align:left;padding-left:2%;"> Datos de Expedición P.V.O <span id="validarplanilla" class="fa fa-file-text-o"></span></h2>
    <p style="font-size: 1em;text-align:left;padding-left:2%;">Diligencie correctamente a continuación, los datos de la PVO a expedir.</p>
    

    <div class="row_data" id="contenedor_datos">

    <div class="column_data" id="datos_conductor">

      <h4 style="margin-top:1px;color:#ad7c00;">Datos del conductor</h4>

      <label id=lbl_tlf_conduc for="tlf_conduc">Teléfono conductor:</label>
      <input maxlength="10" pattern="[0-9]{7}|[0-9]{10}" id="tlf_conduc" autocomplete="off" maxlength="10" required  oninvalid=null autocomplete="off" pattern=""  ></input>

      <label id="lbl_placa_conduc"for="placa_conduc">Placa:</label>
      <input id="placa_conduc"></input>

      <label id="lbl_name_conduc"for="name_conduc">Nombre del conductor:</label>
      <input style="font-size:14px" id="name_conduc"></input>

      <label id="lbl_email_conduc"for="email_conduc">Correo electrónico:</label>
      <input style="font-size:14px" id="email_conduc"></input>
      </div>
  <div class="column_data" id="datos_viaje">

     <h4 style="margin-top:1px;color:#ad7c00;">Datos del viaje</h4>

     <label id="lbl_number"for="number_passenger">Número de pasajeros:</label>
    <input style="font-size:14px" id="number_passenger"></input>

    <label id="lbl_origin_conduc"for="origin_conduc">Origen:</label>
    <input style="font-size:14px" id="origin_conduc"></input>

    <label id="lbl_destination_conduc"for="destination_conduc">Destino:</label>
    <input style="font-size:14px" id="destination_conduc"></input>

    <label id="lbl_date2_conduc"for="date2_conduc">Viaje de ida y regreso:</label>
    <select  style="width:95%;text-align: center;font-size:15px;font-weight:600;" class="custom-select" id="selectdate2">

      <option class="selectdate2"  value="" disabled selected>Seleccione</option>
      <option class="selectdate2" value="SOLO IDA">SOLO IDA</option>
      <option class="selectdate2" value="IDA Y REGRESO">IDA Y REGRESO</option>

    </select>

    <label id="lbl_date1_conduc"for="date1_conduc">Fecha de Salida:</label>
    <input type="date" id="date1_conduc"></input>

    <label id="lbl_departure_conduc"for="departure_conduc">Hora del viaje:</label>
    <input  value="00:00" type="time" id="departure_conduc"></input>

    <label id="lbl_date2_conduc"for="date2_conduc">Fecha de regreso:</label>
    <input type="date" id="date2_conduc"></input>

    

</div>


    <div class="column_data" id="datos_contratante">

    <h4 style="margin-top:1px;color:#ad7c00;">Datos del contratante:</h4>

    <label id="lbl_idcard_cont"for="idcard_cont">Cédula del contratante:</label>
    <input id="idcard_cont"></input>

    <label id="lbl_name_cont"for="name_cont">Nombre del contratante:</label>
    <input style="font-size:14px" id="name_cont"></input>

    <label id="lbl_phone_cont"for="phone_cont">Teléfono del contratante:</label>
    <input id="phone_cont"></input>

    <label id="lbl_adress_cont"for="adress_cont">Dirección:</label>
    <input style="font-size:14px" id="adress_cont"></input>

    <label id="lbl_city_cont"for="city_cont">Municipio:</label>
    <input id="city_cont"></input>

    <label for="note">Observaciones:</label>
    <textarea margin="0 px" rows="5" spellcheck="false"  id="note"></textarea>

    </div>
 


    
</div>

  

    

  </div>
  
</div>



<!--Mensaje modal: Para modulo de consulta expedición PVO-->

<div id= "modal_wrap" class="modal_wrap">

  <div class="mensaje_modal">


    <h2> Requisitos Expedición P.V.O</h2>
    <label id=lbl_placa for="placa_modal">Placa</label>
    <input value="" id="placa_modal" autocomplete="off" maxlength="6" required name="placa" oninvalid=null autocomplete="off" pattern="[A-Z]{3}[0-9]{3}|[a-zA-Z]{3}[0-9]{3}" onkeydown="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()" ></input>

    <label for="conductorname">👥 Nombre del vinculado*</label>

    <select id="conductornames" class="custom-select" name="conductornames">
      <option selected>--Introduzca placa del vehículo--</option>
    </select>

    <label id="fecha_mdal"for="fecha_modal">Fecha vigencia T.C</label>
    <input val="" id="fecha_modal" readonly></input>

    <label id="autoriz_mdal"for="autoriz_modal">Conductor Autorizado</label>
    <input id="autoriz_modal" readonly></input>

    <label id="saldo_mdal"for="saldosiesa_modal" >Saldo disponible</label>
    <input id="saldosiesa_modal" readonly></input>

    <p></p>

    <button onclick="ocultarPVO()" id="btnClose">Cerrar</button>

  </div>
  
</div>

  <!--BUSCADOR WEB-->
  <div class="contenedor">
    
    <div id="buscadorweb" class="">
    
    <div id="iconolupa" <span id="spanlupa" class="fa fa-search"></span>
            </div>
          
          
      
      
      <FORM  method=GET action="https://www.google.com/search" target="_blank">
        <fieldset id="formbuscadorweb" >
          <div id="titulobuscadorweb" class="">
            <a> BUSCADOR WEB</a>
            
          </div>
          <input type=hidden name=ie value=UTF-8 />
          <input type=hidden name=oe value=UTF-8 />

          <INPUT TYPE=text id="textoabuscar" placeholder="Término o palabra clave a buscar..." name="q" value="" size="30" autocomplete="off" spellcheck="false" />
          <font size=-2>

            <input type=hidden name=domains value="http://www.tax-individual.com.co" target="_blank" /><br>
            <input type=radio class="eninternet" name=sitesearch value="" /> EN GOOGLE MAPS</br>
            <input type=radio class="entaxindividual" name=sitesearch value="http://www.tax-individual.com.co" target="_blank" checked /> EN TAX-INDIVIDUAL.COM.CO
            <input type=submit id="botonbuscarweb" name=btnG VALUE="BUSCAR" class= />


          </font>
        </fieldset>
      </FORM>



      <!--- FORM CHAT-->

    <div id="chatslt" class="">
        
        <FORM >
          <fieldset id=chatslt2 > 
          <a style=" font-size:18px;
            font-weight: 700;
            color: rgb(0, 0, 0);
            padding-top: 1%;;">CHAT SLT <span class="fa fa-comments-o"></span> <br></a>

            <div  id="contenedorchat">
</div>

            <input type="text" spellcheck="false" maxlength="280"  placeholder="Escriba aquí su mensaje..." autocomplete="off" id="inputchat"> </input>
            <button id= "sendchat"> Enviar <span class="fas fa-paper-plane"></span></button>
          </fieldset>
          
        </FORM>

      </div>


    </div>


    


    <!--BUSCADOR INTERNO SLT-->

    <div class="contenedor2">
      <div id="buscadorslt" class="">
        <FORM >
          <fieldset id=formbuscadorslt >
            <div id="titulobuscadorslt" class="titulo">
              <a> PREGUNTAS FRECUENTES SLT</a>
              <div id="iconopregunta" <span class="fa fa-question-circle"></span>
              </div>
              <INPUT TYPE=text id="textoabuscarslt" placeholder="Término clave a buscar..." name="q" value="" size="30" autocomplete="off" spellcheck="false" />
              <font size=-2>

              

            </div>
            <h3>Resultados de la búsqueda:</h3>
            <textarea  margin="0 px" rows="16"spellcheck="false" readonly="readonly" id="contenedorrespuestas">

</textarea>

            
            <!-- Aquí ponemos los párrafos que se obtendrán de la búsqueda-->
            <div id="respuestasbuscarslt">
              <div id="titulorespuestas>" class="title">
                <a> Resultados de la búsqueda: </a>
            </font>
          </fieldset>
        </FORM>

        


    </div>
    <div class="contenedor">
      <!--Twitter-->
      <div id="twitter" class="">
        <a class="twitter-timeline" data-width="420" data-height="850" href="https://twitter.com/sttmed?ref_src=twsrc%5Etfw">Tweets by sttmed</a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
      <div id="sidebar" class="">
        <div class="toggle-btn">
          <span>&#9776;</span>
          <ul>
            <li>
              <img id="logotax" src="https://www.tax-individual.com.co/wp-content/themes/tax-individual/img/logo.png?v=2" alt="Logotipo" />
            </li>
            <a href="../Login" target="_blank">
              <li>PORTAL ADMINISTRATIVO</li>
            </a>
            <a href="https://taxindividual.sharepoint.com/:f:/g/EklJPqIlfP1NlSDLAnSYURIBW3RWtsQL3QGdjf7wDx6d1w?e=g0hRIc" target="_blank">
              <li>INSTRUCTIVOS</li>
            </a>
            <a href="https://actualizadatos.tax-individual.com.co/" target="_blank">
              <li>ACTUALIZACIÓN DE DATOS</li>
            </a>
            <a href="https://docs.google.com/spreadsheets/d/1rJ5e6K2_cj7zMx4BGs5ChumYwjcDES9e14GIOH8h3sk/edit#gid=1669431343" target="_blank">
              <li>DESEMPEÑO</li>
            </a>
          </ul>
        </div>
      </div>
      <div id="derechosdiv" >
        <p id="derechos">© 2021 - Tax Individual, ¡Para Usted! │  <a id="politicadatos" href="https://www.tax-individual.com.co/proteccion-datos-personales/">     <u>Política de protección de Datos Personales</u></a> </p>
        
      </div>
      <div id="rightsidepage">
        <section class="form_wrap">
          <section class="contact_info">
            <section class="info_tittle">
              <span class="fa fa-user-circle"></span>
              <h2>
                SISTEMA DE GESTIÓN DEL<br />
                CONOCIMIENTO<br />
                SLT
              </h2>
            </section>
            <section class="info_items">
              <p>
                <span class="fa fa-envelope"></span>
                tax-individual@tax-individual.com.co
              </p>
              <p><span class="fa fa-phone"></span> 444-0888 opc. 0</p>
            </section>
          </section>

          <form action='guardar.php' method="POST" class="form_contact">
            <h2 id="h2tituloform">FORMULARIO REGISTRO DE LLAMADAS CONDUCTORES</h2>
            <div class="user_info">


              <label for="asesorname">Nombre Asesor *</label>

              <select id="asesorname" name="asesorname" class="custom-select" required>
                <option disabled selected>--Seleccione--</option>
                                
              </select>

              <label for="placa">Placa del vehículo* <span id="validarplanilla" class="fa fa-file-text-o"></span></label> 
              
              <input id="placa" maxlength="6" required name="placa" oninvalid=null autocomplete="off" pattern="[A-Z]{3}[0-9]{3}|[a-zA-Z]{3}[0-9]{3}" onkeydown="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()" />
              


              <label for="conductorname">Nombre del vinculado*</label>


              <select id="conductorname" class="custom-select" name="conductorname">
                <option value="" selected>--Introduzca placa del vehículo--</option>


              </select>

              <label for="phone">Teléfono *</label>
              <input name="phone" type="text" id="phone" maxlength="10" pattern="[0-9]{7}|[0-9]{10}" onkeypress="return solonumeros(event);" required autocomplete="off" />

              <!-- Tipificación y Subtipificación-->

              <label for="tipif">Tipificación *</label>
              <select id="tipif" class="custom-select" name="tipif" required></select>

              <label for="subtipif"> Subtipificación *</label>
              <select id="subtipif" class="custom-select" name="subtipif" required></select>

              <label for="mensaje"> Comentarios </label>
              <textarea id="mensaje" name="mensaje" autocomplete="off"></textarea>

              <label for="correo">Correo electrónico </label>
              <input type="email" id="correo" name="correo" autocomplete="off" ></input>

              <input type="submit" value="GUARDAR" id="btnSend" name="btnSend" ></input>

              
            </div>
          </form>
        </section>
      </div>
      


    </div>



          <!-- Conecto mi archivo de javascript donde cargaremos las opciones de los listados-->
          <script src="script.js"></script>
          <script src="server.js"></script>

      <!-- Conecto mi archivo de javascript donde se conecta al servidor-->

      <!-- Icono de equis roja para errores-->
      <i class="fas fa-window-close"></i>
      
</body>


</html>