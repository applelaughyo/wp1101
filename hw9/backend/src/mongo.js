import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
export default()=>{
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
}