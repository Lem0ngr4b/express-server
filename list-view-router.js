const express = require('express');
const router = express.Router();

// Ruta para listar las tareas completas
router.get('/completas', (req, res) => {
  const tareasCompletas = [
    { id: 1, descripcion: 'Tarea 1 completada' },
    { id: 2, descripcion: 'Tarea 2 completada' },
    { id: 3, descripcion: 'Tarea 3 completada' }
  ];

  // Envía las tareas completas como respuesta
  res.json(tareasCompletas);
});

// Ruta para listar las tareas incompletas
router.get('/incompletas', (req, res) => {
  const tareasIncompletas = [
    { id: 4, descripcion: 'Tarea 4 incompleta' },
    { id: 5, descripcion: 'Tarea 5 incompleta' },
    { id: 6, descripcion: 'Tarea 6 incompleta' }
  ];

  // Envía las tareas incompletas como respuesta
  res.json(tareasIncompletas);
});

module.exports = router;
