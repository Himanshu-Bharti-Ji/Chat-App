import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"


// Signup controller
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            })
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
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
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "User created successfully",
                data: newUser
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "User creation failed"
            })
        }



    } catch (error) {
        console.log('Error in signup controller', error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// login controller

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        generateToken(user._id, res);

        const userObject = user.toObject();
        const { password: _, ...userWithoutPassword } = userObject;

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            data: userWithoutPassword
        })

    } catch (error) {
        console.log('Error in login controller', error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
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
        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        })
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}