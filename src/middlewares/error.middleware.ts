import { logger } from '../config/logger'
import { AppError } from '../errors/AppError'

export const errorMiddleware = (err, req, res, next) => {
	logger.error(err)
	if (err instanceof AppError) {
		res.status(err.status).json({ message: err.message })
	}
	res.status(500).json({ message: `Internal Server Error` })
}
