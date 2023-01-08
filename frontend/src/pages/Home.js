import React from 'react';

import { useNavigate } from "react-router-dom";

import axios from "axios";

import Dashboard from '../components/Dashboard';
import DishesView from '../components/DishesView';
import PreshopView from '../components/PreshopView';


export default function Home(props) {

  // Const
  const baseURL = `http://127.0.0.1:8000/api/users/`;
  // Varibles & Data
  const [username, setUsername] = React.useState("");
  const [family, setFamily] = React.useState("");
  const [dishes, setDishes] = React.useState([]);
  const [chosenDishes, setChosenDishes] = React.useState([]);
  const [gotData, setGotData] = React.useState(false);
  const [ingredientsAtHome, setIngredientsAtHome] = React.useState([]);
  // Views
  const [dashboardView, setDashboardView] = React.useState(false);
  const [dishesView, setDishesView] = React.useState(false);
  const [preshopView, setPreshopView] = React.useState(false);
  const [shoppinView, setshoppingView] = React.useState(false);

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
      setUsername(response.data[0].username);
      setFamily(response.data[0].get_family);
      setDishes(response.data[0].get_dishes);
      setChosenDishes(response.data[0].get_chosen_dishes);
      console.log("Res", response.data)
    } catch (error) {
      // Handle the error
    }
  }

  // When logged in get the data(if not allready data is gathered)
  if (props.loggedIn && !gotData) {
    getData()
    setGotData(true)
    setDashboardView(true)
  }
    
    
  return (
      <div>
        {dashboardView ? 
          <Dashboard
            //User & info props
            family={family} 
            username={username}
            //List props
            dishes={dishes}
            chosenDishes={chosenDishes}
            //View props
            setDashboardView={setDashboardView}
            setDishesView={setDishesView}
            setPreshopView={setPreshopView}
          /> : "" }
        {dishesView ? 
          <DishesView
            //User & info props
            token={props.token}
            //List props
            dishes={dishes}
            chosenDishes={chosenDishes}
            setChosenDishes={setChosenDishes}
            //View props
            setDashboardView={setDashboardView}
            setDishesView={setDishesView}
          /> : "" }
        {preshopView ?
          <PreshopView
            //User & info props
            token={props.token}
            //List props
            chosenDishes={chosenDishes}
            ingredientsAtHome={ingredientsAtHome}
            setIngredientsAtHome={setIngredientsAtHome}
            //View props
            setDashboardView={setDashboardView}
            setPreshopView={setPreshopView}
          /> : "" }
      </div>
    );
}