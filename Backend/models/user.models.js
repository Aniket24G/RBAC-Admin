import mongoose, { Schema } from "mongoose";
import bcrypt from'bcrypt';

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:'Role',
    },
    isActive:{
        type:Boolean,
        default:true,
    },
},{timestamps:true})

userSchema.pre("save",async function(next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

export const User = mongoose.model('User',userSchema)