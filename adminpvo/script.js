/////variables globales
let data
let array_ids = [];
let elementoHtml
let texto

//////////////////////////

///Se ejecuta cuando inicia: oculta la ventana de editar, tecla enter hace click en el boton enviar/////////////////////

$(document).ready(function () {

  let elementos = '<option selected value="">--Seleccione--</option>' + '<option value="VICTOR MANUEL DUQUE GUERRERO">VICTOR MANUEL DUQUE GUERRERO</option>' + '<option   value="JUAN SEBASTIAN MORENO RAMIREZ">JUAN SEBASTIAN MORENO RAMIREZ</option>' + '<option value="DANER ESNEIDER OSORIO OSORIO">DANER ESNEIDER OSORIO OSORIO</option>' + '<option   value="ALEXANDER CUADROS GALLEGO">ALEXANDER CUADROS GALLEGO</option>' + '<option value="CARLOS DANIEL CORREA JIMENEZ">CARLOS DANIEL CORREA JIMENEZ</option>' + '<option   value="GILMER CAMILO RIOS BUSTAMANTE">GILMER CAMILO RIOS BUSTAMANTE</option>' + '<option value="ARIEL DE LA ROSA REALES">ARIEL DE LA ROSA REALES</option>' + '<option   value="EDDY SANTIAGO MUÑOZ MAZO">EDDY SANTIAGO MUÑOZ MAZO</option>' + '<option value="DAVID ESTEBAN CANO CASTRILLON">DAVID ESTEBAN CANO CASTRILLON</option>' + '<option   value="DANIEL ALEJANDRO ESPINOSA">DANIEL ALEJANDRO ESPINOSA</option>' + '<option value="EDY SANTIAGO FRANCO ROJAS">EDY SANTIAGO FRANCO ROJAS</option>' + '<option value="JOHN STIVEN TAPIAS CALLE">JOHN STIVEN TAPIAS CALLE</option>' + '<option value="LINA MARIA CANO ARBELÁEZ">LINA MARIA CANO ARBELÁEZ</option>' + '<option   value="LEONARDO ANTONIO RENDÓN">LEONARDO ANTONIO RENDÓN</option>' + '<option value="GABRIEL JAIME PEREZ">GABRIEL JAIME PEREZ</option>';
  document.getElementById("select_lider").innerHTML = elementos

  $("#contenedor_editar_box").css("display", "none");
  $("#contenedor_modificar_box").css("display", "none");

  refrescar();
})

//////////////////////////////////////////////////////////


function refrescar() {
  search = "4 PVO"
  $.ajax({
    url: 'select.php',
    data: { search },
    type: 'POST',
    success: function (response) {

      if (response !== "[]") {
        data = JSON.parse(response);

        let items1 = `<tr> 
        <td class="angosto" align="center" style = "font-weight: bold; color: rgb(56, 56, 56);"> # </td>
        <td class="angosto" align="center" style = "font-weight: bold; color: rgb(56, 56, 56);"> fecha </td>
        <td class="angosto" align="center" style = "font-weight: bold; color: rgb(56, 56, 56);"> asesor </td>
        <td class="angosto" align="center" style = "font-weight: bold; color: rgb(56, 56, 56);"> Tipo solicitud </td>
        <td class="angosto" align="center" style = "font-weight: bold; color: rgb(56, 56, 56);"> placa </td>
        <td class="angosto" align="center" style = "font-weight: bold; color: rgb(56, 56, 56);"> vinculado </td>
        <td class="ancho" align="center" style = "font-weight: bold; color: rgb(56, 56, 56);"> Datos PVO</td>
        
    </tr>    `;


        let number = 0;

        data.forEach(data => {

          number = number + 1;

          let variable = (data.novedad_id)
          let fecha1 = (data.fecha)
          let asesorname1 = (data.asesorname)
          let placa1 = (data.placa)
          let vinculadoname1 = (data.vinculadoname)
          let subtipif1 = (data.subtipif)
          let mensaje1 = (data.mensaje)
          let correo1 = (data.correo)

          array_ids.push({ "novedad_id": variable.toString(), "placa": placa1, "mensaje": mensaje1 })

          items1 += `<tr>

          <td class="angosto" align="center" style="border-right: 1px solid gray; padding-right: 0.2px"> ${number} </td>
          <td class="angosto" align="center" id='fecha${data.novedad_id}'> ${data.fecha} </td>
          <td class="angosto" align="center" id='asesorname${data.novedad_id}'> ${data.asesorname} </td>
          <td class="angosto" align="center" id='subtipif${data.novedad_id}'> ${data.subtipif} </td>
          <td class="angosto" align="center" id='placa${data.novedad_id}'> ${data.placa} </td>
          <td class="angosto" align="center" style="border-right: 1px solid gray" id='vinculadoname${data.novedad_id}'> ${data.vinculadoname} </td>
          <td class="ancho" align="justify" id='mensaje${data.novedad_id}'> ${data.mensaje} </td>
          <td align="center"> <span id='eliminarid${data.novedad_id}' class="fas fa-paint-brush"></span></td>
          <td align="left"> <span id='modificarid${data.novedad_id}' class="fa fa-pencil"></span></td>
          <td align="left"> <span id='editarid${data.novedad_id}' class="fa fa-save"></span></td>
          <td align="left"> <span id='deleteid${data.novedad_id}' class="fa fa-trash"></span></td>
          </tr>    `;
        })


        ////////////////////////////////////////////////////////////////////

        document.getElementById("tabla_asesores").innerHTML = items1;

      }
      else {

        itemNull = `<tr > <td style="color:gray; font-weight: 600"> No hay solicitudes de PVO pendientes de gestión.  
    </td> </tr>    `;
        document.getElementById("tabla_asesores").innerHTML = itemNull;
      }

    }


  });

};

