import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Index';
import BeerInfo from './pages/beer-info/Index';
import ErrorPage from './pages/error-page/Index';
import './App.css';
import { useState } from 'react';

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<BeerInfo setErrorMessage={setErrorMessage} />} />
        <Route path="/error" element={<ErrorPage errorMessage={errorMessage} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
