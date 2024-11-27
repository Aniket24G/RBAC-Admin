import express from 'express';
import { User } from '../models/user.models.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

//Get all user
const router = express.Router();

router.get('/',authMiddleware(['Admin']),async(req,res,next) => {
    const users = await User.find().populate('role');
    res.json(users)
})


//add user 
router.post('/',authMiddleware(['Admin']),async(req,res) => {
    const {username, email, password, role} = req.body;
    try {
        const newUser = new User({username,email,password,role});
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message:error.message})   
    }
})

export default router