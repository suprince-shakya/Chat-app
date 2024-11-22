import httpStatus from 'http-status';
import Message from './message.model';
import AppError from '../../core/utils/error.util';
import { IMessageDTO } from './message.interface';
import cloudinary from '../../config/cloudinary.config';
import { getReceiverSocketId, io } from '../../config/socket.config';
import User from '../user/user.model';
import { IUser } from '../user/user.interface';

export const getMessages = async (userToChatId: string, myId: string) => {
	try {
		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: userToChatId },
				{ senderId: userToChatId, receiverId: myId },
			],
		}).populate('senderId');

		return messages;
	} catch (error) {
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
	}
};

export const sendMessage = async (data: IMessageDTO, receiverId: string, senderId: string) => {
	try {
		let imageUrl;
		if (data.image) {
			const uploadResponse = await cloudinary.uploader.upload(data.image);
			imageUrl = uploadResponse.secure_url;
		}
		const newMessage = await Message.create({
			senderId: senderId,
			receiverId: receiverId,
			text: data.text,
			image: imageUrl,
		});

		const message = await Message.findOne({
			_id: newMessage._id,
		}).populate('senderId');

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit('newMessage', message);
		}
		return { message };
	} catch (e) {
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
	}
};

export const getLoggedInUsers = async (loggedInUserId: string) => {
	try {
		const users: IUser[] = await User.find({
			_id: { $ne: loggedInUserId },
		})
			.select('-password')
			.lean();
		for (const filteredUser of users) {
			const message = await Message.findOne()
				.or([
					{
						senderId: loggedInUserId,
						receiverId: filteredUser._id,
					},
					{
						receiverId: loggedInUserId,
						senderId: filteredUser._id,
					},
				])
				.sort({ createdAt: 'desc' });
			filteredUser['recentMessage'] = message;
		}
		return { users };
	} catch (e) {
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
	}
};
