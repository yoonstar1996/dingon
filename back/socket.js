const SocketIO = require("socket.io");
const cors = require("cors");
const {UserCount} = require("./models");

 module.exports = (server,app,sessionMiddleware)=>{
    const io = SocketIO(server,{path:'/socket.io',  cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }});
    const wrap = middleware => (socket,next)=>middleware(socket.request,{},next);
    const count = io.of("/count");
    count.on("connection",async(socket)=>{
        console.log("한명추가요");
        await UserCount.create({socketId:socket.id});
        socket.on("disconnect",()=>{
            await UserCount.destroy({where:{socketId:socket.id}});
        });
    });
  
}