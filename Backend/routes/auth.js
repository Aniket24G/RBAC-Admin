import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.models.js';

const router = express.Router();

//Login route
router.post('/login', async(req,res) => {
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email}).populate('role');
        if(!user) return res.status(404).json({message:'User does not exist'})

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({message:'Invalid password'});

        const token = jwt.sign({id:user._id, role:user.role.name},process.env.JWT_AUTHENTICATION_KEY,{expiresIn:'1h'})
        res.json({token,role:user.role.name});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

export default router;