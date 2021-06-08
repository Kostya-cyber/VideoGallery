import { Router } from 'express'
import { wrapAsync } from '../../middlewares/error.middleware'
import { authController } from './auth.controller'
export const authRouter = new Router()

authRouter.post(`/sign-in`, wrapAsync(authController.authenticate))
authRouter.post(`/sign-up`, wrapAsync(authController.register))
authRouter.post(`/refresh-tokens`, wrapAsync(authController.refreshTokens))
authRouter.delete(`/logout`, wrapAsync(authController.logout))
