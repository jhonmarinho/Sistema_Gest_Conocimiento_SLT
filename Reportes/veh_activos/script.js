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
        console.log(data);

        data.forEach(data => {

          number = number + 1;
         
          const divElemento = document.getElementById("tabla_temas")      
          
          const row_table = `<tr>
  
            <td  > ${number} </td>
            <td class="angosto"  > ${data.PLACA} </td>
            <td class="angosto"  > ${data.ORDEN} </td>
            <td class="angosto"   > ${data.MOVIL_SATELITAL} </td>
            <td class="angosto"  > ${data.FECHA} </td>
            <td class="angosto"  > ${data.EMPRESA} </td>
                        </tr>    `;

            divElemento.insertAdjacentHTML("beforeend",row_table)
           

      })
      
  

      }

      else {
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
$(btn_agregar).click(function () {

    window.alert("El archivo se descargará")

    tableToExcel("tabla_temas", "Historial programaciones")



})