import { Router } from 'express'
import { wrapAsync } from '../../config/wrapAsync'
import { isAuth } from '../../middlewares/auth.middleware'
import { permissionController } from './permission.controller'
export const permissionRouter = Router()

/**
 * @swagger
 * /permission/:
 *  get:
 *      description:
 *      tags:
 *          - permission
 */
permissionRouter.get(`/`, isAuth, wrapAsync(permissionController.getPermission))
/**
 * @swagger
 * /permission/:
 *  post:
 *      description:
 *      tags:
 *          - permission
 */
permissionRouter.post(
	`/`,
	isAuth,
	wrapAsync(permissionController.createPermission)
)
/**
 * @swagger
 * /permission/:
 *  put:
 *      description:
 *      tags:
 *          - permission
 */
// permissionRouter.put(`/`, isAuth, wrapAsync(permissionController.updatePermission))
/**
 * @swagger
 * /permission/:
 *  delete:
 *      description:
 *      tags:
 *          - permission
 */
//permissionRouter.delete(`/:`, isAuth, wrapAsync(permissionController.deletePermission))
