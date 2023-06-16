import express from 'express';
import Estudiantes from './Estudiantes.js';
import Cursos from './Cursos.js';

const app = express();
app.listen(3000, () => {
    console.log('Servidor activo y escuchando por PORT: 3000')
});

//Middleware
app.use(express.json());

//Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido...')
});

app.get('/estudiantes', (req, res) => {
    let query = {
        text: "SELECT id, nombres, apellidos, edad, nro_identificacion FROM estudiantes",
        values: [],
    };
    Estudiantes.findAll(query)
        .then((data) => res.send({ code: 200, data: data, message: 'Cumplido' })
        ).catch((error) => res.status(500).send({ code: 500, error }))
})

//Buscar por edad
app.get('/estudiantes/:edad', (req, res) => {
    let {edad} = req.params;
    let query = {
        text: "SELECT id, nombres, apellidos, edad, nro_identificacion FROM estudiantes WHERE CAST(edad AS INTEGER) > $1;",
        values: [edad],
    };
    Estudiantes.findAll(query)
        .then((data) => res.send({ code: 200, data: data, message: 'Cumplido' })
        ).catch((error) => res.status(500).send({ code: 500, error }))
});

//Buscar por apellido en forma decendente
app.get('/estudiantes/columna/:col', (req, res) => {
    let {col} = req.params;
    let query = {
        text: `SELECT id, nombres, apellidos, nro_identificacion FROM estudiantes ORDER BY ${col} DESC;`,
        values: [],
    };
    Estudiantes.findAll(query)
        .then((data) => res.send({ code: 200, data: data, message: 'Cumplido' })
        ).catch((error) => res.status(500).send({ code: 500, error }))
});


app.post('/estudiantes', (req, res) => {
    let { nombres, apellidos, edad, nro_identificacion } = req.body;
    console.log(nombres, apellidos, edad, nro_identificacion);
    let nuevoEstudiante = new Estudiantes(nombres, apellidos, edad, nro_identificacion);
    nuevoEstudiante
        .createUser()
        .then((resultado) => {
            res.send({
                code: 201,
                data: resultado,
                message: 'Estudiante guardado correctamente'
            });
        }).catch((error) => res.status(500).send({ code: 500, error }));
});


app.put('/estudiantes/:id', (req, res) => {
    let { id } = req.params;
    let { nombres, apellidos, edad, nro_identificacion } = req.body;
    Estudiantes.updateUser(id, nombres, apellidos, edad, nro_identificacion)
        .then((resultado) =>
            res.status(200).send({
                code: 200,
                data: resultado,
                message: "Actualizado"
            })
        )
        .catch((error) => res.status(500).send({ code: 500, error }));
});


app.delete('/estudiantes/:id', (req, res) => {
    let { id } = req.params;
    Estudiantes.deleteUser(id)
        .then((resultado) =>
            res.status(200).send({
                code: 200,
                data: resultado,
                message: "Estudiante"
            })
        )
        .catch((error) =>
            res.status(500).send({
                code: 500,
                message: "Error al intentar eliminar el estudiante",
                error,
            })
        )
});



//Rutas cursos
app.get('/cursos', (req, res) => {
    Cursos.findAll()
        .then((data) => res.send({ code: 200, data: data, message: 'Cumplido' })
        ).catch((error) => res.status(500).send({ code: 500, error }))
})

app.post('/cursos', (req, res) => {
    let { titulo, descripcion } = req.body;
    console.log(titulo, descripcion);
    let nuevoCurso = new Cursos(titulo, descripcion);
    nuevoCurso
        .createUser()
        .then((resultado) => {
            res.send({
                code: 201,
                data: resultado,
                message: 'Curso guardado correctamente'
            });
        }).catch((error) => res.status(500).send({ code: 500, error }));
});

app.put('/cursos/:id', (req, res) => {
    let { id } = req.params;
    let { titulo, descripcion } = req.body;
    Cursos.updateUser(id, titulo, descripcion)
        .then((resultado) =>
            res.status(200).send({
                code: 200,
                data: resultado,
                message: "Actualizado"
            })
        )
        .catch((error) => res.status(500).send({ code: 500, error }));
});


app.delete('/cursos/:id', (req, res) => {
    let { id } = req.params;
    Cursos.deleteUser(id)
        .then((resultado) =>
            res.status(200).send({
                code: 200,
                data: resultado,
                message: "Estudiante"
            })
        )
        .catch((error) =>
            res.status(500).send({
                code: 500,
                message: "Error al intentar eliminar el estudiante",
                error,
            })
        )
});