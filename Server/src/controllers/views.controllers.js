import { Router } from "express";
import { authTokenCookie } from "../helpers/jwt.helpers.js";
import passportCall from "../helpers/passportCall.helpers.js";
import authorization, {
  publicAccess,
} from "../middlesware/authorization.middleware.js";

const router = Router();

router.get(
  "/",
  passportCall("jwt", { session: false }),
  // authorization({ user: "user", admin: "admin" }),
  // authTokenCookie,
  (req, res) => {
    const user = req.user;
    res.render("profile.handlebars", { user });
  }
);

router.get("/signup", publicAccess, (req, res) => {
  res.render("signup.handlebars", { style: "signup.css" });
});

router.get("/login", publicAccess, (req, res) => {
  res.render("login.handlebars", { style: "login.css" });
});
router.get("/forgotPassword", (req, res) => {
  res.render("forgotPassword.handlebars");
});

export default router;
