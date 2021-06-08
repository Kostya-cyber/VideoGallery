import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Index,
	OneToMany,
	OneToOne,
} from 'typeorm'
import { RefreshSession } from '../auth/token.model'
import { Permission } from '../permission/permission.model'

@Entity(`users`)
export class User {
	@PrimaryGeneratedColumn(`uuid`)
	id: string

	@Index({ unique: true })
	@Column(`varchar`, { length: 255, nullable: false })
	login: string

	@Column(`varchar`, { length: 255, nullable: false })
	password: string

	@OneToMany(() => Permission, (permission) => permission.user)
	permissions: Permission[]

	@OneToOne(() => RefreshSession, (refreshSession) => refreshSession.user)
	refreshSession: RefreshSession

	constructor(user: Partial<User>) {
		Object.assign(this, user)
	}
}
