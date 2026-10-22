import { z } from "zod"

// zod is ts first schema validation library
// langchain = zod to define the exact shape of the ai output

export const MovieSchema = z.object({
    title: z.string().describe("Movie title"),
    // langchain seeds this description to the model
    // model will know each filed should contain what
    year: z.number().describe("Release year"),
    genre: z.array(z.string()).describe("List of genre"),
    cast: z.array(z.string()).describe("Top 3 cast members"),
    reason: z.string().describe("Why this matches the user's mood and preference"),
    rating: z.number().min(1).max(10).describe("IMDB style rating out of 10")
})

export const RecommendationSchema = z.object({
    movies: z.array(MovieSchema).describe("List of recommended movies")
})

export type Movie = z.infer<typeof MovieSchema>

export type Recommendation = z.infer<typeof RecommendationSchema>