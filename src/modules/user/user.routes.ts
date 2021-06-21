import { Router } from 'express'
import { wrapAsync } from '../../config/wrapAsync'
import { isAuth } from '../../middlewares/auth.middleware'
import { LOGIN_URL } from './user.constants'
import { userController } from './user.controller'
export const usersRouter = new Router()

/**
 * @swagger
 * /user/{login}:
 *  get:
 *      tags:
 *          - user
 *      summary: Get user by login
 *      oparetionId: getUser
 *      produces:
 *          - application/json
 *      parameters:
 *      - name: login
 *        in: path
 *        description: login user
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: No such user
 */
usersRouter.get(LOGIN_URL, isAuth, wrapAsync(userController.getUser))
/**
 * @swagger
 * /user/:
 *  get:
 *      tags:
 *          - user
 *      summary: Get all users
 *      oparetionId: getUsers
 *      produces:
 *          - application/json
 *      parameters: []
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: No users
 */
usersRouter.get(`/`, isAuth, wrapAsync(userController.getUsers))
/**
 * @swagger
 * /user/{login}:
 *  put:
 *      tags:
 *      - user
 *      summary: Editing an authorized user
 *      description:
 *      oparetionId: updateUser
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *              - login
 *              - password
 *          properties:
 *              login:
 *                  type: string
 *              password:
 *                  type: string
 *      responses:
 *          200:
 *              description: Success
 *          409:
 *              description: This email is alredy in use
 */
usersRouter.put(LOGIN_URL, isAuth, wrapAsync(userController.updateUser))
/**
 * @swagger
 * /user/:
 *  delete:
 *      tags:
 *          - user
 *      summary: Delete and logout of the currently logged in user
 *      oparetionId: deleteUser
 *      produces:
 *          - application/json
 *      parameters: []
 *      responses:
 *          200:
 *              description: Success
 */
usersRouter.delete(`/`, isAuth, wrapAsync(userController.deleteUser))
