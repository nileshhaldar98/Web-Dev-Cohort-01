import mongoose from "mongoose";
import bcrypt from "bcryptjs";


 

const userSchema = new mongoose.Schema({

    name:String,
    email:String,
    password:String,
    username:String,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    isVerified:{
        type : Boolean,
        default: false
    },
    verificationToken:{
            type :String,
    },
    resetPasswordToken:{
        type :String
    },
    resetPasswordDate:{
        type:Date
    }
},{
    timestamps:true //created at updated at timestamp 
})

//bcrypting the password befor saving into the the database 
//act as an middleware 

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    return next();
})


const User =  mongoose.model("User",userSchema);
export default User