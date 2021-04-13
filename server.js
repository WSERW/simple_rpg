// Зависимости
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
var units = require('./script')
// import {Knight,Unit,Archer,Wizard} from './script.js';

// Маршруты
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
server.listen(5000, function() {
    console.log('Запускаю сервер на порте 5000');
});

// Обработчик веб-сокетов
io.on('connection', function(socket) {
});

setInterval(function() {
    io.sockets.emit('message', 'hi!');
}, 1000);


var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    players[socket.id] = new units.Archer('Артур');
    io.sockets.emit('player', {
      player:players[socket.id],
      id:socket.id
    });
    // io.sockets.emit('players', players);
  });



  socket.on("Attack", function(data){
    console.log(data);
  });

setInterval(function() {
  io.sockets.emit('players', players);
}, 1000 / 60);

});
