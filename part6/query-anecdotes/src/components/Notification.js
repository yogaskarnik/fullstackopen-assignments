import { useNotification } from './NotificationContext'

const Notification = () => {
  const [notification, dispatchNotification] = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!notification) return null

  setTimeout(() => {
    dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
  }, 5000)

  return <div style={style}>{notification.message}</div>
}

export default Notification
