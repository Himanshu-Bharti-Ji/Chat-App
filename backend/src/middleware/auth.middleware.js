import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiError } from '../lib/utils.js';

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized Access - No Token Provided")
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw new ApiError(401, "Unauthorized Access - Invalid Token")
        }

        const user = await User.findById(decodedToken.userId).select('-password');

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        req.user = user;
        next();

    } catch (error) {
        console.log('Error in verifyJWT middleware', error?.message);
        res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Internal server error"
        })
    }
}


