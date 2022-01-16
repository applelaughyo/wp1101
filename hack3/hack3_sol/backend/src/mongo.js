import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";
async function connect() {
  // TODO 1.1 Connect your MongoDB

  mongoose
  .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("mongo db connection created")
    dataInit();
  })
  const db = mongoose.connection

  db.on("error", (error) => {
      throw new Error("DB connection error: ", error)
  })

  db.once("open", () => {
      console.log("mongo open!")
  })
  return db
}

export default { connect };