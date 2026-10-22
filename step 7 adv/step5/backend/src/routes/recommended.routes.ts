import { Router } from "express"
import { recommendMovies } from "../controller/recommended.controller"

export const recommendRouter = Router()

recommendRouter.post("/", recommendMovies);