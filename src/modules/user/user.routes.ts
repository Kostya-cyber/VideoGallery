import { Router } from 'express'
import { wrapAsync } from '../../middlewares/error.middleware'
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
 */
usersRouter.get(`/:login`, wrapAsync(userController.getUser))
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
 */
usersRouter.put(`/:login`, wrapAsync(userController.updateUser))
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
usersRouter.delete(`/:login`, wrapAsync(userController.deleteUser))
