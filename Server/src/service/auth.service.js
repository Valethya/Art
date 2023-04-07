import authManager from "../dao/MongoManager/auth.mongoManager.js";
import cartsManager from "../dao/MongoManager/carts.mongoManager.js";
import usersModel from "../dao/models/users.model.js";
import cript from "../helpers/criptPassword.js";
import { emailAdmin, passAdmin } from "../config/index.js";
//

const auth = new authManager();
const cartManager = new cartsManager();

//
async function authLogin(username, password) {
  try {
    try {
      const admin = validAdmin(username, password);
      if (admin) {
        return admin;
      }
    } catch (error) {
      // Ignoramos las excepciones arrojadas por validAdmin()
    }
    const user = await auth.persistLogin(username);
    console.log(user);
    if (!user) {
      console.log("Usuario no existe");
      return false;
    }

    if (!cript.isValidPassword(user, password)) return false;

    return user;
  } catch (error) {
    return error.error;
  }
}

function validAdmin(username, password) {
  console.log(username == emailAdmin);
  if (username == emailAdmin) {
    console.log(password == passAdmin);
    if (password == passAdmin) {
      const user = {
        firstName: "admin",
        email: username,
        rol: "admin",
        id: "123456789101",
      };
      return user;
    } else {
      return false;
    }
  }
}

async function authGithub(profile) {
  try {
    const foundUser = await usersModel.findOne({ githubId: profile._json.id });

    if (!foundUser) {
      const cart = await cartManager.create();

      const newUserInfo = {
        githubId: profile._json.id,
        firstName: profile._json.name
          ? profile._json.name
          : profile._json.login,
        lastName: "",
        age: 18,
        email: profile._json.email ? profile._json.email : "",
        password: "",
        cart,
      };

      const newUser = await auth.persistGithub(newUserInfo);
      return newUser;
    }
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function authGoogle(profile) {
  try {
    const user = await usersModel.findOne({ googleId: profile._json.sub });

    if (!user) {
      const cart = await cartManager.create();
      const newUserInfo = {
        googleId: profile._json.sub,
        firstName: profile._json.given_name ? profile._json.given_name : "",
        lastName: profile._json.family_name ? profile._json.family_name : "",
        age: 18,
        email: profile._json.email ? profile._json.email : "",
        password: "",
        cart,
      };

      const newUser = await auth.persistGoogle(newUserInfo);

      return newUser;
    }

    return user;
  } catch (error) {
    return error.errmsg;
  }
}

export { authLogin, authGithub, authGoogle };