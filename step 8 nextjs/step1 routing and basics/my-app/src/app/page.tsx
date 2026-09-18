// server component by default 
// fetch data inside a server component
// access backend resources directly
// keep senitive info in  the server side
// not to be exposed on the client side

// you can not use hooks -> not possible
// add events

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       <h1>home page at root level</h1>
    </div>
  );
}
