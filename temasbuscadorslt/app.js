let array_ids=[]
$(document).ready(function () {
    
    cargartemas();

})



function cargartemas() {
    search = "1"
    $.ajax({
      url: 'select.php',
      data: { search },
      type: 'POST',
      success: function (response) {
          console.log("Resultado de la consulta: ")
          console.log(response)
  
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
            <td align="left"> <span style="padding-right:5px;padding-left:5px;padding-bottom:5px;color:#3e3e3e;" id='modificarid${data.id}' class="fa fa-pencil"></span></td>
            <td align="left"> <span style="padding-right:5px;padding-left:5px; color:#3e3e3e;padding-bottom:5px;" id='deleteid${data.id}' class="fa fa-trash"></span></td>
            </tr>    `;
          })
  
  
          ////////////////////////////////////////////////////////////////////
  
          document.getElementById("tabla_temas").innerHTML = items1;
  
        }
        else {
  
          itemNull = `<tr > <td style="color:gray; font-weight: 600"> No hay temas en la base de datos.  
      </td> </tr>    `;
          document.getElementById("tabla_temas").innerHTML = itemNull;
        }
  
      }
  
  
    });
  
  };

