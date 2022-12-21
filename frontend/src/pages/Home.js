import React from 'react';

import { useNavigate } from "react-router-dom";
import Headertext from '../components/Headertext';
import axios from "axios";
import Button from '../components/Button';
import ChoiceDiv from '../components/ChoiceDiv';


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
            <p className='text-center'>Hi <strong className='capitalize font-bold'>{username}</strong> of the <strong className='capitalize font-bold'>{family}</strong></p>
          </div>
          <div className='flex flex-wrap justify-center'>
            <ChoiceDiv 
              title="Choose Dishes"
              text="Pick dishes to eat"
              color="bg-prim-300"
            />
            <ChoiceDiv 
              title="Preshop Check"
              text="Check what you have at home"
              color="bg-sec-300"
            />
            <ChoiceDiv 
              title="Shopping List"
              text="Manage the shopping list"
              color="bg-prim-300"
            />
          </div>
          <div className='flex justify-center my-2'>
            <Button type="submit" text="Reset Lists" />
          </div>

        </div>
     );
}