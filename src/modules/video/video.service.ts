import { NotFoundError } from '../../errors/NotFoundError'
import { deleteFile } from '../../middlewares/fs.middleware'
import { videoRepository } from './video.repository'

class VideoService {
	async createVideo(file) {
		return await videoRepository.create({
			fileName: file.filename,
			originalName: file.originalname,
		})
	}

	async getVideosByOriginalName(originalName) {
		const videos = await videoRepository.findByOriginalName(originalName)
		if (videos.length === 0) {
			throw new NotFoundError(`no such video`)
		}
		return videos
	}

	async deleteVideoByFileName(fileName) {
		const video = await videoRepository.delete(fileName)
		deleteFile(fileName)
		return video
	}

	async getAllVideos() {
		const videos = await videoRepository.getAll()
		if (videos.length === 0) {
			throw new NotFoundError(`no such video`)
		}
		return videos
	}
}

export const videoService = new VideoService()
