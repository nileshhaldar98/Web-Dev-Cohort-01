import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) { 
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
             
            return res.status(400).json({
                message: "User Already Exists"
               
            })
        }

        
        const user = await User.create({ name, email, password })
   
        if (!user) {
            return res.status(400).json({
                message: "Error creating User"
            })
        }
        // token cratian logic here 
        const verificationToken = crypto.randomBytes(32).toString("hex");
     
        user.verificationToken = verificationToken;
        await user.save();

        //send email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTEAP_PASSWORD,
            },
        });
        const verificationUrl = `${process.env.BASE_URL}:${process.env.PORT}/api/v1/users/verify/${verificationToken}`;
        console.log(verificationUrl);
        const mailOption = {
          from: '"Nilesh Haldar" <n=nileshhaldar98@gmail.com>',
          to: user.email,
          subject: "Verification Mail from Testing ✔",
          text: `Please Verify Account with click on the following link`,
       html: `
    <p>Click below to verify:</p>
    <a href="${verificationUrl}">Verify Email</a>
  `
};
  
        await transporter.sendMail(mailOption)
        res.status(200).json({
            message:"Email Sent"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "User not registerd",
            error,
            success:false,
        })
    }

};
const verifyUser = async (req, res) => {
    
    const { token } = req.params;

    if (!token) {
        res.status(401).json({
            message: "Token is not present"
        })
    }

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(403).json({
                message: "Invalid Token",
            });
        }

        user.verificationToken = undefined;
        user.isVerified = true;
        await user.save();
        return res.status(200).json({
            message: "verified successfully",
        });
    } catch (error) {
        return res.status(403).json({
            message: "error during verification",
            error
        })


    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Both Credentials required"
        })
    }
     
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "user is not register",
            });
        } 
       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!email == user.email || !isMatch) {
            return res.status(402).json({
                message: "enter correct credentials",
            });
        }
        
        if (user.email == email && isMatch) {
            if (!user.isVerified) {
                return res.status(400).json({
                    message: "Please do verify first with mail"
                })
            } 
        
            //jwt token genrate for the session login 
            const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: `${process.env.JWT_EXPIRE}`
            })
            //to store the session token in the cookies to access the user cookies 
            const optionsCookie = {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            }
            res.cookie("token", jwtToken, optionsCookie)
        
            return res.status(200).json({
                success: true,
                message: "Login Successfull",
                jwtToken,
                user: {
                    id: user._id,
                    name: user.name,
                    role: user.role,
                    verificationToken: user.verificationToken,
                    Verified: user.isVerified
                }
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "error in login ",
            error,
            success: false
        })
    }
    

};
const profileUser = async (req, res) => {
    try {
        
       
        const user = await User.findById(req.user.id).select('-password');
        console.log(user);
        return res.status(201).json({
            message: "here is the users profile",
            profile: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
    } catch (error) {
    
    }
};
const logoutUser = async (req, res) => {
    
    
    try {
        
            res.clearCookie("token", {
              httpOnly: true,
              secure: false,
              sameSite: "strict",
            });
        return res.status(200).json({
            message:"logout successfully"
        })

    } catch (error) {
        return res.status(404).json({
            message: "Error in the logout",
            error
        })
    }
}; 
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message:"User is not registerd"
        })
    }

    const resetPasswordToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: `5min`
    })
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 5 * 60 * 1000;
     await user.save();

     //send email
     const transporter = nodemailer.createTransport({
       host: process.env.MAILTRAP_HOST,
       port: process.env.MAILTRAP_PORT,
       secure: false, // true for 465, false for other ports
       auth: {
         user: process.env.MAILTRAP_USERNAME,
         pass: process.env.MAILTEAP_PASSWORD,
       },
     });
     const resetPasswordUrl = `${process.env.BASE_URL}:${process.env.PORT}/api/v1/users/reset/${resetPasswordToken}`;
     console.log(resetPasswordToken);
     const mailOption = {
       from: '"Nilesh Haldar" <n=nileshhaldar98@gmail.com>',
       to: user.email,
       subject: "Reset mail ✔",
       text: `Please Verify Account with click on the following link`,
       html: `
    <p>Click below to verify:</p>
    <a href="${resetPasswordUrl}">Verify Email</a>
  `,
     };

     await transporter.sendMail(mailOption);
    return res.status(200).json({
       message: "Email Sent",
     });


};
const resetUser = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
        return res.status(400).json({
            message:"invalid user"
        })
    }
    const isValid = user.resetPasswordExpires;
    if (isValid < Date.now()) { 
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        return res.status(404).json({
            message: "Token Expierd"
        })
    }
    const { newPassword, confirmPassword } = req.body;
    if (!newPassword == confirmPassword) {
        return res.status(400).json({
            message:"both paassword does not match "
        })
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    await user.save();
    return res.status(200).json({
        message:"here in the reset user"
    })
};
export { registerUser,verifyUser,loginUser,profileUser,logoutUser,forgotPassword,resetUser,}