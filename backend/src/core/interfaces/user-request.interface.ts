import { Request } from 'express';
import { IUser } from '../../modules/user/user.interface';

export interface IGetUserRequest extends Request {
	user: IUser;
}
