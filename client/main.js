var socket = io.connect('http://192.168.0.7:6677',{'forceNew':true});
//recoge el mensage del socket abierto
socket.on('messages', function(data){
	console.log(data);
	render(data);
});
//funcion que renderiza el mensaje en el html
function render(data){
	//map sirve para recorrer el dato enviado
	var html = data.map(function ( message, index ){
		return (` <div class="message">
					<strong>${message.nickname}</strong> dice:
					<p>${message.text}</p>
				</div>
				`);
	}).join(' ');
	var div_msgs = document.getElementById('messages');
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeight;
}
//funcion que recoge el mensage enviado desde el form
function addMessage(e){
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};
	document.getElementById('nickname').style.display = 'none';
	document.getElementById('text').value = "";

	socket.emit('add-message',message);
	return false;
}