import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import EcomForm from './Pages/EcomForm/EcomForm'

function App() {
  return (
    <Router>
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
