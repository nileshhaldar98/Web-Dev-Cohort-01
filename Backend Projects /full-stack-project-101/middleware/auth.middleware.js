import jwt from "jsonwebtoken"
export const isLoggedIn = async(req,res,next)=>{
    try 
    {
        const token = req.cookies?.token 
        
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Authentication Faild"
            }) 
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user  = decoded;
        next();
    } catch (error) {
        return res.status(501).json({
            success:false,
            message:"error in middleware"
        })
    }
}



