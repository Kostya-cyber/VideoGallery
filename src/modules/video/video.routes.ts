import { Router } from 'express'
import { wrapAsync } from '../../middlewares/error.middleware'
import { upload } from '../../middlewares/multer.middleware'
import { videoController } from './video.controller'
export const videoRouter = new Router()

videoRouter.get(`/`, wrapAsync(videoController.getVideos))
videoRouter.get(`/:title`, wrapAsync(videoController.getVideo))
videoRouter.post(
	`/`,
	upload.single(`video`),
	wrapAsync(videoController.createVideo)
)
videoRouter.delete(`/:title`, wrapAsync(videoController.deleteVideo))
