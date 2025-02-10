import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected successfully: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Database connection failed: ${error}`);
    }
}
