import * as crypto from 'crypto'
import { ConflictError } from '../../errors/ConflictError'
import { UnauthorizedError } from '../../errors/UnauthorizedError'
import { NotFoundError } from '../../errors/NotFoundError'
import { authService } from '../auth/auth.service'
import { userRepository } from './user.repository'

class UserService {
	async getUserByLoginAndPassword(login: string, password: string) {
		const candidate = await this.getUserByLogin(login)
		if (this.validPassword(password, candidate.salt, candidate.password)) {
			throw new UnauthorizedError(`Invalid password`)
		}
		return candidate
	}

	validPassword(
		password: string,
		candidateSalt: string,
		candidatePassword: string
	) {
		return (
			crypto
				.pbkdf2Sync(password, candidateSalt, 1000, 64, `sha512`)
				.toString(`hex`) !== candidatePassword
		)
	}

	async getUserByLogin(login: string) {
		const user = await userRepository.findByLogin(login)
		if (!user) {
			throw new NotFoundError(`No such user`)
		}
		return user
	}

	async getAllUsers() {
		const users = await userRepository.getAll()
		if (users.length === 0) {
			throw new NotFoundError(`no users`)
		}
		return users
	}

	async deleteUserByLogin(login: string) {
		await userRepository.delete(login)
	}

	async updateUser(login: string, password: string, userLogin: string) {
		const candidate = await userRepository.findByLogin(login)
		if (candidate) {
			throw new ConflictError(`this email is alredy in use`)
		}
		const updateUser = authService.getUserWithHashPassword(login, password)
		return await userRepository.update(updateUser, userLogin)
	}
}

export const userService = new UserService()
