import { Router } from "express";
import userManager from "../dao/MongoManager/users.mongoManager.js";
import cript from "../helpers/criptPassword.js";
import passport from "passport";
import User from "../dao/models/users.model.js";
import { generateToken, authToken } from "../helpers/jwt.helpers.js";

const router = Router();

// router.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await users.findOne(email, password);

//     const data = user ? user : users.auth(password, email);

//     req.session.user = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//     };

//     res.json({ message: "sesion iniciada", user: data });
//   } catch (error) {
//     res.json(error);
//   }
// });

router.get("/infoUser", (req, res) => {
  try {
    const { firstName, email } = req.user;
    const user = { firstName, email };
    res.json({ user: user });
  } catch (error) {
    res.json({ message: "no hay una sesion activa" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
    res.redirect("/login");
  });
});

///PROFE
router.post(
  "/",
  passport.authenticate("login", { failureRedirect: "auth/failLogin" }),
  async (req, res) => {
    try {
      if (!req.user)
        return res.status(400).json({ error: "Credenciales invalidas" });

      // req.session.user = {
      //   firstName: req.user.firstName,
      //   lastName: req.user.lastName,
      //   age: req.user.age,
      //   email: req.user.email,
      //   rol: req.user.rol,
      // };
      // console.log(req.session.user, " esto es session");
      const user = {
        firstName: req.user.firstName,
        email: req.user.email,
        lastName: req.user.lastName || "",
        rol: req.user.rol,
      };
      const token = generateToken(user);
      res
        .cookie("authToken", token, { maxAge: 80000, httpOnly: true })
        .json({ message: "Sesión iniciada" });
      // res.json({ message: req.user });
    } catch (error) {
      res.status(500).json({ error, hola: "no se que onda" });
    }
  }
);

router.get("/failLogin", (req, res) => {
  res.json({ error: "No se pudo iniciar sesión" });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] }),
  async (req, res) => {}
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
    res.redirect("/login");
  });
});

router.patch("/forgotPassword", async (req, res) => {
  try {
    const { email, password } = req.body;

    const passwordEncrypted = cript.createHash(password);
    await User.updateOne({ email }, { password: passwordEncrypted });

    res.json({ message: "Contraseña actualizada" });
  } catch (error) {}
});

export default router;
