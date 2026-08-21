import { Hono } from 'hono';
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { initDatabase } from "./database/db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { loginUser, regsiterUser } from './controllers/auth';
import { jwt } from "hono/jwt";
import { createTask, deleteTask, getAllTasks, getSingleTask, updateTask } from './controllers/task';

const app = new Hono();
const db = initDatabase();

app.use("*", cors());
app.use("*", logger());

const auth = jwt({
  secret: process.env.JWT_SECRET || 'JWT_SECRET',
  alg: 'HS256'
})

// input validation
const registerSchema = z.object({
  username: z.string().min(3).max(25),
  password: z.string().min(5),
  role: z.enum(["user", "admin"]).optional()
})

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  user_id: z.number().int().positive()
})

// auth related routes
app.post("/register", zValidator("json", registerSchema), (c)=> 
  regsiterUser(c, db)
)

app.post("/login", zValidator("json", loginSchema), (c)=> 
  loginUser(c, db)
)

// task route
app.post("/tasks", auth, zValidator("json", taskSchema), (c)=>
  createTask(c,db)
)

app.get("/tasks", auth, (c)=>
  getAllTasks(c,db)
)

app.get("/tasks/:id", auth, (c)=>
  getSingleTask(c,db)
)

app.put("/tasks/:id", auth, zValidator("json", taskSchema), (c)=>
  updateTask(c,db)
)

app.delete("/tasks/:id", auth, (c)=>
  deleteTask(c,db)
)

app.get('/', (c) => {
  return c.text('Hello Hono!');
})

app.get("/db-test", (c)=> {
  const result = db.query(`SELECT sqlite_version()`).get()
  return c.json({
    message: "db connected successfully",
    sqlite_version : result
  })
})

export default app;
