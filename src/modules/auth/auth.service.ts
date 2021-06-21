import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import { User } from '../user/user.model'
import { authRepository } from './auth.repository'
import { RefreshSession } from './token.model'
import { ConflictError } from '../../errors/ConflictError'
import { UnauthorizedError } from '../../errors/UnauthorizedError'
import { userService } from '../user/user.service'
import { userRepository } from '../user/user.repository'

class AuthService {
	async registration(login: string, password: string) {
		const candidate = await userRepository.findByLogin(login)
		if (candidate) {
			throw new ConflictError(`this email is alredy in use`)
		}
		const newUser = authService.getUserWithHashPassword(login, password)
		await userRepository.save(newUser)
		const accessToken = authService.createAccessToken(newUser)
		const refreshToken = await authService.createRefreshToken(newUser)
		await authRepository.save(
			new RefreshSession({ refreshToken, user: newUser })
		)
		return { user: newUser, accessToken, refreshToken }
	}

	async authentication(login: string, password: string) {
		const candidate = await userService.getUserByLoginAndPassword(
			login,
			password
		)
		const accessToken = authService.createAccessToken(candidate)
		const refreshToken = await authService.createRefreshToken(candidate)
		await authRepository.save(
			new RefreshSession({ refreshToken, user: candidate })
		)
		return { user: candidate, accessToken, refreshToken }
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw new UnauthorizedError(`Unauthorized`)
		}
		const userData = authService.validateRefreshToken(refreshToken)
		const refreshTokenFromDb = await authRepository.getToken(refreshToken)
		if (!userData || !refreshTokenFromDb) {
			throw new UnauthorizedError(`Unauthorized`)
		}
		const user = await userRepository.findById(userData.id)
		const accessToken = authService.createAccessToken(user)
		const newRefreshToken = await authService.createRefreshToken(user)
		await authRepository.save(
			new RefreshSession({ refreshToken: newRefreshToken, user })
		)
		return { user, accessToken, refreshToken: newRefreshToken }
	}

	async logout(refreshToken: string) {
		const refreshSession = await authRepository.getToken(refreshToken)
		if (!refreshSession) {
			throw new UnauthorizedError(`Unauthorized`)
		}
		await authRepository.deleteTokenByRefreshToken(refreshToken)
	}

	validateRefreshToken(refreshToken: string) {
		return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
	}

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
	createRefreshToken(user: User) {
		return jwt.sign(
			{
				id: user.id,
				login: user.login,
			},
			process.env.JWT_REFRESH_SECRET,
			{
				expiresIn: process.env.JWT_REFRESH_TIME,
			}
		)
	}

	getUserWithHashPassword(login: string, password: string) {
		const salt = crypto.randomBytes(16).toString(`hex`)
		return new User({
			login,
			password: crypto
				.pbkdf2Sync(password, salt, 1000, 64, `sha512`)
				.toString(`hex`),
			salt,
		})
	}

	validateAccessToken(accessToken: string) {
		return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
	}
}

export const authService = new AuthService()
