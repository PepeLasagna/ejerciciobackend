
//LLAMADO AL MÓDULO DE MARIADB
const mariadb = require("mariadb");

//CREAMOOS LA POOL PARA LA CONEXIÓN CON LA BASE DE DATOS
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "LasCosa",
  database: "pruebadb",
  connectionLimit: "5",
});

//MODELO DEL MÉTODO GET GENERAL PARA TODOS LOS ELEMENTOS
const getTasks = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query("SELECT id, title, completed FROM tasks");
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
  return false;
};

//MODELO DEL MÉTODO GET, SEGÚN UNA ID
const getTasksById = async (id) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const result = await conn.query(
            "SELECT id, title, completed FROM tasks WHERE id=?", [
                id
            ]
        )
     return result
    } catch (error) {
        console.log(error);        
    } finally{
        if(conn){
            conn.release()
        }};
    return false;

}

//MODELO DEL MÉTODO POST, SEGÚN UNA TASK DADA
const createTask = async (tarea) => {
  let conn;
    try{
        conn = await pool.getConnection();
        const result = await conn.query(
            "INSERT INTO tasks (title, completed) VALUE (?, ?)", [
                tarea.title, tarea.completed
            ]
        )
     return tarea
    } catch (error) {
        console.log(error);        
    } finally{
        if(conn){
            conn.release()
        }
    }
    return false
}

//MODELO DEL MÉTODO PUT, SEGÚN UNA ID Y UNA TASK DADA
const updateTask = async (task, id) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const result = await conn.query(
            "UPDATE tasks set title=?, completed=? WHERE id=?", [
                task.title, task.completed, id
            ]
        )
     return {id, ...task}
    } catch (error) {
        console.log(error);        
    } finally{
        if(conn){
            conn.release()
        }
    }
    return false
}

// MODELO DEL MÉTODO DELETE, SEGÚN UNA ID
const deleteTask = async (id) => {
  let conn;
    try{
        conn = await pool.getConnection();
        await conn.query(
            "DELETE FROM tasks WHERE id=?", [
                id
            ]
        )
     return true
    } catch (error) {
        console.log(error);        
    } finally{
        if(conn){
            conn.release()
        }
    }
}

//EXPORTAMOS LAS FUNCIONES PARA SER UTILIZADAS EN OTRAS PÁGINAS DEL CÓDIGO
module.exports = { getTasks, getTasksById, createTask, updateTask, deleteTask };
