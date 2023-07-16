const express = require('express');
const app = express();

// Middleware para gestionar los métodos HTTP válidos
const validateHTTPMethods = (req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(req.method)) {
    return res.status(405).json({ error: 'Método HTTP no permitido' });
  }
  next();
};

// Importar el router de list-view
const listViewRouter = require('./list-view-router');
// Importar el router de list-edit
const listEditRouter = require('./list-edit-router');

// Utilizar el middleware para validar los métodos HTTP
app.use(validateHTTPMethods);

// Utilizar el middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Registrar los routers en la aplicación
app.use('/list/view', listViewRouter);
app.use('/list/edit', listEditRouter);


// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
