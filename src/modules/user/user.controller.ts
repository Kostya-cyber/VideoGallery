import { NotFoundError } from '../../errors/NotFoundError'
import { userService } from './user.service'

class UserController {
	async getUser(req, res) {
		const user = await userService.getUserByLogin(req.params.login)
		if (!user) {
			throw new NotFoundError(`no such user`)
		}
		res.json(user)
	}
	async getUsers(req, res) {
		const users = await userService.getAllUsers()
		res.json(users)
	}
	async updateUser(req, res) {
		const user = req.body
		const updateUser = await userService.updateUser(user, req.params.login)
		res.json({ succes: true, updateUser })
	}
	async deleteUser(req, res) {
		await userService.deleteUserByLogin(req.params.login)
		res.json({ success: true })
	}
}

export const userController = new UserController()
