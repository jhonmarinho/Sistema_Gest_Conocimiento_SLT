
var global_nameconduct = ""
var contadorlupa = 1


$(document).ready(function () {
  document.getElementById("formbuscadorweb").style.display = 'none';
  document.getElementById("formbuscadorslt").style.display = 'none';
  document.getElementById("modal_pvo").style.display = 'none';

  // $("#contenedorchat").animate({ scrollTop: (body).height() }, 1000); // Scrollea hasta abajo de la página 

  //click en span de placa

  $("#spandocument").click(function () {

    //Mostrando ventana de requisitos expedición de P.V.O
    document.getElementById("modal_wrap1").style.display = '';

  });


  //// Cuando da click en la lupa


  $("#iconolupa").click(function () {
    console.log(contadorlupa)

    if (contadorlupa === 1) {

      document.getElementById("formbuscadorweb").style.display = '';
      document.getElementById("formbuscadorslt").style.display = '';
      document.getElementById("buscadorslt").style.display = '';
      document.getElementById("buscadorslt").style.cssText = 'z-index: 0;';
      document.getElementById("chatslt").style.display = 'none';
      contadorlupa = 0;

    }

    else {


      document.getElementById("formbuscadorweb").style.display = 'none';
      document.getElementById("formbuscadorslt").style.display = 'none';
      document.getElementById("buscadorslt").style.display = 'none';
      document.getElementById("buscadorslt").style.cssText = 'z-index: -1;';
      document.getElementById("chatslt").style.display = '';
      contadorlupa = 1;

    }
  })






  //Cargar listado de asesores en el select asesorname al iniciar la web///////////////

  // Validar que solo traiga asesores activos
  let search7 = "SI";
  console.log("¿Buscar únicamente asesores activos?: " + search7);

  $.ajax({
    url: 'consultarasesorname.php',
    data: { search7 },
    type: 'POST',
    success: function (response) {

      console.log(JSON.parse(response));
      if (response !== "[]") {
        let data1 = JSON.parse(response);
        data = data1.sort();
        let items = `'<option selected value="NULL">--Seleccione--</option>"    `;
        data.forEach(data => {
          items += `'<option  value="${data.asesorname}">${data.asesorname}</option>"    `;
        })
        document.getElementById("asesorname").innerHTML = items;

      }
      else {
        itemNull = `'<option value="NULL">--No hay resultados para la placa buscada--</option>"    `;
        document.getElementById("asesorname").innerHTML = itemNull;
      }

    }


  });

  /////////////////////////////////////////////////////////////////////////////////////////////////


  $("#modal_wrap1").hide();
  $("#modal_wrap").hide();
  $("#btnSend").click(function () {
    var errores = "";
    var largo_campo_phone = document.getElementById("phone").value.length;
    var correojs = document.getElementById("correo").value;
    var es_formato_valido_correo =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
        correojs
      );
    var placajs = document.getElementById("placa").value;
    var es_formato_valido_placa = /^[a-zA-Z]{3}[\d]{3}$/.test(placajs);


    //validando que los campos obligatorios no estén vacíos===========

    if ($("#asesorname").val() === "NULL") {
      errores += "- Seleccione el nombre del asesor\n";
      $("#asesorname").css("border-bottom-color", "#ff0000");
    } else {
      $("#asesorname").css("border-bottom-color", "#d1d1d1");
    }

    //##### Validando que el campo placa solo pueda tener 3 letras y 3 números (expresión regular):#####
    //1- que me mire si está vacio el campo, si está vacio arroja error.
    //2- si no está vacio, que me mire el formato
    //3- si el formato no coincide con la expresion regular (ABC123) que me envíe error
    //4- si el formato coincide no hace nada y continua con el programa

    if ($("#placa").val() === "") {
      errores += "- Escriba una placa\n";
      $("#placa").css("border-bottom-color", "#ff0000");
    } else if (es_formato_valido_placa === false) {
      errores += "- Ingrese una placa válida\n";
      $("#placa").css("border-bottom-color", "#ff0000");
    } else {
      $("#placa").css("border-bottom-color", "#d1d1d1");
    }

    if ($("#phone").val() === "") {
      errores += "- Digíte el campo teléfono\n";
      $("#phone").css("border-bottom-color", "#ff0000");
    }
    //validando que el campo phone solo pueda tener 7 o 10 dígitos
    else {
      switch (largo_campo_phone) {
        case 1:
          errores += "- El teléfono debe tener 7 o 10 dígitos\n";
          $("#phone").css("border-bottom-color", "#ff0000");
          break;

        case 2:
          errores += "- El teléfono debe tener 7 o 10 dígitos\n";
          $("#phone").css("border-bottom-color", "#ff0000");
          break;

        case 3:
          errores += "- El teléfono debe tener 7 o 10 dígitos\n";
          $("#phone").css("border-bottom-color", "#ff0000");
          break;

        case 4:
          errores += "- El teléfono debe tener 7 o 10 dígitos\n";
          $("#phone").css("border-bottom-color", "#ff0000");
          break;

        case 5:
          errores += "- El teléfono debe tener 7 o 10 dígitos\n";
          $("#phone").css("border-bottom-color", "#ff0000");
          break;

        case 6:
          errores += "- El teléfono debe tener 7 o 10 dígitos\n";
          $("#phone").css("border-bottom-color", "#ff0000");
          break;

        case 8:
          errores += "- El teléfono debe tener 7 o 10 dígitos\n";
          $("#phone").css("border-bottom-color", "#ff0000");
          break;

        case 9:
          errores += "- El teléfono debe tener 7 o 10 dígitos\n";
          $("#phone").css("border-bottom-color", "#ff0000");
          break;

        default:
          $("#phone").css("border-bottom-color", "#d1d1d1");
          break;
      }
    }

    //##### Validando formato del email//Formato de e-mail (expresión regular):############
    // 1- que me mire si está vacio el campo
    // 2- si no está vacio, que me mire el formato
    // 3- si el formato no coincide con la expresion regular que me envíe error
    // 4- si el formato coincide no hace nada y continua con el programa

    if ($("#correo").val() !== "") {
      if (es_formato_valido_correo === false) {
        errores += "- Ingrese un correo electrónico válido\n";
        $("#correo").css("border-bottom-color", "#ff0000");
      }
    } else {
      $("#correo").css("border-bottom-color", "#d1d1d1");
    }

    if (es_formato_valido_correo === true) {
      $("#correo").css("border-bottom-color", "#d1d1d1");
    }

    //validando tipificaciones (no vacío)
    if ($("#tipif").val() === "") {
      errores += "- Seleccione tipificación";
      $("#tipif").css("border-bottom-color", "#ff0000");
    } else {
      $("#tipif").css("border-bottom-color", "#d1d1d1");
    }
    if ($("#subtipif").val() === "") {
      errores += "- Seleccione subtipificación";
      $("#subtipif").css("border-bottom-color", "#ff0000");
    } else {
      $("#subtipif").css("border-bottom-color", "#d1d1d1");
    }

    // Mostrar mensaje si hay errores únicamente (modalwrap)

    if ((errores == "") == false) {
      window.alert("⚠ " + "Se han encontrado los siguientes errores: \n\n" + errores)
    }


    // ENVIAR EL FORMULARIO CONEXIÓN CON SQL
    else {

      // LUEGO DEBE MOSTRAR MENSAJE DE ÉXITO

      window.alert("Registrando datos en el servidor...");


    }


  });

});

