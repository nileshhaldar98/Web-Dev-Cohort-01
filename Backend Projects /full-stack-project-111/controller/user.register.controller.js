import User from "../model/Users.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";



const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
       console.log(user);

       if(!user){
        return res.status(400).json({
          message:"user not registered"

        });

       }


    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;

    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: true,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAILTRAP_SENDER_MAIL,
      to: user.email,
      subject: "Verification Email",
      text: `Please click on the following link:
      ${process.env.BASE_URL}/api/v1/users/verify/${token}
      `,
    };

    await transporter.sendMail(mailOption);

    res.status(200).json({
      message:
        "Email sent successfully! Please verify your email by clicking on the link.",
      success: true,
    });
  } catch (error) {
     res.status(500).json({
      message: `User not registered successfully. Please try again. Error:${error.message}`,
      success:false,
    });
  }
};

export default registerUser;
