import mongoose,{Schema} from "mongoose";

const permissionSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    }
},{timestamps:true});

export const Permission = mongoose.model('Permission',permissionSchema)