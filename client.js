import pg from 'pg';

const {Client} = pg;

const cliente = new Client ({
    host: 'localhost',
    port: 5432,
    database: 'practica_db',
    user: 'node_user',
    password: 'node',
})

cliente.connect()

cliente.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    cliente.end()
})


/* const consulta = (query)=>{
    return new Promise(async(resolve, reject) => {
        const cliente = new Client(config);
        try {
            await cliente.connect();
            const result = await cliente.query(query);
            resolve(result.rows);
        } catch(error){
            reject('error al conectar', error)
        } finally {
            try {
                await cliente.end()
            } catch (error) {
                console.log('error al finalizar')
            }
        }
    });
};
const getProduct = () => {

    const query = {
        text: 'SELECT * FROM cursos',
        values: [],
    };
    
    consulta(query)
    .then((resultado) => {
        console.table(resultado)
    }) .catch((error) => {
        console.log(`Error en la peticion ${error}`)
    });
};

getProduct() */
