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
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;
