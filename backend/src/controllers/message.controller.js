import cloudinary from "../lib/cloudinary.js";
import { ApiResponse, asyncHandler } from "../lib/utils.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
    return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"))
});

export const getMessages = asyncHandler(async (req, res) => {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
        ]
    })

    return res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully"))

})

export const sendMessage = asyncHandler(async (req, res) => {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
        const uploadedImage = await cloudinary.uploader.upload(image);
        imageUrl = uploadedImage.secure_url;
    }

    const newMessage = await Message.create({
        senderId,
        receiverId,
        text,
        image: imageUrl
    });

    await newMessage.save();

    // TODO: realtime functionality goese here -> socket.io

    return res.status(201).json(new ApiResponse(201, newMessage, "Message sent successfully"))
})