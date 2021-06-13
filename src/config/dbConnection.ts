import ORMConfig from './ormconfig'
import { Connection, createConnection } from 'typeorm'
import { logger } from './logger'
const getDatabaseConnection = async () => {
	let dbConnection: Connection
	try {
		dbConnection = await createConnection(ORMConfig)
		logger.info(`connected to database ${ORMConfig.database}`)
	} catch (err) {
		logger.error(err)
	}
	return dbConnection
}

export let dbConnection: Connection
export let dbManager
;(async () => {
	dbConnection = await getDatabaseConnection()
	dbManager = dbConnection.manager
})()
