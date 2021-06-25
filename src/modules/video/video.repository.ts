import { Brackets } from 'typeorm'
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

	async delete(fileName: string) {
		return await dbManager
			.createQueryBuilder()
			.delete()
			.from(Video)
			.where(`file_name = :fileName`, { fileName })
			.execute()
	}

	async getById(id: string) {
		return await dbManager.findOne(Video, { id })
	}

	async findByFileName(fileName: string) {
		return await dbManager.findOne(Video, { fileName })
	}

	async getAllVideosForUnauth() {
		return await dbManager
			.createQueryBuilder(Video, `video`)
			.innerJoin(`video.permissions`, `permission`)
			.where(`operation_type = :operation`, { operation: `READ_ALL` })
			.groupBy(`video.id`)
			.getMany()
	}

	async getAllVideosForAuth(id: string) {
		return await dbManager
			.createQueryBuilder(Video, `video`)
			.innerJoin(`video.permissions`, `permission`)
			.where(`operation_type = 'READ_ALL' or operation_type = 'READ_USER'`)
			.orWhere(
				`user_id = :id and (operation_type = 'READ_ADMIN' or operation_type = 'READ_CHOSEN')`,
				{ id }
			)
			.groupBy(`video.id`)
			.getMany()
	}

	async findByOriginalNameUnauth(originalName: string) {
		return await dbManager
			.createQueryBuilder(Video, `video`)
			.innerJoin(`video.permissions`, `permission`)
			.where(`operation_type = :operation`, { operation: `READ_ALL` })
			.andWhere(`original_name = :originalName`, { originalName })
			.groupBy(`video.id`)
			.getMany()
	}
	async findByOriginalNameAuth(originalName: string, id: string) {
		return await dbManager
			.createQueryBuilder(Video, `video`)
			.innerJoin(`video.permissions`, `permission`)
			.where(`original_name = :originalName`, { originalName })
			.andWhere(
				new Brackets((qb) => {
					qb.where(
						`operation_type = 'READ_ALL' or operation_type = 'READ_USER'`
					).orWhere(
						`user_id = :id and (operation_type = 'READ_ADMIN' or operation_type = 'READ_CHOSEN')`,
						{ id }
					)
				})
			)
			.groupBy(`video.id`)
			.getMany()
	}

	async checkCreator(fileName: string, id: string) {
		const result = await dbManager
			.createQueryBuilder(Video, `video`)
			.innerJoinAndSelect(`video.permissions`, `permission`)
			.where((qb) => {
				const subQuery = qb
					.subQuery()
					.select(`video.id`)
					.from(Video, `video`)
					.innerJoin(`video.permissions`, `permission`)
					.where(
						`permission.user_id = :id and permission.full_access = true and video.file_name = :fileName`,
						{
							id,
							fileName,
						}
					)
					.getQuery()
				return `permission.video_id IN ` + subQuery
			})
			.getOne()
		return result.length !== 0
	}

	async deleteAllVideoByUserId(videos: Array<string>) {
		return await dbManager
			.createQueryBuilder(Video, `video`)
			.delete()
			.from(Video)
			.where(`id IN (:...videos)`, { videos })
			.execute()
	}

	async getAllVideosUser(userId: string) {
		return await dbManager
			.createQueryBuilder(Video, `video`)
			.innerJoin(`video.permissions`, `permission`)
			.where(
				`permission.user_id = :userId and permission.full_access = true and permission.operation_type IN ('READ_ALL', 'READ_USER', 'READ_ADMIN')`,
				{ userId }
			)
			.getMany()
	}
}

export const videoRepository = new VideoRepository()
