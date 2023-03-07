import express from "express";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import router from "./router/index.js";
import Handlebars from "handlebars";
import expressHandlebars from "express-handlebars";
import { pass, passSession } from "./config/index.js";
import cors from "cors";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";

export const app = express();

const mongoUri = `mongodb://BackendCoder:${pass}@ac-iwvbtxh-shard-00-00.fwtrhw6.mongodb.net:27017,ac-iwvbtxh-shard-00-01.fwtrhw6.mongodb.net:27017,ac-iwvbtxh-shard-00-02.fwtrhw6.mongodb.net:27017/?ssl=true&replicaSet=atlas-azcxpo-shard-0&authSource=admin&retryWrites=true&w=majority`;

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: mongoUri,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 120,
    }),
    secret: passSession,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.engine(
  "handlebars",
  expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("views", __dirname + "/views");
app.set(express.static);
app.use(express.static(__dirname + "/public"));

router(app);

mongoose.set("strictQuery", false);

mongoose.connect(mongoUri, (error) => {
  if (error) {
    process.exit();
  }
});
