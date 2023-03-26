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
import admin from "../controllers/admin.controllers.js";
import product from "../controllers/products.controllers.js";

const productRouter = new product();
const cartRouter = new cart();
const authRouter = new auth();
const messageRouter = new message();
const usersRouter = new users();

const router = (app) => {
  app.use("/api/products", productRouter.getRouter());
  app.use("/api/carts", cartRouter.getRouter());
  app.use("/api/chats", chat);
  app.use("/api/messages", messageRouter.getRouter());
  app.use("/api/realTimeProducts", realTimeProducts);
  app.use("/products", productsViews);
  app.use("/cart", cartView);
  app.use("/session", session);
  app.use("/auth", authRouter.getRouter());
  app.use("/", views);
  app.use("/users", usersRouter.getRouter());
  app.use("/admin", admin);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "es este mensaje?" });
  });
};

export default router;
