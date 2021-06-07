import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { User } from '../user/user.model'
import { Video } from '../video/video.model'

@Entity(`permissions`)
export class Permission {
	@Column({ type: `varchar`, length: 3, nullable: false })
	operationType: string

	@Column({ type: `boolean`, nullable: false })
	fullAccess: boolean

	@ManyToOne(() => User, (user) => user.permissions, { primary: true })
	user: User

	@OneToOne(() => Video, (video) => video.permission, { primary: true })
	@JoinColumn({ name: `videoId` })
	video: Video
}
