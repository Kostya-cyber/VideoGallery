import { permissionService } from './permission.service'

class PermissionController {
	async createPermission(req, res) {
		const { operationType, fullAccess, videoId, userId } = req.body
		const permissionData = await permissionService.createPermission(
			userId,
			operationType,
			fullAccess,
			videoId
		)
		res.status(200).json({ success: true, ...permissionData })
	}
	async getPermission(req, res) {
		const { id } = req.user
		const permissions = await permissionService.getAllPermissoins(id)
		res.status(200).json({ success: true, permissions })
	}
	// async updatePermission(req, res) {}
	// async deletePermission(req, res) {
	// 	const {  } = req.params
	// }
}

export const permissionController = new PermissionController()
