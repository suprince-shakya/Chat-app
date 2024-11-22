import { Response, Request } from 'express';
import httpStatus from 'http-status';
import errorHandler from './error-handler.util';
import AppError from './error.util';

export const handleApiError = (err: Error, res: Response, req: Request) => {
	const isTrusted = errorHandler.isTrustedError(err);
	const message = isTrusted ? err.message : 'errors:internal_server_error';
	const httpStatusCode = isTrusted ? (err as AppError).httpCode : httpStatus.INTERNAL_SERVER_ERROR;
	return res.status(httpStatusCode).json({
		ok: false,
		message,
	});
};
