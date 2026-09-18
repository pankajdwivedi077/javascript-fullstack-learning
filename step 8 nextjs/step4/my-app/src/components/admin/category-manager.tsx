"use client"

import { Plus, Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { addNewCategoryAction, deleteCategoryAction } from "@/actions/admin-actions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

type Category = {
    id: number;
    name: string;
    createdAt: Date
}

interface CategoryManagerProps{
    categories: Category[]
}

export default function CategoryManager({ categories: initialCategories }: CategoryManagerProps){

    const [categories, setCategories] = useState<Category[]>(initialCategories)
    const [newCategoryName, setNewCategoryName] = useState("")

    const handleAddNewCategory = async (e: React.FormEvent)=>{
       e.preventDefault()
       try {
        const formData = new FormData();
        formData.append("name", newCategoryName)
        const result = await addNewCategoryAction(formData)
        if(result.success){
            const newCategory = {
                id: Math.max(0, ...categories.map(c=>c.id)) + 1,
                name: newCategoryName,
                createdAt: new Date()
            }
            setCategories([...categories, newCategory])
            setNewCategoryName("")
        }
       } catch (error) {
        console.log(error)
       }
    }

    const deleteCategory = async(categoryId: number) =>{
            const result = await deleteCategoryAction(categoryId)
            if(result.success){
                setCategories(categories.filter(c=>c.id !== categoryId))
            }
    }
 
    return (
        <div className="space-y-6">
            <form onSubmit={handleAddNewCategory} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="categoryName">New category</Label>
                    <div className="flex gap-2">
                        <Input 
                         id="categoryName"
                         placeholder="Enter category name"
                         value={newCategoryName}
                         onChange={(e)=> setNewCategoryName(e.target.value)}
                        />
                        <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Add
                        </Button>
                    </div>
                </div>
            </form>
            <div >
                <h3 className="text-lg font-medium mb-4">
                    Categories
                </h3>
                {
                    categories.length === 0 ?
                    <p>No categories added. Add your first category above...</p>
                    : <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                categories.map(category => (
                                    <TableRow key={category.id}>
                                       <TableCell className="font-medium">{category.name}</TableCell>
                                       <TableCell>{new Date(category.createdAt).toLocaleString()}</TableCell>
                                       <TableCell className="font-medium">
                                        <Button onClick={()=> deleteCategory(category.id)} variant="ghost" size={"icon"}>
                                            <Trash2Icon className="h-5 w-5 text-red-500" />
                                        </Button>
                                       </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                }
            </div>
        </div>
    )
}