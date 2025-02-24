import { generateToken, ApiError, ApiResponse, getUserWithoutPassword } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"


// Signup controller
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        if (password.length < 6) {
            throw new ApiError(400, "Password must be at least 6 characters long")
        }

        const user = await User.findOne({ email });

        if (user) {
            throw new ApiError(400, "User already exists")
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashPassword
        })

        if (newUser) {
            generateToken(newUser._id, res);
            const createdUser = await newUser.save();

            const userWithoutPassword = getUserWithoutPassword(createdUser);

            return res.status(201).json(
                new ApiResponse(201, "User created successfully", userWithoutPassword)
            )
        } else {
            return res.status(400).json({
                success: false,
                message: "User creation failed"
            })
        }

    } catch (error) {
        console.log('Error in signup controller', error.message);
        res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Internal server error"
        })
    }
}

// login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(400, "User not found")
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            throw new ApiError(400, "Incorrect password")
        }

        generateToken(user._id, res);

        const userWithoutPassword = getUserWithoutPassword(user);

        return res.status(200).json(new ApiResponse(200, userWithoutPassword, "Login successfully"))

    } catch (error) {
        console.log('Error in login controller', error.message);
        res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Internal server error"
        })
    }
}

// logout controller
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 0
        })
        return res.status(200).json(
            new ApiResponse(200, "Logout successfully")
        )
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

// update profile controller
export const updateProfile = async (req, res) => {
    try {

    } catch (error) {

    }
}