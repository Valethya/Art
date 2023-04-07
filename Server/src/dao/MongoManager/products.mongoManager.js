import productsModel from "../models/products.model.js";

export default class productManager {
  //METODOS PARA PRODUCTOS
  //busca todos los productos
  async persistFind(query, options) {
    try {
      const products = await productsModel.paginate(query, options);

      return products;
    } catch (error) {
      return error.message;
    }
  }
  //busca un producto por id
  async persistFindById(pid) {
    try {
      const response = await productsModel.findOne({ _id: pid });
      console.log(response, " esto es response");
      return response;
    } catch (error) {
      return error.message;
    }
  }
  //crea un producto
  async persistCreate(prod) {
    await productsModel.create(prod);
  }
  //fin populate

  //borra todos los productos
  async persistDelete() {
    try {
      const product = await productsModel.deleteMany();
      return product;
    } catch (error) {
      return error.message;
    }
  }
  // borra un producto por id
  async persistDeleteById(pid) {
    try {
      const product = await productsModel.deleteOne({ _id: pid });
      return product;
    } catch (error) {
      return error.message;
    }
  }
}
