import React from 'react'
import PropTypes from 'prop-types'

const Notification = React.forwardRef((props, ref) => {
  if (!props.message) return null
  return (
    <div className={props.type === 'error' ? 'error' : 'success'}>
      {props.message}
    </div>
  )
})
PropTypes.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}
Notification.displayName = 'Notification'

export default Notification
