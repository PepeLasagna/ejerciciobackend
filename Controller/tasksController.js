//LLAMAMOS A LOS ELEMENTOS DE LA PÁGINA DE MODELOS
const taskModel = require("../Models/tasksModels");

//FUNCIÓN QUE INTERACTUA CON EL GET GENERAL
const getTasks = async (req, res) => {
  const task = await taskModel.getTasks();
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "No se han encontrado tareas" });
  }
};

//FUNCIÓN QUE INTERACTUA CON EL GET SEGÚN ID
const getTasksById = async (req, res) => {
  const id = req.params.id;
  const task = await taskModel.getTasksById(id);
  if (task) {
    res.json(task);
  } else {
    res
      .status(404)
      .json({ message: "No se ha encontrado una tarea con ese ID" });
  }
};

//FUNCIÓN QUE INTERACTUA CON EL POST
const createTask = async (req, res) => {
  const task = req.body;
  const createTask = await taskModel.createTask(task);
  if (createTask) {
    res.json(createTask);
  } else {
    res.status(500).json({ message: "No se ha podido añadir la tarea" });
  }
};

//FUNCIÓN QUE INTERACTUA CON EL PUT 
const updateTask = async (req, res) => {
  const id = req.params.id;
  const task = await taskModel.getTasksById(id);
  if (task) {
    const updatedTask = await taskModel.updateTask(
      req.body,
      parseInt(req.params.id),
      {
        ...task,
        ...req.body,
      }
    );

    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(500).json({ message: "No se ha podido actualizar la tarea" });
    }
  } else {
    res.status(404).json({ message: "No se ha encontrado una tarea con ese ID" });
  }
};

//FUNCIÓN QUE INTERACTUA CON EL DELETE
const deleteTask = async (req, res) => {
  const id = req.params.id;
  const task = await taskModel.getTasksById(id);
  if (task) {
    const deletedTask = await taskModel.deleteTask(parseInt(req.params.id));

    if (deletedTask) {
      res.json({message: "Tarea eliminada con éxito.", ...task});
    } else {
      res.status(500).json({ message: "No se ha podido eliminar la tarea" });
    }
  } else {
    res.status(404).json({ message: "No se ha encontrado una tarea con ese ID" });
  }
};

//EXPORTAMOS LAS FUNCIONES PARA SER UTILIZADAS EN OTRAS PÁGINAS DEL CÓDIGO
module.exports = { getTasks, getTasksById, createTask, updateTask, deleteTask };
