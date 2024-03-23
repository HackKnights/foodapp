import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import React from 'react';
import Soup from './components/Soup'; 
import FriedRice from './components/FriedRice';
import Wonton from './components/Wonton';
import Aboutus from './components/Aboutus';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/" element={<Home />} />
        <Route path="/soup" element={<Soup />} />
        <Route path="/wonton" element={<Wonton />} />
        <Route path="/fried-rice" element={<FriedRice />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
