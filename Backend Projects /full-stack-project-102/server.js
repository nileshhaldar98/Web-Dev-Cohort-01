import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import db from './utils/db.js';
import userRoutes from "./routes/user.routes.js"
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

db();
app.use(`/api/v1/users`,userRoutes)
app.get('/', (req, res) => {
    res.send("hello world")
})
app.listen(port, () => { 
    console.log("======================================");
    console.log(`server is running on the port ${port}`);
    console.log("======================================");
})