import { useDispatch } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleFilter = (event) => {
    dispatch(filterAction(event.target.value))
  }
  const style = { marginBottom: 10 }
  return (
    <div style={style}>
      filter <input onChange={(event) => handleFilter(event)} />
    </div>
  )
}
export default Filter
