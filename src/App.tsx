import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import GeneraLayout from './components/generaLayout'
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'
import Read from './pages/Read'
import LoginPage from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GeneraLayout />}>
          <Route index element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/read/:id' element={<Read />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
