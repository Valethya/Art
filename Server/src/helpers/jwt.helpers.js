import jwt from "jsonwebtoken";
import { secretKey } from "../config/index.js";

export const generateToken = (user) => {
  const token = jwt.sign({ ...user }, secretKey, {
    expiresIn: "120s",
  });
  return token;
};

export const authToken = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.status(401).json({ error: "not authenticated" });
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, secretKey, (error, Credential) => {
    if (error) return res.status(403).json({ error: "not authorized" });
    req.user = Credential;

    next();
  });
};

export const authTokenCookie = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "not authenticated" });

  jwt.verify(token, secretKey, (error, Credential) => {
    if (error) return res.status(403).json({ error: "not authorized" });

    req.user = Credential;
    next();
  });
};
