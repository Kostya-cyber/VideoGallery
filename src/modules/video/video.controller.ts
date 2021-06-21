import { permissionService } from '../permission/permission.service'
import { videoService } from './video.service'

class VideoController {
	async createVideo(req, res) {
		const file = req.file
		const { id: userId } = req.user
		const { operationType } = req.body
		const newVideo = await videoService.createVideo(file)
		const newPermission = await permissionService.createPermission(
			userId,
			operationType,
			true,
			newVideo.raw[0].id
		)
		res.json({ success: true, ...newPermission })
	}
	async deleteVideo(req, res) {
		const { fileName } = req.params
		const { id } = req.user
		if (await videoService.checkCreator(fileName, id)) {
			await permissionService.deletePermissionByFileNameVideo(fileName)
			await videoService.deleteVideoByFileName(fileName)
			res.json({ success: true })
		} else {
			res.json({
				success: false,
				message: `you do not have permission to delete this video`,
			})
		}
	}
	async getVideo(req, res) {
		const { originalName } = req.params
		const authorizationHeader = req.headers.authorization
		const user = videoService.checkAuthUser(authorizationHeader)
		const videos = await videoService.getVideosByOriginalName(
			originalName,
			user
		)
		res.json({ success: true, videos })
	}
	async getVideos(req, res) {
		const authorizationHeader = req.headers.authorization
		const user = videoService.checkAuthUser(authorizationHeader)
		const videos = await videoService.getAllVideos(user)
		res.json({ success: true, videos })
	}
}

export const videoController = new VideoController()
