import jwt from 'jsonwebtoken'

// Async handler
export const asyncHandler = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        console.log('Error :', error?.message);
        res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Internal server error"
        })
    }
}

// Error response
export class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.success = false
        this.message = message
        this.errors = errors;
        this.stack = stack;
        this.data = null;

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Success response
export class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

// Generate a token for user
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '2d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 2 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV !== 'development',
    });

    return token;
}

// Get user without password
export const getUserWithoutPassword = (user) => {
    const userObject = user.toObject();
    const { password: _, ...userWithoutPassword } = userObject;
    return userWithoutPassword;
};