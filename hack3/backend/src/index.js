import mongo from "./mongo.js";
import server from "./server.js";

import dotenv from  "dotenv-defaults";

mongo.connect();
const port = process.env.PORT | 5000;

server.start({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
