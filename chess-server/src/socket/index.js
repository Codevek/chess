import { Server } from "socket.io";

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("io on happened");
    console.log(socket.id);
    socket.on("disconnect", () => {
      console.log("disconnect happened");
    });
  });

  return io;
}
