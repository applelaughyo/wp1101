import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import dotenv from  "dotenv-defaults";

async function connect() {
  // TODO 1.1 Connect your MongoDB
  dotenv.config();
    if(!process.env.MONGO_URL){
        console.error('Missing MONGO_URL');
        process.exit(1);
    }
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((res) => console.log("mongo db connection created."));
    const db = mongoose.connection;
  //dataInit();
}


export default { connect };