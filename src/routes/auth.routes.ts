import { Router } from 'express'
import { authController } from '../controllers/auth.controller'
export const authRouter = new Router()

authRouter.post(`/sign-in`, authController.authorization)
authRouter.post(`/sign-up`, authController.registration)
