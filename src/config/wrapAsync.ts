// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const wrapAsync = (fn) => {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	return (req, res, next) => {
		fn(req, res, next).catch(next)
	}
}
