import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SplitPage from './pages/SplitPage'
import History from './pages/History'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/split" element={<SplitPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  )
}
