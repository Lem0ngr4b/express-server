// Importar Express y crear una instancia de Router
const express = require('express');
const router = express.Router();

// Datos simulados de tareas
let tasks = [
  { id: 1, name: 'Tarea 1', completed: false },
  { id: 2, name: 'Tarea 2', completed: true },
  { id: 3, name: 'Tarea 3', completed: false },
];

// Middleware para manejar errores en solicitudes POST y PUT
const validateTaskData = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Cuerpo de solicitud vacío' });
    }

    const { name, completed } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Nombre de tarea no válido' });
    }

    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Valor de completado no válido' });
    }
  }

  next();
};

// Ruta para crear una nueva tarea (POST)
router.post('/', validateTaskData, (req, res) => {
  const { name, completed } = req.body;
  const newTask = {
    id: tasks.length + 1,
    name,
    completed: completed || false,
  };
  tasks.push(newTask);
  res.json(newTask);
});

// Ruta para eliminar una tarea por ID (DELETE)
router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    res.json(deletedTask);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

// Ruta para actualizar una tarea por ID (PUT)
router.put('/:id', validateTaskData, (req, res) => {
  const taskId = parseInt(req.params.id);
  const { name, completed } = req.body;
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks[index].name = name || tasks[index].name;
    tasks[index].completed = completed || tasks[index].completed;
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

// Exportar el router
module.exports = router;
