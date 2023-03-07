import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;