//Tipificaciones y subtipificaciones

let $tipif = document.getElementById("tipif");
let $subtipif = document.getElementById("subtipif");

let tipificaciones = [
  "1 NOVEDADES DURANTE LA PRESTACION DEL SERVICIO",
  "2 SOPORTE APP CONDUCTOR",
  "3 VALES",
  "4 PVO",
  "5 REPORTE DE ACCIDENTES O INCIDENTES",
  "6 CONSULTA ADMINISTRATIVA",
  "7 COMENTARIO/SUGERENCIA/FELICITACION",
  "8 ACTUALIZACION DE DATOS",
];
let subtipificaciones = [
  "0-CONFIRMAR DIRECCION/DIRECCION ERRADA",
  "1-OBJETOS PERDIDOS/ENCONTRADOS",
  "2-USUARIO SE FUE EN OTRO VEHICULO",
  "3-REPORTA SERVICIOS FICTICIOS",
  "4-USUARIO NO SALE/LLAMAR USUARIO",
  "5-SOLICITA MAS TIEMPO PARA RECOGER",
  "6-SOLICITA CANCELAR SERVICIO",
  "7-GPS NO CONECTA/ERROR GPS",
  "8-APP NO CONECTA/NO DEJA REGISTRAR",
  "9-ERROR EN ZONA GPS/SALTOS DE ZONA",
  "10-SERVICIO NO DEJA FINALIZAR EN LA APP",
  "11-CONSULTA MOTIVO DE BLOQUEO",
  "12-CONVERTIR SERV EN EFECTIVO A SERV POR VALE",
  "13-CORRECION MONTO DEL VALE",
  "14-CORRECION NUMERO DE VALE",
  "15-VALE SUPERA MONTO MAXIMO",
  "16-PERDIDA DEL VALE",
  "17-ASESORIA MANEJO DE VALE FISICO/ELECTRONICO/VIRTUAL",
  "18-EXPEDIR PVO",
  "19-MODIFICAR PVO",
  "20-SOPORTE COMPRA PVO A TRAVES DE LA WEB-PSE",
  "21-FINALIZAR PVO ANTICIPADAMENTE",
  "22-CONSULTAR SALDO PARA EXPEDIR PVO",
  "23-FALLA MECANICA",
  "24-HURTO",
  "25-AGRESION",
  "26-ACCIDENTE LEVE/GRAVE/MORTAL",
  "27-REDIRIGIR A MESA DE AYUDA - 4440888 opc. 2",
  "28-HORARIOS DE ATENCION",
  "29-CONSULTAR PICO Y PLACA",
  "30-CONSULTAR TARIFA/HORA A MUNICIPIO",
  "31-CONSULTAR TARIFAS ADMINISTRATIVAS (SS, ADMON, APP)",
  "32-CONSULTAR TARJETA DE CONTROL",
  "33-BLOQUEO POR MOTIVO ADMINISTRATIVO",
  "34-COMENTARIO",
  "35-SUGERENCIA",
  "36-FELICITACION",
  "37-ACTUALIZACION DE DATOS CONDUCTOR",
  "38-ACTUALIZACION TARIFAS SERVICIO TAXI 2021-2022",
];

