import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    name: z.string().min(3, "minimum length should be 3").max(20),
    age: z.coerce.number().min(10).max(80),
    password: z.string().min(5),
    confirm: z.string(),
    email: z.email("email is invalid")
}).refine((data)=> data.password === data.confirm, {
    message: 'password does not match',
    path: ["confirm"]
})

const ZodForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(formSchema)})

  function submitForm(data){
   console.log(data)
  }

  return (
    <div>
        <form onSubmit={handleSubmit(submitForm)}>
        <div>
       <label htmlFor="first">Name:</label>
        <input type="text" id="first" {...register('name')} />
        {errors.name &&  <span>{errors.name.message}</span> }
        </div>
        <div>
       <label htmlFor="second">Age:</label>
        <input type="number" id="second" {...register('age')} />
        {errors.age && <span>{errors.age.message}</span> }
        </div>
        <div>
       <label htmlFor="third">Password:</label>
        <input type="password" id="third" {...register('password')} />
            {errors.password && <span>{errors.password.message}</span> }
        </div>
        <div>
       <label htmlFor="fifth">Confirm password:</label>
        <input type="password" id="fifth" {...register('confirm')} />
            {errors.confirm && <span>{errors.confirm.message}</span> }
        </div>
           <div>
       <label htmlFor="fourth">Email:</label>
        <input type="email" id="fourth" {...register('email')} />
        {errors.email &&  <span>{errors.email.message}</span> }
        </div>
        <button>Submit</button>
        </form>
    </div>
  )
}

export default ZodForm