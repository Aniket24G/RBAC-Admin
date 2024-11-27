import jwt from 'jsonwebtoken';

const authMiddleware = (allowedRole) => (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message:'Access denied'})

    try {
        const decoded = jwt.verify(token,process.env.JWT_AUTHENTICATION_KEY);
        if(!allowedRole.includes(decoded.role)){
            return res.status(401).json({message:'Request access forbidden'})
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message:'Invalid token'})
    }
}

export {authMiddleware}