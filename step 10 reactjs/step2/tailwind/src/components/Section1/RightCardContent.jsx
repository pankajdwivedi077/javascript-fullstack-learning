import { MoveRight } from 'lucide-react';

const RightCardContent = ({user}) => {
  return (
     <div className='absolute top-0 left-0  h-full w-full p-8 flex flex-col justify-between'>
        <h2 className='bg-white text-3xl font-bold rounded-full h-12 w-10 flex justify-center items-center'>1</h2>
        <div>
            <p className='text-xl leading-normal text-shadow-2xs text-white mb-10'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis magnam ratione nam blanditiis ea tempore?</p>
            <div className='flex justify-between'>
                <button className='bg-blue-600 text-white font-medium px-7 py-2 rounded-full '>{user.tag}</button>
                <button className='bg-blue-600 text-white font-medium px-4 py-2 rounded-full text-lg'> <MoveRight /></button>
            </div>
        </div>
      </div>
  )
}

export default RightCardContent