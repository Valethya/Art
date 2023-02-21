import Router from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.render("chat.handlebars", {
    style: "chat.css",
  });
});

export default router;
