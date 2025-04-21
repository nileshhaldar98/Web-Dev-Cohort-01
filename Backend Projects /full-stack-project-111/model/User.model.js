import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    name:String,
    email:String,
    password:String,
    phone:String,
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type:String,
    },
    verificationTokenExpiry:{
        type:Date,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordTokenExpiry:{
        type:Date,
    },
},
{
    timestamps:true,
});

const User  = mongoose.model("User", userSchema);

export default User;