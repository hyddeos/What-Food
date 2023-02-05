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
      const response = await axios.get(`${BASE_URL}/api/users/`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token ' + props.token,
        },
      });
      const data = response.data;
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
  }}
  );

  // Make API-request if it has not been made already
  if (!gotData) {
    getData();
    setGotData(true);
  }

  function addDish() {
    setAddingDish(true);
  }

  function DishClick(id) {
    // Remove IF already added
    try {
      const response = axios.post(`${BASE_URL}/users/data/removedish/`, {
      token:props.token,
      dishId:id
      }, {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token' + props.token,
          },
      })
      .then(response => {
          // Reload fo update with the new dish added.
          window.location.reload(false);
      });
  } catch (error) {
      console.error(error);
  }

}

  function MyDishes() {
    // Render all dishes
    return (
    <ul className=''>
        {dishes.map((dish) => ( 
        <li className="font-semibold cursor-pointer m-1 flex ">
              <svg  onClick={() => DishClick(dish.id)} key={dish.id} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="pink" className="w-6 h-6 hover:bg-blue-50">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>                 
            <p className="mx-2 text-stroke ">{dish.name}</p>
        </li>
        ))}
    </ul>
    );
}

  return (
    <div  className='inline-block w-full '>
      <Headertext  text="Manage Dishes"/>
      <div className='flex justify-center'>
      {addingDish ?           
        <div className='max-w-xs block-inline m-auto my-4 ' >
            <AddDish token={props.token} setAddingDish={setAddingDish}/>
        </div>
      :
      <div className=''>
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
          text-stroke">
          Add Dish
        </button>
        <div className='w-80 bg-headline border-stroke border-2 rounded-lg m-auto my-2'>
          {MyDishes()}
        </div>        
        <a href='/'>
          <BackButton text="Back"  />
        </a>
      </div>
      }
      </div>
    </div>
  )


}