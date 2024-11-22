import mongoose from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		profilePic: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
