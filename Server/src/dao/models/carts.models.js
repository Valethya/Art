import mongoose, { Schema } from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      qty: Number,
    },
  ],
});

const cartsModels = mongoose.model(cartsCollection, cartsSchema);

export default cartsModels;
