import { Server } from "socket.io";

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("hello", (name) => {
      console.log("Client says:", name);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
  return io;
}
