import { config } from 'dotenv';
import User from '../models/user.model.js';
import { connectDB } from '../lib/db.js';
import { asyncHandler } from '../lib/utils.js';
import bcrypt from "bcryptjs"
config();

const seedUsers = [
    {
        email: "john.doe@example.com",
        fullName: "John Doe",
        password: "12345678",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        email: "jane.smith@example.com",
        fullName: "Jane Smith",
        password: "12345678",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        email: "robert.brown@example.com",
        fullName: "Robert Brown",
        password: "12345678",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        email: "lisa.johnson@example.com",
        fullName: "Lisa Johnson",
        password: "12345678",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        email: "michael.wilson@example.com",
        fullName: "Michael Wilson",
        password: "12345678",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        email: "emily.davis@example.com",
        fullName: "Emily Davis",
        password: "12345678",
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
        email: "david.miller@example.com",
        fullName: "David Miller",
        password: "12345678",
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
        email: "sarah.martin@example.com",
        fullName: "Sarah Martin",
        password: "12345678",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
        email: "james.thomas@example.com",
        fullName: "James Thomas",
        password: "12345678",
        profilePic: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
        email: "olivia.anderson@example.com",
        fullName: "Olivia Anderson",
        password: "12345678",
        profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
    },
];

const seedDatabase = asyncHandler(async () => {
    await connectDB();

    for (const user of seedUsers) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await User.create(user);
    }

    console.log('Database seeded successfully');
    process.exit();
})

seedDatabase();