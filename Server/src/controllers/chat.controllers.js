import Router from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.render("chat.handlebars", {
    style: "style.css",
  });
});

export default router;
