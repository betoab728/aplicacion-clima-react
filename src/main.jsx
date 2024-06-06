import React from 'react'
import ReactDOM from 'react-dom/client'
import {ClimaApp} from './ClimaApp'
import './styles/weatherStyles.css' 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClimaApp />
  </React.StrictMode>,
)
