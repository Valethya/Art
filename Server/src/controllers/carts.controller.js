import { Router } from "express";
import cartsManager from "../dao/MongoManager/carts.mongoManager.js";

const router = Router();

const carts = new cartsManager();
//REQ DE CARRITOS

router.get("/", async (req, res) => {
  try {
    const response = await carts.find();
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await carts.findById(cid);
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await carts.create();

    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//borra todos los carritos
router.delete("/", async (req, res) => {
  try {
    const response = await carts.delete();
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
    // io.on("addProduct", data);
    console.log(cid, pid, "esto es cid y pid");
    // const prodId = pid || data;
    const response = await carts.addProdToCart(cid, pid);

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
    const response = await carts.updateProducts(cid, pid, qty);
    res.json({ response: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//elimina un producto seleccionado de uno en uno
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const response = await carts.deleteProduct(cid, pid);

    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//elimina todos los productos de un carrito seleccionado
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await carts.deleteAllProducts(cid);
    res.json({ response: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});
export default router;
