import { ChatGoogle } from "@langchain/google/node"
import { ChatPromptTemplate } from "@langchain/core/prompts"

const model = new ChatGoogle({
    model: "gemini-2.5-flash",
    temperature: 0.3 // lower the temp more consistent less random answers
})

const promptTemplate = ChatPromptTemplate.fromMessages([
    [
        "system",
        // system message who the ai is + how it should behave
        // sent on every request before the users message
        // sets the personality and rules for the system
         `You are a movie recommendation expert.

        Return high-quality recommendations based on:
        - user's request
        - genre
        - mood
        - count

        Every movie should feel intentional.
        Do not recommend only the most obvious titles every time.`,
    ], [
        "human",
          // human msg - user's req with variables
    `User request: {userPrompt}

    Preferences:
    - Genre: {genre}
    - Mood: {mood}
    - Number of movies: {count}`,
    ]
])

export async function getRecommendations(input: {
    userPrompt: string;
    genre: string;
    mood: string;
    count: number;
}){
    const chain = promptTemplate.pipe(model)
    // .pipe(model) = LCEL - langchain expression language
    // connects compoents into a chain
    // input -> promptTemplate -> variables - call model () -> get response back

    const response = await chain.invoke({
        userPrompt: input.userPrompt,
        genre: input.genre,
        mood: input.mood,
        count: input.count
    })

    console.log(response.text)

    return response.text;

}