import { userController } from '../controllers/user.controller'
import { Router } from 'express'
export const usersRouter = new Router()

usersRouter.get(`/:login`, userController.getUser)
usersRouter.get(`/`, userController.getUsers)
usersRouter.post(`/`, userController.createUser)
usersRouter.put(`/:login`, userController.updateUser)
usersRouter.delete(`/:login`, userController.deleteUser)
