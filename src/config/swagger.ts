import * as swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			version: `1.0.0`,
			title: `Video Gallery API`,
			servers: [`http://localhost:8080`],
		},
	},
	apis: [`./src/modules/**/*.routes.ts`],
}

export const swaggerDocs = swaggerJsDoc(swaggerOptions)
