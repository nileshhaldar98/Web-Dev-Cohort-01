import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db = ()=>{
    mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connected");
}
).catch((err) => {  
    console.log("MongoDB connection error: ", err);
}   
);
}

export default db;
// module.exports = db; 