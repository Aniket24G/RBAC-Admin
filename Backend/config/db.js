import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'

const connectDB = async() => {
    try {
        const connectionInstance = mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
        console.log(`\n MnogoDB connected!! Host:${(await connectionInstance).connection.host}`);
    } catch (error) {
        console.error("Error conecting the db",error);
        throw error;
    }
}

export default connectDB;