import * as bcryptjs from 'bcryptjs'
import { InvalidPasswordError } from '../../errors/InvalidPasswordError'
import { NotFoundError } from '../../errors/NotFoundError'
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
}

export const userService = new UserService()
