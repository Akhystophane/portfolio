import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LandingPage from './Pages/LandingPage/LandingPage'
import EcomForm from './Pages/EcomForm/EcomForm'

function RedirectHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    // Handle redirect from 404.html
    const redirectPath = sessionStorage.getItem('redirectPath')
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath')
      navigate(redirectPath, { replace: true })
    }
  }, [navigate])

  return null
}

function App() {
  return (
    <Router>
      <RedirectHandler />
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ecom-form" element={<EcomForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
