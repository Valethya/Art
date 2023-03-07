import { Router } from "express";
import userManager from "../dao/MongoManager/users.mongoManager.js";

const router = Router();

const users = new userManager();

router.post("/", async (req, res) => {
  const { firstName, lastName, age, email, password } = req.body;
  const newUser = {
    firstName,
    lastName,
    age,
    email,
    password,
  };
  try {
    const response = await users.create(newUser);
    console.log(response);

    res.status(201).json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
