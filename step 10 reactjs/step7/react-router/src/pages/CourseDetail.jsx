import { useParams } from "react-router-dom"

const CourseDetail = () => {

  const params = useParams()

  return (
    <div> {params.id} CourseDetail</div>
  )
}

export default CourseDetail