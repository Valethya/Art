import { Router } from "express";
import { findById } from "../service/carts.service.js";

const router = Router();

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await findById(cid);
    const products = response.message;
    res.render("cart.handlebars", {
      products: products,
      title: "productos",
      style: "cart.css",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;
