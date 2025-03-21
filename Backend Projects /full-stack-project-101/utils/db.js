import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const db = ()=>{
    mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('connected to mongo DB');
})

.catch((err)=>{
    console.log('error connecting to mongo DB');
});

};

export default db;