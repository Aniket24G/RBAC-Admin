// import express from 'express';
// import { User } from '../models/user.models';
// import { authMiddleware } from '../middleware/authMiddleware';

// const router = express.Router();

// router.get('/',authMiddleware(['Admin']),async(req,res) => {
//     const users = await User.find();
//     res.json(users)
// })

// //add user
// router.post('/',authMiddleware(['Admin']),async(req,res) => {
//     const {username, email, password, role} = req.body;
//     try {
//         const newUser = new User({username, email, password, role});
//         await newUser.save();
//         res.status(201).json(newUser)
//     } catch (error) {
//         res.status(502).json({message:error.message})
//     }
// })

// //delete user
// router.delete('/',authMiddleware(['Admin']),async(req,res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if(!user) res.status.apply(401).json({message:'User not found'})
//         await user.remove();
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })