import { Router } from "express";
import productManager from "../dao/MongoManager/products.mongoManager.js";
import productsModel from "../dao/models/products.model.js";
import io from "../app.js";

const products = new productManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await products.find(req);

    res.render("realTimeProducts.handlebars", {
      products: await response.payload,
      title: "productos",
      style: "realTime.css",
      pages: await response,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail, stock, category } = req.body;
    if (!title || !price) {
      throw new Error("debes ingresar todos los parametros");
    }
    const product = {
      title,
      description,
      price,
      thumbnail,
      stock,
      status: true,
      category,
    };
    const response = await products.create(product);

    const allProducts = await products.find(req);
    io.emit("newProducts", allProducts);
    res.status(201).json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ message: error.message });
  }
});
export default router;
