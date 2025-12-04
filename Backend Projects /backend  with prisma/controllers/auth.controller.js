import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";
import sendMail from "../utils/send.email.js";

dotenv.config();

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
   try {
     const { name, email, password } = req.body;
     if (!name || !email || !password) { 
         return res.status(400).json({
             message:"enter all the fields"
         })
     }
     const normalizedEmail = email.toLowerCase().trim();
 
     const existingUser = await prisma.user.findUnique({
         where: { email: normalizedEmail },
         select: {id:true},
     });
     if (existingUser) {
         return res.status(400).json({
             message:"User is already present"
         })
     }
       const hashedPassword = await bcrypt.hash(password, 10); 
       const verifyToken = crypto.randomBytes(32).toString("hex");
       const verifyExpires = new Date(Date.now() + 5 * 60 * 1000);
    
       const newUser = await prisma.user.create({
           data: {
               name,
               email: normalizedEmail,
               password: hashedPassword,
               verifyToken: verifyToken, 
               verifyExpires:verifyExpires
           }
       })
       const port = process.env.PORT || 3000;
       const verifyLink = `${process.env.BASE_URL}:${port}/api/v1/users/verify/${verifyToken}`;
       console.log(verifyLink);
       const subject = `verify your account`;
       const text = 'here is the link';
       const link = verifyLink;
       sendMail(email, subject,text,link);
     return res.status(200).json({
         message:"User Account created Successfully"
     })
   } catch (error) {
       console.log(error);
       return res.status(400).json({
           message: "Error in the register User",
           error,
           
       })
   }
   
}

const verifyUser = async (req,res) => { 
    try {
        const verifyToken = req.params.token
    
        if (!verifyToken) {
            return res.status(400).json({
                message: "invalid Verifcation token"
            })
        }
        const now = new Date();
        const isValid = await prisma.user.updateMany({
            where: {
                verifyToken: verifyToken,
                verifyExpires: { gt: now }
            },
            data: {
                isVerified: true,
                verifyToken: null,
                verifyExpires: null
            }
    
        });
        if (isValid.count == 0) {
            return res.status(400).json({
                message: "invalid token"
            })
        }
        return res.status(200).json({
            message: "verified successfully "
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "error in Verify User ",
            error
        })
    }
}
export { registerUser,verifyUser}