import { Router } from 'express'
import { wrapAsync } from '../../config/wrapAsync'
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
permissionRouter.get(`/`, wrapAsync(permissionController))
/**
 * @swagger
 * /permission/:
 *  post:
 *      description:
 *      tags:
 *          - permission
 */
permissionRouter.post(`/`, wrapAsync(permissionController))
/**
 * @swagger
 * /permission/:
 *  put:
 *      description:
 *      tags:
 *          - permission
 */
permissionRouter.put(`/`, wrapAsync(permissionController))
/**
 * @swagger
 * /permission/:
 *  delete:
 *      description:
 *      tags:
 *          - permission
 */
permissionRouter.delete(`/:`, wrapAsync(permissionController))
