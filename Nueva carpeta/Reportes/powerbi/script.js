window.onload = function() {
   hider();
  };


function hider() {

    //Mostrando ventana de requisitos expedición de P.V.O
    document.getElementById("modal_wrap1").style.display = 'none';

  };


$(document).on('click','.miniaturaClass', function(){

     const idElemento=this.id
      console.log("el id del elemento clickeado es: "+this.id)
      let location=''
      switch(idElemento){

        case "miniatura1":
        location="https://app.powerbi.com/reportEmbed?reportId=11c91cb9-8693-4fdf-8f75-500aca0a4d62&autoAuth=true&ctid=c691d266-b63d-49ba-b97b-d0acde93cc18&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWNlbnRyYWwtdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
        $('#iframe1').attr('src', location);
        document.getElementById("modal_wrap1").style.display = '';
        break

        case "miniatura2":
        location="https://app.powerbi.com/reportEmbed?reportId=63871638-cfa0-4e66-ad67-2424f64a4f8d&autoAuth=true&ctid=c691d266-b63d-49ba-b97b-d0acde93cc18&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWNlbnRyYWwtdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
        $('#iframe1').attr('src', location);
        document.getElementById("modal_wrap1").style.display = '';
        break

        case "miniatura3":
        location="https://app.powerbi.com/reportEmbed?reportId=cb6c33f0-4061-4ce2-807a-8b1ca6b28503&autoAuth=true&ctid=c691d266-b63d-49ba-b97b-d0acde93cc18&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWNlbnRyYWwtdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
        $('#iframe1').attr('src', location);
        document.getElementById("modal_wrap1").style.display = '';
        
        break
      
    }

 });

 

