import express from "express";
import { loginUser, registerUser, verifyUser } from "../controllers/auth.controller.js";


const userRoutes = express.Router()



userRoutes.post('/register', registerUser);
userRoutes.get('/verify/:token', verifyUser);
userRoutes.post('/login', loginUser);

export default userRoutes;