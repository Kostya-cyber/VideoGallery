import { NotFoundError } from '../../errors/NotFoundError'
import { videoRepository } from './video.repository'
import { unlink } from 'fs'

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
		this.deleteFile(fileName)
		const video = await videoRepository.delete(fileName)
		return video
	}

	private deleteFile(fileName: string) {
		unlink(__dirname + `/../../videos/` + fileName, (err) => {
			if (err) throw err
		})
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
