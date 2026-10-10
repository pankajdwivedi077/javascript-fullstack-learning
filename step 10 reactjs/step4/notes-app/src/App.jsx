import { NotebookPen } from 'lucide-react';
import { useState } from 'react';
import { X } from 'lucide-react';

function App() {

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const [task, setTask] = useState([]);

    const submitHandler = (e)=>{

    e.preventDefault()
   
    const copyTask = [...task];

    copyTask.push({title,detail});

    setTask(copyTask)

    setTitle('')
    setDetail('')
  }

  const deleteNote = (idx)=>{
      const copyTask = [...task]
      copyTask.splice(idx,1)
      setTask(copyTask)
  }

  return (
    
   <div className="h-screen lg:flex bg-black text-white ">
  
    <form onSubmit={(e)=>{
      submitHandler(e)
    }} className="flex gap-4 lg:w-1/2 flex-col items-start p-10">
        <h1 className='text-2xl font-bold'>Add Notes</h1>
      <input 
      type="text" 
      placeholder="Enter Notes Heading" 
      className="px-5 w-full font-medium py-2 border-2 outline-none rounded"
      value={title}
      onChange={(e)=>{
         setTitle(e.target.value)
      }}
      />
     <textarea
     type="text"
     placeholder="Enter Details" 
     className="px-5 w-full font-medium  h-32 py-2 flex items-start flex-row border-2 outline-none rounded"
     value={detail}
     onChange={(e)=>{
      setDetail(e.target.value)
     }}
      /> 
      <button className="bg-white w-full font-medium text-black outline-none px-5 py-2 rounded active:bg-gray-300">Add Note</button>
  
         {/* <NotebookPen className='size-30' /> */}
    </form>

    <div className=' lg:w-1/2 lg:border-l-2 p-10'>
       <h1 className='text-2xl font-bold'>Recent Notes</h1>
      <div className='flex flex-wrap items-start justify-start gap-5 mt-5 h-[90%] overflow-auto'>
       
       {task.map((t,idx)=>(
         <div key={idx} className='flex justify-between flex-col items-start relative h-52 w-40 rounded-2xl text-black p-4 bg-white'>
         <div>
           <h3 className='leading-tight text-xl font-bold'>{t.title}</h3>
          <p className='mt-4 leading-tight font-medium text-gray-500'>{t.detail}</p>
         </div>
         <button onClick={()=>{
          deleteNote(idx)
         }} className='w-full bg-red-400 cursor-pointer text-white text-xs rounded font-bold'>delete</button>
         </div>
       ))}
      
      </div>
    </div>
    
   </div>
 
  )
}

export default App
