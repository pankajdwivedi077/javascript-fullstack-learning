import { z } from "zod"

export const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(4, {error: "Minimum 4 Character"}),
    name: z.string().min(3, {error: "Minimum 3 Character"})
})