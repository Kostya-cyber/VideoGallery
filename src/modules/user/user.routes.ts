import { Router } from 'express'
import { userController } from './user.controller'
export const usersRouter = new Router()

usersRouter.get(`/:login`, userController.getUser)
usersRouter.get(`/`, userController.getUsers)
usersRouter.put(`/:login`, userController.updateUser)
usersRouter.delete(`/:login`, userController.deleteUser)
