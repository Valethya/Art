import { Router } from "express";
import {
  find,
  findById,
  create,
  deleteById,
  deleteCarts,
  addProdToCart,
  updateProducts,
  deleteProduct,
  deleteAllProducts,
} from "../service/carts.service.js";

const router = Router();

//REQ DE CARRITOS

router.get("/", async (req, res) => {
  try {
    const response = await find();
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await findById(cid);
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.get("/summary/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await carts.summaryCart(cid);
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await create();

    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//borra todos los carritos
router.delete("/", async (req, res) => {
  try {
    const response = await deleteCarts();
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//borra un carrito en especifico
// router.delete("/:cid", async (req, res) => {
//   try {
//     const { cid } = req.params;
//     const response = await carts.deleteById(cid);
//     res.json({ result: "succes", payload: response });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

//REQUEST DE PRODUCTOS DEL CARRITO
//agrega productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    // const prodId = pid || data;
    const response = await addProdToCart(cid, pid);

    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//actualiza la cantidad de un producto que se encuentre en el carrito
router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { qty } = req.body;
    const response = await updateProducts(cid, pid, qty);
    res.json({ response: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//elimina un producto seleccionado de uno en uno
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const response = await deleteProduct(cid, pid);

    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//elimina todos los productos de un carrito seleccionado
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await deleteAllProducts(cid);
    res.json({ result: succes, payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
export default router;
