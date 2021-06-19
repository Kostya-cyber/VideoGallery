import { UnauthorizedError } from '../errors/UnauthorizedError'
import { authService } from '../modules/auth/auth.service'

export const isAuth = (req, res, next) => {
	const authorizationHeader = req.headers.authorization
	if (!authorizationHeader) {
		throw new UnauthorizedError(`Unauthorized`)
	}
	const accessToken = authorizationHeader.split(` `)[1]
	if (!accessToken) {
		throw new UnauthorizedError(`Unauthorized`)
	}
	const userData = authService.validateAccessToken(accessToken)
	if (!userData) {
		throw new UnauthorizedError(`Unauthorized`)
	}
	req.user = userData
	next()
}
