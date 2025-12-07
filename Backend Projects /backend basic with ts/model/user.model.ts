import mongoose from "mongoose";
import bcrypt from "bcryptjs"

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role:  "USER" | "ADMIN";
  isVerified: boolean;
  verficationToken?: string,
  otp?:string,
  resetPasswordToken?: string,
  resetTokenExpiers?: Date
};

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verficationToken: {
    type: String
  },
  otp: {
    type:String
  },
  resetPasswordToken: {
    type: String,
  },
  resetTokenExpiers: {
    type: Date
  }
},
  {
    timestamps: true
  });
//hook pre save when the hook is async it does not pass the next ts does is that it make the next as the normal variable but not as the function thats whu when we use next(); gives an  error  
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) { 
    return;
  }
  this.password = await  bcrypt.hash(this.password as string,10)
});


export const User = mongoose.model<IUser>("User",UserSchema);
