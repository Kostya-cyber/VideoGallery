import * as crypto from 'crypto'
import { ConflictError } from '../../errors/ConflictError'
import { UnauthorizedError } from '../../errors/UnauthorizedError'
import { NotFoundError } from '../../errors/NotFoundError'
import { authService } from '../auth/auth.service'
import { User } from './user.model'
import { userRepository } from './user.repository'

class UserService {
	async getUserByLoginAndPassword(login: string, password: string) {
		const candidate = await this.getUserByLogin(login)
		if (!candidate) {
			throw new NotFoundError(`no such user`)
		}
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
		return await userRepository.findByLogin(login)
	}

	async saveUser(user: User) {
		await userRepository.save(user)
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

	async updateUser(user: Partial<User>, login: string) {
		const candidate = await userService.getUserByLogin(user.login)
		if (candidate) {
			throw new ConflictError(`this email is alredy in use`)
		}
		const updateUser = authService.getUserWithHashPassword(user)
		return await userRepository.update(updateUser, login)
	}
}

export const userService = new UserService()
