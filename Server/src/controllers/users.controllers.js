import { Router } from "express";
// import userManager from "../dao/MongoManager/users.mongoManager.js";
import passport from "passport";

const router = Router();

// const users = new userManager();

// router.post("/", async (req, res) => {
//   const { firstName, lastName, age, email, password } = req.body;
//   const newUser = {
//     firstName,
//     lastName,
//     age,
//     email,
//     password,
//   };
//   try {
//     const response = await users.create(newUser);
//

//     res.status(201).json({ result: "succes", payload: response });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// });

router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/failRegister" }),
  async (req, res) => {
    try {
      res.json({ message: "Usuario registrado" });
    } catch (error) {
      console.log(error);
      if (error.code === 11000)
        return res.status(400).json({ error: "El usuario ya existe" });
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);

router.get("/failRegister", async (req, res) => {
  console.log("Falló el registro");
  res.json({ error: "Falló" });
});

export default router;
