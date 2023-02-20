import port from "./config/index.js";
import { app } from "./index.js";
import { Server } from "socket.io";
import messageManager from "./dao/MongoManager/message.mongoManager.js";

const messages = new messageManager();
const httpServer = app.listen(port, () => {
  console.log(`server runnin at port ${port}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("nos hemos conectado señores");
  socket.on("message", async (data) => {
    const allMessages = await messages.find();
    console.log(allMessages, "desde app.js");
    io.emit("allMessages", allMessages.message);
  });
});

export default io;
