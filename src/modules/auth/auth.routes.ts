import { Router } from 'express'
import { wrapAsync } from '../../config/wrapAsync'
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
authRouter.post(`/sign-in`, wrapAsync(authController.authenticate))
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
authRouter.post(`/sign-up`, wrapAsync(authController.register))
/**
 * @swagger
 * /auth/refresh-tokens:
 *  post:
 *     tags:
 *     - auth
 *     summary: Checks if the token is valid
 *     description:
 *     operationId: refreshToken
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
 *              - refreshToken
 *          properties:
 *              refreshToken:
 *                  type: string
 *     responses:
 *       200:
 *         description: Succes
 *       404:
 *         description: Access denied, token missing
 *       409:
 *         description: Token expired
 */
authRouter.post(`/refresh-tokens`, wrapAsync(authController.refreshTokens))
/**
 * @swagger
 * /auth/logout:
 *  delete:
 *     tags:
 *     - auth
 *     summary: Logout of the current user
 *     description:
 *     operationId: logout
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
 *              - refreshToken
 *          properties:
 *              refreshToken:
 *                  type: string
 *     responses:
 *       200:
 *         description: Succes
 *       401:
 *         description: Unauthorized
 */
authRouter.delete(`/logout`, wrapAsync(authController.logout))
