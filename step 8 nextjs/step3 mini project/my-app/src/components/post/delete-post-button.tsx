"use client";

import { DeletePostButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deletePost } from "@/actions/post-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteButton({ postId }: DeletePostButtonProps) {

    const [isDeleting, setIsDeleting] = useState(false)

    const router = useRouter()

    const handleDelete = async ()=> {
       setIsDeleting(true)
       try {
         const res = await deletePost(postId)
         if(res.success){
            toast(res.message)
            router.push("/")
            router.refresh()
         }else{
            toast(res.message)
         }
       } catch (error) {
        toast("An error occured while deleting the post")
       }finally{
        setIsDeleting(false)
       }
   }

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
        >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
        </Button>
    );
}