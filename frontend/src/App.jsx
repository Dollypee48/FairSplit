import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SplitPage from './pages/SplitPage';
import History from './pages/History';
import About from './pages/About';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/split" element={<SplitPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
