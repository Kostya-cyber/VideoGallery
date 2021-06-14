import { Router } from 'express'
import { wrapAsync } from '../../middlewares/error.middleware'
import { upload } from '../../middlewares/multer.middleware'
import { videoController } from './video.controller'
export const videoRouter = new Router()

/**
 * @swagger
 * /video/:
 *  get:
 *      description:
 *      tags:
 *          - video
 */
videoRouter.get(`/`, wrapAsync(videoController.getVideos))
/**
 * @swagger
 * /video/{originalName}:
 *  get:
 *      description:
 *      tags:
 *          - video
 */
videoRouter.get(`/:originalName`, wrapAsync(videoController.getVideo))
/**
 * @swagger
 * /video/:
 *  post:
 *      description:
 *      tags:
 *          - video
 */
videoRouter.post(
	`/`,
	upload.single(`video`),
	wrapAsync(videoController.createVideo)
)
/**
 * @swagger
 * /video/{fileName}:
 *  delete:
 *      description:
 *      tags:
 *          - video
 */
videoRouter.delete(`/:fileName`, wrapAsync(videoController.deleteVideo))
