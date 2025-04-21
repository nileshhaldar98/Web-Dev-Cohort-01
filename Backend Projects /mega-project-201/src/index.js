import app from "./app";
import dotenv from "dotenv";
import connectDB from "./db";

dotenv.config({
    path:"./.env"
});

connectDB()
    .then()
    .catch((err)=>{
        console.log("MongoDB Connection error",err);
    })

const PORT = process.env.PORT || 8000;