///////////////////////////////////////////////////////////

function resolveAfter1Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(array_ids);
    }, 1000);
  });
}


function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(texto);
    }, 100);
  });
}

///FUNCIÓN COLOREAR////

///// Consultar si hay celdas resaltadas en la base de datos

async function colorear() {

  const result = await resolveAfter1Seconds();
  let search4 = ""

  array_ids.forEach(item => {

    $.ajax({
      url: 'colorear.php',
      data: item.novedad_id,
      type: 'POST',
      async: false,
      success: function (response) {

        console.log("Este es el response de colorear")
        console.log("response: " + response + " Tipo de response: " + typeof (response))

        let elementohtml = document.getElementById("mensaje" + item.novedad_id)

        if (response === "rgb(224, 181, 64)") {
          elementohtml.style.backgroundColor = "rgb(224, 181, 64)"
        }

        else {

          elementohtml.style.backgroundColor = "rgba(0, 0, 0, 0.0)"

        }


      }


    });

  })

}




/////




//////////FUNCIÓN COLOREAR///////////////////
async function eliminar() {

  const result = await resolveAfter1Seconds();


  //Función eliminar
  if (array_ids !== 0) {

    let variable_eliminar = ""

    array_ids.forEach(item => {

      variable_eliminar = "#eliminarid" + item.novedad_id
      variable_editar = "#editarid" + item.novedad_id

      //Escuchar que variable se ha seleccionado para eliminar

      $(document).on("click", variable_eliminar, function (e) {

        console.log("Usted ha seleccionado *colorear* la PVO de la placa " + item.placa + " con id: " + item.novedad_id);


        let search2 = item.novedad_id
        let elementohtml = document.getElementById("mensaje" + search2)
        let elementStyle = window.getComputedStyle(elementohtml);
        let elementColor = elementStyle.getPropertyValue('background-color');


        if (elementColor === "rgb(224, 181, 64)") {
          elementohtml.style.backgroundColor = "rgba(0, 0, 0, 0.0)"
        }

        else {

          elementohtml.style.backgroundColor = "rgb(224, 181, 64)"
          console.log("por aqui entro")
          console.log(elementColor)

        }





      });



    });


  }


};

