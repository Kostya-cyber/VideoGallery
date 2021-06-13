import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + `/../../.env` })
import { ConnectionOptions } from 'typeorm'

export default {
	type: process.env.TYPEORM_CONNECTION,
	host: process.env.TYPEORM_HOST || `localhost`,
	port: +process.env.TYPEORM_PORT || 5432,
	username: process.env.TYPEORM_USERNAME || `postgres`,
	password: process.env.TYPEORM_PASSWORD || `postgres`,
	database: process.env.TYPEORM_DATABASE || `node_project`,
	synchronize: true,
	entities: [__dirname + `/../modules/**/*.model.ts`],
} as ConnectionOptions
