import { dbConnection } from '../config/dbConnection'
import { Video } from '../entity/video.model'

export class VideoController {
	async createVideo(req, res) {
		const { title_video } = req.body
		const video = await dbConnection.manager
			.createQueryBuilder()
			.insert()
			.into(Video)
			.values({ title_video })
			.execute()
			.catch((err) => ({ error: err.detail }))
		res.json(video)
	}
	async deleteVideo(req, res) {
		const video = await dbConnection.manager
			.createQueryBuilder()
			.delete()
			.from(Video)
			.where(`title_video = :title`, { title: req.params.title }) //remake
			.execute()
			.catch((err) => ({ error: err.detail }))
		res.json(video)
	}
	async getVideo(req, res) {
		const video = await dbConnection.manager
			.createQueryBuilder()
			.select(`video`)
			.from(Video, `video`)
			.where(`video.title_video = :title`, { title: req.params.title })
			.getOne()
			.catch((err) => ({ error: err.detail }))
		res.json(video || { error: `no such video` })
	}
	async getVideos(req, res) {
		const videos = await dbConnection.manager
			.createQueryBuilder()
			.select(`video`)
			.from(Video, `video`)
			.getMany()
			.catch((err) => [{ error: err.detail }])
		const result = videos.length === 0 ? { error: `no videos` } : videos
		res.json(result)
	}
}
