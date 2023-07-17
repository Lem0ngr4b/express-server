const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar las variables de entorno del archivo .env
const app = express();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Middleware para la validación del token JWT
const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. No se proporcionó el token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Acceso no autorizado. Token expirado.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Acceso no autorizado. Token inválido.' });
    } else {
      return res.status(401).json({ error: 'Acceso no autorizado. Error en la verificación del token.' });
    }
  }
};

// Ruta protegida (GET /protected)
app.get('/protected', validateToken, (req, res) => {
  // Obtener el usuario desde req.user (decodificado del token JWT)
  const { userId } = req.user;

  // Realizar acciones protegidas
  // ...

  res.json({ message: 'Ruta protegida. Acceso autorizado.' });
});

// Ruta de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no válido.' });
  }

  res.status(500).json({ error: 'Error interno del servidor.' });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
