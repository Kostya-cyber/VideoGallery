import { NotFoundError } from '../../errors/NotFoundError'
import { userRepository } from './user.repository'

class UserController {
	async getUser(req, res, next) {
		const user = await userRepository.findByLogin(req.params.login)
		if (!user) {
			return next(new NotFoundError(`no such user`))
		}
		res.json(user)
	}
	async getUsers(req, res, next) {
		const users = await userRepository.getAll()
		if (users.length === 0) {
			return next(new NotFoundError(`no users`))
		}
		res.json(users)
	}
	async updateUser(req, res) {
		const user = req.body
		const updateUser = await userRepository.update(user)
		res.json(updateUser)
	}
	async deleteUser(req, res) {
		const user = await userRepository.delete(req.params.login)
		res.json(user)
	}
}

export const userController = new UserController()
