import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Index,
	OneToMany,
} from 'typeorm'
import { Permission } from './permission.model'

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
}
