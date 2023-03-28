import { Router } from "express";
import passport from "passport";
import passportCall from "../helpers/passportCall.helpers.js";

const router = Router();

router.get("/", (req, res) => {
  res.json("login succesful");
});
router.get(
  "/current",
  passportCall("current", { session: false }),
  (req, res) => {
    res.json({ payload: req.user });
  }
);

export default router;
