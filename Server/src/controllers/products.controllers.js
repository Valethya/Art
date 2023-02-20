import { Router } from "express";
import productManager from "../dao/MongoManager/products.mongoManager.js";
import productsModel from "../dao/models/products.model.js";
import io from "../app.js";

const products = new productManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await products.find(req);
    res.json(response);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await products.findById(pid);
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error, message });
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
    console.log(allProducts, "esto es all products");
    io.emit("newProducts", allProducts);
    res.status(201).json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ message: error.message });
  }
});
// // populate
// router.post("/", async (req, res) => {
//   try {
//     const product = await products.createMany();
//     await productsModel.insertMany(product);
//     res.json({ message: "productos cargados" });
//   } catch (error) {
//     console.log(error);
//   }
// });
// //
router.delete("/", async (req, res) => {
  try {
    const response = await products.delete();
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await products.deleteById(pid);

    const allProducts = await products.find(req);

    io.emit("newProducts", allProducts);

    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;
