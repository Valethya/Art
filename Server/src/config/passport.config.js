import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth20";
import users from "../dao/models/users.model.js";
import userManager from "../dao/MongoManager/users.mongoManager.js";
import authManager from "../dao/MongoManager/auth.mongoManager.js";
import idGithub, { secretKey } from "./index.js";
import secretGithub from "./index.js";
import idGoogle from "./index.js";
import secretGoogle from "./index.js";
import jwt, { ExtractJwt } from "passport-jwt";
import { cookieExtractor } from "../helpers/cookieExtractor.helper.js";

const usersManager = new userManager();
const authsManager = new authManager();
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await usersManager.createUser(req, username, password);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: secretKey,
      },
      async (jwt_payload, done) => {
        try {
          done(null, jwt_payload);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await users.findById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await authsManager.authLogin(username, password);

          return done(null, user);
        } catch (error) {
          done(error.error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.20a055520d60229d",
        clientSecret: "cae8aa0ff5be2ba36d9bf902c4e09521a5d6b9cb",
        callbackURL: "http://localhost:8080/auth/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await authsManager.authGithub(profile);
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID:
          "267378718195-4rgv1ld57h9qi7osoopj17m224dtnab7.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await authsManager.authGoogle(profile);
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export default initializePassport;
