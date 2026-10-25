"use server"

import { headers } from "next/headers"

// server functions

export async function submitFormAction(formData){
    try {
        const response = await fetch(`https://dummyjson.com/users/add`, {
            method: 'POST',
            headers: {
                    "Content-Type": "application/json",
                    
                },
            body: JSON.stringify(formData)
        })
        if(!response.ok){
            throw new Error('failed to submit form')
        }
        return await response.json()
    } catch (error) {
        return {
            error: error.message,
        }
    }
}

export async function useActionStateAction(currentState,formData){
    try{
        if(!formData){
            throw new Error("form data is missing")
        }
        console.log("received formdata:", formData)
        const data = {
            email: formData.get("email") || ""
        }
        if(!data.email){
            throw new Error("email is required")
        }
            const response = await fetch(`https://dummyjson.com/users/add`, {
            method: 'POST',
            headers: {
                    "Content-Type": "application/json",
                    
                },
            body: JSON.stringify(formData)
        })
        if(!response.ok){
            throw new Error('failed to submit form')
        }
        return await response.json()
    }catch (e){

    }
}

export async function useFormStatusAction(formData){
        try{
            const response = await fetch(`https://dummyjson.com/users/add`, {
            method: 'POST',
            headers: {
                    "Content-Type": "application/json",
                    
                },
            body: JSON.stringify(formData)
        })
        if(!response.ok){
            throw new Error('failed to submit form')
        }
        return await response.json()
    }catch (e){
      return {
        error: e.message
      }
    }
}

export async function incrementCount(currentCount){
    try {
       await new Promise((resolve) => setTimeout(resolve, 1000))
       return currentCount + 1; 
    } catch (error) {
        console.error("Api error", error.message)
        throw error
    }
}