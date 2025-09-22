import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from './auth/AuthContext.jsx'
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <Notifications />
        <AuthProvider>
          <App />
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)
