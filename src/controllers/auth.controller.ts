import { dbManager } from '../config/dbConnection'
import * as jwt from 'jsonwebtoken'
import { User } from '../entity/user.model'
import * as bcryptjs from 'bcryptjs'

class AuthController {
	async authentication(req, res) {
		const user = await dbManager.findOne(User, {
			where: {
				login: req.body.login,
			},
		})
		if (user) {
			if (bcryptjs.compareSync(req.body.password, user.password)) {
				const token = jwt.sign(
					{
						id: user.id,
						login: user.login,
					},
					process.env.SECRET_JWT,
					{ expiresIn: 60 * 60 }
				)
				res.json({ token })
			} else {
				res.json({ message: `invalid password` })
			}
		} else {
			res.json({ message: `no such user` })
		}
	}
	async registration(req, res) {
		const user = await dbManager.findOne(User, {
			where: { login: req.body.login },
		})
		if (user) {
			res.json({ message: `this email is alredy in use` })
		} else {
			const salt = bcryptjs.genSaltSync(10)
			const newUser = new User({
				login: req.body.login,
				password: bcryptjs.hashSync(req.body.password, salt),
			})
			try {
				await dbManager.save(newUser)
				res.json(newUser)
			} catch (err) {
				res.json({ error: err.detail })
			}
		}
	}
}

export const authController = new AuthController()
