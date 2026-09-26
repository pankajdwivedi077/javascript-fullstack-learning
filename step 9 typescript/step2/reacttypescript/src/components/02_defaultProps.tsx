type GreetProps = {
    name?: string;
    shout?: boolean;
}

// shape your data
export default function GreetA({name = 'Guest', shout= false}: GreetProps){
  const text = shout ? name.toUpperCase() : name;
  return (
    <p>h1{text}</p>
  )
}

export function GreetB(props: GreetProps){
    const name = props.name ?? 'Guest'
    const shout = props.shout ?? false
     const text = shout ? name.toUpperCase() : name;
      return (
    <p>h1{text}</p>
  )
}