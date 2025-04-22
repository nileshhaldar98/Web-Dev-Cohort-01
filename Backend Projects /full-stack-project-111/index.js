import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import db from "./utils/User.db.js";

dotenv.config();
const app = express();
const port = process.env.PORT_NUMBER || 3000;

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); //to acccess the data from the req body act as a middleware

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use((req,res)=>{
  res.status(400).json({error:"route not found"})
})
 
db();
app.use("/api/v1/users",userRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
