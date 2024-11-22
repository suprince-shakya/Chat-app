import { Request, Response, NextFunction } from 'express';
import { handleApiError } from './apiHandler.util';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

function asyncWrapper(handler: AsyncRequestHandler): AsyncRequestHandler {
	return async (req, res, next) => {
		try {
			await handler(req, res, next);
		} catch (error) {
			handleApiError(error, res, req);
		}
	};
}

export default asyncWrapper;
