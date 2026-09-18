import { Suspense, use } from "react";
// import { useState } from "react";


interface User{
    id: number;
    firstName: string;
    lastName: string;
}

interface UsersResponse{
    users: User[]
}

function getUsers(): Promise<UsersResponse>{
    return fetch('https://dummyjson.com/users').then(res => res.json())
}

export default function UseHookExample(){

    const usersPromise = getUsers()
    // Only run these instructions the very first time this component appears on the screen. If you re-render later, completely ignore this function."
    // const [usersPromise] = useState(() => getUsers());

    return (
        <div>
            <h1>Use hook example</h1>
            <Suspense
            fallback={<div>Loading...</div>}
            >
            <UsersList usersPromise={usersPromise} />
            </Suspense>
        </div>
    )
}

function UsersList({usersPromise}:{usersPromise: Promise<UsersResponse>}){
    const getUsersList = use(usersPromise)
  return(
    <div>
        {getUsersList.users.map(user => (
            <div key={user.id}>
                <p>{user.firstName} - {user.lastName}</p>
            </div>
        ))}
    </div>
  )
}