import { IMessage } from '../message/message.interface';

export interface IUser {
	_id?: string;
	email: string;
	fullName: string;
	password: string;
	profilePic: string;
	recentMessage?: IMessage;
}

export interface IChangePassword {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}
