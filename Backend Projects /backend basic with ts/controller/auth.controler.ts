import { Request, Response, NextFunction } from "express";
import {User,IUser} from "../model/user.model"
import mongoose from "mongoose";
import crypto from "crypto"
import { otpGenrator } from "../services/utils/otpGenrator.utils";

const registerUser = async (req: Request, res: Response) => { 

    try {
        const { name, email, password } = req.body; 
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Enter all the details"
            })
        }
          
        const existingUSer: IUser | null = await User.findOne({ email }).select("-password");
        if (existingUSer) { 
            return res.status(200).json({
                message:"user already exist"
            })
        }

        const verficationToken = crypto.randomBytes(32).toString("hex");
        const otp = otpGenrator(4);
        const newUser = await User.create({ email, password, name, verficationToken ,otp})
        const verificationUrl = `${process.env.BASE_URL}/verify/${verficationToken}`;
    

        return res.status(200).json({
            message: "User Registerd successfully!",
            USER: {
                name:`${name}`,
                email: `${email}`,
                verificationUrl,
                otp
            }
        })
    } catch (error) {
        return res.status(400).json({
            message:"Error in the Register User "
        })
    }
} 
const verifyUser = async (req:Request,res:Response) => { 
   try {
     const token = req.params;
     if (!token) {
         return res.status(400).json({
             message:"token is not present "
         })
     }
     
     const isValid = await User.findOne({ token })
     if (isValid) { }
     return res.status(200).json({
         message: "this is ",
         token
     })
   } catch (error) {
    
   }
}
export { registerUser ,verifyUser}