function mostrartipif(arreglo, tipifosubtipif) {
  let elementos = '<option selected  value="">--Seleccione--</option>';

  for (let i = 0; i < arreglo.length; i++) {
    elementos +=
      '<option value="' + arreglo[i] + '">' + arreglo[i] + "</option>";
  }
  tipifosubtipif.innerHTML = elementos;
}

mostrartipif(tipificaciones, $tipif);

function recortarx(array, inicio, fin, tipifosubtipif) {
  let recortarx = array.slice(inicio, fin);
  mostrartipif(recortarx, tipifosubtipif);
}

///ventana Expedir PVO

$subtipif.addEventListener("change", function () {

  let valor1 = $subtipif.value;

  switch (valor1) {
    case "18-EXPEDIR PVO":
      ////MOSTRAR VENTANA

      document.getElementById("modal_pvo").style.display = '';

      let telefono_cond = document.getElementById("phone").value
      let nombreconductor = document.getElementById("conductorname").value
      let correo_cond = document.getElementById("correo").value
      let placa_cond = document.getElementById("placa").value

      if (telefono_cond !== "") {
        document.getElementById("tlf_conduc").value = telefono_cond
      }

      if (nombreconductor !== "NULL") {
        document.getElementById("name_conduc").value = nombreconductor
      }

      if (correo_cond !== "") {
        document.getElementById("email_conduc").value = correo_cond
      }

      if (placa_cond !== "") {
        document.getElementById("placa_conduc").value = placa_cond
      }


  }



})




