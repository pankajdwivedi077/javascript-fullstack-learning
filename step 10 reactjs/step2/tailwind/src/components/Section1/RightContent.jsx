import RightCard from "./RightCard"


const RightContent = ({users}) => {
  return (
      <div id="right" className="h-full overflow-x-auto rounded-4xl p-6 w-2/3 flex flex-nowrap gap-10">
       {users.map(user => (
        <RightCard key={user.tag} user={user} />
       ))}
    </div>
  )
}

export default RightContent