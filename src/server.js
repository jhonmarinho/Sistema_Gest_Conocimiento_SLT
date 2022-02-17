const formateadorfecha = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'medium' });
//create a new WebSocket object.
	var msgBox = $('#contenedorchat');
	var wsUri = "ws://localhost:8080/formconductores/src"; 	
	websocket = new WebSocket(wsUri); 
	
	websocket.onopen = function(ev) { // connection is open
		
		msgBox.append('<div class="system_msg" style="color:rgb(43, 43, 43)">¡Bienvenido al Chat SLT!</div>'); //notify user
		
		let search7 = "hello"

		$.ajax({
			
			url: 'selectchats.php',
			data: { search7 },
			type: 'POST',
			success: function (response) {

				if (response !== "[]") {
					
					
					let data = JSON.parse(response);
					console.log("oe llave: "+typeof(data));
					let ultimosChats = data.slice(data.length-5, data.length);
					ultimosChats = ultimosChats.reverse();

					console.log(data);
					console.log(ultimosChats);
					console.log(typeof(ultimosChats));

					let items = '<div class="system_msg" style="color:rgb(43, 43, 43)">¡Bienvenido al Chat SLT!</div>';
					let items_txt_movil = 'Mensajes recientes chat SLT: ';
					
					data.forEach(data => {				
		
					  items += `<p style="max-width=100%; word-break: break-all;margin-top:1%;margin-bottom:0px">
					  <span style="max-width=100%; margin-bottom:0px;word-break: break-all;" class="user_name"
					   >${data.asesorname}</span><p  class="user_message">
					 ${data.msg}</p><p class="time_stamp" >${data.time_stamp.date}</p></p> `
					})

					ultimosChats.forEach(data => {

						items_txt_movil += ` ${data.asesorname} (${data.time_stamp.date}): ${data.msg} |  `;


					})
					
					document.getElementById("contenedorchat").innerHTML = items;
					document.getElementById("movil_txt").innerHTML = items_txt_movil;
			
					
			
				  }
				  else {
						console.log("Fallo en cargar chats previos")
				  }


			}
		
		})




	}
	// Message received from server
	websocket.onmessage = function(ev) {

		var response 		= JSON.parse(ev.data); //PHP sends Json data
		
		console.log('Respuesta del servidor') 
		console.log(response) 

		var res_type 		= response.type; //message type
		var user_message 	= response.message; //message text
		var user_name 		= response.name; //user name
		var user_color 		= response.color; //color

		switch(res_type){
			case 'usermsg':
				if (user_name != null && user_message != null){
					const timeStamp = Date.now();
				const fechaFormateada = formateadorfecha.format(timeStamp);
				msgBox.append('<p style="max-width=100%; word-break: break-all;margin-top:1%;margin-bottom:0px"><span style="max-width=100%; margin-bottom:0px;word-break: break-all;" class="user_name" style="color:' + user_color + '">' +  user_name  + '</span> : <p  class="user_message">' + user_message + '</p><p class="time_stamp">'+fechaFormateada+'</p></p>');
				break;
				}
				
			case 'system':
				//msgBox.append('<div style="color:#bbbbbb">' + user_message + '</div>');
				break;
		}

		msgBox[0].scrollTop = msgBox[0].scrollHeight; //scroll message 

	};
	
	websocket.onerror	= function(ev){ msgBox.append('<div class="system_error">Error Occurred - ' + ev.data + '</div>'); }; 
	websocket.onclose 	= function(ev){ msgBox.append('<div class="system_msg">Connection Closed</div>'); }; 

	//Message send button
	$('#sendchat').click(function(){
		event.preventDefault();
		send_message();
	});
	
	//User hits enter key 
	$("#inputchat").keyup(function (event) {
		if (event.keyCode === 13) {
			
		  $("#sendchat").click(function(){
			event.preventDefault();
			send_message();
		});
		}
	  });


	
	//Send message
	function send_message(){
		
		var message_input = $('#inputchat'); //user message text
		var name_input = $('#asesorname'); //user name
		
		if(name_input.val() == "NULL"){ //empty name?
			alert("Seleccione nombre del asesor, porfavor!");
			return;
		}
		if(message_input.val()== ""){ //empty message?
			alert("Escriba algún mensaje, por favor!");
			return;
		}

		//prepare json data
		var msg = {
			message: message_input.val(),
			name: name_input.val(),
			color : '<?php echo $colors[$color_pick]; ?>'
		};


		let search6 = {
			'asesorname': name_input.val(),
			'msg': message_input.val()
		  }

		$.ajax({
			url: 'logChat.php',
			data: { search6 },
			type: 'POST',
			success: function (response) {

				if (response == "exitoso"){
					console.log("Se guardó el mensaje en la b.d")
				}

				else {
					console.log("No se guardó el mensaje en la b.d")
				}



			}
		
		})
		
		

		//convert and send data to server
		websocket.send(JSON.stringify(msg));	
		message_input.val(''); //reset message input
	}
