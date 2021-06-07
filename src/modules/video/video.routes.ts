import { Router } from 'express'
import { videoController } from './video.controller'
export const videoRouter = new Router()

videoRouter.get(`/`, videoController.getVideos)
videoRouter.get(`/:title`, videoController.getVideo)
videoRouter.post(`/`, videoController.createVideo)
videoRouter.delete(`/:title`, videoController.deleteVideo)
