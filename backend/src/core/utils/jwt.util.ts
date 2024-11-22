import * as jwt from 'jsonwebtoken';
import { IUser } from '../../modules/user/user.interface';

export interface IToken {
	email: string;
	userId: string;
}

export const createToken = (user: IUser): string => {
	return jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });
};

export const verifyToken = (token: any): Promise<IToken> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (err: any, payload: IToken) => {
			if (err) {
				reject(err);
			}
			resolve(payload);
		});
	});
};
