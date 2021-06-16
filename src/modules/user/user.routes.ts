import { Router } from 'express'
import { wrapAsync } from '../../config/wrapAsync'
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
usersRouter.get(LOGIN_URL, wrapAsync(userController.getUser))
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
usersRouter.get(`/`, wrapAsync(userController.getUsers))
/**
 * @swagger
 * /user/{login}:
 *  put:
 *      tags:
 *      - user
 *      summary: Update existing user
 *      description:
 *      oparetionId: updateUser
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: login
 *        in: path
 *        description: login user
 *        required: true
 *        type: string
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
usersRouter.put(LOGIN_URL, wrapAsync(userController.updateUser))
/**
 * @swagger
 * /user/{login}:
 *  delete:
 *      tags:
 *          - user
 *      summary: Delete user by login
 *      oparetionId: deleteUser
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
 */
usersRouter.delete(LOGIN_URL, wrapAsync(userController.deleteUser))
