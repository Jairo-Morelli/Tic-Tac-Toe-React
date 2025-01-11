//React 
import { StrictMode } from 'react'
//React's library to talk to web browsers (React DOM) 
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
