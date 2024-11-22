import express from 'express';
import { isAuthenticated } from '../../core/middleware/auth.middleware';
import * as MessageController from './message.controller';

const router = express.Router();
router.use(isAuthenticated);

router.get('/users', MessageController.handleGetLoggedInUsers);
router.get('/:id', MessageController.handleGetMessages);
router.post('/send/:id', MessageController.handleSendMessage);

export default router;
