let array_ids = []
$(document).ready(function () {


  $('#contenedor_add_box').hide()

  cargartemas();

});

$('#input_buscador').keyup(function () {
  let terminoclave = $('#input_buscador').val()

  if (terminoclave === "") {

    cargartemas();

  }

  else {
    let terminoclave = $('#input_buscador').val()
    search = terminoclave
    $.ajax({
      url: 'selectfiltro.php',
      data: { search },
      type: 'POST',
      success: function (response) {

        if (response !== "[]") {
          data = JSON.parse(response);

          let items1 = `<tr> 
        <td class="angosto" align="center" style = "padding-bottom:2%; font-weight: bold; color: rgb(56, 56, 56);"> # </td>
        <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> TEMA </td>
        <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> DESCRIPCIÓN </td>
        
    </tr>    `;


          let number = 0;

          data.forEach(data => {

            number = number + 1;

            let id = (data.id)
            let tema = (data.tema)
            let descripcion = (data.descripcion)

            array_ids.push({ "id": id.toString(), "tema": tema, "descripcion": descripcion })

            items1 += `<tr>

          <td class="angosto" align="left" style="font-weight:600;border-bottom: 1px dashed   gray;padding-right: 0.2px"> ${number} : </td>
          <td class="angosto" align="left" style="border-bottom: 1px dashed gray;" id='tema${data.id}'> ${data.tema} </td>
          <td class="ancho" align="left" style="border-bottom: 1px dashed  gray" id='descripcion${data.id}'> ${data.descripcion} </td>
          <td align="left"> <span style="padding-right:5px;padding-left:5px; color:#3e3e3e;padding-bottom:5px;" id='deleteid${data.id}' class="fa fa-trash"></span></td>
          </tr>    `;
          })


          ////////////////////////////////////////////////////////////////////

          document.getElementById("tabla_temas").innerHTML = items1;

        }
        else {

          itemNull = `<tr > <td style="color:gray; font-weight: 600"> No hay temas que coincidan con la búsqueda.  
    </td> </tr>    `;
          document.getElementById("tabla_temas").innerHTML = itemNull;
        }

      }


    });
  }



});


function cargartemas() {
  search = "1"
  $.ajax({
    url: 'select.php',
    data: { search },
    type: 'POST',
    success: function (response) {

      if (response !== "[]") {
        data = JSON.parse(response);

        let items1 = `<tr> 
          <td class="angosto" align="center" style = "padding-bottom:2%; font-weight: bold; color: rgb(56, 56, 56);"> # </td>
          <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> TEMA </td>
          <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> DESCRIPCIÓN </td>
          
      </tr>    `;


        let number = 0;

        data.forEach(data => {

          number = number + 1;

          let id = (data.id)
          let tema = (data.tema)
          let descripcion = (data.descripcion)

          array_ids.push({ "id": id.toString(), "tema": tema, "descripcion": descripcion })

          items1 += `<tr>
  
            <td class="angosto" align="left" style="font-weight:600;border-bottom: 1px dashed   gray;padding-right: 0.2px"> ${number} : </td>
            <td class="angosto" align="left" style="border-bottom: 1px dashed gray;" id='tema${data.id}'> ${data.tema} </td>
            <td class="ancho" align="left" style="border-bottom: 1px dashed  gray" id='descripcion${data.id}'> ${data.descripcion} </td>
            <td align="left"> <span style="padding-right:5px;padding-left:5px; color:#3e3e3e;padding-bottom:5px;" id='deleteid${data.id}' class="fa fa-trash"></span></td>
            </tr>    `;
        })


        ////////////////////////////////////////////////////////////////////

        document.getElementById("tabla_temas").innerHTML = items1;

      }
      else {

        itemNull = `<tr > <td style="color:gray; font-weight: 600"> No hay temas que coincidan con la búsqueda.  
      </td> </tr>    `;
        document.getElementById("tabla_temas").innerHTML = itemNull;
      }

    }


  });

};

$('#btn_agregar').click(function () {

  $('#contenedor_add_box').show();


})
$('#btn_add_cerrar').click(function () {

  $('#contenedor_add_box').hide()


})

$('#btn_add').click(function () {

  añadirtema();

})

//PROMESA PARA CARGAR ARRAY CON LOS ID'S, TEMA, ETC..
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(array_ids);
    }, 100);
  });
}

//FUNCIÓN BORRAR TEMA
async function deleter() {

  const result = await resolveAfter2Seconds();

  if (array_ids !== []) {

    let variable_deleter = ""

    array_ids.forEach(item => {

      variable_deleter = "#deleteid" + item.id


      //Escuchar que variable se ha seleccionado para editar

      $(document).on("click", variable_deleter, function (e) {
        window.scroll(0, 0);

        let mssg = "⚠️ Usted ha seleccionado eliminar el tema: \n" + item.tema + "\n\n -Se eliminará el tema definitivamente. No podrá visualizarse en PREGUNTAS FRECUENTES del SGC. \n\n ¿Desea continuar?"


        if (window.confirm(mssg)) {

          let search5 = item.id

          $.ajax({
            url: 'deleter.php',
            data: { search5 },
            type: 'POST',
            success: function (response) {

              if (response == "exitoso") {
                window.alert("TEMA:  " + item.tema + ", ELIMINADO correctamente! ✅")
                window.location.reload()

              }
              else {
                window.alert("Error al intentar eliminar el tema")
              }

            }


          });




        }


      });
    });

  }

}

deleter();

function añadirtema() {

  //primero preparar la data que se va a enviar a base de datos para no generar errores de caractéres no ASCII

  let titulo = $('#input_tema').val()
  let descripcion = $('#input_descripcion').val()

  //funciones para eliminar acentos y caractéres NO ASCII.
  const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function eliminar_No_ASCII(dato) {

    let string_ingresado = removerAcentos(dato);
    let final = string_ingresado.replace(/[\u{0080}-\u{FFFF}]/gu, "");

    return final;

  }

  let titulo_final = eliminar_No_ASCII(titulo);
  let descripcion_final = eliminar_No_ASCII(descripcion);

  let search5 = {
    'tema': titulo_final,
    'descripcion': descripcion_final
  }


  console.log(search5);

  $.ajax({
    url: 'addnew.php',
    data:  {search5},
    type: 'POST',
    success: function (response) {
      console.log(response);

      if (response == "exitoso") {
        window.alert("Se ha agregado el tema: " + titulo_final + " correctamente! ✅")
        $("#contenedor_add_box").css("display", "none");
        window.location.reload()
      }

      else {
        window.alert("Error al intentar agregar el tema: " + titulo_final + "Asegúrese de llenar los dos campos para poder realizar el cargue de información.")
        $("#contenedor_add_box").css("display", "none");
      }

    }


  });







  //titulo_sin_tildes=removeAccents(titulo)
  //titulo_sin_ASCCI=titulo_sin_tildes.replace(/[\u{0080}-\u{FFFF}]/gu,"");


  //descripcion_sin_tildes=removeAccents(descripcion)
  //descripcion_sin_ASCCI=descripcion_sin_tildes.replace(/[\u{0080}-\u{FFFF}]/gu,"");






  //let titulo_no_ASCII=titulo.replace(/[\u{0080}-\u{FFFF}]/gu,"");
  //let descripcion_no_ASCII=descripcion.replace(/[\u{0080}-\u{FFFF}]/gu,"");
  //console.log(titulo_no_ASCII)
  //console.log(descripcion_no_ASCII)

}



