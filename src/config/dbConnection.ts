import ORMConfig from './ormconfig'
import { Connection, createConnection } from 'typeorm'
export const getDatabaseConnection = async () => {
	let dbConnection: Connection
	try {
		dbConnection = await createConnection(ORMConfig)
		console.log(`connected to database ${ORMConfig.database}`)
	} catch (err) {
		console.log(err)
	}
	return dbConnection
}
