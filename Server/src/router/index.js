import product from "../controllers/products.controllers.js";
import cart from "../controllers/carts.controller.js";
import chat from "../controllers/chat.controllers.js";
import message from "../controllers/message.controllers.js";
import realTimeProducts from "../controllers/realTimeProducst.controllers.js";
import productsViews from "../controllers/productsViewsController.js";
import cartView from "../controllers/cartView.controller.js";
import session from "../controllers/session.controller.js";
import auth from "../controllers/auth.controllers.js";
import views from "../controllers/views.controllers.js";
import users from "../controllers/users.controllers.js";

const router = (app) => {
  app.use("/api/products", product);
  app.use("/api/carts", cart);
  app.use("/api/chats", chat);
  app.use("/api/messages", message);
  app.use("/api/realTimeProducts", realTimeProducts);
  app.use("/products", productsViews);
  app.use("/cart", cartView);
  app.use("/session", session);
  app.use("/auth", auth);
  app.use("/", views);
  app.use("/users", users);
};

export default router;
