import { useState, type ChangeEvent, type MouseEvent, type KeyboardEvent, type SubmitEvent } from "react"

export function FormExample(){

    const [name, setName] = useState('')
    const [color, setColor] = useState('red')

    function handleNameChange(event: ChangeEvent<HTMLInputElement>){
        setName(event.currentTarget.value)
        setName(event.target.value);
    }

    function handleButtonclick(e: MouseEvent<HTMLButtonElement>){
       e.preventDefault()
    }

    function handleKeydown(event: KeyboardEvent<HTMLInputElement>){
       event.key == 'Enter'
    }

    function handleFinalFormSubmit(event:SubmitEvent<HTMLFormElement>){
       event.preventDefault()
       //submit the form
    }

    function handleColorChange(event:ChangeEvent<HTMLSelectElement>){

    }

    return (
        <form onSubmit={handleFinalFormSubmit}>
            <input
            value={name}
            placeholder="enter ur name"
            onChange={handleNameChange}
            onKeyDown={handleKeydown}
            />
            <select value={color} onChange={handleColorChange}>
                <option value="red">Red</option>
            </select>
            <button type="submit" onClick={handleButtonclick} >Click</button>
        </form>
    )
}