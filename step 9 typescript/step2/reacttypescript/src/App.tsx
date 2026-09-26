import './App.css'
import UserCard from './components/01_RequiredOptionalProps'
import GreetA, { GreetB } from './components/02_defaultProps'
import { Panel, RequireChildrenPanel } from './components/03_childrenReactNode'
import { Button } from './components/05_ComponentProps'
import { Counter } from './components/06_state'

function App() {


  return (
    <>
     <UserCard id='1' />
     <GreetA />
     <GreetB />
     <Panel title='panel' children={ 
      <ul>
        <li>one</li>
      </ul>
      } />
      <RequireChildrenPanel title='hello' children={ <p>children</p> } />
      <RequireChildrenPanel title='bete' >somethings</RequireChildrenPanel>
      <Button variant='primary' onClick={()=>alert('clicked')} >Text</Button>
      <Counter /> 
    </>
  )
}

export default App
