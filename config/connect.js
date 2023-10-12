import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Abhy@1234",
    database:"social",
})

export default db;