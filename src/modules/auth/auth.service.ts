import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import { User } from '../user/user.model'
import { authRepository } from './auth.repository'
import { RefreshSession } from './token.model'
import { ConflictError } from '../../errors/ConflictError'
import { UnauthorizedError } from '../../errors/UnauthorizedError'

class AuthService {
	createAccessToken(user: User) {
		return jwt.sign(
			{
				id: user.id,
				login: user.login,
			},
			process.env.JWT_ACCESS_SECRET,
			{ expiresIn: process.env.JWT_ACCESS_TIME }
		)
	}
	async createRefreshToken(user: User) {
		const refreshToken = jwt.sign(
			{
				id: user.id,
				login: user.login,
			},
			process.env.JWT_REFRESH_SECRET,
			{
				expiresIn: process.env.JWT_REFRESH_TIME,
			}
		)
		await authRepository.save(new RefreshSession({ refreshToken, user }))

		return refreshToken
	}

	getUserWithHashPassword(user: Partial<User>) {
		const salt = crypto.randomBytes(16).toString(`hex`)
		return new User({
			login: user.login,
			password: crypto
				.pbkdf2Sync(user.password, salt, 1000, 64, `sha512`)
				.toString(`hex`),
			salt,
		})
	}

	async getTokenByRefreshToken(refreshToken: string) {
		const token = await authRepository.getToken(refreshToken)
		if (!token) {
			throw new ConflictError(`Token expired!`)
		}
		return token
	}

	async deleteTokenByRefreshToken(refreshToken) {
		const refreshSession = await authRepository.getToken(refreshToken)
		if (!refreshSession) {
			throw new UnauthorizedError(`Unauthorized`)
		}
		await authRepository.deleteTokenByRefreshToken(refreshToken)
	}

	getAccessTokenByRefresh(token) {
		const payload = jwt.verify(
			token.refreshToken,
			process.env.JWT_REFRESH_SECRET
		)
		const accessToken = jwt.sign(
			{ user: payload },
			process.env.JWT_ACCESS_SECRET,
			{ expiresIn: process.env.JWT_ACCESS_TIME }
		)
		return accessToken
	}
}

export const authService = new AuthService()
