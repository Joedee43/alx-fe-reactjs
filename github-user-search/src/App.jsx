import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;