import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { User } from './user.model'
import { Video } from './video.model'

@Entity(`permissions`)
export class Permission {
	@Column({ type: `varchar`, length: 3, nullable: false })
	operation_type: string

	@Column({ type: `boolean`, nullable: false })
	full_access: boolean

	@ManyToOne(() => User, (user) => user.permissions, { primary: true })
	user: User

	@OneToOne(() => Video, (video) => video.permission, { primary: true })
	@JoinColumn({ name: `videoId` })
	video: Video
}
