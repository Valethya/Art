import messageManager from "../dao/MongoManager/message.mongoManager.js";
import myRouters from "../classes/customRouter.classes.js";

const messages = new messageManager();

class messageRouter extends myRouters {
  init() {
    this.get("/", async (req, res) => {
      const response = await messages.find();
      res.json({ response });
    });

    this.post("/", async (req, res) => {
      try {
        const { userEmail, userMessage } = req.body;
        const dataMessage = {
          user: userEmail,
          message: userMessage,
        };

        const response = await messages.create(dataMessage);

        res.json({ response: response });
      } catch (error) {}
    });

    this.delete("/", async (req, res) => {
      try {
        const response = await messages.delete();
        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });
  }
}

export default messageRouter;
