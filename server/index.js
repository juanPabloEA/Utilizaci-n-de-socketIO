var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//carga la vista estatica
app.use(express.static('client'));

//permite acceder a una ruta del servidor 
app.get('/hola-mundo',function(req,res){
	res.status(200).send('Hola mundo desde una ruta');
});
//conexion con socket io
io.on('connection', function(socket){
	console.log("el nodo con IP"+ socket.handshake.adrres+" se a conectado...");
});
//se inicia el servidor indicando el puerto junto con un mensaje
server.listen(6677, function(){
	console.log('Servidor esta funcionando en http://localhost:6677');
});

