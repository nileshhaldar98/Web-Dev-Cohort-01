import express from "express";

import registerUser from "../controller/user.register.controller.js"


const router = express.Router();


router.post("/register",registerUser)





export default router;
