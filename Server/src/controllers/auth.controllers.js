import { Router } from "express";
import userManager from "../dao/MongoManager/users.mongoManager.js";

const router = Router();
const users = new userManager();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne(email, password);

    const data = user ? user : users.auth(password, email);

    req.session.user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };

    res.json({ message: "sesion iniciada", user: data });
  } catch (error) {
    res.json(error);
  }
});

router.get("/", (req, res) => {
  const user = req.session.user;
  res.json({ user: user });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
    res.redirect("/login");
  });
});
export default router;
