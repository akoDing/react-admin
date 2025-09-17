import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './routers'
import AuthRouter from '@/routers/utils/authRouter'

function App() {

  return (
    <BrowserRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </BrowserRouter>
  )
}

export default App
