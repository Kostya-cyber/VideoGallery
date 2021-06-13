import { videoService } from './video.service'

class VideoController {
	async createVideo(req, res) {
		const file = req.file
		const newVideo = await videoService.createVideo(file)
		res.json({ success: true, newVideo })
	}
	async deleteVideo(req, res) {
		const video = await videoService.deleteVideoByFileName(req.params.fileName)
		res.json({ success: true, video })
	}
	async getVideo(req, res) {
		const videos = await videoService.getVideosByOriginalName(
			req.params.originalName
		)
		res.json({ success: true, videos })
	}
	async getVideos(req, res) {
		const videos = await videoService.getAllVideos()
		res.json({ success: true, videos })
	}
}

export const videoController = new VideoController()
