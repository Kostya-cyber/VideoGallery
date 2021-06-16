import { Router } from 'express'
import { wrapAsync } from '../../config/wrapAsync'
import { upload } from '../../middlewares/multer.middleware'
import { FILE_NAME_URL, ORIGINAL_NAME_URL } from './video.constants'
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
videoRouter.get(ORIGINAL_NAME_URL, wrapAsync(videoController.getVideo))
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
videoRouter.delete(FILE_NAME_URL, wrapAsync(videoController.deleteVideo))
