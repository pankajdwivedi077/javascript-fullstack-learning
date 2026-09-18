"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// schema
import * as z from "zod"
import { signUp } from "@/lib/auth-client"

const RegisterSchema = z.object({
  name: z.string().min(3, {error: "must be atleast 3 charcter long"}),  
  email: z.email({ error: "Please enter a valid email address" }),
  password: z.string().min(6, { error: "password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { error: "password must be at least 6 characters long" })
}).refine(data => data.password === data.confirmPassword, {
    error: "Password do not match",
    path: ["confirmPassword"]
})

type RegisterFormValues = z.infer<typeof RegisterSchema>

interface RegisterFormProps{
  onSuccess?: ()=> void
}

export default function RegisterForm({ onSuccess }: RegisterFormProps){

      const [isLoading, setIsLoading] = useState(false)
   
      // initilaze form
      const form = useForm<RegisterFormValues>({
       resolver: zodResolver(RegisterSchema),
       defaultValues: {
           name: "",
           email: "",
           password: "",
           confirmPassword: ""
       }
      })   

    async function onSubmit(formData: RegisterFormValues) {
    setIsLoading(true)
    try {
      const { error } = await signUp.email({
           name: formData.name,
           email: formData.email,
           password: formData.password
      })
      if(error){
        toast("Falied to create account")
        return
      }
      toast("account created")
      if(onSuccess){
        onSuccess()
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Create an account by filling out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="register-form-name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="register-form-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-form-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-form-confirm-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="register-form" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}