import express from "express";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import router from "./router/index.js";
import handlebars from "express-handlebars";
import { pass } from "./config/index.js";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set(express.static);
app.use(express.static(__dirname + "/public"));

router(app);

const mongoUri = `mongodb://BackendCoder:${pass}@ac-iwvbtxh-shard-00-00.fwtrhw6.mongodb.net:27017,ac-iwvbtxh-shard-00-01.fwtrhw6.mongodb.net:27017,ac-iwvbtxh-shard-00-02.fwtrhw6.mongodb.net:27017/?ssl=true&replicaSet=atlas-azcxpo-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(mongoUri, (error) => {
  if (error) {
    process.exit();
  }
});
