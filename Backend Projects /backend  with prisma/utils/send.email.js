import nodemailer from "nodemailer";
    
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTEAP_PASSWORD,
  },
});

const sendMail = async (email,subject, text, link) => {
    
    try {
        const mailOption = {
            from: '"Nilesh Haldar" <n=nileshhaldar98@gmail.com>',
            to:`${email}`,
            subject: "Reset mail ✔",
            text: `${text}`,
            html: `
        <p>Click link below:</p>
        <a href="${link}">Link </a>
      `,
        };
        await transporter.sendMail(mailOption);
    } catch (error) {
        return res.status("error in send mail")
    }
}


export default sendMail;

