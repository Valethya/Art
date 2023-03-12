import usersModel from "../models/users.model.js";
import cript from "../../helpers/criptPassword.js";

class authManager {
  async authLogin(username, password) {
    try {
      const user = await usersModel.findOne({ email: username });

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

  async authGithub(profile) {
    try {
      const user = await usersModel.findOne({ githubId: profile._json.id });

      if (!user) {
        const newUserInfo = {
          githubId: profile._json.id,
          firstName: profile._json.name
            ? profile._json.name
            : profile._json.login,
          lastName: "",
          age: 18,
          email: profile._json.email ? profile._json.email : "",
          password: "",
        };

        const newUser = await usersModel.create(newUserInfo);
        return newUser;
      }
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async authGoogle(profile) {
    try {
      const user = await usersModel.findOne({ googleId: profile._json.sub });

      if (!user) {
        const newUserInfo = {
          googleId: profile._json.sub,
          firstName: profile._json.given_name ? profile._json.given_name : "",
          lastName: profile._json.family_name ? profile._json.family_name : "",
          age: 18,
          email: profile._json.email ? profile._json.email : "",
          password: "",
        };

        const newUser = await usersModel.create(newUserInfo);

        return newUser;
      }

      return user;
    } catch (error) {
      return error.errmsg;
    }
  }
}

export default authManager;
