require(`dotenv/config`)
import { ConnectionOptions } from 'typeorm'

export default {
	type: process.env.TYPEORM_CONNECTION,
	host: process.env.TYPEORM_HOST || `localhost`,
	port: process.env.TYPEORM_PORT ? parseInt(process.env.DB_PORT) : 5432,
	username: process.env.TYPEORM_USERNAME || `postgres`,
	password: process.env.TYPEORM_PASSWORD || `postgres`,
	database: process.env.TYPEORM_DATABASE || `node_project`,
	entities: [`../entity/*.ts`],
} as ConnectionOptions
