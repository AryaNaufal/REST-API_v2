import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  console.log(socket.id);

});

socket.emit("msgClient", "Nama aku tono");

socket.on("msgClient", (data) => {
  console.log("message from server :" + data)
})
