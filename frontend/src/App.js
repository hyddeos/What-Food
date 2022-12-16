import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className='h-screen bg-blue-900'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}