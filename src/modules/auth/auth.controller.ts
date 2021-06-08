import * as jwt from 'jsonwebtoken'
import { ConflictError } from '../../errors/ConflictError'
import { NotFoundError } from '../../errors/NotFoundError'
import { userRepository } from '../user/user.repository'
import { authService } from './auth.service'
import { userService } from '../user/user.service'
import { authRepository } from './auth.repository'

class AuthController {
	async authenticate(req, res) {
		const user = req.body
		const candidate = await userService.getUserByLoginAndPassword(
			user.login,
			user.password
		)
		const accessToken = authService.createAccessToken(candidate)
		const refreshToken = await authService.createRefreshToken(candidate)
		res.json({ accessToken, refreshToken })
	}
	async register(req, res) {
		const user = req.body
		const candidate = await userService.getUserByLogin(user.login)
		if (candidate) {
			throw new ConflictError(`this email is alredy in use`)
		}
		const newUser = authService.getUserWithHashPassword(user)
		await userRepository.save(newUser)
		const accessToken = authService.createAccessToken(newUser)
		const refreshToken = await authService.createRefreshToken(newUser)

		res.json({ accessToken, refreshToken })
	}
	async refreshTokens(req, res) {
		const { refreshToken } = req.body
		if (!refreshToken) {
			throw new NotFoundError(`Access denied,token missing!`)
		}
		const token = await authService.getTokenByRefreshToken(refreshToken)

		const payload = jwt.verify(
			token.refreshToken,
			process.env.SECRET_REFRESH_JWT
		)
		const accessToken = jwt.sign(
			{ user: payload },
			process.env.SECRET_ACCESS_JWT,
			{ expiresIn: process.env.JWT_ACCESS_TIME }
		)
		res.json({ accessToken })
	}

	async logout(req, res) {
		const { refreshToken } = req.body
		const refreshSession = await authRepository.getToken(refreshToken)
		if (!refreshSession) {
			throw new NotFoundError(`Unauthorized`)
		}
		await authRepository.deleteTokenByRefreshToken(refreshToken)
		res.json({ success: `User logged out!` })
	}
}

export const authController = new AuthController()
