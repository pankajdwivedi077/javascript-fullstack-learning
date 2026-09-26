import { useState } from "react"

export function Counter(){

    const [count, setCount] = useState(0) // ts infer as number 

    return <div>
       {count}
    </div>
}

// idle , loading, success, error 

type LoadState = | {status: 'idle'} | {status: 'loading'} | {status: 'success'; data: string} | {status: 'error'; message: string}

function heavyDefault(): number{
    return 100
}

type User = {
    name: string;
}

export function LoaderDemo(){

    const [state, setState] = useState<LoadState>({status: 'idle'})
    const [n, setN] = useState<number>(()=> heavyDefault())

    const [user, setUser] = useState<User | null>(null) // not take null directly

    async function fetchData(){
        setState({status: 'loading'})
        // mock api call
        setState({status: 'success', data: 'feched'})
        //catch
        setState({status: 'error', message: 'error'})
    }

    return <div>Loader</div>
}

