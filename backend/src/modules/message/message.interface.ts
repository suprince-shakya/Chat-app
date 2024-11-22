export interface IMessage {
	_id?: string;
	senderId: string;
	receiverId: string;
	text: string;
	image: string;
}

export interface IMessageDTO {
	text: string;
	image: string;
}
