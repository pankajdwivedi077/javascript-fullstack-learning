import type { Server } from "bun";

interface User{
    id: number;
    name: string;
}

interface ApiResponse{
    message: string;
    method: string;
    route: string;
    data?: User | User[]
}

const users: User[] = [{
  id: 1,
  name: "john"
},{
  id: 2,
  name: "bell"
},]

const server: Server<undefined> = Bun.serve({
    port: 3000,
    fetch(req: Request): Response{
        const url = new URL(req.url);
        const method = req.method;

        let response: ApiResponse = {
            message: "Hello from Bun server!",
            method: method,
            route: url.pathname
        }

        if(url.pathname === "/"){
            // route method
            if(method === "GET"){
                response.message = "welcome to api"
            }else{
                response.message = "method not allowed for this route"
            }
        }else if(url.pathname === "/users"){
            switch (method){
                case "GET":
                    response.message = "fetching all users"
                    response.data = users

                    break;
                
                case "POST":
                    response.message = "creating a user"  
                    response.data = users
                    break;
                
                default:
                    response.message = "method not allowed for this route"
                    break;    
            }
        }
       return Response.json(response)
    }
})

console.log(`bun server is running on port: ${server.port}`)