import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Index';
import BeerInfo from './pages/beer-info/Index';
import './App.css';

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
