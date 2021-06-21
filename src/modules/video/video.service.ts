import { NotFoundError } from '../../errors/NotFoundError'
import { videoRepository } from './video.repository'
import { unlink } from 'fs'
import { checkAuth } from '../../middlewares/auth.middleware'

class VideoService {
	async createVideo(file) {
		return await videoRepository.create({
			fileName: file.filename,
			originalName: file.originalname,
		})
	}

	async getVideosByOriginalName(originalName: string, user) {
		if (user) {
			const videos = await videoRepository.findByOriginalNameAuth(
				originalName,
				user.id
			)
			if (videos.length === 0) {
				throw new NotFoundError(`no such videos`)
			}
			return videos
		} else {
			const videos = await videoRepository.findByOriginalNameUnauth(
				originalName
			)
			if (videos.length === 0) {
				throw new NotFoundError(`no such videos`)
			}
			return videos
		}
	}

	async deleteVideoByFileName(fileName) {
		this.deleteFile(fileName)
		const video = await videoRepository.delete(fileName)
		return video
	}

	private deleteFile(fileName: string) {
		unlink(__dirname + `/../../../videos/` + fileName, (err) => {
			if (err) throw err
		})
	}

	async getAllVideos(user) {
		if (user) {
			const videos = await videoRepository.getAllVideosForAuth(user.id)
			if (videos.length === 0) {
				throw new NotFoundError(`no such videos`)
			}
			return videos
		} else {
			const videos = await videoRepository.getAllVideosForUnauth()
			if (videos.length === 0) {
				throw new NotFoundError(`no such videos`)
			}
			return videos
		}
	}

	checkAuthUser(authorizationHeader: string) {
		let user
		try {
			user = checkAuth(authorizationHeader)
		} catch (err) {
			user = null
		}
		return user
	}

	async checkCreator(fileName: string, id: string) {
		return await videoRepository.checkCreator(fileName, id)
	}
}

export const videoService = new VideoService()
