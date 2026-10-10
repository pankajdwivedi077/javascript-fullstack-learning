import RightCardContent from "./RightCardContent"


const RightCard = ({user}) => {
  return (
    <div className='h-full shrink-0 overflow-hidden relative w-80 rounded-3xl'>
      <img className='h-full w-full object-cover' src={user.img} alt="" />
        <RightCardContent user={user} />
    </div>
  )
}

export default RightCard