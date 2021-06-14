import { Router } from 'express'
import { wrapAsync } from '../../middlewares/error.middleware'
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
 */
authRouter.delete(`/logout`, wrapAsync(authController.logout))
