import { dbManager } from '../config/dbConnection'
import { User } from '../entity/user.model'

class UserRepository {
	async findByLogin(login: string) {
		return await dbManager.findOne(User, { login })
	}

	async save(user: User) {
		return await dbManager.save(user)
	}

	async getAll() {
		return await dbManager
			.createQueryBuilder()
			.select(`user`)
			.from(User, `user`)
			.getMany()
	}

	async update(user: Partial<User>) {
		return await dbManager
			.createQueryBuilder()
			.update(User)
			.set(user)
			.where(`login = :login`, { login: user.login })
			.execute()
	}

	async delete(login: string) {
		return await dbManager
			.createQueryBuilder()
			.delete()
			.from(User)
			.where(`login = :login`, { login })
			.execute()
	}
}

export const userRepository = new UserRepository()
