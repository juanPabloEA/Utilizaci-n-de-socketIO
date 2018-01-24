var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//carga la vista estatica
app.use(express.static('client'));
//Array de los mensajes
var messages = [{
	id:1,
	text: 'Bienveniudo al chat privado de Socket.IO y nodeJS de Juan Pablo...',
	nickname: 'Bot - juanpabloweb.cl'
}];
//permite acceder a una ruta del servidor 
app.get('/hola-mundo',function(req,res){
	res.status(200).send('Hola mundo desde una ruta');
});
//conexion con socket io
io.on('connection', function(socket){
	console.log("el nodo con IP"+ socket.handshake.adrres+" se a conectado...");
	//se envia el mensaje a todos los clientes
	socket.emit('messages',messages);
	socket.on('add-message',function(data){
		messages.push(data);
		io.sockets.emit('messages',messages);
	});
});
//se inicia el servidor indicando el puerto junto con un mensaje
server.listen(6677, function(){
	console.log('Servidor esta funcionando en http://localhost:6677');
}); 

 