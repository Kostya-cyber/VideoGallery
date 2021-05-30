import * as express from 'express'
import { usersRouter } from './routes/user.routes'
import { json, urlencoded } from 'body-parser'
import * as cors from 'cors'
import { videoRouter } from './routes/video.routes'

const PORT = 8080

const app = express()

app.use(cors())

app.use(urlencoded({ extended: false }))
app.use(json())

app.use(`/user`, usersRouter)
app.use(`/video`, videoRouter)

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`)
})
