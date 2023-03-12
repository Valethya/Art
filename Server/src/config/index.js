import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

let port = process.env.PORT || 8080;
export let pass = process.env.PASS;
export let passSession = process.env.SECRET_SESSION_STORAGE;
export let idGithub = process.env.CLIENT_ID_GITHUB;
export let secretGithub = process.env.CLIENT_SECRET_GITHUB;
export let idGoole = process.env.CLIENT_ID_GOOGLE;
export let secretGoogle = process.env.CLIENT_SECRET_GOOGLE;
export let secretKey = process.env.SECRET_KEY;

export default port;
