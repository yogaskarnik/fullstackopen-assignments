const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { good: state.good + 1, ok: 0, bad: 0 }
    case 'OK':
      return { good: 0, ok: state.ok + 1, bad: 0 }
    case 'BAD':
      return { good: 0, ok: 0, bad: state.bad + 1 }
    case 'ZERO':
      return { good: 0, ok: 0, bad: 0 }
    default:
      return state
  }
}

export default counterReducer
