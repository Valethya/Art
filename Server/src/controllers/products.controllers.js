import productManager from "../dao/MongoManager/products.mongoManager.js";
import productsModel from "../dao/models/products.model.js";
import io from "../app.js";
import myRouters from "../classes/customRouter.classes.js";

const products = new productManager();

class productRouter extends myRouters {
  init() {
    this.get("/", ["PUBLIC"], async (req, res) => {
      try {
        const response = await products.find(req);
        res.sendSuccess({ payload: response, code: 200 });
      } catch (error) {
        res.sendError({ error: error.message, code: 401 });
      }
    });

    this.get("/:pid", ["PUBLIC"], async (req, res) => {
      try {
        const { pid } = req.params;
        const response = await products.findById(pid);
        res.sendSuccess({ payload: response });
      } catch (error) {
        res.sendError({ error: error });
      }
    });

    ////CREAR PRODUCTO

    // this.post("/", async (req, res) => {
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
    //     const response = await products.create(product);

    //     const allProducts = await products.find(req);
    //     io.emit("newProducts", allProducts);
    //     res.status(201).json({ code:201, payload: response });
    //   } catch (error) {
    //     res.json({ message: error.message });
    //   }
    // });
    // // populate
    this.post("/", async (req, res) => {
      try {
        const product = await products.createMany();
        await productsModel.insertMany(product);
        res.json({ code: 201, payload: "productos cargados" });
      } catch (error) {
        console.log(error);
      }
    });
    // //
    this.delete("/", async (req, res) => {
      try {
        const response = await products.delete();
        res.json({ code: 200, payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });

    this.delete("/:pid", async (req, res) => {
      try {
        const { pid } = req.params;
        const response = await products.deleteById(pid);

        const allProducts = await products.find(req);

        io.emit("newProducts", allProducts);

        res.json({ code: 200, payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });
  }
}

export default productRouter;
// this.get("/", async (req, res) => {
//   try {
//     const response = await products.find(req);
//     res.json(response);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// this.get("/:pid", async (req, res) => {
//   try {
//     const { pid } = req.params;
//     const response = await products.findById(pid);
//     res.json({ result: "succes", payload: response });
//   } catch (error) {
//     res.json({ error: error, message });
//   }
// });

// // this.post("/", async (req, res) => {
// //   try {
// //     const { title, description, price, thumbnail, stock, category } = req.body;

// //     const product = {
// //       title,
// //       description,
// //       price,
// //       thumbnail,
// //       stock,
// //       status: true,
// //       category,
// //     };
// //     const response = await products.create(product);

// //     const allProducts = await products.find(req);
// //     io.emit("newProducts", allProducts);
// //     res.status(201).json({ result: "succes", payload: response });
// //   } catch (error) {
// //     res.json({ message: error.message });
// //   }
// // });
// // // populate
// this.post("/", async (req, res) => {
//   try {
//     const product = await products.createMany();
//     await productsModel.insertMany(product);
//     res.json({ message: "productos cargados" });
//   } catch (error) {
//     console.log(error);
//   }
// });
// // //
// this.delete("/", async (req, res) => {
//   try {
//     const response = await products.delete();
//     res.json({ result: "succes", payload: response });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// this.delete("/:pid", async (req, res) => {
//   try {
//     const { pid } = req.params;
//     const response = await products.deleteById(pid);

//     const allProducts = await products.find(req);

//     io.emit("newProducts", allProducts);

//     res.json({ result: "succes", payload: response });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// export default this;
