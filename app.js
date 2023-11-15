const express = require("express");

const taskRoutes = require("./Routes/tasksRoutes")

const app = express();

const port = 3000;

app.use(express.json());

app.use("/tasks", taskRoutes)

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
  