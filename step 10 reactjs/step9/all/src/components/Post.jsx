import React from "react";

const Post = React.memo(({value})=>{

  console.log('post')  

  return (
    <div>
        <h1>Your name is {value.name} and age is {value.age}</h1>
    </div>
  )

})

export default Post;