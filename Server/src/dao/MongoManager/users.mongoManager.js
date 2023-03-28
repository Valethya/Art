import usersModel from "../models/users.model.js";
import cript from "../../helpers/criptPassword.js";
import cartsManager from "./carts.mongoManager.js";
const cartManager = new cartsManager();
class userManager {
  // async create(user) {
  //   try {
  //     const passwordEncrypted = cript.createHash(user.password);
  //     const userHash = {
  //       ...user,
  //       password: passwordEncrypted,
  //     };
  //     const newUser = await usersModel.create(userHash);
  //     return { status: 201, message: "Usuario fue creado", user: newUser };
  //   } catch (error) {
  //     return error.errmsg;
  //   }
  // }
  // async findOne(email, password) {
  //   try {
  //     const user = await usersModel.findOne({ email });
  //     if (!user)
  //       throw new Error({ error: "el usuario y contraseña no coinciden" });
  //     if (user.password !== password)
  //       throw new Error({ error: "el usuario y contraseña no coinciden" });
  //     return user;
  //   } catch (error) {
  //     return error.errmsg;
  //   }
  // }
  // auth(password, email) {
  //   try {
  //     if ("adminCod3r123" !== password) {
  //       throw new Error({ error: "el usuario y contraseña no coinciden" });
  //     }
  //     if ("adminCoder@coder.com" !== email) {
  //       throw new Error({ error: "el usuario y contraseña no coinciden" });
  //     }
  //     const user = { firstName: "adimin", lastName: "", email: email };
  //     return user;
  //   } catch (error) {
  //     return error.errmsg;
  //   }
  // }

  async createUser(req, username, password) {
    const { firstName, lastName, email, age, cart } = req.body;
    try {
      const user = await usersModel.findOne({ email: username });
      if (user) {
        console.log("Usuario existe");
        return false;
      }
      if (!email) {
        console.log("ingresa un email");
        return false;
      }
      if (!firstName) {
        console.log("ingresa tu nombre");
        return false;
      }
      if (!lastName) {
        console.log("ingresa tu apellido");
        return false;
      }
      if (!age) {
        console.log("ingresa tu edad");
        return false;
      }
      if (!password) {
        console.log("ingresa una contraseña");
        return false;
      }
      const cart = await cartManager.create();
      const newUserInfo = {
        firstName,
        lastName,
        email,
        age,
        password: cript.createHash(password),
        cart,
      };

      const newUser = await usersModel.create(newUserInfo);

      return newUser;
    } catch (error) {
      return error;
    }
  }
}

export default userManager;
