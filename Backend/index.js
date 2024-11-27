import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { PORT } from "./constants.js";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import roleRoutes from './routes/roles.js'

const app = express();
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Error with the application", err);
      throw err;
    });

    app.listen(PORT_NO, () => {
      console.log(`Application is listening on port: ${PORT_NO}`);
    });
  })
  .catch((err) => console.log("MongoDB connection failed", err));

//middleware
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/roles',roleRoutes)

//Error handling
app.use((err,req,res,next) => {
  console.error(err.message);
  res.status(500).json({message:'Server error'});
});

app.listen(PORT,() => console.log(`server running on port ${PORT}`))
