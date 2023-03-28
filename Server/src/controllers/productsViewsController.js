import { Router } from "express";
import productManager from "../dao/MongoManager/products.mongoManager.js";

const products = new productManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await products.find(req);
    console.log(req.user, " esto es user en product view");
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
