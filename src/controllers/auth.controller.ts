import * as bcryptjs from 'bcryptjs'
import { InvalidPasswordError } from '../errors/InvalidPasswordError'
import { NotFoundError } from '../errors/NotFoundError'
import { ConflictError } from '../errors/ConflictError'
import { userRepository } from '../repositories/user.repository'
import { authService } from '../services/auth.service'

class AuthController {
	async authenticate(req, res, next) {
		const user = req.body
		const candidate = await userRepository.findByLogin(user.login)
		if (!candidate) {
			return next(new NotFoundError(`no such user`))
		}
		if (!bcryptjs.compareSync(user.password, candidate.password)) {
			return next(new InvalidPasswordError(`Invalid password`))
		}
		const token = authService.genToken(user)
		res.json({ token })
	}
	async register(req, res, next) {
		const user = req.body
		const candidate = await userRepository.findByLogin(user.login)
		if (candidate) {
			return next(new ConflictError(`this email is alredy in use`))
		}
		const newUser = authService.getUserWithHashPassword(user)
		try {
			await userRepository.save(newUser)
			res.json(newUser)
		} catch (err) {
			return next(err)
		}
	}
}

export const authController = new AuthController()
