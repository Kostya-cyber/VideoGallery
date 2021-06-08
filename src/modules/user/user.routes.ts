import { Router } from 'express'
import { wrapAsync } from '../../middlewares/error.middleware'
import { userController } from './user.controller'
export const usersRouter = new Router()

usersRouter.get(`/:login`, wrapAsync(userController.getUser))
usersRouter.get(`/`, wrapAsync(userController.getUsers))
usersRouter.put(`/:login`, wrapAsync(userController.updateUser))
usersRouter.delete(`/:login`, wrapAsync(userController.deleteUser))
