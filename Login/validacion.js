

$("#btn_ingresar").click(function () {


    var username = $("#input_username").val()
    var password_user = $("#input_password").val()

    if (username == "" || password_user == "") {
        window.alert("Ingrese credenciales de usuario y/o contraseña")
    }

    else {

        $.ajax({
            url: 'autenticacion.php',
            data: {
                'username': username,
                'password_user': password_user
            },

            type: 'POST',
            success: function (response) {
                console.log(response)
                console.log(typeof (response))
                console.log(response.lenght)

                if (response == "[]") {
                    window.alert("Las credenciales ingresadas no son válidas")
                    window.location.reload()
                }

                else {

                    var data = JSON.parse(response);
                    console.log(data)
                    var validarusuario=data[0]['usuario']
                    console.log(validarusuario)

                    if (validarusuario.match(/pvo.*/)){


                        window.alert("¡Bienvenid@ "+data[0]['nombre']+" "+data[0]['apellidos']+"!")
                        location.href = "../adminpvo/adminpvo.html";


                    }
                    
                    else if (validarusuario.match(/buscadorslt.*/)) {

                        window.alert("¡Bienvenid@ "+data[0]['nombre']+" "+data[0]['apellidos']+"!")
                        location.href = "../temasbuscadorslt/index.html";

                    }

                    else{

                        
                        window.alert("¡Bienvenid@ "+data[0]['nombre']+" "+data[0]['apellidos']+"!")
                        location.href = "../ingresoasesores/ingreso_asesores.html";

                    }
                    
                }

            },
        }
        );
    }
})

$("#input_password").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#btn_ingresar").click();
    }
  });
  

$("#input_username").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#btn_ingresar").click();
    }
  });