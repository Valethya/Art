import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

let port = process.env.PORT || 8080;
export let pass = process.env.PASS;

export default port;
