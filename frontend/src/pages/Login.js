import Button from '../components/Button';
import Headertext from '../components/Headertext';

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
            if (response.data.status === 202) {
                setLoginMessage("Loggin Succesful, Loggin in...");
                props.setUsername(response.data.username);
                props.setToken(response.data.token);
                props.setLoggedIn(true);
                setResponse(202)
            }
            else if (response.data.status === 400) {
                setLoginMessage("Wrong Username or Password, try again");
                setPassword("");
                setResponse(400)
            }
            else {
                setLoginMessage("Unknown error.. try reload the page");
                setResponse(1)
            }
        
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
                    {response === 202 ? 
                        <p className='text-succes'>{loginMessage}</p>
                    :
                        <p className='text-error'>{loginMessage}</p>
                    }
                </form>
                
            </div>
        </section>
    );
  }

  