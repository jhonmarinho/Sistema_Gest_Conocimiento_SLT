let number = 0;

function cargar() {

number = 0;
let items

let search10 = {}

$.ajax({
    url: 'consulta.php',
    data: { search10 } ,
    type: 'POST',
    success: function (response) {

      if (response !== "[]") {
        let data = JSON.parse(response);

        data.forEach(data => {

          number = number + 1;
         
          const divElemento = document.getElementById("tabla_temas")      
          
          const row_table = `<tbody>
          
          <tr>
  
            <td  > ${number} </td>
            <td class="angosto"  > ${data.PLACA} </td>
            <td class="angosto"  > ${data.ORDEN} </td>
            <td class="angosto"  > ${data.EMPRESA} </td>
            <td class="ancho"  > ${data.DESCRIPCION} </td>
            <td class="angosto"  > ${data.NRO_DOCUMENTO} </td>
            <td class="angosto"  > ${data.NOMBRES} </td>
            <td class="angosto"  > ${data.APELLIDOS} </td>
            <td class="angosto"  > ${data.IDENTIFICADOR} </td>
            <td class="angosto"  > ${data.ROL} </td>
            <td class="angosto"  > ${data.CONDUCE} </td>
            <td class="angosto"  > ${data.TELEFONO} </td>
            <td class="angosto"  > ${data.CELULAR} </td>
                        </tr>    </tbody>`;

            divElemento.insertAdjacentHTML("beforeend",row_table)
           

      })
      
  

      }

      else {
        console.log(response)
        itemNull = `No hay resultados`;
        document.getElementById("tabla_temas").innerHTML = itemNull;
      }

    }


  })



};
///

cargar();
borrar()

let texto
function resolveAfter1Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(texto);
    }, 1000);
  });
}


async function borrar(){

  const result = await resolveAfter1Seconds();

  document.getElementById("parrafoEnBreve").innerHTML =number+" Registros cargados exitosamente! "+'<i style="color:green;" class="fas fa-check-circle"></i>'

}

//Exportar a excel

btn_agregar.onclick = () => {

      if(window.confirm("¿Realmente desea descargar el archivo?")){

             //tableToExcel("tabla_temas", "Historial programaciones")
            
            function Export() {
            $("#tabla_temas").table2excel({

              name: "Worksheet",
              filename: "SomeFile", 
              fileext: ".xlsx"

            });
          }

             Export();
  

      }

 
};


