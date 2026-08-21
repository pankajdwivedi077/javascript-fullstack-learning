import type { Context } from "hono"
import { Database } from "bun:sqlite"
import { Task } from "../types/index"

interface JwtPayload {
  userId: number;
  role: "user" | "admin";
}

export async function createTask(c: Context, db: Database){

  const { userId, role } = c.get("jwtPayload") as JwtPayload;
  const { title, description, user_id } = await c.req.json()

    if(!userId){
    return c.json({
        error: "you need to login to create tasks"
    }, 403)
  }

  if(role !== "admin"){
    return c.json({
        error: "Unauthorized"
    }, 403)
  }

  if(userId !== user_id){
     return c.json({
        error: "Unauthorized"
    }, 403)
  }

  try{
    
    const result = db.query(`
       INSERT INTO tasks (user_id, title, description) VALUES (?,?,?) RETURNING *
    `,).get(user_id, title, description) as Task

    return c.json(result, 201);

  }catch(error){
    console.error(error, " errro in createTask")
    return c.json({
        error: " Internal server error. error in createTask"
    })
  }

}

export async function getAllTasks(c: Context, db:Database){

    try{

      const extractAllTasks = db.query(`SELECT * FROM tasks`).all() as Task[]

      return c.json(extractAllTasks, 200);

    }catch(e){
          console.error(e, " errro in getAllTasks")
    return c.json({
        error: " Internal server error. error in getAllTasks"
    })
    }
}

export async function getSingleTask(c: Context, db:Database){

      const taskId = Number(c.req.param("id"))

//     if(!taskId){
//     return c.json({
//       error: "task id is required"
//     }, 400)
//   }

    try{

       const extractSingleTask = db.query(`SELECT * FROM tasks WHERE id=?`).get(taskId) as Task | undefined

       if(!extractSingleTask){
        return c.json({
            errro: "task not found"
        }, 404)
       }

      return c.json(extractSingleTask, 200);

    }catch(e){
          console.error(e, " errro in getSingleTask")
    return c.json({
        error: " Internal server error. error in getSingleTask"
    })
    }
}

export async function updateTask(c:Context, db: Database){

   const { userId, role } = c.get("jwtPayload") as JwtPayload;
   const taskId = Number(c.req.param("id"))
   const { title, description, user_id } = await c.req.json()

    if(!userId){
    return c.json({
        error: "you need to login to create tasks"
    }, 403)
  }

    if(role !== "admin"){
    return c.json({
        error: "Unauthorized"
    }, 403)
  }

  if(userId !== user_id){
     return c.json({
        error: "Unauthorized"
    }, 403)
  }

    try{

     const extractExistingTask = db.query(`SELECT * FROM tasks WHERE id=?`).get(taskId) as Task | undefined

     if(!extractExistingTask){
             return c.json({
            errro: "task not found"
        }, 404)
     }

     const updatedTask = db.query(`
          UPDATE tasks 
          SET title = ?, description = ?, user_id = ?
          WHERE id = ?
          RETURNING *
        `).get(
            title || extractExistingTask.title,
            description !== undefined ? description : extractExistingTask.description,
            userId || extractExistingTask.user_id,
            taskId
        ) as Task;

        return c.json(updatedTask, 200)

    }catch(e){
                console.error(e, " errro in updateTask")
    return c.json({
        error: " Internal server error. error in updateTask"
    })
    }
}

export async function deleteTask(c: Context, db:Database){

      const { userId, role } = c.get("jwtPayload") as JwtPayload;
   const taskId = Number(c.req.param("id"))
      const { title, description, user_id } = await c.req.json()

       if(!userId){
    return c.json({
        error: "you need to login to create tasks"
    }, 403)
  }

    if(role !== "admin"){
    return c.json({
        error: "Unauthorized"
    }, 403)
  }

  if(userId !== user_id){
     return c.json({
        error: "Unauthorized"
    }, 403)
  }

    try{

     const deletedTaskById = db.run(`DELETE FROM tasks WHERE id=?`, [taskId])

     if(deletedTaskById.changes === 0 ){
          return c.json({
    error: "task not found"
  }, 404)
     }

    return c.json({
        message: "Task deleted"
    })

    }catch(e){
        console.error(e, " errro in deleteTask")
    return c.json({
        error: " Internal server error. error in deleteTask"
    })
    }
}