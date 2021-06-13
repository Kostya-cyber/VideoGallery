# Video Gallery
# Installation
For work you should install:

- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)

Clone the repository and install dependencies:
```bash
$ cd ${DIR} # your directory
$ git clone https://github.com/Kostya-cyber/VideoGallery.git
$ cd VideoGallery
$ npm run i
```

And run project:
```bash
$ npm run dev
```

# .env
- TYPEORM_CONNECTION - Database type. You must specify what database engine you use.
- TYPEORM_HOST - Database host.
- TYPEORM_USERNAME - Database username.
- TYPEORM_PASSWORD - Database password.
- TYPEORM_DATABASE - Database name
- TYPEORM_PORT - Database host port. Default postgres port is 5432.
- JWT_ACCESS_SECRET - Secret data for access token.
- JWT_REFRESH_SECRET - Secret data for refresh token.
- JWT_ACCESS_TIME - Access token expiration time.
- JWT_REFRESH_TIME - Refresh token expiration time.

# DrawSQL
[database schema](https://drawsql.app/innowise-group-1/diagrams/videogallery)
