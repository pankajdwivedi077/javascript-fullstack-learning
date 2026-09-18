"use client"

import { Plus, Upload } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import React, { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Category ={
    id: number;
    name: string;
    createdAt: Date
}

type FormState ={
  title: string;
  description: string;
  categoryId: string;
  file: File | null
}

interface UploadDialogProps{
    categories: Category[]
}

export default function UploadAssert({categories}: UploadDialogProps){

   const [open, setOpen] = useState(false)
   const [isUploading, setIsUploading] = useState(false)
   const [uploadProgressStatus, setUploadProgressStatus] = useState(0)

   const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    categoryId: "",
    file: null
   })

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      const {name, value} = e.target
      setFormState(prev => ({...prev, [name]: value}))
   }

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0]
     if(file){
        setFormState(prev=> ({...prev, file}))
     }
   }

  const handleCategoryChange = (value: string | null) => {
   if (value !== null) {
     setFormState(prev => ({ ...prev, categoryId: value }))
   }
}

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger >
                <Button className={"bg-teal-500 hover:bg-teal-600 text-white"}>
                    <Plus className="mr-2 w-4 h-4" />
                    Upload Asset
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Upload New Asset</DialogTitle>
                  
                </DialogHeader>
                <form className="space-y-5">
                   <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                     id="title"
                     name="title"
                     placeholder="title"
                     value={formState.title}
                     onChange={handleInputChange}
                    />
                   </div>
                   <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                     id="description"
                     name="description"
                     placeholder="description"
                     value={formState.description}
                      onChange={handleInputChange}
                    />
                   </div>
                   <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={handleCategoryChange}  value={formState.categoryId}> 
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categories.map(c=> (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                          {c.name}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                   </div>
                     <div className="space-y-2">
                    <Label htmlFor="file">File</Label>
                    <Input
                     id="file"
                     type="file"
                     accept="image/*"
                     onChange={handleFileChange}
                    />
                   </div>
                     <DialogFooter>
                <Button type="submit">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Asset
                </Button>
            </DialogFooter>
                </form>
            </DialogContent>
          
        </Dialog>
    )
}