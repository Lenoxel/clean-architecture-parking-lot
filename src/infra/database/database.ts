import pgPromise from 'pg-promise';

const postgresPromise = pgPromise({});

const database = postgresPromise({
	user: 'postgres',
	password: 'Postgres4321',
	host: 'localhost',
	port: 5432,
	database: 'app',
	idleTimeoutMillis: 100,
});

export default database;