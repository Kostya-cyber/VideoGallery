import * as express from 'express'
import { usersRouter } from './routes/user.routes'
import { json, urlencoded } from 'body-parser'
import * as cors from 'cors'
import { videoRouter } from './routes/video.routes'
import { authRouter } from './routes/auth.routes'

const PORT = 8080

const app = express()

app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(json())

app.use(`/auth`, authRouter)
app.use(`/user`, usersRouter)
app.use(`/video`, videoRouter)

app.use((err, req, res, next) => {
	res.json(err)
})

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`)
})
