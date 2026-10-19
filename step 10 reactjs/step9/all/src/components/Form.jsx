import { useForm } from "react-hook-form"

const Form = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  function submitForm(data){
   console.log(data)
  }

  return (
    <div>
        <form onSubmit={handleSubmit(submitForm)}>
        <div>
       <label htmlFor="first">Name:</label>
        <input type="email" id="first" {...register('name', { required: "Name can't be empty" })} />
        {errors.name &&  <span>{errors.name.message}</span> }
        </div>
        <div>
       <label htmlFor="second">Age:</label>
        <input type="number" id="second" {...register('age', {
            min: {
                value: 10,
                message: "Minimum age should be 10"
            },
            max:{
                 value: 80,
                message: "Maximum age should be 10"
            }
        })} />
        {errors.age && <span>{errors.age.message}</span> }
        </div>
        <div>
       <label htmlFor="third">Password:</label>
        <input type="password" id="third" {...register('password', {
            minLength: {
                value: 5, message: "minimum length of password should be 5"
            }
        })} />
            {errors.password && <span>{errors.password.message}</span> }
        </div>
        <button>Submit</button>
        </form>
    </div>
  )
}

export default Form