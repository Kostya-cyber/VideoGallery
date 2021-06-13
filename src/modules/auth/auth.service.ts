import * as jwt from 'jsonwebtoken'
import * as bcryptjs from 'bcryptjs'
import { User } from '../user/user.model'
import { authRepository } from './auth.repository'
import { RefreshSession } from './token.model'
import { ConflictError } from '../../errors/ConflictError'
import { NotFoundError } from '../../errors/NotFoundError'

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
		const salt = bcryptjs.genSaltSync(10)
		return new User({
			login: user.login,
			password: bcryptjs.hashSync(user.password, salt),
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
			throw new NotFoundError(`Unauthorized`)
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
