import { Server } from "http";
import { Server as SocketServer } from "socket.io";

export const socketIO = (server: Server) => {
  const io = new SocketServer(server, {cors: {origin: "*"}});

  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.emit("msgClient", "Hallo nama kamu siapa?")

    socket.on("msgClient", (data) => {
      console.log("Message from server :" + data)
    })
    
    socket.broadcast.emit("afagasgs", () => {
      console.log("Message from broadcast :" + "Tes");
      
    });
  })
  
}