import { create, deleteMessage, find } from "../service/message.service.js";
import Router from "express";

const router = Router();

router.get("/", async (req, res) => {
  const response = await find();
  res.json({ response });
});

router.post("/", async (req, res) => {
  try {
    const { userEmail, userMessage } = req.body;
    const dataMessage = {
      user: userEmail,
      message: userMessage,
    };

    const response = await create(dataMessage);

    res.json({ response: response });
  } catch (error) {}
});

router.delete("/", async (req, res) => {
  try {
    const response = await deleteMessage();
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;
