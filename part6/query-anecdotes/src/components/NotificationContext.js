import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationContextProvider'
    )
  }
  return context
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log('action ', action)
      return { message: action.payload }
    case 'CLEAR_NOTIFICATION':
      return { message: '' }
    default:
      return state
  }
}

export const NotificationProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, {
    message: '',
  })
  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
