const SocketIO = require("socket.io");
const cors = require("cors");
const {UserCount} = require("./models");

 module.exports = (server,app,sessionMiddleware)=>{
    const io = SocketIO(server,{path:'/socket.io',  cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }});
    app.set("io",io);
    const count = io.of("/count");
    count.on("connection",async(socket)=>{
        console.log("씨발 왜 안돼?");
        socket.on("hi",()=>{
            console.log("예아");
        });
        await UserCount.create({socketId:socket.id});
        socket.on("disconnect",async()=>{
            await UserCount.destroy({where:{socketId:socket.id}});
        });
    });
  
}