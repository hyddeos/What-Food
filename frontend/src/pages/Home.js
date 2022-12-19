import React from 'react';

import { useNavigate } from "react-router-dom";
import Headertext from '../components/Headertext';


const baseURL = "http://127.0.0.1:8000/users/";

export default function Home(props) {

    // Redirect if NOT logged in
    let navigate = useNavigate();
    React.useEffect(() => {
    if (!props.loggedIn){
      return navigate("/login");
    }
    },[props.LoggedIn]);

    async function getData() {
      try {



        
    return (
        <div>
          <Headertext />
          <div>
            <p>Hi <strong className='capitalize font-bold'>{props.username}</strong> of the </p>
          </div>
            

        </div>
     );
}