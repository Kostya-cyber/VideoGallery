export class AppError extends Error {
	constructor(public message: string, public status: number) {
		super()
		Object.setPrototypeOf(this, AppError.prototype)
	}
}
