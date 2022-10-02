import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
axios.defaults.withCredentials = true;
import App from './App'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
