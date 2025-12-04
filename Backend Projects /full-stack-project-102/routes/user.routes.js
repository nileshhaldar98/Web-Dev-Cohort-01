import express from "express";
import { forgotPassword, loginUser, logoutUser, profileUser, registerUser, resetUser, verifyUser } from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.get("/verify/:token", verifyUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/me", isLoggedIn, profileUser);
userRoutes.get("/logout", isLoggedIn, logoutUser);
userRoutes.get("/forgot", forgotPassword);
userRoutes.get("/reset/:token", resetUser);
export default userRoutes