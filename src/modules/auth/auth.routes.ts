import { Router } from 'express'
import { wrapAsync } from '../../config/wrapAsync'
import { isAuth } from '../../middlewares/auth.middleware'
import {
	LOGOUT_URL,
	REFRESH_TOKENTS_URL,
	SIGN_IN_URL,
	SIGN_UP_URL,
} from './auth.constants'
import { authController } from './auth.controller'
export const authRouter = new Router()

/**
 * @swagger
 * /auth/sign-in:
 *  post:
 *     tags:
 *     - auth
 *     summary: Logs user into the system
 *     description:
 *     operationId: authenticate
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: body
 *       name: body
 *       required: true
 *       schema:
 *          type: object
 *          required:
 *              - login
 *              - password
 *          properties:
 *              login:
 *                  type: string
 *              password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Succes
 *       404:
 *         description: No such user
 *       401:
 *         description: Invalid password
 */
authRouter.post(SIGN_IN_URL, wrapAsync(authController.authenticate))
/**
 * @swagger
 * /auth/sign-up:
 *  post:
 *     tags:
 *     - auth
 *     summary: User registration in the system
 *     description:
 *     operationId: register
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: body
 *       name: body
 *       required: true
 *       schema:
 *          type: object
 *          required:
 *              - login
 *              - password
 *          properties:
 *              login:
 *                  type: string
 *              password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Succes
 *       409:
 *         description: This email is alredy in use
 */
authRouter.post(SIGN_UP_URL, wrapAsync(authController.register))
/**
 * @swagger
 * /auth/refresh-tokens:
 *  post:
 *     tags:
 *     - auth
 *     summary: Refresh token
 *     description:
 *     operationId: refreshToken
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: Succes
 *       404:
 *         description: Access denied, token missing
 *       409:
 *         description: Token expired
 */
authRouter.post(REFRESH_TOKENTS_URL, wrapAsync(authController.refreshTokens))
/**
 * @swagger
 * /auth/logout:
 *  post:
 *     tags:
 *     - auth
 *     summary: Logout of the current user
 *     description:
 *     operationId: logout
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: Succes
 *       401:
 *         description: Unauthorized
 */
authRouter.post(LOGOUT_URL, isAuth, wrapAsync(authController.logout))
