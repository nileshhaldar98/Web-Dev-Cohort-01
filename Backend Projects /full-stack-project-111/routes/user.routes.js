import expresss from 'express';
import { registerUser } from '../controller/user.controller.js';


const router = expresss.Router();

router.get("/register",registerUser);


export default router;