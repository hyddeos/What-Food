import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";

import axios from "axios";

const baseURL = "http://127.0.0.1:8000/users/login/";


export default function Login(props) {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [response, setResponse] = React.useState(0);
    const [loginMessage, setLoginMessage] = React.useState("");

    // Redirect if allready logged in
    let navigate = useNavigate();
    React.useEffect(() => {
    if (props.loggedIn){
    return navigate("/home");
    }
    },[props.loggedIn]);

    async function tryLogin(e) {
        e.preventDefault();
        try {
          const response = await axios.post(baseURL, {
            username: {username},
            password: {password}
          });
            if (response.data.status == 202) {
                setLoginMessage("Loggin Succesful, Loggin in...");
                props.setUsername(response.data.username);
                props.setToken(response.data.token);
                props.setLoggedIn(true);
            }
            else if (response.data.status == 400) {
                setLoginMessage("Wrong Username or Password, try again");
                setPassword("");
            }
            else {
                setLoginMessage("Unknown error.. try reload the page");
            }
        
        } catch (error) {
          console.error(error);
        }
      }  

    return (
        <section className='p2'>
            <h1>test</h1>
            <div className='bg-blue-900'>
            <form onSubmit={tryLogin}>
                <label>
                    <p>Username</p>
                    <input type="text" autoFocus value={username}  onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
                </form>
                <p>This the response: {loginMessage}</p>
            </div>
        </section>
    );
  }

  