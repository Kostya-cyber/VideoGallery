import * as jwt from 'jsonwebtoken'
import * as bcryptjs from 'bcryptjs'
import { User } from '../user/user.model'

class AuthService {
	genToken(user: Partial<User>) {
		return jwt.sign(
			{
				id: user.id,
				login: user.login,
			},
			process.env.SECRET_JWT,
			{ expiresIn: process.env.JWT_TIME }
		)
	}

	getUserWithHashPassword(user: Partial<User>) {
		const salt = bcryptjs.genSaltSync(10)
		return new User({
			login: user.login,
			password: bcryptjs.hashSync(user.password, salt),
		})
	}
}

export const authService = new AuthService()
