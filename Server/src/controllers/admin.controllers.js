import Router from "express";
import authorization from "../middlesware/authorization.middleware.js";
import passportCall from "../helpers/passportCall.helpers.js";

const router = Router();

router.get(
  "/private",
  passportCall("jwt", { session: false }),
  authorization("admin"),
  (req, res) => {
    res.json({ message: "Esto es privado!!!!" });
  }
);

export default router;
