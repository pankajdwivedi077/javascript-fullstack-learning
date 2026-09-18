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
import { signIn } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.email({ error: "Please enter a valid email address" }),
  password: z.string().min(6, { error: "password must be at least 6 characters long" })
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm(){

  const router = useRouter()

   const [isLoading, setIsLoading] = useState(false)

   // initilaze form
   const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
        email: "",
        password: ""
    }
   })

    async function onSubmit(formData: LoginFormValues) {
    setIsLoading(true)
    try {
      const { data, error } = await signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: false
      })
      if(error){
        toast("login falied")
        return;
      }
      toast("login success")
      router.push("/")
    } catch (err) {
      toast.error("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

   return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-form-email"
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
                  <FieldLabel htmlFor="login-form-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="login-form-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="current-password"
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
          <Button type="submit" form="login-form" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}