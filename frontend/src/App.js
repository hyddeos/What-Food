import React, { useState } from 'react';
import { Redirect } from 'react-router';

import Home from './pages/Home';
import Login from './pages/Login';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {

  const [token, setToken] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState("");

  return (
    <BrowserRouter>
      <div className=''>
          <Routes>
              <Route path="/login" element={<Login setUsername={setUsername} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setToken={setToken} />} />
              <Route path="/" element={<Home loggedIn={loggedIn}  username={username} />} />
              <Route path="/home" element={<Home Home loggedIn={loggedIn} username={username} token={token}/>} /> 
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;