/////////////FUNCIÓN GUARDAR//////////////////
async function editar() {

  const result = await resolveAfter1Seconds();
  console.log(result);

  if (array_ids !== 0) {

    let variable_editar = ""

    array_ids.forEach(item => {

      variable_editar = "#editarid" + item.novedad_id
      let variable_subtipif_PVO = "subtipif" + item.novedad_id


      //Escuchar que variable se ha seleccionado para editar

      $(document).on("click", variable_editar, variable_subtipif_PVO, function (e) {
        window.scroll(0, 0);

        var validador_PVO = document.getElementById(variable_subtipif_PVO).innerText
        console.log(typeof (validador_PVO))
        console.log(document.getElementById(variable_subtipif_PVO).innerText)

        if (validador_PVO == '19-MODIFICAR PVO' || validador_PVO == '21-FINALIZAR PVO ANTICIPADAMENTE') {
          $("#select_pvo").hide()

        }

        console.log("Usted ha seleccionado *guardar* la PVO de la placa " + item.placa + " con ID: " + item.novedad_id);

        $(btn_editar).click(function () {

          let numeropvo1 = document.getElementById("numeropvo").value
          let sac = document.getElementById("select_pvo").value

          function almacenar() {

            let actualizadoname = document.getElementById("select_lider").value
            console.log(actualizadoname)

            let numeropvo = document.getElementById("numeropvo").value
            let expedida_sac = document.getElementById("select_pvo").value

            $.ajax({
              url: 'guardar.php',
              data: {
                'id': item.novedad_id,
                'actualizadoname': actualizadoname,
                'numeropvo': numeropvo,
                'expedida_sac': expedida_sac,
              },
              type: 'POST',
              success: function (response) {
                if (response == "exitoso") {
                  window.alert("PVO de la placa *" + item.placa + "* ingresada por el asesor " + actualizadoname + " , GUARDADA correctamente! ✅")

                  $("#contenedor_editar_box").css("display", "none");
                  window.location.reload()
                }
                else {
                  window.alert("Error al intentar gestionar la PVO")
                  $("#contenedor_editar_box").css("display", "none");
                }

              }


            });

          }





          if (numeropvo1 != '' && sac != '¿PVO fue expedida en SAC?') {


            almacenar()

          }

          else {

            if (validador_PVO == '19-MODIFICAR PVO' || validador_PVO == '21-FINALIZAR PVO ANTICIPADAMENTE') {

              if (numeropvo1 != '') {

                almacenar()
              }

              else { window.alert("Por favor, ingrese el número de la PVO") }
            }

            else {
              window.alert("Por favor, ingrese el número de la PVO y seleccione si fue expedida o no en SAC.")
            }




          }

        });


        //Mostrando div de actualización de asesor

        document.getElementById("contenedor_editar_box").style.display = '';

        document.getElementById("input_editar").value = item.asesorname

      });
    });

  }
};

//función para ocultar la ventana de editar y la de modificar

function ocultar_editar() {
  $("#contenedor_editar_box").hide(300);
  window.location.reload();
}

function ocultar_modificar() {
  $("#contenedor_modificar_box").hide(300);
  window.location.reload();
}


//////////////////////////////////////////////////////////

/////////////FUNCIÓN MODIFICAR//////////////////
async function modificar() {

  const result = await resolveAfter1Seconds();
  console.log(result);

  if (array_ids !== 0) {

    let variable_modificar = ""

    array_ids.forEach(item => {

      variable_modificar = "#modificarid" + item.novedad_id


      //Escuchar que variable se ha seleccionado para editar

      $(document).on("click", variable_modificar, function (e) {
        window.scroll(0, 0);

        console.log("Usted ha seleccionado *modificar* la PVO de la placa " + item.placa + " con ID: " + item.novedad_id);

        $(btn_modificar).click(function () {
          let mensaje2 = document.getElementById("input_modificar").value

          console.log(mensaje2)

          $.ajax({
            url: 'modificar.php',
            data: {
              'id': item.novedad_id,
              'mensaje': mensaje2,

            },
            type: 'POST',
            success: function (response) {
              if (response == "exitoso") {
                window.alert("PVO de la placa *" + item.placa + ", MODIFICADA correctamente! ✅")

                $("#contenedor_modificar_box").css("display", "none");
                window.location.reload()
              }
              else {
                window.alert("Error al intentar modificar la PVO")
                $("#contenedor_modificar_box").css("display", "none");
              }

            }


          });


        });


        //Mostrando div de actualización de asesor

        document.getElementById("contenedor_modificar_box").style.display = '';

        document.getElementById("input_modificar").value = item.mensaje

      });
    });

  }
};
///////////////////////////////////



/////////////FUNCIÓN DELETE///////////////////////////////////////////////

///FUNCIÓN COLOREAR////

///// Consultar si hay celdas resaltadas en la base de datos

async function deleter() {

  const result = await resolveAfter1Seconds();
  console.log(result);

  if (array_ids !== 0) {

    let variable_deleter = ""

    array_ids.forEach(item => {

      variable_deleter = "#deleteid" + item.novedad_id


      //Escuchar que variable se ha seleccionado para editar

      $(document).on("click", variable_deleter, function (e) {
        window.scroll(0, 0);

        let mssg = "⚠️ATENCIÓN⚠️\n - Solo elimine registros erróneos o que no necesiten gestión. \n" + "\nUsted ha seleccionado eliminar la PVO de la placa " + item.placa + " con ID: " + item.novedad_id + " ¿Desea continuar?"
        console.log(mssg);

        if (window.confirm(mssg)) {

          let search5 = item.novedad_id

          $.ajax({
            url: 'deleter.php',
            data: { search5 },
            type: 'POST',
            success: function (response) {

              if (response == "exitoso") {
                window.alert("PVO de la placa *" + item.placa + ", ELIMINADA correctamente! ✅")
                window.location.reload()

              }
              else {
                window.alert("Error al intentar eliminar la PVO")
              }

            }


          });




        }


      });
    });

  }

}


