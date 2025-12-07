import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI as string;

export const connectDB = async (): Promise<void> => {
   mongoose
     .connect(url)
     .then(() => {
       console.log("======================================");
       console.log("connected to db");
       console.log("======================================");
     })
     .catch((err) => {
       console.log("======================================");
       console.log("error connecting db");
       console.log("======================================");
     });
};
