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

var pl = [];
var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function(data) {
    if(data.cl=="Knight"){
      players[socket.id] = new units.Knight(data.name);
   
    players[socket.id].weapon = {
      	name: 'axe',
      	dmg: 5,
      	say: 0
      }
    }else if(data.cl=="Archer"){
     
      players[socket.id] = new units.Archer(data.name);
    players[socket.id].weapon = {
      	name: 'bow',
      	dmg: 15,
      	say: 3
      }
    }else if(data.cl=="Wizard"){
     
      players[socket.id] = new units.Wizard(data.name);
    players[socket.id].weapon = {
      	name: 'stick',
      	dmg: 10,
      	say: 1
      }
    }else{
      console.log(data.cl);
    }
    
    pl.push(players[socket.id]);
    io.sockets.emit('Player', {
      player:players[socket.id],
      id:socket.id,
      my:pl.length-1
    });
    // io.sockets.emit('players', players);
  });



 socket.on("Attack", function(data){
    console.log(data);
      player[data.self].hitEnemy(player[data.enemy]);
  });

setInterval(function() {
  io.sockets.emit('players', players); 
}, 1000 / 60);

});
