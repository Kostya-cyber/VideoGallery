import { Column, Entity, JoinColumn, OneToOne, Repository } from 'typeorm'
import { User } from '../user/user.model'

@Entity()
export class RefreshSession {
	@Column({ type: `varchar`, nullable: false })
	refreshToken: string

	@OneToOne(() => User, (user) => user.refreshSession, { primary: true })
	@JoinColumn({ name: `userId` })
	user: User


	constructor(refreshSession: Partial<RefreshSession>){
		Object.assign(this, refreshSession)
	}
}
