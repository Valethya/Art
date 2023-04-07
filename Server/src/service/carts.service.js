import cartsManager from "../dao/MongoManager/carts.mongoManager.js";
import { findById as findByIdProd } from "./products.service.js";

///

const cartManager = new cartsManager();

///

async function find() {
  try {
    const products = await cartManager.persistFind();
    return {
      status: 200,
      message: products,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findById(cid) {
  try {
    const cart = await cartManager.persistFindById({ _id: cid });

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

async function create() {
  try {
    const cart = await cartManager.persistCreate();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteCarts() {
  try {
    await cartManager.persistDelete();
    return {
      status: 204,
      message: "carritos eliminados",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteById(cid) {
  try {
    const cart = await cartManager.persistDeleteById({ _id: cid });
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

async function CheckDocument(cid, pid) {
  const cart = await findById(cid);
  const prod = await findByIdProd(pid);
  console.log(cart, " bueno ", prod);
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

async function addProdToCart(cid, pid) {
  try {
    await CheckDocument(cid, pid);

    const add = await cartManager.persistAddProdToCart(cid, pid);
    return add;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateProducts(cid, pid, qty) {
  try {
    await this.CheckDocument(cid, pid);
    const result = await cartManager(cid, pid, qty);
    return result;
  } catch (error) {
    return error.message;
  }
}
async function deleteProduct(cid, pid) {
  try {
    await this.CheckDocument(cid, pid);
    const result = cartManager.persistDeleteProduct(cid, pid);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteAllProducts(cid) {
  try {
    const cart = await cartManager.persistFindById(cid);
    if (cart == null) {
      throw new Error({
        status: 404,
        message: `El carrito con id ${cid} no existe`,
      });
    }
    await cartManager.persistDeleteAllProducts(cid);

    return {
      status: 204,
      message: `todos los productos fueron eliminados del carrito`,
    };
  } catch (error) {}
}

export {
  find,
  findById,
  create,
  deleteCarts,
  deleteById,
  addProdToCart,
  updateProducts,
  deleteProduct,
  deleteAllProducts,
};
