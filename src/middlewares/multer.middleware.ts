import * as multer from 'multer'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, `./videos`)
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + `-` + file.originalname)
	},
})

const fileFilter = (req, file, cb) => {
	const listFormatVideo = [
		`video/webm`,
		`video/mpg,`,
		`video/mp2`,
		`video/mpeg`,
		`video/mpe`,
		`video/mpv`,
		`video/ogg`,
		`video/mp4`,
		`video/m4p`,
		`video/m4v`,
		`video/avi`,
		`video/wmv`,
		`video/mov`,
		`video/qt`,
		`video/flw`,
		`video/swf`,
	]
	cb(null, listFormatVideo.includes(file.mimetype))
}

export const upload = multer({ storage, fileFilter })
