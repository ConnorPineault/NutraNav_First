const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // your database user
    host: 'localhost',
    database: 'nutranav', // your database name
    password: 'Raffy15', // your database password
    port: 5432,
});

module.exports = pool;
