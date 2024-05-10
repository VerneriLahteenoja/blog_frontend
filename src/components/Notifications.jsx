import { createContext, useReducer } from 'react'

// Reducer to handle notification states
// type determines message flavor
// payload will be the notification shown
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return { ...action }
    case 'ERROR':
      return { ...action }
    default:
      return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, '')
  const isSuccessful = message.type === 'SUCCESS' ? 'success' : 'error'

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {message.type && <div className={isSuccessful}>{message.payload}</div>}
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
