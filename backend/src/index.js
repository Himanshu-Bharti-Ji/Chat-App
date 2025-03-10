import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config();

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    console.log(`server running on port 5001`);
    connectDB();

})