import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css';

createRoot(document.getElementById('root')).render(
    <App />
)
