export default function Card({user, img}){
    return (
        <div className='card'>
        <img src={img} alt="" />
        <h1>{user}</h1>
        <button>View profile</button>
       </div>
    )
} 