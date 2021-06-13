import { Router } from 'express'
import { wrapAsync } from '../../middlewares/error.middleware'
import { permissionController } from './permission.controller'
export const permissionRouter = Router()

permissionRouter.get(`/`, wrapAsync(permissionController))
permissionRouter.post(`/`, wrapAsync(permissionController))
permissionRouter.put(`/`, wrapAsync(permissionController))
permissionRouter.delete(`/:`, wrapAsync(permissionController))
