import User from '../../modules/user/user.model';
import { Response, NextFunction } from 'express';
import asyncWrapper from '../utils/asyncWrapper.util';
import { IGetUserRequest } from '../interfaces/user-request.interface';
import AppError from '../utils/error.util';
import httpStatus from 'http-status';
import { IToken, verifyToken } from '../utils/jwt.util';
import { IUser } from '../../modules/user/user.interface';

export const isAuthenticated = asyncWrapper(async (req: IGetUserRequest, res: Response, next: NextFunction) => {
	try {
		const bearerToken = req.cookies.jwt;

		if (!bearerToken) {
			throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized - No Token Provided');
		}

		try {
			const payload: IToken = await verifyToken(bearerToken);
			const user: IUser = await User.findById(payload.userId).select('-password');

			if (!user) {
				throw new AppError(httpStatus.NOT_FOUND, 'User not found');
			}
			req['user'] = user;
			next();
		} catch (e) {
			throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized - Invalid Token');
		}
	} catch (error) {
		console.log('Error in protectRoute middleware: ', error.message);
		throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
	}
});
