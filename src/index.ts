import * as express from 'express'
import { getDatabaseConnection } from './config/dbConnection'

const PORT = 8080

const app = express()

app.listen(PORT, async () => {
	console.log(`server started on port ${PORT}`)
	await getDatabaseConnection()
})
