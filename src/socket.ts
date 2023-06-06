import { Server } from "http";
import { Server as SocketServer } from "socket.io";

export const socketIO = (server: Server) => {
  const io = new SocketServer(server, {cors: {origin: "*"}});

  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.emit("message", "Hallo nama kamu siapa?")

    socket.on("message", (data) => {
      console.log("message from client :" + data)
    })

  })
  
}