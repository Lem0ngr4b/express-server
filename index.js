const express = require('express');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas principales
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de tareas!');
});

// Puerto en el que se ejecutará el servidor
const port = 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
