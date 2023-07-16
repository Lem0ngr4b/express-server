// Importar Express y crear una instancia de Router
const express = require('express');
const router = express.Router();

// Datos simulados de tareas
const tasks = [
  { id: 1, name: 'Tarea 1', completed: true },
  { id: 2, name: 'Tarea 2', completed: false },
  { id: 3, name: 'Tarea 3', completed: true },
  { id: 4, name: 'Tarea 4', completed: false },
];

// Middleware para manejar los parámetros de solicitud
const validateParams = (req, res, next) => {
  const { tipo } = req.query;
  if (tipo && (tipo !== 'completas' && tipo !== 'incompletas')) {
    return res.status(400).json({ error: 'Parámetro "tipo" inválido' });
  }
  next();
};

// Ruta para listar las tareas completas
router.get('/', validateParams, (req, res) => {
  const { tipo } = req.query;
  let filteredTasks;
  if (tipo === 'completas') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (tipo === 'incompletas') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else {
    filteredTasks = tasks;
  }
  res.json(filteredTasks);
});

// Exportar el router
module.exports = router;
