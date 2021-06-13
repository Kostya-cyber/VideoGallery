import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
} from 'typeorm'
import { Permission } from '../permission/permission.model'

@Entity(`videos`)
export class Video {
	@PrimaryGeneratedColumn(`uuid`)
	id: string

	@Column({ type: `varchar`, length: 255, nullable: false, name: `file_name` })
	fileName: string

	@Column({
		type: `varchar`,
		length: 255,
		nullable: false,
		name: `original_name`,
	})
	originalName: string

	@OneToMany(() => Permission, (permission) => permission.video)
	permission: Permission[]

	constructor(video: Partial<Video>) {
		Object.assign(this, video)
	}
}
