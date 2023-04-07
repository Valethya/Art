import { Router } from "express";
import productsModel from "../dao/models/products.model.js";
import {
  find,
  findById,
  create,
  createMany,
  deleteById,
  deleteProduct,
} from "../service/products.service.js";
import io from "../app.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await find(req);
    res.json(response);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await findById(pid);
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error, message });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { title, description, price, thumbnail, stock, category } = req.body;

//     const product = {
//       title,
//       description,
//       price,
//       thumbnail,
//       stock,
//       status: true,
//       category,
//     };
//     const response = await create(product);

//     const allProducts = await find(req);
//     io.emit("newProducts", allProducts);
//     res.status(201).json({ result: "succes", payload: response });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// });
// // populate
router.post("/", async (req, res) => {
  try {
    const product = await createMany();
    await productsModel.insertMany(product);
    res.json({ message: "productos cargados" });
  } catch (error) {
    console.log(error);
  }
});
// //
router.delete("/", async (req, res) => {
  try {
    const response = await deleteProduct();
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await deleteById(pid);

    const allProducts = await find(req);

    io.emit("newProducts", allProducts);

    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;
