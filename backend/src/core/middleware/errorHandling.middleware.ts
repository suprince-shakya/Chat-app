import { Request, Response, NextFunction } from 'express';

import httpStatus from 'http-status';
import AppError from '../utils/error.util';
import errorHandler from '../utils/error-handler.util';

// catch all unhandled errors
const errorHandling = (error: Error, req: Request, res: Response, next: NextFunction) => {
	errorHandler.handleError(error);
	const isTrusted = errorHandler.isTrustedError(error);
	const httpStatusCode = isTrusted ? (error as AppError).httpCode : httpStatus.INTERNAL_SERVER_ERROR;
	const responseError = isTrusted ? error.message : 'errors:internal_server_error';
	res.status(httpStatusCode).json({
		ok: false,
		message: responseError,
	});
};

export default errorHandling;
