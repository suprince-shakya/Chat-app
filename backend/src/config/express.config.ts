import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import authRoutes from '../modules/auth/auth.route';
import messageRoutes from '../modules/message/message.route';
import { connectDB } from './db.config';
import { app, server } from './socket.config';
import { corsOption } from './cors.config';
import errorHandlerUtil from '../core/utils/error-handler.util';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors(corsOption));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

connectDB();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../../../frontend/dist')));

	app.get('*', (req: Request, res: Response) => {
		res.sendFile(path.join(__dirname, '../../../frontend', 'dist', 'index.html'));
	});
}

const exitHandler = (): void => {
	if (app) {
		server.close(() => {
			console.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error: Error): void => {
	errorHandlerUtil.handleError(error);
	if (!errorHandlerUtil.isTrustedError(error)) {
		exitHandler();
	}
};

process.on('uncaughtException', unexpectedErrorHandler);

process.on('unhandledRejection', (reason: Error) => {
	console.error('Unhandled rejection !!!!!!');
	throw reason;
});

export default server;
