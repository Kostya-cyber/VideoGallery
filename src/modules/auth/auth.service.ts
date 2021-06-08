import * as jwt from 'jsonwebtoken'
import * as bcryptjs from 'bcryptjs'
import { User } from '../user/user.model'
import { authRepository } from './auth.repository'
import { RefreshSession } from './token.model'
import { ConflictError } from '../../errors/ConflictError'

class AuthService {
	createAccessToken(user: User) {
		console.log()
		return jwt.sign(
			{
				id: user.id,
				login: user.login,
			},
			process.env.SECRET_ACCESS_JWT,
			{ expiresIn: process.env.JWT_ACCESS_TIME }
		)
	}
	async createRefreshToken(user: User) {
		const refreshToken = jwt.sign(
			{
				id: user.id,
				login: user.login,
			},
			process.env.SECRET_REFRESH_JWT,
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
}

export const authService = new AuthService()
