import express from "express";
import { registerUser, verifyUser } from "../controllers/auth.controller.js";


const userRoutes = express.Router()



userRoutes.post('/register', registerUser);
userRoutes.get('/verify/:token', verifyUser);

export default userRoutes;