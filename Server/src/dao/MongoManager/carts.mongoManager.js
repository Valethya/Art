import cartsModel from "../models/carts.models.js";
import mongoose from "mongoose";

export default class cartsManager {
  //muestra todos los carritos
  async persistFind() {
    try {
      const products = await cartsModel.find();
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // summary cart
  async summaryCart(cid) {
    try {
      const summary = await cartsModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(cid) } },
        { $unwind: "$products" },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $group: {
            _id: "$_id",
            summaryByProducts: {
              $push: {
                productId: "$product._id",
                totalValue: {
                  $multiply: ["$products.qty", "$product.price"],
                },
                totalQuantity: "$products.qty",
              },
            },
            totalValue: {
              $sum: {
                $let: {
                  vars: {
                    totalPrice: {
                      $multiply: ["$products.qty", "$product.price"],
                    },
                  },
                  in: "$$totalPrice",
                },
              },
            },
            totalQuantity: {
              $sum: "$products.qty",
            },
          },
        },
      ]);
      console.log(summary);
      return summary;
    } catch (error) {
      return { message: "ups " + error };
    }
  }
  //encuentra un carrito por su id
  async persistFindById(cid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      console.log(cart, " esto es cart");
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // crea un carrito
  async persistCreate() {
    try {
      const cart = await cartsModel.create({ products: [] });
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //elimina todos los carritos
  async persistDelete() {
    try {
      await cartsModel.deleteMany();
      return "succes";
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //elimina un carrito
  async persistDeleteById(cid) {
    try {
      const cart = await cartsModel.deleteOne({ _id: cid });
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // METODOS PARA LOS PRODUCTOS DEL CARRITO

  //metodo para verificar existencia de los documentos en la collecion

  //agrega productos al carrito
  async persistAddProdToCart(cid, pid) {
    try {
      /*si hay un documento con id:cid que contenga una propiedad products 
      que no contenga un campo product igual a pid*/
      const result = await cartsModel.updateOne(
        { _id: cid, "products.product": { $ne: pid } },
        { $addToSet: { products: { product: pid, qty: 1 } } }
      );
      if (result.modifiedCount === 0) {
        /*como no se a modificado ningun archivo quiere decir que no se ha 
      agregado un producto nuevo por lo tanto solo se realiza la suma de la cantidad*/
        await cartsModel.updateOne(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.qty": 1 } }
        );
      }
      console.log("vamos pasandooooooooo");
      return {
        status: 204,
        message: `el producto ${pid} fue agregado a tu carrito`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //se actualiza la cantidad de un producto especifico
  async updateProducts(cid, pid, qty) {
    try {
      await this.CheckDocument(cid, pid);
      await cartsModel.updateOne(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.qty": qty } }
      );
      return {
        status: 204,
        message: `la cantidad de productos se ha actualizado en: ${qty}`,
      };
    } catch (error) {
      return error.message;
    }
  }
  // elimina un productos del carrito
  async persistDeleteProduct(cid, pid) {
    try {
      /*se busca un carrito por su id y de que este tenga una propiedad products 
      que contenga un campo product igual a pid, si este existe decrementa en 1*/
      await cartsModel.updateOne(
        { _id: cid, "products.product": pid },
        { $inc: { "products.$.qty": -1 } }
      );
      /*si el carrito tiene una propiedad products con un campo qty igual a 0 
      este producto se elimina del carrito*/
      await cartsModel.updateOne(
        { _id: cid, "products.qty": { $eq: 0 } },
        { $pull: { products: { product: pid } } }
      );
      return {
        status: 204,
        message: `el producto ${pid} fue eliminado de tu carrito`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //elimina todos los productos del carrito
  async persistDeleteAllProducts(cid) {
    try {
      const response = await cartsModel.updateOne(
        { _id: cid },
        { $set: { products: [] } }
      );

      return response;
    } catch (error) {}
  }
}
