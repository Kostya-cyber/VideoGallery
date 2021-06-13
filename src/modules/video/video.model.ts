import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { Permission } from '../permission/permission.model'

@Entity(`videos`)
export class Video {
	@PrimaryGeneratedColumn(`uuid`)
	id: string

	@Column({ type: `varchar`, length: 255, nullable: false })
	fileName: string

	@Column({ type: `varchar`, length: 255, nullable: false })
	originalName: string

	@OneToOne(() => Permission, (permission) => permission.video)
	permission: Permission

	constructor(video: Partial<Video>) {
		Object.assign(this, video)
	}
}
