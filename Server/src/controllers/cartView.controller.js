import { Router } from "express";
import cartsManager from "../dao/MongoManager/carts.mongoManager.js";

const router = Router();
const carts = new cartsManager();

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await carts.findById(cid);
    const products = response.message;
    // console.log(
    //   products.map((prod) => {
    //     return prod;
    //   })
    // );
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
