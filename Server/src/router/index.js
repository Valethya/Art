import productController from "../controllers/products.controllers.js";
import cartController from "../controllers/carts.controller.js";
import chatController from "../controllers/chat.controllers.js";
import messageController from "../controllers/message.controllers.js";
import realTimeProductsController from "../controllers/realTimeProducst.controllers.js";
import productsViewsController from "../controllers/productsViewsController.js";
import cartViewController from "../controllers/cartView.controller.js";

const router = (app) => {
  app.use("/api/products", productController);
  app.use("/api/carts", cartController);
  app.use("/api/chats", chatController);
  app.use("/api/messages", messageController);
  app.use("/api/realTimeProducts", realTimeProductsController);
  app.use("/products", productsViewsController);
  app.use("/cart", cartViewController);
};

export default router;
