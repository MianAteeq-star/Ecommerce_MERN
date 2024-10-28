import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import store from './redux/app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>

    <App />
    </Provider>
    </BrowserRouter>
    <ToastContainer/>
  </StrictMode>,
)