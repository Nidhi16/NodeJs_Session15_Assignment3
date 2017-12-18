var http = require('http');
var fs = require('fs');

// Send index.html to all requests
var app = http.createServer(function (request, response) {
   response.writeHead('200', {'Content-Type': 'text/html'});
   fs.readFile('./index.html', function (err, data) {
       response.write(data);
       response.end();
   });
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket){
    console.log("a user is connected");
    socket.emit('hello', {'server': 'This is server'});
    socket.on('hi', function (data) {
        console.log(data.client);
    });
});

// Listening to the port 8000
app.listen(8000, function () {
    console.log("Listening on port 8000");
});