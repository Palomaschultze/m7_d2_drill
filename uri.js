import pg from 'pg';

const { Pool, Client } = pg;

const connectionString =
    'postgresql://node_user:node@localhost:5432/practica_db'


const pool = new Pool({
    connectionString,
})
pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end
})

const client = new Client({
    connectionString,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
})