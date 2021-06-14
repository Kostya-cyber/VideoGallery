import { NotFoundError } from '../../errors/NotFoundError'
import { userService } from './user.service'

class UserController {
	async getUser(req, res) {
		const user = await userService.getUserByLogin(req.params.login)
		if (!user) {
			throw new NotFoundError(`No such user`)
		}
		res.status(200).json(user)
	}
	async getUsers(req, res) {
		const users = await userService.getAllUsers()
		res.status(200).json(users)
	}
	async updateUser(req, res) {
		const user = req.body
		const updateUser = await userService.updateUser(user, req.params.login)
		res.status(200).json({ succes: true, updateUser })
	}
	async deleteUser(req, res) {
		await userService.deleteUserByLogin(req.params.login)
		res.status(200).json({ success: true })
	}
}

export const userController = new UserController()
