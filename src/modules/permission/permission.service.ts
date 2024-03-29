import { userRepository } from '../user/user.repository'
import { Video } from '../video/video.model'
import { videoRepository } from '../video/video.repository'
import { Permission } from './permission.model'
import { permissionRepository } from './permission.repository'

class PermissionService {
	async createPermission(
		userId: string,
		operationType: string,
		fullAccess: boolean,
		videoId: string
	) {
		const video = await videoRepository.getById(videoId)
		const user = await userRepository.findById(userId)
		const permission = await permissionRepository.save(
			new Permission({ operationType, fullAccess, user, video })
		)
		return { permission }
	}

	async deletePermissionByFileNameVideo(fileName: string) {
		const video = await videoRepository.findByFileName(fileName)
		await permissionRepository.delete(video.id)
	}

	async getAllPermissions(id: string) {
		const permissions = await permissionRepository.getAll(id)
		return permissions
	}

	async checkAccessRights(userId: string, videoId: string) {
		return await permissionRepository.checkAccessRights(userId, videoId)
	}

	async deleteAllPermissionsByVideos(videos: Array<Video>) {
		const ids = videos.map((p) => p.id)
		if (ids.length !== 0) {
			return await permissionRepository.deleteAllPermissionsByVideos(ids)
		}
		return null
	}
}

export const permissionService = new PermissionService()
