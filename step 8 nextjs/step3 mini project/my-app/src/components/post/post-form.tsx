"use client"

import * as z from "zod"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { createPost, updatePost } from "@/actions/post-action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// post form schema
const postSchema = z.object({
   title: z.string().min(3, {error: "atleast 3 characters"}).max(255, {error: "less than 255"}),
   description: z.string().min(5, {error: "atleast  characters"}).max(255, {error: "less than 255"}),
   content: z.string().min(10, {error: "atleast  characters"}),

})

interface PostFormProps {
  isEditing?: boolean;
  post?: {
    id: number;
    title: string;
    description: string;
    content: string;
    slug: string
  }
}

type PostFormValues = z.infer<typeof postSchema>

export default function PostForm({isEditing, post}: PostFormProps){

   const { handleSubmit, register, formState: {errors} } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: isEditing && post ? 
    {
      title: post.title,
      description: post.description,
      content: post.content
    }: 
    {
        title: "",
        description: "",
        content: ""
    }
   }) 

   const [isPending, startTranstion] = useTransition()

   const router = useRouter()

   const onFormSubmit = async(data: PostFormValues)=>{
       startTranstion(async()=>{
        try {
            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("description", data.description)
            formData.append("content", data.content)

            let res;

            if(isEditing && post){
              res = await updatePost(post.id, formData)
            }else{
              res = await createPost(formData)
            }

            res = await createPost(formData)
            console.log(res);
            if(res?.success){
                toast(isEditing ? "post edited" : "post created")
                router.refresh()
                router.push("/")
            }else{
              toast(res.message);
            }

        } catch (error) {
            toast("failed to create post")
        }
       })
   }

   return <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title">Title</label>
        <Input id="title" placeholder="Enter post title" {...register("title")} disabled={isPending} />
        {errors?.title && 
         <p className="text-sm text-red-700">{errors.title.message}</p>
        }
      </div>
      <div className="space-y-2">
        <label htmlFor="description">Description</label>
        <Textarea id="description" placeholder="enter a post description" {...register("description")} disabled={isPending}/>
           {errors?.description && 
         <p className="text-sm text-red-700">{errors.description.message}</p>
        }
      </div>
      <div className="space-y-2">
        <label htmlFor="content">Content</label>
        <Textarea id="content" placeholder="enter a post content" className="min-h-[250px] resize-none" {...register("content")} disabled={isPending} />
           {errors?.content && 
         <p className="text-sm text-red-700">{errors.content.message}</p>
        }
      </div>
      <Button type="submit" disabled={isPending} className="mt-5 w-full">
        {
            isPending ? "Saving Post..." : isEditing ? "Update Post" : "Create Post"
        }
      </Button>
   </form>
}