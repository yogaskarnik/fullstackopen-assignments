const filterReducer = (state = '', action) => {
  console.log('filterReducer state ', state)
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const filterAction = (filter) => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

export default filterReducer
