import usersModel from "../models/users.model.js";

class userManager {
  async create(user) {
    try {
      const newUser = await usersModel.create(user);
      return { status: 201, message: "Usuario fue creado", user: newUser };
    } catch (error) {
      return error.errmsg;
    }
  }
  async findOne(email, password) {
    try {
      const user = await usersModel.findOne({ email });
      if (!user)
        throw new Error({ error: "el usuario y contraseña no coinciden" });
      if (user.password !== password)
        throw new Error({ error: "el usuario y contraseña no coinciden" });
      return user;
    } catch (error) {
      return error.errmsg;
    }
  }
  auth(password, email) {
    try {
      if ("adminCod3r123" !== password) {
        throw new Error({ error: "el usuario y contraseña no coinciden" });
      }
      if ("adminCoder@coder.com" !== email) {
        throw new Error({ error: "el usuario y contraseña no coinciden" });
      }
      const user = { firstName: "adimin", lastName: "", email: email };
      return user;
    } catch (error) {
      return error.errmsg;
    }
  }
}

export default userManager;
