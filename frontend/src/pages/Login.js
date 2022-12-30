import Button from '../components/Button';
import Headertext from '../components/Headertext';

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';


const baseURL = "http://127.0.0.1:8000/auth-token/";


export default function Login(props) {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [response, setResponse] = React.useState(0);
    const [loginMessage, setLoginMessage] = React.useState("");

    // Redirect if allready logged in
    let navigate = useNavigate();
    React.useEffect(() => {
    if (props.token){
    return navigate("/home");
    }
    },[props.loggedIn]);

    // Try to Login
    async function tryLogin(e) {
        e.preventDefault();
        try {
          const response = await axios.post(baseURL, {
            username:username,
            password:password
          }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
          })
          .then(response => {
            if (response.data.token) {
                setLoginMessage("Loggin Succesful, Loggin in...");
                const jwt = response.data.token;
                Cookies.set('token', jwt, { expires: 7 });
                props.setLoggedIn(true);
                setResponse(200)
            }
            else {
                setLoginMessage("Wrong Username or Password, try again");
                setPassword("");
                setResponse(400)
            }
          });        
        } catch (error) {
          console.error(error);
        }
      }  

    return (
        <section className='p2 flex justify-center bg-blue-900'>            
            <div className='m-10'>
                <Headertext />
                <form onSubmit={tryLogin} className="my-6 text-center">
                    <h4 className='my-2 text-headline font-bold'>Be Kind To Login First</h4>
                    <label>
                        <p className=''>Username</p>
                        <input type="text" placeholder="Your username" autoFocus value={username}  onChange={(e) => setUsername(e.target.value)} 
                        className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border-4 border-solid border-blue-100
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-prim-300 focus:outline-none" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border-4 border-solid border-blue-100
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-prim-300 focus:outline-none" />
                    </label>
                    <div>
                        <Button type="submit" text="Login" /> 
                    </div>
                    {response === 200 ? 
                        <p className='text-succes'>{loginMessage}</p>
                    :
                        <p className='text-error'>{loginMessage}</p>
                    }
                </form>
                
            </div>
        </section>
    );
  }

  