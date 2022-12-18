import React from 'react';

import { useNavigate } from "react-router-dom";


export default function Home(props) {

    // Redirect if NOT logged in
    let navigate = useNavigate();
    React.useEffect(() => {
    if (!props.loggedIn){
      return navigate("/login");
    }
    },[props.LoggedIn]);


        
    return (
        <div>
            <h1>Welcome {props.username}</h1>

        </div>
     );
}