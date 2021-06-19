import { authService } from './auth.service'

class AuthController {
	async authenticate(req, res) {
		const { login, password } = req.body
		const userData = await authService.authentication(login, password)
		res.cookie(`refreshToken`, userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		res.status(200).json({ success: true, ...userData })
	}
	async register(req, res) {
		const { login, password } = req.body
		const userData = await authService.registration(login, password)
		res.cookie(`refreshToken`, userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		res.status(200).json({ success: true, ...userData })
	}
	async refreshTokens(req, res) {
		const { refreshToken } = req.cookies
		const userData = await authService.refresh(refreshToken)
		res.cookie(`refreshToken`, userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		res.status(200).json({ success: true, ...userData })
	}

	async logout(req, res) {
		const { refreshToken } = req.cookies
		await authService.logout(refreshToken)
		res.clearCookie(`refreshToken`)
		res.status(200).json({ success: true })
	}
}

export const authController = new AuthController()
