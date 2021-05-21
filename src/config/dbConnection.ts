import ORMConfig from './ormconfig'
import { Connection, createConnection } from 'typeorm'

let dbConnection: Connection
createConnection(ORMConfig)
	.then((connection) => {
		dbConnection = connection
		console.log(`connected database ${ORMConfig.database}`)
	})
	.catch(console.log)

export const getDatabaseConnection = () => dbConnection
