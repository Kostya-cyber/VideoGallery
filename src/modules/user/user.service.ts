import * as bcryptjs from 'bcryptjs'
import { ConflictError } from '../../errors/ConflictError'
import { InvalidPasswordError } from '../../errors/InvalidPasswordError'
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
		if (!bcryptjs.compareSync(password, candidate.password)) {
			throw new InvalidPasswordError(`Invalid password`)
		}
		return candidate
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
