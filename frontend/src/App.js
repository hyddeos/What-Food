import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <div className=''>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;