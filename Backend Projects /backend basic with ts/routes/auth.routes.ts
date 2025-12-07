import express from "express";
import { registerUser, verifyUser } from "../controller/auth.controler";


const authRouter = express.Router();
authRouter.post('/register', registerUser);
authRouter.get('/verify/:token', verifyUser);

export default authRouter;