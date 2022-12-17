import React, { useState } from 'react';


import axios from "axios";

const baseURL = "http://127.0.0.1:8000/users/login/";


export default function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [response, setRespone] = React.useState(null);

    function doLogin(e) {
        e.preventDefault();
        axios
          .post(baseURL, {
            username: {username},
            password: {password}
          })
          .then((response) => {
            setRespone(response.data);
            console.log(response.data)
          });
    }


    return (
        <section className='p2'>
            <h1>test</h1>
            <div className='bg-blue-900'>
            <form onSubmit={doLogin}>
                <label>
                    <p>Username</p>
                    <input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
                </form>
                <p>This the response: {response}</p>
            </div>
        </section>

    );
  }

  