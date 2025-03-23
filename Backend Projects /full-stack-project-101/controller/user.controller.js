import User from "../model/User.model.js";
import crypto from "crypto"
import nodemailer from "nodemailer"
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
    console.log(user);
    if(!user){
        return res.status(400).json({
            message:"User Not Registerd",
        })

    }
    const token = crypto.randomBytes(32).toString("hex")
    console.log(token);
    user.verificationToken = token;
    
    await user.save();
    //send mail
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass:  process.env.MAILTRAP_PASSWORD,
      },
    });
    const mailOpttion = {
        from:process.env.MAILTRAP_SENDERMAIL,
        to : user.email,
        subject:"verify Your Email",
        text:`Please Clcik Here to Verify The mail  
        ${env.process.BASE_URL}/api/v1/user/verify$/{token}`,

    } 
     await transporter.sendMail(mailOpttion);
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
    console.log(token);
    if(!token){
        return res.status(400).json({
            message:"Invalid Token"
        })
    }

       const user = await User.findOne({verificationToken:token})
    if(!token){
        return res.status(400).json({
            message:"Invalid Token"
        })
    } 
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

};

export {registerUser,verifyUser}
