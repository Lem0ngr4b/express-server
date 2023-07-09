const express = require('express');
const router = express.Router();

// Ruta para crear una tarea (POST)
router.post('/crear-tarea', (req, res) => {
  
  const nuevaTarea = req.body; 
  
  res.json({ mensaje: 'Tarea creada exitosamente' });
});

// Ruta para eliminar una tarea (DELETE)
router.delete('/eliminar-tarea/:id', (req, res) => {
  const tareaId = req.params.id; 
  res.json({ mensaje: 'Tarea eliminada exitosamente' });
});

// Ruta para actualizar una tarea (UPDATE)
router.put('/actualizar-tarea/:id', (req, res) => {
  const tareaId = req.params.id; 
  const datosActualizados = req.body;  
  res.json({ mensaje: 'Tarea actualizada exitosamente' });
});

module.exports = router;
