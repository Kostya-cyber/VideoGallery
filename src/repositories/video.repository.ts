import { dbManager } from '../config/dbConnection'
import { Video } from '../entity/video.model'

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
			.where(`title_video = :title`, { title })
			.execute()
	}

	async findByTitle(title: string) {
		return await dbManager
			.createQueryBuilder()
			.select(`video`)
			.from(Video, `video`)
			.where(`video.title_video = :title`, { title })
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
