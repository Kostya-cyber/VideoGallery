import { ForbiddenError } from '../../errors/ForbiddenError'
import { permissionService } from './permission.service'

class PermissionController {
	async createPermission(req, res) {
		const { operationType, fullAccess, videoId, userId } = req.body
		const { id } = req.user
		if (await permissionService.checkAccessRights(id, videoId)) {
			const permissionData = await permissionService.createPermission(
				userId,
				operationType,
				fullAccess,
				videoId
			)
			res.status(200).json({ success: true, ...permissionData })
		} else {
			throw new ForbiddenError(
				`you do not have permission to create permission for this video`
			)
		}
	}
	async getPermission(req, res) {
		//fix: change output of permissions
		const { id } = req.user
		const permissions = await permissionService.getAllPermissions(id)
		res.status(200).json({ success: true, permissions })
	}
	async updatePermission(req, res) {
		//add: change permissions)
		res.status(200).json({ success: true })
	}
	async deletePermission(req, res) {
		//add: check access rights for delete permissions (with READ_CHOSEN write different logic)
		res.status(200).json({ success: true })
	}
}

export const permissionController = new PermissionController()
