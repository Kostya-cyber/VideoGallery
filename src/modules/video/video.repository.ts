import { dbManager } from '../../config/dbConnection'
import { Video } from './video.model'

class VideoRepository {
	async create(video: Partial<Video>) {
		return await dbManager
			.createQueryBuilder()
			.insert()
			.into(Video)
			.values(video)
			.execute()
	}

	async delete(title: string) {
		return await dbManager
			.createQueryBuilder()
			.delete()
			.from(Video)
			.where(`titleVideo = :title`, { title })
			.execute()
	}

	async findByTitle(title: string) {
		return await dbManager
			.createQueryBuilder()
			.select(`video`)
			.from(Video, `video`)
			.where(`video.titleVideo = :title`, { title })
			.getMany()
	}

	async getAll() {
		return await dbManager
			.createQueryBuilder()
			.select(`video`)
			.from(Video, `video`)
			.getMany()
	}
}

export const videoRepository = new VideoRepository()
