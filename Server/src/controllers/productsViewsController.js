import { Router } from "express";
import productManager from "../dao/MongoManager/products.mongoManager.js";

const products = new productManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await products.find(req);
    res.render("products.handlebars", {
      products: await response.payload,
      title: "productos",
      style: "realTime.css",
      pages: await response,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;
