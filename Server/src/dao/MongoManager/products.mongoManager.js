import productsModel from "../models/products.model.js";
import fs from "fs";

export default class productManager {
  //METODOS PARA PRODUCTOS
  //process data
  processData(products, req) {
    //mapeo de datos de documentos para mostrar la informacion correctamente
    const documents = products.docs.map(
      ({
        _id,
        title,
        description,
        price,
        thumbnail,
        stock,
        status,
        category,
      }) => ({
        id: _id,
        title,
        description,
        price,
        thumbnail,
        stock,
        status,
        category,
      })
    );

    //destructuracion de products para utilizar los parametros requeridos
    const { totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage } =
      products;
    // determinando la urls de las pagina previa y posterior
    const prevUrl = `${req.protocol}://${req.get("host")}${
      req.baseUrl
    }?${new URLSearchParams({ ...req.query, page: page - 1 })}`;
    const nextUrl = `${req.protocol}://${req.get("host")}${
      req.baseUrl
    }?${new URLSearchParams({ ...req.query, page: page + 1 })}`;

    //se contruye un nuevo objeto con el fin de poder mostrar la informacion requerida como lo es por ejemplo el payload o prevLink y nextLink
    const response = {
      status: "succes",
      payload: documents,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasNextPage,
      hasPrevPage,
      prevLink: prevPage ? prevUrl : null,
      nextLink: nextPage ? nextUrl : null,
    };

    return response;
  }
  //busca todos los productos
  async find(req) {
    try {
      const status = req.query.status;
      const category = req.query.category;
      const title = req.query.title;
      const query = status
        ? { status: status }
        : category
        ? { category: category }
        : title
        ? { title: title }
        : {};

      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        sort: req.query.sort || "",
      };
      const products = await productsModel.paginate(query, options);
      const response = this.processData(products, req);
      return response;
    } catch (error) {
      return error.message;
    }
  }
  //busca un producto por id
  async findById(pid) {
    try {
      const response = await productsModel.findOne({ id: pid });
      if (response == null) {
        throw new Error({
          status: 404,
          message: `El carrito con id ${pid} no existe`,
        });
      }
      return { status: 200, message: response };
    } catch (error) {
      return error.message;
    }
  }
  //crea un producto
  async create(prod) {
    await productsModel.create(prod);
    return { status: 200, message: "producto fue creado" };
  }

  //populate
  file = `${process.cwd()}/files/product.json`;

  async createMany() {
    if (fs.existsSync(this.file)) {
      const data = await fs.promises.readFile(this.file);
      const response = JSON.parse(data);

      return response;
    }
    return "no se encuentra el archivo";
  }
  //fin populate

  //borra todos los productos
  async delete() {
    try {
      const product = await productsModel.deleteMany();

      if (product.deletedCount == 0) {
        throw new Error({
          status: 404,
          message: "no hay productos para borrar",
        });
      }
      return { status: 204, message: "productos eliminados" };
    } catch (error) {
      return error.message;
    }
  }
  // borra un producto por id
  async deleteById(pid) {
    try {
      const product = await productsModel.deleteOne({ _id: pid });
      if (product.deletedCount == 0) {
        throw new Error({
          status: 404,
          message: `El producto con id ${pid} no existe`,
        });
      }
      return { status: 204, message: `el producto ${pid} fue aliminado` };
    } catch (error) {
      return error.message;
    }
  }
}
