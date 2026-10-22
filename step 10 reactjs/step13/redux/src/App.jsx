import Counter from "./features/counter/Counter"
import PostList  from "./features/post/PostList"
import AddPostForm from "./features/post/AddPostForm"

function App() {
  
  

  return (
    <main className="App">
      {/* <Counter /> */}
      <PostList />
      <AddPostForm />
    </main>
  )
}

export default App
