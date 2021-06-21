import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from '../user/user.model'
import { Video } from '../video/video.model'

@Entity(`permissions`)
export class Permission {
	@Column({
		type: `varchar`,
		length: 12,
		nullable: false,
		name: `operation_type`,
	})
	operationType: string

	@Column({ type: `boolean`, nullable: false, name: `full_access` })
	fullAccess: boolean

	@ManyToOne(() => User, (user) => user.permissions, { primary: true })
	@JoinColumn({ name: `user_id` })
	user: User

	@ManyToOne(() => Video, (video) => video.permissions, { primary: true })
	@JoinColumn({ name: `video_id` })
	video: Video

	constructor(permission: Partial<Permission>) {
		Object.assign(this, permission)
	}
}
