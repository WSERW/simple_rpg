// Зависимости
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server,{pingTimeout: 60000});
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
var units = require('./script');
var en = "";
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



var pl = [];
var players = {};
let chat = [];
io.on('connection', function(socket) {
  setInterval(function() {
    socket.emit('players', players); 
    
  }, 1000);
  socket.on('new player', function(data) {
  	
    if(data.cl=="Knight"){
      players[socket.id] = new units.Knight(data.name);
   
    players[socket.id].weapon = {
      	name: 'axe',
      	dmg: 5,
      	say: 0
      }
      players[socket.id].additem("barrier");
      players[socket.id].additem("wall");
      
    }else if(data.cl=="Archer"){
     
      players[socket.id] = new units.Archer(data.name);
    players[socket.id].weapon = {
      	name: 'bow',
      	dmg: 15,
      	say: 3
      }
      players[socket.id].additem("barrier");
      players[socket.id].additem("wall");
    }else if(data.cl=="Wizard"){
     
      players[socket.id] = new units.Wizard(data.name);
    players[socket.id].weapon = {
      	name: 'stick',
      	dmg: 10,
      	say: 1
      }
      players[socket.id].additem("barrier");
      players[socket.id].additem("wall");
    }else{
      
      socket.emit("Info", pl);
    }
  	console.log(players)
    
    pl.push({
      player:players[socket.id],
      id:socket.id
    });
    
    // io.sockets.emit('Player', {
    //   player:players[socket.id],
    //   id:socket.id,
    //   my:pl.length-1
    // });
    // io.sockets.emit('players', players);
  });



 socket.on("Attack", function(data){
   
    
    for(var i = 0; i<pl.length; i++){
      if(pl[i].player.name==data.enemy){
        en=pl[i].id;
        console.log(en);
        console.log(data.enemy);
        console.log(players[en].name);
      players[data.self].hitEnemy(players[en]);
      socket.emit("Info",players[data.self].name + " атакует " + players[en].name);
        break;
      }
    }
    
    
  });

  socket.on("Use", function(data){
   
    
    for(var i = 0; i<pl.length; i++){
      if(pl[i].player.name==data.enemy){
        en=pl[i].id;
        console.log(en);
        console.log(data.enemy);
        console.log(players[en].name);
      players[data.self].use(data.using,players[en]);
      socket.emit("Info",players[data.self].name + " использует на " + players[en].name + " " + data.using);
        break;
      }
    }
    
    
  });

 socket.on("Aim", function(data){
  socket.emit("Info",players[data.self].name + " концентрируется");
      players[data.self].aiming();
  });
  socket.on("Speeding", function(data){
    socket.emit("Info",players[data.self].name + " готовится к уклонению");
    players[data.self].speeding();
});
socket.on("Shield", function(data){
  socket.emit("Info",players[data.self].name + " защищается");
  players[data.self].shield();
});
socket.on("Healthing", function(data){
  socket.emit("Info",players[data.self].name + " лечится");
  players[data.self].healthing();
});


socket.on("Exit", function(data){
  
  
    for(let i=0;i<pl.length;i++){
    if(data==pl[i].id){
     delete pl[i];
    }
  }
  delete players[data];
  
  
});

socket.on("Send", function(data){
console.log(data);
chat.push(data);
if(chat.length>15){
  chat.shift();
}
socket.emit("Chat", chat);
});

setInterval(function() {
socket.emit("Chat", chat);
  
}, 1000);

});
