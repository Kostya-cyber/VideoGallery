import { ConflictError } from '../../errors/ConflictError'
import { NotFoundError } from '../../errors/NotFoundError'
import { authService } from './auth.service'
import { userService } from '../user/user.service'

class AuthController {
	async authenticate(req, res) {
		const user = req.body
		const candidate = await userService.getUserByLoginAndPassword(
			user.login,
			user.password
		)
		const accessToken = authService.createAccessToken(candidate)
		const refreshToken = await authService.createRefreshToken(candidate)
		res.status(200).json({ success: true, accessToken, refreshToken })
	}
	async register(req, res) {
		const user = req.body
		const candidate = await userService.getUserByLogin(user.login)
		if (candidate) {
			throw new ConflictError(`this email is alredy in use`)
		}
		const newUser = authService.getUserWithHashPassword(user)
		await userService.saveUser(newUser)
		const accessToken = authService.createAccessToken(newUser)
		const refreshToken = await authService.createRefreshToken(newUser)
		res.status(200).json({ success: true, accessToken, refreshToken })
	}
	async refreshTokens(req, res) {
		const { refreshToken } = req.body
		if (!refreshToken) {
			throw new NotFoundError(`Access denied, token missing!`)
		}
		const token = await authService.getTokenByRefreshToken(refreshToken)
		const accessToken = authService.getAccessTokenByRefresh(token)
		res.status(200).json({ success: true, accessToken })
	}

	async logout(req, res) {
		const { refreshToken } = req.body
		await authService.deleteTokenByRefreshToken(refreshToken)
		res.status(200).json({ success: true })
	}
}

export const authController = new AuthController()
