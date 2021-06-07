import { NotFoundError } from '../../errors/NotFoundError'
import { videoRepository } from './video.repository'

class VideoController {
	async createVideo(req, res) {
		const video = req.body
		const newVideo = await videoRepository.create(video)
		res.json(newVideo)
	}
	async deleteVideo(req, res) {
		const video = await videoRepository.delete(req.params.title_video)
		res.json(video)
	}
	async getVideo(req, res, next) {
		const videos = await videoRepository.findByTitle(req.params.title_video)
		if (videos.length === 0) {
			return next(new NotFoundError(`no such video`))
		}
		res.json(videos)
	}
	async getVideos(req, res, next) {
		const videos = await videoRepository.getAll()
		if (videos.length === 0) {
			return next(new NotFoundError(`no such video`))
		}
		res.json(videos)
	}
}

export const videoController = new VideoController()
