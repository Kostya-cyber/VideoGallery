import * as express from 'express'
import { getDatabaseConnection } from './config/dbConnection'

const PORT = 8081

const app = express()

app.listen(PORT, async () => {
	console.log(`server started on port ${PORT}`)
	getDatabaseConnection()
})
