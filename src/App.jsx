import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Index';
import './App.css';
import BeerInfo from './pages/beer-info/Index';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<BeerInfo />} />
      </Routes>
    </div>
  );
}

export default App;
