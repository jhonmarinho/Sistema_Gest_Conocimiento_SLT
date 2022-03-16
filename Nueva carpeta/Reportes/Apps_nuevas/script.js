let contadorselect = 0
let contadornuevos = 0

function historialProgramaciones(datoPlaca){

  let search11=datoPlaca

  let items1=''

   $.ajax({

    url: 'historialProgramaciones.php',
    data: { search11 },
    type: 'POST',
    success: function (response) {

    if (response !== "[]") {
        let data = JSON.parse(response);
        data.forEach(data => {

        items1 += `'<option  value="${data.FECHA}">${data.FECHA}</option>'`;
        contadorselect=contadorselect+1
        
        document.getElementById("select"+datoPlaca).innerHTML = items1;

        })

    }

      else (window.alert("No se hallaron resultados de la placa"))

   }})


}

let texto

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(texto);
    }, 20000);
  });
}

function resolveAfter11Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(texto);
    }, 20005);
  });
}

async function contarNuevos(){

const result = await resolveAfter11Seconds();

const divElemento = document.getElementById("divbuscador")

const div = '<div id="divTotalNuevas" style="margin-top:1%;font-weight: 700; width: 100% ;background-color:black; color:white; font-size:0.9em;"> <p id="parrafoTotalNuevas"  style="margin:0; "> Total app programadas por primera vez: '+  contadornuevos + '</p></div>'

divElemento.insertAdjacentHTML("afterend",div)

}


async function esNuevo(placa){

  const result = await resolveAfter2Seconds();

  let string1 = "select" + placa 
  let string2 = "fecha" + placa 
  let textoselect = document.getElementById(string1).value.toString();
  
  let textofecha = document.getElementById(string2).textContent.toString();


  if (textofecha.replace(/\s+/g, '') === textoselect.replace(/\s+/g, '') ){
    let variableSioNo=document.getElementById("nuevo"+ placa)
    variableSioNo.innerHTML = 'Si <span style= "color: green;" class="fa fa-check-circle"></span>'
    contadornuevos=contadornuevos+1

  }

  else {
    let variableSioNo=document.getElementById("nuevo"+ placa)
    variableSioNo.innerHTML = 'No <span style="color: red;" class="fa fa-times-circle"></span>'

  }

  

}

var fecha=document.getElementById("input_buscador")

fecha.addEventListener("change", function () {

contadornuevos=0;
let fecha1 = fecha.value
let fecha2 = fecha1.split("-")
let search10 = {}

let testTabla_temas = !!document.getElementById("tabla_temas");
   
   
 


let testDivTotal = !!document.getElementById("divTotalNuevas");
let testParrafoTotal = !!document.getElementById("parrafoTotalNuevas");
      
      if (testDivTotal === true && testParrafoTotal === true) {
        
        padre = document.getElementById("parrafoTotalNuevas").parentNode;
		    padre.removeChild(parrafoTotalNuevas);

      }



search10 = {"MES_N": fecha2[1] , "ANIO":fecha2[0] }

let number = 0;


$.ajax({
    url: 'consulta.php',
    data: { search10 } ,
    type: 'POST',
    success: function (response) {


      if (response !== "[]") {
        let data = JSON.parse(response);
        let items = `<tr> 
          <td class="angosto" align="center" style = "padding-bottom:2%; font-weight: bold; color: rgb(56, 56, 56);"> # </td>
                    <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> PLACA </td>
          <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> NRO ORDEN </td>

          <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> NRO MOVIL </td>
          <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> FECHA PROGR</td>
          <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> EMPRESA </td>
          <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> NUEVO </td>
          
          <td class="angosto" align="center" style = "padding-bottom:2%;font-weight: bold; color: rgb(56, 56, 56);"> HISTORIAL PROG </td>
          </tr>    `;

        data.forEach(data => {

          contadorselect = 0
         
          number = number + 1;
          
          items += `<tr>
  
            <td class="angosto" align="center" style="font-weight:600;border-bottom: 1px dashed   gray;padding-right: 0.2px"> ${number} </td>
            <td class="angosto" align="center" style="font-weight:600;border-bottom: 1px dashed   gray;padding-right: 0.2px"> ${data.NRO_PLACA} </td>
            <td class="angosto" align="center" style="font-weight:600;border-bottom: 1px dashed   gray;padding-right: 0.2px"> ${data.NRO_ORDEN} </td>
            <td class="angosto" align="center" style="font-weight:600;border-bottom: 1px dashed   gray;padding-right: 0.2px"> ${data.NRO_MOVIL} </td>
            <td class="angosto" align="center" style="font-weight:600;border-bottom: 1px dashed   gray;padding-right: 0.2px" id="fecha${data.NRO_PLACA}"> ${data.FECHA} </td>
            <td class="angosto" align="center" style="font-weight:600;border-bottom: 1px dashed   gray;padding-right: 0.2px"> ${data.EMPRESA} </td>
            <td class="angosto" align="center" style="font-weight:600;border-bottom: 1px dashed   gray;padding-right: 0.2px" > <h4 style="text-align:center;margin:0px; " id="nuevo${data.NRO_PLACA}"> Cargando <span id='add_tema_span' class="fa fa-spinner"></span></h4>  </td>
            <td class="angosto" align="center" style="font-weight:600;border-bottom: 1px dashed   gray;padding-right: 0.2px"> <select id="select${data.NRO_PLACA}" class="selectclass"></select></td>
            
            </tr>    `;

        document.getElementById("tabla_temas").innerHTML = items;



        ///Aquí iría la función que mediante Ajax me daría el historial de cada placa.
          historialProgramaciones(data.NRO_PLACA);
          

          esNuevo(data.NRO_PLACA);

          





      })
      
      //Contador de registros nuevos
      contarNuevos();

      }

      else {
        itemNull = `No hay resultados para el periodo consultado`;
        document.getElementById("tabla_temas").innerHTML = itemNull;
      }

    }


  })

})

//Exportar a excel
  $(btn_agregar).click(function () {

            window.alert("El archivo se descargará")

            tableToExcel('tabla_temas', "Historial programaciones")


          })