import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    permissions: [{ type:String }]
},{timestamps:true})

export const Role = mongoose.model('Role',roleSchema)