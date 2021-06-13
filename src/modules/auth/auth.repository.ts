import { dbManager } from '../../config/dbConnection'
import { RefreshSession } from './token.model'

class AuthRepository {
	async save(token: RefreshSession) {
		return await dbManager.save(token)
	}

	async getToken(refreshToken: string) {
		return await dbManager.findOne(RefreshSession, { refreshToken })
	}

	async deleteTokenByRefreshToken(refreshToken: string) {
		return await dbManager
			.createQueryBuilder()
			.delete()
			.from(RefreshSession)
			.where(`refresh_token = :token`, { token: refreshToken })
			.execute()
	}
}

export const authRepository = new AuthRepository()
