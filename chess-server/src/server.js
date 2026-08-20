import { createServer } from "http";
import app from "./app.js";
import { PORT } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { initSocket } from "./socket/index.js";

export async function startServer() {
  await connectDB();

  const server = createServer(app);

  initSocket(server);

  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

startServer();
