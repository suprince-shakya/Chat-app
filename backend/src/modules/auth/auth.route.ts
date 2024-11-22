import express from 'express';
import * as AuthController from './auth.controller';
import { isAuthenticated } from '../../core/middleware/auth.middleware';

const router = express.Router();

router.post('/signup', AuthController.handleSignup);
router.post('/login', AuthController.handleLogin);
router.post('/logout', AuthController.handleLogout);

router.put('/update-profile', isAuthenticated, AuthController.handleUpdateProfile);
router.get('/check', isAuthenticated, AuthController.handleCheckAuth);

export default router;