$tipif.addEventListener("change", function () {
  let valor = $tipif.value;
  switch (valor) {
    case "1 NOVEDADES DURANTE LA PRESTACION DEL SERVICIO":
      recortarx(subtipificaciones, 0, 7, $subtipif);
      break;
    case "2 SOPORTE APP CONDUCTOR":
      recortarx(subtipificaciones, 7, 12, $subtipif);
      break;
    case "3 VALES":
      recortarx(subtipificaciones, 12, 18, $subtipif);
      break;
    case "4 PVO":
      recortarx(subtipificaciones, 18, 23, $subtipif);
      break;

    case "5 REPORTE DE ACCIDENTES O INCIDENTES":
      recortarx(subtipificaciones, 23, 27, $subtipif);
      break;

    case "6 CONSULTA ADMINISTRATIVA":
      recortarx(subtipificaciones, 27, 34, $subtipif);
      break;
    case "7 COMENTARIO/SUGERENCIA/FELICITACION":
      recortarx(subtipificaciones, 34, 37, $subtipif);
      break;
    case "8 ACTUALIZACION DE DATOS":
      recortarx(subtipificaciones, 37, 39, $subtipif);
      break
  }
});

//
const btnToggle = document.querySelector(".toggle-btn");
btnToggle.addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("twitter").classList.toggle("active");
  document.getElementById("rightsidepage").classList.toggle("active");
  document.getElementById("buscadorweb").classList.toggle("active");
  document.getElementById("buscadorslt").classList.toggle("active");

});

//<!-- Script para captar la placa y nombre del conductor y pedir al servidor de vuelta el correo electrónico-->
let conduct_name = document.getElementById("conductorname")

conduct_name.addEventListener("change", function () {

  if ($('#conductorname')) {

    let search3 = {
      'NOMBRE': $('#conductorname').val(),
      'PLACA': $('#placa').val()
    }

    $.ajax({
      url: 'emailconductor.php',
      data: { search3 },
      type: 'POST',
      success: function (response) {

        resultado = response;
        let jsonData = JSON.parse(resultado);
        console.log(jsonData);

        for (let item of jsonData) {

          if (item.EMAIL !== null) {
            console.log(item.EMAIL);

            document.getElementById("correo").value = item.EMAIL;
          }

          else {
            document.getElementById("correo").value = "no registra correo";
          };


        }


      },
    }
    );

  }
})


//<!-- Script para captar la placa que se está introduciendo en tiempo real, se ejecuta cada vez que se levanta una tecla en el input placa-->

$('#placa').keyup(function (e) {

  if ($('#placa').val() == "") {
    document.getElementById("conductorname").innerHTML = `'<option value="NULL">--Introduzca placa del vehículo--</option>"    `;
  }

  if ($('#placa').val()) {

    let search = $('#placa').val()
    console.log('La placa a buscar es: ' + '"' + search + '"');

    $.ajax({
      url: 'nameconductor.php',
      data: { search },
      type: 'POST',
      success: function (response) {
        console.log(response);
        console.log(typeof (response));
        if (response !== "[]") {
          let data = JSON.parse(response);
          let items = `'<option value="NULL">--Seleccione--</option>"    `;
          data.forEach(data => {
            items += `'<option value="${data.NOMBRES} ${data.APELLIDOS}">${data.NOMBRES} ${data.APELLIDOS}</option>"    `;
          })
          document.getElementById("conductorname").innerHTML = items;


        }
        else {
          itemNull = `'<option value="NULL">--No hay resultados para la placa buscada--</option>"    `;
          document.getElementById("conductorname").innerHTML = itemNull;
        }
      },

      error: {

      }

    }
    );

  }
});




