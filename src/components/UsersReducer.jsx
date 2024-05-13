import { createContext, useReducer } from 'react'

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload
    default:
      return state
  }
}

const UsersContext = createContext()

export const UsersContextProvider = (props) => {
  const [users, usersDispatch] = useReducer(usersReducer, [])

  return (
    <UsersContext.Provider value={[users, usersDispatch]}>
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersContext
