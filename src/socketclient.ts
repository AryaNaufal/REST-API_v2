import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  console.log(socket.id);

});

socket.on("message", (data) => {
  console.log("message from server :" + data)
})

socket.emit("message", "Nama aku tono");