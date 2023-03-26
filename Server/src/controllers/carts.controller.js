import cartsManager from "../dao/MongoManager/carts.mongoManager.js";
import myRouters from "../classes/customRouter.classes.js";

const carts = new cartsManager();

class cartRouter extends myRouters {
  init() {
    this.get("/", ["PUBLIC"], async (req, res) => {
      try {
        const response = await carts.find();
        res.sendSuccess({ code: 200, payload: response });
      } catch (error) {
        res.sendError({ error: error.message, code: 401 });
      }
    });

    this.get("/:cid", ["PUBLIC"], async (req, res) => {
      try {
        const { cid } = req.params;
        const response = await carts.findById(cid);
        res.sendSuccess({ code: 200, payload: response });
      } catch (error) {
        res.sendError({ error: error.message });
      }
    });

    this.post("/", ["PUBLIC"], async (req, res) => {
      try {
        const response = await carts.create();

        res.sendSuccess({ result: "succes", payload: response });
      } catch (error) {
        res.sendError({ error: error.message });
      }
    });
    //borra todos los carritos
    this.delete("/", ["PUBLIC"], async (req, res) => {
      try {
        const response = await carts.delete();
        res.sendSuccess({ result: "succes", payload: response });
      } catch (error) {
        res.sendError({ error: error.message });
      }
    });
    //borra un carrito en especifico
    // this.delete("/:cid", async (req, res) => {
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
    this.post("/:cid/product/:pid", ["PUBLIC"], async (req, res) => {
      try {
        const { cid, pid } = req.params;
        // const prodId = pid || data;
        const response = await carts.addProdToCart(cid, pid);

        res.sendSuccess({ payload: response });
      } catch (error) {
        res.sendError({ error: error.message });
      }
    });
    //actualiza la cantidad de un producto que se encuentre en el carrito
    this.put("/:cid/product/:pid", ["PUBLIC"], async (req, res) => {
      try {
        const { cid, pid } = req.params;
        const { qty } = req.body;
        const response = await carts.updateProducts(cid, pid, qty);
        res.sendSuccess({ response: response });
      } catch (error) {
        res.sendError({ error: error.message });
      }
    });
    //elimina un producto seleccionado de uno en uno
    this.delete("/:cid/product/:pid", ["PUBLIC"], async (req, res) => {
      try {
        const { cid, pid } = req.params;

        const response = await carts.deleteProduct(cid, pid);

        res.sendSuccess({ result: "succes", payload: response });
      } catch (error) {
        res.sendError({ error: error.message });
      }
    });
    //elimina todos los productos de un carrito seleccionado
    this.delete("/:cid", ["PUBLIC"], async (req, res) => {
      try {
        const { cid } = req.params;
        const response = await carts.deleteAllProducts(cid);
        res.sendSuccess({ result: succes, payload: response });
      } catch (error) {
        res.sendError({ error: error.message });
      }
    });
  }
}

export default cartRouter;
