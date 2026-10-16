

const Food = ({ foods }) => {
  return (
    <div>
        <ul>
            {foods.map(food=>(<li key={food} >{food}</li>))}
        </ul>
    </div>
  )
}

export default Food