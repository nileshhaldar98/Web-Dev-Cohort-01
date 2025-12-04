import User from "../model/User.model.js";
import jwt, { decode } from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {

    try {
        const accessToken = req.cookies.token;
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const id = decoded.id;
        const user = await User.findById(decoded.id);
        
        req.user = decoded;
        next();
  
        
    } catch (error) {
        
        return res.status(404).json({
          message: "unauthorised user request",
        });
      
    }
}
export { isLoggedIn }