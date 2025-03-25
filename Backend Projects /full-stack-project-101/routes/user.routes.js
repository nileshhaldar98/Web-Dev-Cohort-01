import express from "express"
import { registerUser, verifyUser,loginUser,userProfile,logoutUser,resetPassword } from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register",registerUser);
router.get("/verify/:token",verifyUser);
router.post("/login",loginUser);
router.post("/me",isLoggedIn ,userProfile);
router.post("/logout",isLoggedIn,logoutUser);
router.post("/logout",isLoggedIn,resetPassword);

export default router