import express from 'express';
import { Role } from '../models/role.models.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

//get all roles
router.get('/',authMiddleware(['Admin']),async(req,res) => {
    const roles = await Role.find();
    res.json(roles);
})

//add roles
router.post('/',authMiddleware(['Admin']),async(req,res) => {
    const {name,permissions} = req.body;
    try {
        const newRole = new Role({name,permissions});
        await newRole.save();
        res.status(201).json(newRole)
    } catch (error) {
        res.status(401).json({message:error.message})
    }
})

export default router