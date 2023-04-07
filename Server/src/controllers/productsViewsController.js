import { Router } from "express";
import { find } from "../service/products.service.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await find(req);

    res.render("products.handlebars", {
      products: await response.payload,
      title: "productos",
      style: "realTime.css",
      pages: await response,
      user: req.user,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;
