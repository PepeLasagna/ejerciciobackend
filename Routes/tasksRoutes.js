//LLAMAMOS AL MÓDULO DE EXPRESS
const express = require("express");

//CREAMOS LA INSTANCIA DE EXPRESS PARA EL LLAMADO DE RUTAS
const taskRouter = express.Router();

//LLAMAMOS A LOS ELEMENTOS DE LA PÁGINA DE CONTROLADORES
const taskController = require("../Controller/tasksController")

//SE INDICAS LAS RUTAS REFERIDAS A LAS FUNCIONES TRAÍDAS DE LA PÁGINA DE CONTROLADORES
taskRouter.get("/", taskController.getTasks);

taskRouter.get("/:id", taskController.getTasksById)

taskRouter.put("/:id", taskController.updateTask)

taskRouter.post("/", taskController.createTask)

taskRouter.delete("/:id", taskController.deleteTask)

//EXPORTAMOS LAS FUNCIONES PARA SER UTILIZADAS EN OTRAS PÁGINAS DEL CÓDIGO
module.exports = taskRouter;