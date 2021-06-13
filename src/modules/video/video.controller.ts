import { NotFoundError } from '../../errors/NotFoundError'
import { videoRepository } from './video.repository'

class VideoController {
	async createVideo(req, res) {
		// const video = req.body
		// const newVideo = await videoRepository.create(video)
		// res.json(newVideo)
		res.json(req.file)
	}
	async deleteVideo(req, res) {
		const video = await videoRepository.delete(req.params.title_video)
		res.json(video)
	}
	async getVideo(req, res) {
		const videos = await videoRepository.findByTitle(req.params.title_video)
		if (videos.length === 0) {
			throw new NotFoundError(`no such video`)
		}
		res.json(videos)
	}
	async getVideos(req, res) {
		const videos = await videoRepository.getAll()
		if (videos.length === 0) {
			throw new NotFoundError(`no such video`)
		}
		res.json(videos)
	}
}

export const videoController = new VideoController()
