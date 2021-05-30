import { dbConnection } from '../config/dbConnection'
import { User } from '../entity/user.model'

export class UserController {
	async createUser(req, res) {
		const { login, password } = req.body
		const newUser = await dbConnection.manager
			.createQueryBuilder()
			.insert()
			.into(User)
			.values({ login, password })
			.execute()
			.catch((err) => ({ error: err.detail }))
		res.json(newUser)
	}
	async getUser(req, res) {
		const user = await dbConnection.manager
			.createQueryBuilder()
			.select(`user`)
			.from(User, `user`)
			.where(`user.login = :login`, { login: req.params.login })
			.getOne()
			.catch((err) => ({ error: err.detail }))
		const result = user || { error: `no such user` }
		res.json(result)
	}
	async getUsers(req, res) {
		const users = await dbConnection.manager
			.createQueryBuilder()
			.select(`user`)
			.from(User, `user`)
			.getMany()
			.catch((err) => [{ error: err.detail }])
		const result = users.length === 0 ? { error: `no users` } : users
		res.json(result)
	}
	async updateUser(req, res) {
		const { login, password } = req.body
		const user = await dbConnection.manager
			.createQueryBuilder()
			.update(User)
			.set({ login, password })
			.where(`login = :login`, { login: req.params.login })
			.execute()
			.catch((err) => ({ error: err.detail }))
		res.json(user)
	}
	async deleteUser(req, res) {
		const user = await dbConnection.manager
			.createQueryBuilder()
			.delete()
			.from(User)
			.where(`login = :login`, { login: req.params.login })
			.execute()
			.catch((err) => ({ error: err.detail }))
		res.json(user)
	}
}
