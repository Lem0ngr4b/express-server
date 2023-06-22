const express = require("express");
const app = express();

// Ruta para obtener la lista de tareas
app.get("/tasks", (req, res) => {
  // Aquí se degine el arreglo de tareas
  const tasks = [
    {
      id: "123456",
      isCompleted: false,
      description: "Walk the dog",
    },
    {
      id: "789012",
      isCompleted: true,
      description: "Buy groceries",
    },
    {
      id: "345678",
      isCompleted: false,
      description: "Finish homework",
    },
  ];

  // Envía el arreglo de tareas como respuesta en formato JSON
  res.json(tasks);
});

// Inicia el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
