import { generateToken, ApiError, ApiResponse, getUserWithoutPassword, asyncHandler } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";


// Signup controller
export const signup = asyncHandler(async (req, res) => {

    const { fullName, email, password } = req.body;


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
            new ApiResponse(201, userWithoutPassword, "User created successfully")
        )
    } else {
        return res.status(400).json({
            success: false,
            message: "User creation failed"
        })
    }


})

// login controller
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

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

})

// logout controller
export const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 0
    })
    return res.status(200).json(
        new ApiResponse(200, {}, "Logout successfully")
    )

})

// update profile controller
export const updateProfile = asyncHandler(async (req, res) => {
    const profilePic = req.files?.profilePic;
    const userId = req.user._id;

    if (!profilePic) {
        throw new ApiError(400, "Profile picture is required")
    }

    const uploadedProfilePic = await cloudinary.uploader.upload(profilePic?.tempFilePath);

    const updatedUser = await User.findByIdAndUpdate(userId, {
        profilePic: uploadedProfilePic.secure_url
    }, { new: true });

    if (!updatedUser) {
        throw new ApiError(404, "User not found")
    }

    return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"))
})

// check auth controller
export const checkAuth = (req, res) => {
    try {
        return res.status(200).json(new ApiResponse(200, req.user, "User exists"))
    } catch (error) {
        console.log('Error in checkAuth controller', error.message);
        res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Internal server error"
        })
    }
}