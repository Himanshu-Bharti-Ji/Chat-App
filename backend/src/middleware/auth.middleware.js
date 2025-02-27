import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiError, asyncHandler } from '../lib/utils.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
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
})


