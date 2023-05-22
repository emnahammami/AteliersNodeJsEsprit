const http = require("http");
const app = require("./app.js");

/*const server = http.createServer(app);

server.listen(3003);*/
const port =3003;
const server = http.createServer(app);

const io = require("socket.io")(server);
io.on('connection', function(socket) {

  io.emit("notification", "A new user has been connected");
  
  socket.on("msg",(data)=>{
    io.emit("msg",data);
  })

  socket.on('disconnect',()=>{
    io.emit("notification", "User has been disconnected");
  });

  socket.on('typing',()=>{
    io.emit("typing", "User is typing ... ");
  });

});
server.listen(port,() => console.log("server is run on http://localhost:"+port));
