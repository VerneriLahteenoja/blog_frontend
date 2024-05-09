import { createContext, useReducer } from 'react'

// Reducer to handle notification states
// type determines message flavor
// payload will be the notification shown
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return action.payload
    case 'ERROR':
      return action.payload
    default:
      return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, '')
  console.log(message)
  const isSuccessful = message === 'Blog added!' ? 'success' : 'error'

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {message && <div className={isSuccessful}>{message}</div>}
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
