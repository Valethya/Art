import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  req.session.user = "mate";
  res.json("login succesful");
});

export default router;
