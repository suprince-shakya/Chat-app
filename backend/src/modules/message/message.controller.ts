import { Request, Response } from 'express';
import asyncWrapper from '../../core/utils/asyncWrapper.util';
import { IGetUserRequest } from '../../core/interfaces/user-request.interface';
import * as MessageService from './message.service';
import httpStatus from 'http-status';
import { IMessageDTO } from './message.interface';

export const handleGetMessages = asyncWrapper(async (req: IGetUserRequest, res: Response) => {
	const { id: userToChatId } = req.params;
	const myId = req.user._id;
	const messages = await MessageService.getMessages(userToChatId, myId);
	res.status(httpStatus.OK).json(messages);
});

export const handleSendMessage = asyncWrapper(async (req: IGetUserRequest, res: Response) => {
	const senderId = req.user._id;
	const { id: receiverId } = req.params;
	const data: IMessageDTO = req.body;
	const { message } = await MessageService.sendMessage(data, receiverId, senderId);
	res.status(httpStatus.CREATED).json(message);
});

export const handleGetLoggedInUsers = asyncWrapper(async (req: IGetUserRequest, res: Response) => {
	const loggedInUserId = req.user._id;
	const { users } = await MessageService.getLoggedInUsers(loggedInUserId);
	res.status(httpStatus.OK).json(users);
});
