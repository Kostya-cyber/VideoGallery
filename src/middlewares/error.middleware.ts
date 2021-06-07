export const errorHandler = (err, req, res, next) => {
	res.json(err)
}

export const wrapAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(next)
	}
}
