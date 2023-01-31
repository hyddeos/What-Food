import React from 'react';

import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../constants';

import axios from "axios";

import Headertext from '../components/Headertext';
import AddDish from '../components/AddDish';
import BackButton from '../components/BackButton';


export default function HandleDishes(props) {

  // Start Varibles
  const [gotData, setGotData] = React.useState(false);
  const [family, setFamily] = React.useState("");
  const [dishes, setDishes] = React.useState([]);
  const [addingDish, setAddingDish] = React.useState(false);

  // Get all the data for the User
  async function getData() {
    try {
      const response = await axios.get(BASE_URL + "/api/users/", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token ' + props.token,
        },
      });
      const data = response.data;
      console.log("data", data)
      setFamily(response.data[0].get_family);
      setDishes(response.data[0].get_dishes);
    } catch (error) {
      // Handle the error
    }
  }

  // Redirect if NOT logged in
  let navigate = useNavigate();
  React.useEffect(() => {
  if (!props.token){
    return navigate("/login");
  }
  else {
    props.setLoggedIn(true);
  }
  },[props.loggedIn]);

  // Make API-request if it has not been made already
  if (!gotData) {
    getData();
    setGotData(true);
  }

  function addDish() {
    setAddingDish(true);
  }  

  return (
    <div  className='m-1 inline-block w-full'>
      <Headertext  text="Manage Dishes"/>
      TEST: {family},
      <button onClick={addDish} type="submit" className="
                inline-block
                m-3 
                px-7
                py-3
                bg-prim-300
                font-bold
                text-lX
                leading-snug
                uppercase
                rounded
                shadow-md
                hover:bg-prim-200 
                hover:shadow-lg
                focus:outline-none
                focus:ring-0
                active:shadow-lg
                transition
                duration-300
                ease-in-out
                text-stroke" 
                >
                Add Dish
            </button>
        {addingDish &&          
          <div>
            <AddDish token={props.token} setAddingDish={setAddingDish}/>
          </div>
        }
        <a href='/'>
          <BackButton text="Back"  />
        </a>
    </div>
  )


}