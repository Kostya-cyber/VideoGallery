import { authService } from '../auth/auth.service'
import { userService } from './user.service'

class UserController {
	async getUser(req, res) {
		const { login } = req.params
		const user = await userService.getUserByLogin(login)
		res.status(200).json(user)
	}
	async getUsers(req, res) {
		const users = await userService.getAllUsers()
		res.status(200).json(users)
	}
	async updateUser(req, res) {
		const { login, password } = req.body
		const { login: userLogin } = req.user
		const updateUser = await userService.updateUser(login, password, userLogin)
		res.status(200).json({ succes: true, updateUser })
	}
	async deleteUser(req, res) {
		const { login } = req.user
		const { refreshToken } = req.cookies
		await userService.deleteUserByLogin(login)
		await authService.logout(refreshToken)
		res.clearCookie(`refreshToken`)
		res.status(200).json({ success: true })
	}
}

export const userController = new UserController()
