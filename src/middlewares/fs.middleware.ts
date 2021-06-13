import { unlink } from 'fs'

export const deleteFile = (fileName: string) => {
	unlink(__dirname + `/../../videos/` + fileName, (err) => {
		if (err) throw err
	})
}