//Ocultando ventada de requisitos expedición de P.V.O al iniciar la página

function ocultarPVO() {
  $("#modal_wrap1").hide(300);
}

function ocultardatosPVO() {
  $("#modal_pvo").hide(300);

}

function guardardatosPVO() {

  if (window.confirm("¿Confirma que desea guardar los datos ingresados?")) {

    $("#modal_pvo").hide(300);

    let plantilla = "SOLICITUD PLANILLA DE VIAJE (PVO) " + "\n" +
      "TELÉFONO CONDUCTOR: " + $("#tlf_conduc").val() + "\n" +
      "PLACA: " + $("#placa_conduc").val() + "\n" +
      "NOMBRE CONDUCTOR: " + $("#name_conduc").val() + "\n" +
      "CORREO ELECTRÓNICO: " + $("#email_conduc").val() + "\n" +
      "ORIGEN: " + $("#origin_conduc").val() + "\n" +
      "DESTINO: " + $("#destination_conduc").val() + "\n" +
      "NÚMERO USUARIOS: " + $("#number_passenger").val() + "\n" +
      "FECHA SALIDA: " + $("#date1_conduc").val() + "\n" +
      "HORA VIAJE: " + $("#departure_conduc").val() + "\n" +
      "FECHA REGRESO: " + $("#date2_conduc").val() + "\n" +
      "IDA Y/O REGRESO: " + $("#selectdate2").val() + "\n" +
      "CÉDULA CONTRATANTE: " + $("#idcard_cont").val() + "\n" +
      "NOMBRE CONTRATANTE: " + $("#name_cont").val() + "\n" +
      "CELULAR: " + $("#phone_cont").val() + "\n" +
      "DIRECCIÓN: " + $("#adress_cont").val() + "\n" +
      "MUNICIPIO: " + $("#city_cont").val() + "\n" +
      "Observaciones: " + $("#note").val()

    document.getElementById("mensaje").innerHTML = plantilla;

  }


}


//<!-- Script para captar la placa (modulo requisitos PVO) que se está introduciendo en tiempo real, se ejecuta cada vez que se levanta una tecla en el input placa_modal-->

$('#placa_modal').keyup(function (e) {

  // Restablecer campos si se modifica la placa

  $("#fecha_modal").val('');
  $("#autoriz_modal").val('');
  $("#saldosiesa_modal").val('');

  let placamodal = document.getElementById("placa_modal").value;
  console.log("placamodal es: " + placamodal);
  document.getElementById('placa').value = placamodal;


  if ($('#placa_modal').val() == "") {
    document.getElementById("conductornames").innerHTML = `'<option value="NULL">--Introduzca placa del vehículo--</option>"    `;
  }

  if ($('#placa_modal').val() !== "") {

    let search = $('#placa_modal').val()
    console.log('La placa a buscar es: ' + '"' + search + '"');

    $.ajax({
      url: 'nameconductor.php',
      data: { search },
      type: 'POST',
      success: function (response) {
        console.log(response);
        console.log(typeof (response));
        if (response !== "[]") {
          let data = JSON.parse(response);
          let items = `'<option value="NULL">--Seleccione--</option>"    `;
          data.forEach(data => {
            items += `'<option value="${data.NOMBRES} ${data.APELLIDOS}">${data.NOMBRES} ${data.APELLIDOS}</option>"    `;
          })
          document.getElementById("conductornames").innerHTML = items; //Inyecta el nombre en el option del modulo de consulta requisitos PVO
          global_nameconduct = items;
        }
        else {
          itemNull = `'<option value="NULL">--No hay resultados para la placa buscada--</option>"    `;
          document.getElementById("conductornames").innerHTML = itemNull;
        }
      },

      error: {

      }

    }
    );

  }
});

