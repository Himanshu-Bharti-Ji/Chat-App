import express from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', verifyJWT, getUsersForSidebar);
router.get('/:id', verifyJWT, getMessages);

router.post('/send/:id', verifyJWT, sendMessage);


export default router;
