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
    players[socket.id] = new units.Knight('Артур');
    io.sockets.emit('Player', {
      player:players[socket.id],
      id:socket.id
    });
    
    
  });



  socket.on("Attack", function(data){
  
  console.log(data);
  });

  
  socket.on('mouse', function(data) {
    let a = {
      x:players[socket.id].x-data.x,
      y:players[socket.id].y-data.y
  }
let b = {
  x:players[socket.id].x-data.x,
  y:0
}

players[socket.id].angle = Math.acos((a.x**2)/(Math.sqrt(a.x**2+a.y**2)*Math.sqrt(b.x**2)));
// console.log(180/Math.PI*angle);
if(data.x > players[socket.id].x && data.y > players[socket.id].y){
  players[socket.id].angle += Math.PI;
}else if(data.x > players[socket.id].x){
  players[socket.id].angle = Math.PI-players[socket.id].angle;
}else if(data.y > players[socket.id].y){
  players[socket.id].angle = Math.PI*2-players[socket.id].angle;
}
  });


  
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= data.speed;
    }
    if (data.up) {
      player.y -= data.speed;
    }
    if (data.right) {
      player.x += data.speed;
    }
    if (data.down) {
      player.y += data.speed;
    }
});
setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);

});
