import { useReducer, type Dispatch } from "react"

type CounterState = {
    count: number;
    step: number;
}

function init(initialCount: number): CounterState{
  return {
    count: initialCount,
    step: 1
  }
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET'; to?: number }

function CounterReducer(state: CounterState, action: Action): CounterState{
  switch(action.type){
    case "INCREMENT":
        return {...state, count: state.count + state.step}
       
    case "DECREMENT":
          return {...state, count: state.count - state.step}
        
    case "RESET":
          return {...state, count: action.to?? 0}
    default:
      return state              
  }
} 

export function TypeReducer({initial=0}: {initial?:number}){

    const [state, dispaych] = useReducer(CounterReducer, initial, init)

    return <div>
      {state.count}
      <button onClick={()=>dispaych({type: "INCREMENT"})} >increase</button>
      <button onClick={()=>dispaych({type: "DECREMENT"})} >increase</button>
      <button onClick={()=>dispaych({type: "RESET", to: 2})} >increase</button>
    </div>
}

type CounterDispatch = Dispatch<Action>

function SmallChild({dispatch}: {dispatch: CounterDispatch}){
    return <div>
        <button onClick={()=>dispatch({type: "INCREMENT"})} >from child com</button>
    </div>
}