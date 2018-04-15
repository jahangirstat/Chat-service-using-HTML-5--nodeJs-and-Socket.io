var http = require('http');
var express = require('express');
var io = require('socket.io');
var app = express();
var server = http.createServer(app);
var ioServer = io.listen(server);
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html')
})
var users = [];
var rooms = [];
ioServer.sockets.on("connection", function (socket) {
    socket.on("adduser", function (userName) {
        console.log(userName.name + ' connected');
        socket.username = userName.name;
        socket.room = userName.group;
        socket.join(userName.group);
        users.push(userName.name);
        rooms.push(userName.group);
        ioServer.sockets.emit("updateUser", users);
        socket.emit("message", { from: "Server", content: socket.username + " just joined in :<b>" + socket.room +'</b>' });
        socket.broadcast.to(socket.room).emit("message", {
            from: "Server", content: socket.username + ' has connected to  <b>' + socket.room + '</b>'
        });
    });
    socket.on("chat", function (data) {    
        socket.broadcast.in(socket.room).emit("message", { from: socket.username, content: data })     
        socket.emit("message", { from: "You", content: data });
    });
    socket.on('userImage', function (data) {
        socket.broadcast.in(socket.room).emit("addimage", { from: socket.username, content: data })
        socket.emit("addimage", { from: "<b>You</b>", content: data });
    });

    socket.on("disconnect", function () {
        console.log(socket.username +" disonnected");
        users.splice(users.indexOf(socket.username), 1);
        socket.broadcast.to(socket.room).emit("message", {
            from: "Server", content: socket.username + ' just disconnected from <b>' + socket.room + '</b>'
        });
        socket.disconnect();
        ioServer.sockets.emit("updateUser", users);
        socket.leave(socket.room);
    });
});
server.listen(8890);
console.log("Server running on port : 8890")