//Cuando cambie el nombre de conductor seleccionado...
$(document).ready(function () {
  let modal_conduct = document.getElementById("conductornames");
  let val_modal_conduct = document.getElementById("conductornames").value;
  let conduct_name = document.getElementById("conductorname");

  //...1) que se la consulta del conductor en el select principal

  modal_conduct.addEventListener("change", function () {
    conduct_name.innerHTML = global_nameconduct;//variable definida globalmente extraida de la consulta SQL de AJAX 

    //..2) que consulte en el SAC la fecha de vencimiento de la Tarjeta de control

    if ($('#conductornames').val() === "NULL") {
      document.getElementById("fecha_modal").value = "";
      document.getElementById("autoriz_modal").value = "";
      document.getElementById("saldosiesa_modal").value = "";
    }

    let search4 = {
      'NOMBRE': $('#conductornames').val(),
      'PLACA': $('#placa_modal').val()
    }




    $.ajax({
      url: 'vigenciaTC.php',
      data: { search4 },
      type: 'POST',
      success: function (response) {

        resultado = response;
        console.log("El resultado que devuelve PHP es: " + resultado + " y es de tipo: " + typeof (resultado));
        let jsonData = JSON.parse(resultado);
        jsonEsVacio = jsonData.length;
        console.log("El valor es:");
        console.log(jsonEsVacio);
        console.log(jsonEsVacio.val);

        if (jsonEsVacio !== 0) {

          for (let item of jsonData) {
            document.getElementById("fecha_modal").value = item.FECHA_VTO_TC;
          }
        }

        else {
          console.log("Entró por aquí")
          document.getElementById("fecha_modal").value = "Sin resultados";
        }






      },
    }
    );




    //..3) que consulte en el SAC si está autorizado o no
    let search5 = {
      'NOMBRE': $('#conductornames').val(),
      'PLACA': $('#placa_modal').val()
    }

    $.ajax({
      url: 'autorizadopvo.php',
      data: { search5 },
      type: 'POST',
      success: function (response) {

        resultado = response;
        let jsonData = JSON.parse(resultado);
        console.log(jsonData);

        for (let item of jsonData) {

          if (item.AUTORIZADOP !== null) {
            console.log(item.AUTORIZADOP);

            if (item.AUTORIZADOP == "N") {
              document.getElementById("autoriz_modal").value = "NO AUTORIZADO";
            }

            if (item.AUTORIZADOP == "S") {
              document.getElementById("autoriz_modal").value = "AUTORIZADO";
            }




          }

          else {
            document.getElementById("autoriz_modal").value = "no hay resultados";
          };


        }


      },
    }
    );





  });
});







// capturar cuando presiona una tecla en #textoabuscar-consulta de Preguntas frecuentes SLT

window.onload = iniciartxtbuscador;
let txt = "Para iniciar la búsqueda, ingrese el término clave a buscar..."
function iniciartxtbuscador() {

  document.getElementById("contenedorrespuestas").innerHTML = txt;
};

$('#textoabuscarslt').keyup(function (e) {

  if ($('#textoabuscarslt').val() == "") {
    document.getElementById("contenedorrespuestas").innerHTML = txt;
  }

  console.log($('#textoabuscarslt').val());

  if ($('#textoabuscarslt').val()) {

    let search = $('#textoabuscarslt').val()
    console.log('El texto a buscar es: ' + '"' + search + '"');
    $.ajax({
      url: 'consultartema.php',
      data: { search: search },
      type: 'POST',
      success: function (response) {

        if (response == "[]") {

          templatez = `
⚠ La búsqueda actual no obtuvo resultados.`;
          document.getElementById("contenedorrespuestas").innerHTML = templatez;

          ;
        }

        console.log(response)
        console.log(typeof (response))

        if (response !== "[]") {

          let data = JSON.parse(response);
          let template = '';
          console.log(data);
          data.forEach(data => {
            template +=
              `     ➤ ${data.tema}:

${data.descripcion}

⸻⸻⸻⸻⸻⸻⸻

      `;
          })
          $('#contenedorrespuestas').html(template);
        }
      }
    }
    );
  }

}



);