/////////////////////////////////////////////////////////////////////////

/// Click btn historial
let contador = 0
$(btn_historial).click(function () {

  if (contador === 0) {
    elementoHtml = document.createElement("span");
    texto = document.createElement("h1")
    texto.setAttribute("id", "id_texto")
    texto.setAttribute("style", "font-size:500px")

    elementoHtml.setAttribute("class", "fa fa-file-excel")
    elementoHtml.setAttribute("style", "color:green;display:flex;margin-left:95%;hover:")
    elementoHtml.setAttribute("id", "span_excel")
    elementoHtml.setAttribute("tittle", "Exportar a Excel")

    document.getElementById("tabla_asesores").innerHTML = '';
    contador = contador + 1;
    console.log(contador)
    document.getElementById("btn_historial").innerHTML = "Volver"
    document.getElementById("titulo").innerHTML = "Histórico PVO";



    document.getElementById("titulo_div").appendChild(elementoHtml)
    document.getElementById("contenedortabla").style.cssText = 'background: rgba(0, 0, 0, 0.5) '
    document.getElementById("tabla_asesores").style.cssText = 'color: white;'
    document.getElementById("titulo").style.cssText = 'color: white;'
    document.getElementById("listadoasesores").style.cssText = 'background-image: url("imagenes/descarga2.jpg");'





    search = "4 PVO"
    $.ajax({
      url: 'historico.php',
      data: { search },
      type: 'POST',
      success: function (response) {

        if (response !== "[]") {

          data = JSON.parse(response);

          let items2 = `<tr> 
            <th id="th1" class="angosto" align="center" style = "font-weight: bold; color: white;"> # </th>
            <th id="th2" class="angosto" align="center" style = "font-weight: bold; color: white;"> fecha </th>
            <th id="th3" class="angosto" align="center" style = "font-weight: bold; color: white;"> asesor </th>
            <th id="th4" class="angosto" align="center" style = "font-weight: bold; color: white;"> Tipo solicitud </th>
            <th id="th5" class="angosto" align="center" style = "font-weight: bold; color: white;"> Elaboró</th>
            <th id="th6" class="angosto" align="center" style = "font-weight: bold; color: white;"> Gestionado SAC </th>
            <th id="th7" class="angosto" align="center" style = "font-weight: bold; color: white;"> Nro. PVO</th>
            <th id="th8" class="ancho" align="center" style = "font-weight: bold; color: white;"> Datos PVO</th>
            
        </tr>    `;


          let number = 0;

          data.forEach(data => {

            number = number + 1;

            let variable = (data.novedad_id)
            let fecha1 = (data.fecha)
            let asesorname1 = (data.asesorname)
            let placa1 = (data.placa)
            let vinculadoname1 = (data.vinculadoname)
            let subtipif1 = (data.subtipif)
            let mensaje1 = (data.mensaje)
            let correo1 = (data.correo)

            array_ids.push({ "novedad_id": variable.toString(), "placa": placa1, "mensaje": mensaje1 })

            items2 += `<tr>
    
              <td class="angosto" align="center" style="border-right: 1px solid gray; padding-right: 0.2px"> ${number} </td>
              <td class="angosto" align="center" id='fecha${data.novedad_id}'> ${data.fecha} </td>
              <td class="angosto" align="center" id='asesorname${data.novedad_id}'> ${data.asesorname} </td>
              <td class="angosto" align="center" id='subtipif${data.novedad_id}'> ${data.subtipif} </td>
              <td class="angosto" align="center" id='liderpvo${data.novedad_id}'> ${data.liderpvo} </td>
              <td class="angosto" align="center" id='expedida_sac${data.novedad_id}'> ${data.expedida_sac} </td>
              <td class="angosto" align="center" style="border-right: 1px solid gray; padding-right: 0.2px padding-left: 0.2px" id='numeropvo${data.novedad_id}'> ${data.numeropvo} </td>
              <td class="ancho" align="justify" id='mensaje${data.novedad_id}'> ${data.mensaje} </td>
              
              </tr>    `;
          })


          ////////////////////////////////////////////////////////////////////

          document.getElementById("tabla_asesores").innerHTML = items2;

          $(span_excel).click(function () {

            window.alert("El archivo se descargará")

            tableToExcel('tabla_asesores', "Historial PVO")


          })






          namefunc();



        }
        else {



        }

      }


    });


  }

  else {

    if (window.confirm("¿Desea volver al menú principal?")) {

      window.location.reload()

    }


    else {

    }
  }

})



////////////////


editar();
eliminar();
colorear();
modificar();
deleter();
