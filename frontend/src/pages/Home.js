import React from 'react';

import { useNavigate } from "react-router-dom";
import Headertext from '../components/Headertext';
import axios from "axios";


export default function Home(props) {

  const baseURL = `http://127.0.0.1:8000/api/users/`;

  const [username, setUsername] = React.useState("");
  const [family, setFamily] = React.useState("");


  // Redirect if NOT logged in
  let navigate = useNavigate();
  React.useEffect(() => {
  if (!props.loggedIn){
    return navigate("/login");
  }
  },[props.LoggedIn]);

    
  // Get all the data for the User
async function getData() {
  try {
    const response = await axios.get(baseURL, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token ' + props.token,
      },
    });
    // Do something with the data from the protected endpoint
    const data = response.data;
    setUsername(response.data[0].username)
    setFamily(response.data[0].get_family)
    console.log("Res", response.data)
  } catch (error) {
    // Handle the error
  }
}
  
  if (props.loggedIn) {
    getData()
  }


        
    return (
        <div>
          <Headertext />
          <div>
            <p>Hi <strong className='capitalize font-bold'>{username}</strong> of the <strong className='capitalize font-bold'>{family}</strong></p>
          </div>
            

        </div>
     );
}