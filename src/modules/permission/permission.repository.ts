import { SubjectRemovedAndUpdatedError } from 'typeorm'
import { dbManager } from '../../config/dbConnection'
import { Video } from '../video/video.model'
import { Permission } from './permission.model'

class PermissionRepository {
	async save(permission: Permission) {
		return await dbManager.save(permission)
	}
	async delete(videoId: string) {
		return await dbManager
			.createQueryBuilder()
			.delete()
			.from(Permission)
			.where(`video_id = :videoId`, { videoId })
			.execute()
	}
	async getAll(id: string) {
		const result = await dbManager
			.createQueryBuilder(Video, `video`)
			.innerJoinAndSelect(`video.permissions`, `permission`)
			.where((qb) => {
				const subQuery = qb
					.subQuery()
					.select(`video.id`)
					.from(Video, `video`)
					.innerJoin(`video.permissions`, `permission`)
					.where(`permission.user_id = :id and permission.full_access = true`, {
						id,
					})
					.getQuery()
				return `permission.video_id IN ` + subQuery
			})
			.getMany()
		return result
	}

	async checkAccessRights(userId: string, videoId: string) {
		const result = await dbManager
			.createQueryBuilder(Video, `video`)
			.innerJoinAndSelect(`video.permissions`, `permission`)
			.where(
				`permission.user_id = :userId and permission.video_id = :videoId and permission.full_access = true`,
				{ userId, videoId }
			)
			.getOne()
		return result
	}

	async deleteAllPermissionsByVideos(videos: Array<string>) {
		return await dbManager
			.createQueryBuilder()
			.delete()
			.from(Permission)
			.where(`video_id IN (:...videos)`, { videos })
			.execute()
	}
}

export const permissionRepository = new PermissionRepository()
