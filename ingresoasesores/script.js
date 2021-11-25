/////variables globales
let data
let array_ids = [];
//////////////////////////

///Se ejecuta cuando inicia: oculta la ventana de editar, tecla enter hace click en el boton enviar/////////////////////

$(document).ready(function () {

  $("#contenedor_editar_box").css("display", "none");
  $("#inputasesor").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#botoningresoasesor").click();
    }
  });

  $("#input_editar").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#btn_editar").click();
    }
  });

  refrescar();
})
//////////////////////////////////////////////////////////


function refrescar() {
  search = "SI"

  $.ajax({
    url: 'select.php',
    data: { search },
    type: 'POST',
    success: function (response) {

      if (response !== "[]") {
        data = JSON.parse(response);

        let items1 = `<tr> 
        <td style = "font-weight: bold; color: rgb(56, 56, 56);"> # </td>
        <td style = "font-weight: bold; color: rgb(56, 56, 56);"> Nombre Asesor </td>
        <td style = "font-weight: bold; color: rgb(56, 56, 56);"> Activo </td>
        
    </tr>    `;


        let number = 0;

        data.forEach(data => {

          number = number + 1;

          let variable = (data.id)
          let nombre1 = (data.asesorname)
          
          array_ids.push({ "id": variable.toString(), "asesorname": nombre1 })

          items1 += `<tr>

          <td> ${number} </td>
          <td id='asesornameid${data.id}'> ${data.asesorname} </td>
          <td id='activoid${data.id}'> ${data.activo} </td>
          <td> <span id='editarid${data.id}' class="fa fa-edit"></span></td>
          <td> <span id='eliminarid${data.id}' class="fas fa-user-times"></span></td>
          </tr>    `;
        })


        ////////////////////////////////////////////////////////////////////




        document.getElementById("tabla_asesores").innerHTML = items1;

      }
      else {
        itemNull = "--No hay resultados--";
        document.getElementById("tabla_asesores").innerHTML = itemsNull;
      }

    }


  });
  document.getElementById("inputasesor").value = "";
};

///////////////////////////////////////////////////////////

function resolveAfter1Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(array_ids);
    }, 1000);
  });
}

//////////FUNCIÓN ELIMINAR///////////////////
async function eliminar() {

  const result = await resolveAfter1Seconds();
  

  //Función eliminar
  if (array_ids !== 0) {

    let variable_eliminar = ""
    let variable_editar = ""

    array_ids.forEach(item => {

      variable_eliminar = "#eliminarid" + item.id
      variable_editar = "#editarid" + item.id

      //Escuchar que variable se ha seleccionado para eliminar

      $(document).on("click", variable_eliminar, function (e) {

        console.log("Usted ha seleccionado *eliminar* al asesor "+ item.asesorname+" con id: " + item.id);

        if (confirm('⚠️ Realmente desea eliminar a este asesor?')) {
          event.preventDefault();

          let search2 = item.id

          $.ajax({
            url: 'eliminar.php',
            data: { search2 },
            type: 'POST',
            success: function (response) {
              console.log(response);
              if (response !== "[]") {
                window.alert("✅ Asesor "+ item.asesorname+", ELIMINADO exitosamente.")
                window. location. reload();
              }
              else {
                window.alert("Error al intentar eliminar al asesor")
              }
  
            }
  
  
          });
        }
        

      });



    });


  }


};

/////////////FUNCIÓN EDITAR//////////////////
async function editar() {

  const result = await resolveAfter1Seconds();
  console.log(result);

  if (array_ids !== 0) {

    let variable_eliminar = ""
    let variable_editar = ""

    array_ids.forEach(item => {

      variable_eliminar = "#eliminarid" + item.id
      variable_editar = "#editarid" + item.id
    

      //Escuchar que variable se ha seleccionado para editar

      $(document).on("click", variable_editar, function (e) {
        window.scroll(0, 0);

        console.log("Usted ha seleccionado *editar* al asesor " + item.asesorname + " con ID: " + item.id);
      

        $(btn_editar).click(function () {

          let actualizadoname = document.getElementById("input_editar").value
        
          $.ajax({
            url: 'editar.php',
            data: {
              'id': item.id,
              'actualizadoname': actualizadoname,
            },
            type: 'POST',
            success: function (response) {
              console.log(response);
              if (response == "exitoso") {
                window.alert("¡Asesor " + actualizadoname + " EDITADO correctamente! ✅")
                
                $("#contenedor_editar_box").css("display", "none");
                window. location. reload()
              }
              else {
                window.alert("Error al editar nuevo asesor")
                $("#contenedor_editar_box").css("display", "none");
              }

            }


          });


        });


        //Mostrando div de actualización de asesor

        document.getElementById("contenedor_editar_box").style.display = '';

        document.getElementById("input_editar").value = item.asesorname

      });
    });
    
  }
};

//funcionalidad y validación del botón 'AÑADIR' asesor.
$("#botoningresoasesor").click(function () {

  let search1 = document.getElementById("inputasesor").value;

  if (search1 == "") {
    window.alert("Ingrese un valor válido")
  }

  else {
    console.log("El valor de asesor que se envia por ajax es: " + search1);

    $.ajax({
      url: 'agregar.php',
      data: { search1 },
      type: 'POST',
      success: function (response) {
        console.log(response);
        if (response !== "[]") {

          window.alert("¡Asesor " + search1 + " AGREGADO correctamente! ✅")
          window.location.reload();
        }
        else {
          window.alert("Error al agregar nuevo asesor")
        }

      }


    });

  }

});
/////////////////////////////////////////////////////////

//función para ocultar la ventana de editar

function ocultar_editar() {
  $("#contenedor_editar_box").hide(300);
  window.location.reload();
}
//////////////////////////////////////////////////////////

editar();
eliminar();
