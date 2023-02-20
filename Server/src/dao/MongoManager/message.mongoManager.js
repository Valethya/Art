import messageModels from "../models/message.models.js";

export default class messageManager {
  async find() {
    try {
      const message = await messageModels.find();
      return { status: 200, message: message };
    } catch (error) {
      return {
        status: 404,
        message: `no se logro concretar la solicitud por error: ${error}`,
      };
    }
  }

  async create(dataMessage) {
    try {
      await messageModels.create(dataMessage);
      return { status: 201, message: "mensaje creado" };
    } catch (error) {
      return error;
    }
  }

  async delete() {
    try {
      const message = await messageModels.deleteMany();

      if (message.deletedCount == 0) {
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
}
