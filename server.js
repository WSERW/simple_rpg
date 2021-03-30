// Зависимости
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.Server(app);
app.set('port',5000);
app.use('/static',express.static(__dirname + '/static'));

// Маршруты
app.get('/',function(request, response){
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера

server.listen(5000,function(){
    console.log('Запуск сервера на порте 5000');
});
