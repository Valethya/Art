import Router from "express";
import { verifyToken } from "../helpers/jwt.helpers.js";
export default class customRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolice(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  post(path, policies, ...callbacks) {
    console.log("pasa por aqui o no?");
    this.router.post(
      path,
      this.handlePolice(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  put(path, ...callbacks) {
    this.router.put(
      path,
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  patch(path, ...callbacks) {
    this.router.patch(
      path,
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  delete(path, ...callbacks) {
    this.router.delete(
      path,
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].status(500).json({ error });
      }
    });
  }
  generateCustomResponse(req, res, next) {
    res.sendSuccess = ({ payload, code }) =>
      res
        .status(code)
        .json({ status: "success", message: payload, statusCode: code });
    res.sendServerError = (error) =>
      res
        .status(500)
        .json({ status: "error", message: "internal server error" });
    res.sendError = ({ error, code }) =>
      res.status(400).json({ status: "error", error, statusCode: code });
    next();
  }
  handlePolice(policies) {
    return (req, res, next) => {
      console.log(policies.includes("PUBLIC"));
      if (policies.includes("PUBLIC")) {
        return next();
      }
      const authHeader = req.authHeader.authorization;
      if (!authHeader)
        return res.status(401).json({ error: "not authenticated" });

      const token = authHeader.split("")[1];
      const user = verifyToken(token);
      if (!policies.includes(user.normalize.toUppercase()))
        return res.status(403).json({ error: "not atuhorized" });

      req.user = user;
      next();
    };
  }
}

//apply-call-bin  = est relacionado con el this
