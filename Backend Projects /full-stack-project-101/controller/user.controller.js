import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { trace } from "console";

//register User
const registerUser = async (req,res) =>{
const {name,email,password} = req.body 
if(!name || !email || !password){
    return res.status(400).json({
        message: "All fields are required "
    })
}
try{
    const exsistingUser = await User.findOne({email})
    if(exsistingUser){
        return res.status(400).json({
            message:"User Already Exist"
        }) 
    }
  const user  =  await  User.create({
        name,
        email,
        password
    }) 


    if(!user){
        return res.status(400).json({
            message:"User Not Registerd",
        })
    }
    const token = crypto.randomBytes(32).toString("hex")
    
    user.verificationToken = token; 


    await user.save();
    //send mail
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass:  process.env.MAILTRAP_PASSWORD,
      },
    });
    const mailOption = {
        from:process.env.MAILTRAP_SENDERMAIL,
        to : user.email,
        subject:"verify Your Email",
        html: `<p>Please click <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">here</a> to verify your email.</p>`,
    } ;
     await transporter.sendMail(mailOption);
     res.status(201).json({
        message:"USer Register Successfully",
        success: true
     })

}  catch(error){
    res.status(400).json({
        message:"User not Registered Successfully",
        success:false,
        error,
    })
}
};
//verify USER
const verifyUser = async(req,res) =>{

    const {token} = req.params;
    if(!token){
        return res.status(400).json({
            message:"Invalid Token"
        })
    }

       const user = await User.findOne({verificationToken:token})
    if(!user){
        return res.status(400).json({
            message:"Invalid Token"
        })
    } 
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return res.status(400).json({
        message:"User Successfully Verified"
    })

};
//login user
const loginUser = async (req,res) => {
const {email,password} = req.body
if(!email || !password){
    return res.status(400).json({
        message:"all fields are required"
    })
}
try {
   const user =  await User.findOne({email});
    if(!user){
    return res.status(400).json({
        message:"invalid user or password"
    })
    }
   const isMatch = await bcrypt.compare(password, user.password)
   if(!isMatch){
    return res.status(400).json({
        message : "Invalid email or password"
    });
   }
  const token =  jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE_TIME})
const cookieOptions={
    httpOnly:true,
    secure:true,
    maxAge:24*60*60*1000
}
res.cookie("token", token,cookieOptions)
res.status(200).json({
    success:true,
    message:"login successfully",token,
    user:{
        id:user._id,
        name:user.name,
        role:user.role

    }
});
} catch (error) {
    res.status(400).json({
        message:"login unSuccessfully",
        success:false,
        error,
    })
}
};
// user profile
const  userProfile = async (req,res) =>  {


    try {

        const user = User.findById(req.user.id).select('-password');
        console.log(!user);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"invalid User"
            })
        }

        return res.status(400).json({
            success:true,
            message:"Login Suceessfull"
        })

    } catch (error) {

        return res.status(400).json({
            success:false,
            message:"error in log in ",

        })
        
    }





}
//forgot Password
const  forgotPasssword = async (req,res) => {


    try {
        



    } catch (error) {
        
    }





}
//reset Password
const  resetPassword = async (req,res)=>{


    try {
        



    } catch (error) {
        
    }





}
//logoutUser
const  logoutUser = async (req,res)=>{


    try {
        



    } catch (error) {
        
    }





}



export {registerUser,verifyUser,loginUser,userProfile,logoutUser,resetPassword}
