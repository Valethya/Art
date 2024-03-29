import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  age: { type: Number },
  email: { type: String },
  password: { type: String },
  googleId: { type: String },
  githubId: { type: String },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  rol: {
    type: String,
    default: "user",
  },
});

userSchema.pre("findOne", function () {
  this.populate("carts.cart");
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;
