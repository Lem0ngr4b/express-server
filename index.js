const express = require('express');
const app = express();

app.use(express.json());

// Datos de ejemplo
let tareas = [
  { id: 1, nombre: 'Tarea 1', completada: false },
  { id: 2, nombre: 'Tarea 2', completada: true },
  { id: 3, nombre: 'Tarea 3', completada: false }
];
let id_actual = 3;

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  res.status(200).json(tareas);
});

// Obtener una sola tarea por ID
app.get('/tareas/:id', (req, res) => {
  const tarea = tareas.find((t) => t.id === parseInt(req.params.id));
  if (tarea) {
    res.status(200).json(tarea);
  } else {
    res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }
});

// Crear una nueva tarea
app.post('/tareas', (req, res) => {
  const { nombre, completada = false } = req.body;
  id_actual += 1;
  const nuevaTarea = { id: id_actual, nombre, completada };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Actualizar una tarea existente
app.put('/tareas/:id', (req, res) => {
  const tarea = tareas.find((t) => t.id === parseInt(req.params.id));
  if (tarea) {
    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.completada = req.body.completada || tarea.completada;
    res.status(200).json(tarea);
  } else {
    res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }
});

// Eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
  const tareaIndex = tareas.findIndex((t) => t.id === parseInt(req.params.id));
  if (tareaIndex !== -1) {
    const tareaEliminada = tareas.splice(tareaIndex, 1);
    res.status(200).json({ mensaje: 'Tarea eliminada', tarea: tareaEliminada });
  } else {
    res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }
});

// Obtener lista de tareas completadas
app.get('/tareas/completadas', (req, res) => {
  const tareasCompletadas = tareas.filter((t) => t.completada);
  res.status(200).json(tareasCompletadas);
});

// Obtener lista de tareas incompletas
app.get('/tareas/incompletas', (req, res) => {
  const tareasIncompletas = tareas.filter((t) => !t.completada);
  res.status(200).json(tareasIncompletas);
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
