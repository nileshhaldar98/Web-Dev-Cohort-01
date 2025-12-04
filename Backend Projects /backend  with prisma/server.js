import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import sendMail from "./utils/send.email.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());
app.use(
  cors({ 
    origin: process.env.BASE_URL || "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
  }) 
);
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => 
    res.send("hello"));

app.listen(port, () => { 
    console.log("=============================================");
    console.log(`app is running on the port ${port}`);
    console.log("=============================================");
})      