import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import { NotificationContextProvider } from './components/Notifications'
import './index.css'
import { UserContextProvider } from './components/UserReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import { UsersContextProvider } from './components/UsersReducer'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <UsersContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </UsersContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Router>
)
