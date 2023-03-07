import { Router } from "express";
import accessControl from "../middlesware/index.js";

const router = Router();

router.get("/", accessControl.privateAccess, (req, res) => {
  const { user } = req.session;
  res.render("profile.handlebars", { user });
});

router.get("/signup", accessControl.publicAccess, (req, res) => {
  res.render("signup.handlebars", { style: "signup.css" });
});

router.get("/login", accessControl.publicAccess, (req, res) => {
  res.render("login.handlebars", { style: "login.css" });
});

export default router;
