import myRouter from "../classes/customRouter.classes.js";
// import userManager from "../dao/MongoManager/users.mongoManager.js";
import passport from "passport";

// const users = new userManager();

// this.post("/", async (req, res) => {
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
class userRouter extends myRouter {
  init() {
    this.post(
      "/",
      passport.authenticate("register", ["PUBLIC"], {
        failureRedirect: "/failRegister",
      }),
      async (req, res) => {
        try {
          res.sendSuccess({ code: 200, payload: "Usuario registrado" });
        } catch (error) {
          console.log(error);
          if (error.code === 11000)
            return res.sendError({ error: "El usuario ya existe" });
          res.sendError({ error: "Error interno del servidor" });
        }
      }
    );

    this.get("/failRegister", ["PUBLIC"], async (req, res) => {
      console.log("Falló el registro");
      res.sendError({ error: "Falló" });
    });
  }
}

export default userRouter;
