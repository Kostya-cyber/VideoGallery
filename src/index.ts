import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + `/../.env` })
import * as express from 'express'
import { json, urlencoded } from 'body-parser'
import * as cors from 'cors'
import { authRouter } from './modules/auth/auth.routes'
import { usersRouter } from './modules/user/user.routes'
import { videoRouter } from './modules/video/video.routes'
import { permissionRouter } from './modules/permission/permission.routes'
import { errorHandler } from './middlewares/error.middleware'

const PORT = 8080

const app = express()

app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(json())

app.use(`/auth`, authRouter)
app.use(`/user`, usersRouter)
app.use(`/video`, videoRouter)
app.use(`/permission`, permissionRouter)

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`)
})
