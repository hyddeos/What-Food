import React from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import HandleDishes from './pages/HandleDishes';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const token = Cookies.get('token');

  return (
    <BrowserRouter>
      <div className=''>
          <Routes>
              <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} token={token}  />} />
              <Route path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} token={token} />} />
              <Route path="/home" element={<Home Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} token={token}  />} />
              <Route path="/dishes" element={<HandleDishes loggedIn={loggedIn} token={token}  />} /> 
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;