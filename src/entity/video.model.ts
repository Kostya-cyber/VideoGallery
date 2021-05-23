import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { Permission } from './permission.model'

@Entity(`videos`)
export class Video {
	@PrimaryGeneratedColumn(`uuid`)
	id: string

	@Column(`varchar`, { length: 255, nullable: false })
	tittle_video: string

	@OneToOne(() => Permission, (permission) => permission.video)
	permission: Permission
}
