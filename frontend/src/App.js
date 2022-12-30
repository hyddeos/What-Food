import React, { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const token = Cookies.get('token');

  console.log("ct", token)
  if (token) {
    // The token cookie exists, so the user is logged in.
    console.log("user has token")
  } else {
    // The token cookie does not exist, so the user is not logged in.
    console.log("user has not token")
  }


  return (
    <BrowserRouter>
      <div className=''>
          <Routes>
              <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} token={token}  />} />
              <Route path="/" element={<Home loggedIn={loggedIn}  setLoggedIn={setLoggedIn} token={token} />} />
              <Route path="/home" element={<Home Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} token={token}  />} /> 
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;