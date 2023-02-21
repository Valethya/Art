import cartsModel from "../models/carts.models.js";
import productManager from "./products.mongoManager.js";

const product = new productManager();

export default class cartsManager {
  //muestra todos los carritos
  async find() {
    try {
      const products = await cartsModel.find();
      return {
        status: 200,
        message: products,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //encuentra un carrito por su id
  async findById(cid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });

      if (cart == null) {
        throw new Error({
          status: 404,
          message: `El carrito con id ${cid} no existe`,
        });
      }
      return {
        status: 200,
        message: cart.products,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // crea un carrito con un id autoincrementable
  async create() {
    try {
      await cartsModel.create({ products: [] });
      return {
        status: 201,
        message: "carrito fue creado",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //elimina todos los carritos
  async delete() {
    try {
      await cartsModel.deleteMany();
      return {
        status: 204,
        message: "carritos eliminados",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //elimina un carrito
  async deleteById(cid) {
    try {
      const cart = await cartsModel.deleteOne({ _id: cid });
      console.log(cart, "esto es un cart que deberia ser nulo");
      if (cart.deletedCount == 0) {
        throw new Error({
          status: 404,
          message: `El carrito con id ${cid} no existe`,
        });
      }
      return {
        status: 204,
        message: `carrito ${cid} eliminado`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // METODOS PARA LOS PRODUCTOS DEL CARRITO

  //metodo para verificar existencia de los documentos en la collecion
  async CheckDocument(cid, pid) {
    const cart = await this.findById(cid);
    const prod = await product.findById(pid);
    if (!cart && !prod) {
      throw new Error({
        status: 404,
        message: `El carrito con id ${cid} y el producto con id ${pid} no existen`,
      });
    }
    if (!cart) {
      throw new Error({
        status: 404,
        message: `El carrito con id ${cid} no existe`,
      });
    }
    if (!prod) {
      throw new Error({
        status: 404,
        message: `El producto con id ${pid} no existe`,
      });
    }
    return true;
  }

  //agrega productos al carrito
  async addProdToCart(cid, pid) {
    try {
      await this.CheckDocument(cid, pid);
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
  async deleteProduct(cid, pid) {
    try {
      await this.CheckDocument(cid, pid);
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
  async deleteAllProducts(cid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (cart == null) {
        throw new Error({
          status: 404,
          message: `El carrito con id ${cid} no existe`,
        });
      } else {
        const response = await cartsModel.updateOne(
          { _id: cid },
          { $set: { products: [] } }
        );
      }
      return {
        status: 204,
        message: `todos los productos fueron eliminados del carrito`,
      };
    } catch (error) {}
  }
}
