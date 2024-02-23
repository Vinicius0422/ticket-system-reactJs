import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth.jsx'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={2000}/>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
