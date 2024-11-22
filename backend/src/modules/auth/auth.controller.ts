import { Request, Response } from 'express';
import asyncWrapper from '../../core/utils/asyncWrapper.util';
import * as AuthService from './auth.service';
import { IProfilePic, ISignup } from './auth.interface';
import httpStatus from 'http-status';
import { IGetUserRequest } from '../../core/interfaces/user-request.interface';
import { IUser } from '../user/user.interface';

export const handleSignup = asyncWrapper(async (req: Request, res: Response) => {
	const data: ISignup = req.body;
	const { user, token } = await AuthService.signup(data);
	res.cookie('jwt', token, {
		maxAge: 7 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV !== 'development',
	});
	res.status(httpStatus.CREATED).json(user);
});

export const handleLogin = asyncWrapper(async (req: Request, res: Response) => {
	const data: ISignup = req.body;
	const { user, token } = await AuthService.login(data);
	res.cookie('jwt', token, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV !== 'development',
	});
	res.status(httpStatus.OK).json(user);
});

export const handleLogout = asyncWrapper(async (req: Request, res: Response) => {
	res.cookie('jwt', '', { maxAge: 0 });
	res.status(httpStatus.OK).json({ message: 'Logged out successfully' });
});

export const handleUpdateProfile = asyncWrapper(async (req: IGetUserRequest, res: Response) => {
	const data: IProfilePic = req.body;
	const loggedInUser: IUser = req.user;
	const { user } = await AuthService.updateProfilePic(data, loggedInUser._id);
	res.status(httpStatus.OK).json(user);
});

export const handleCheckAuth = asyncWrapper(async (req: IGetUserRequest, res: Response) => {
	res.status(httpStatus.OK).json(req.user);
});
