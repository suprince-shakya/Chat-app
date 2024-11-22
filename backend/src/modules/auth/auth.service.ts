import AppError from '../../core/utils/error.util';
import User from '../user/user.model';
import { ILogin, IProfilePic, ISignup } from './auth.interface';
import httpStatus from 'http-status';
import * as bcryptUtils from '../../core/utils/bcrypt.util';
import * as jwtUtils from '../../core/utils/jwt.util';
import cloudinary from '../../config/cloudinary.config';

export const signup = async (data: ISignup) => {
	try {
		const oldUser = await User.findOne({ email: data.email });
		if (oldUser) {
			throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists');
		}

		const hashedPassword = await bcryptUtils.hashPassword(data.password);
		const user = await User.create({
			fullName: data.fullName,
			email: data.email,
			password: hashedPassword,
		});

		const token = jwtUtils.createToken(user);
		return { user, token };
	} catch (error) {
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
	}
};

export const login = async (data: ILogin) => {
	try {
		const user = await User.findOne({ email: data.email });
		if (!user) throw new AppError(httpStatus.BAD_REQUEST, 'Invalid credentials');

		const isPasswordCorrect = bcryptUtils.comparePassword(data.password, user.password);
		if (!isPasswordCorrect) throw new AppError(httpStatus.BAD_REQUEST, 'Invalid credentials');

		const token = jwtUtils.createToken(user);

		return { user, token };
	} catch (error) {
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
	}
};

export const updateProfilePic = async (data: IProfilePic, userId: string) => {
	try {
		const uploadResponse = await cloudinary.uploader.upload(data.profilePic);
		const user = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });

		return { user };
	} catch (error) {
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
	}
};
