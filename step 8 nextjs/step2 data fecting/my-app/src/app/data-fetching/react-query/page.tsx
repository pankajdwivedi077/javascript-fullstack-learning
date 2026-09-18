"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Post{
    id: number;
    title: string;
    body: string;
}

interface PostsResponse{
    posts: Post[];
    total: number;
}

export default function ReactQuery(){

    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery<PostsResponse>({
        queryKey: ["posts"],
        queryFn: async()=>{
            const response = await fetch('https://dummyjson.com/posts');
            if(!response.ok){
                throw new Error("failed to fetch")
            }
            return response.json();
        },
        staleTime: 2 * 60 * 1000
    })

    if(isLoading) return <h1>Loading...</h1>

    if(error) return <h1>Error</h1>

    return (
        <div>
            <h1>ReactQuery example</h1>
              <div className="flex flex-col gap-2">
                {data?.posts.map((post)=>(
                  <div key={post.id}>
                     <h3>{post.title}</h3>
                     <p>{post.body}</p>
                  </div>
                ))}
            </div>
        </div>
    )
}