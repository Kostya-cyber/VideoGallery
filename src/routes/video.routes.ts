import { Router } from 'express'
import { VideoController } from '../controllers/video.controller'
export const videoRouter = new Router()
const videoController = new VideoController()

videoRouter.get(`/`, videoController.getVideos)
videoRouter.get(`/:title`, videoController.getVideo)
videoRouter.post(`/`, videoController.createVideo)
videoRouter.delete(`/:title`, videoController.deleteVideo)
