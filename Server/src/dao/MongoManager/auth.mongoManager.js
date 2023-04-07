import usersModel from "../models/users.model.js";

class authManager {
  async persistLogin(username) {
    try {
      const user = await usersModel.findOne({ email: username });

      return user;
    } catch (error) {
      return error.error;
    }
  }

  async persistGithub(newUserInfo) {
    try {
      const newUser = await usersModel.create(newUserInfo);

      return newUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async persistGoogle(profile) {
    try {
      const newUser = await usersModel.create(newUserInfo);

      return newUser;
    } catch (error) {
      return error.errmsg;
    }
  }
}

export default authManager;
