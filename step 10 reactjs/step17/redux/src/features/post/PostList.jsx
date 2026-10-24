import { useSelector } from "react-redux";
import { selectPostIds, useGetPostsQuery } from "./postSlice";
import PostExcerpt from "./PostExcerpt";

const PostList = () => {

 const {
   isLoading,
   isSuccess,
   isError,
   error
 } = useGetPostsQuery() 

//  const posts = useSelector(selectAllPosts)
 const orderedPostsIds = useSelector(selectPostIds)

  let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = orderedPostsIds.map(postId => <PostExcerpt key={postId} postId={postId} /> )
    } else if (isError) {
        content = <p>{error}</p>;
    }

  return (
          <section>
         
            {content}
        </section>
  )
}

export default PostList;