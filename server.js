const express = require('express');
const session = require('express-session')
const app = express();
const server = app.listen(8000, function(){
    console.log('listening on 8000')
});
app.set("views",__dirname +'/views');
app.set("views engine", 'ejs');

app.get('/', function(req,res){
    res.render('index.ejs')
});

//socket setup

const io = require('socket.io')(server);
var counter = 0;

io.on('connection', function (socket){
    socket.on('count clicked', function () {
        counter++;
        io.emit('count', {response:counter});
    });
});

io.on('connection', function (socket){
    socket.on('reset', function () {
        counter=0;
        io.emit('reseting',{x:0});
    });
});


    