import { Router } from 'express'
import { wrapAsync } from '../../config/wrapAsync'
import { isAuth } from '../../middlewares/auth.middleware'
import { upload } from '../../middlewares/multer.middleware'
import { FILE_NAME_URL, ORIGINAL_NAME_URL } from './video.constants'
import { videoController } from './video.controller'
export const videoRouter = new Router()

/**
 * @swagger
 * /video/:
 *  get:
 *      tags:
 *          - video
 *      summary: Get all videos
 *      oparetionId: getAllVideos
 *      produces:
 *          - application/json
 *      parameters: []
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: No such videos
 */
videoRouter.get(`/`, wrapAsync(videoController.getAllVideos))
/**
 * @swagger
 * /video/{originalName}:
 *  get:
 *      tags:
 *          - video
 *      summary: Get all videos by original name
 *      oparetionId: getAllVideosByOriginalName
 *      produces:
 *          - application/json
 *      parameters:
 *      - name: originalName
 *        in: path
 *        description: original name video
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: No such videos
 */
videoRouter.get(
	ORIGINAL_NAME_URL,
	wrapAsync(videoController.getAllVideosByOriginalName)
)
/**
 * @swagger
 * /video/:
 *  post:
 *     tags:
 *     - video
 *     summary: Create video and permission for video
 *     description:
 *     operationId: createVideo
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: operationType
 *       in: query
 *       description:
 *       required: true
 *       type: array
 *       items:
 *         type: string
 *         enum:
 *         - READ_ALL
 *         - READ_USER
 *         - READ_ADMIN
 *         default: "READ_ALL"
 *       collectionFormat: "multi"
 *     - name: "file"
 *       in: "formData"
 *       description: "file to upload"
 *       required: true
 *       type: "file"
 *     responses:
 *       200:
 *         description: Succes
 */
videoRouter.post(
	`/`,
	isAuth,
	upload.single(`video`),
	wrapAsync(videoController.createVideo)
)
/**
 * @swagger
 * /video/{fileName}:
 *  delete:
 *      tags:
 *          - video
 *      summary: Removes video by file name and all its permissions
 *      oparetionId: deleteVideo
 *      produces:
 *          - application/json
 *      parameters:
 *      - name: fileName
 *        in: path
 *        description: file name video
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *              description: Success
 *          403:
 *              description: You do not have sufficient rights to delete this video
 */
videoRouter.delete(
	FILE_NAME_URL,
	isAuth,
	wrapAsync(videoController.deleteVideo)
)
