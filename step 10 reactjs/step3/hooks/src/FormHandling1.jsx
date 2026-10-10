const FormHandling1 = () => {

  const submitHandler = (e)=>{
    e.preventDefault()
    console.log('submit')
    
  }  

  return (
    <div>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <input type="text" placeholder="Enter your name" />
            <button>Submit</button>
        </form>
    </div>
  )
}

export default FormHandling1