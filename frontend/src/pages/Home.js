import React from 'react';

import { useNavigate } from "react-router-dom";

import axios from "axios";

import Dashboard from '../components/Dashboard';
import DishesView from '../components/DishesView';


export default function Home(props) {

  // Const
  const baseURL = `http://127.0.0.1:8000/api/users/`;
  // Varibles & Data
  const [username, setUsername] = React.useState("");
  const [family, setFamily] = React.useState("");
  const [dishes, setDishes] = React.useState("");
  const [gotData, setGotData] = React.useState(false);
  // Views
  const [dashboardView, setDashboardView] = React.useState(false);
  const [dishesView, setDishesView] = React.useState(false);
  const [PreshopView, setPreshopView] = React.useState(false);
  const [shoppinView, setshoppingView] = React.useState(false);
 
  console.log("Home, token:", props.token, "loggedin?", props.LoggedIn)
  // Redirect if NOT logged in
  let navigate = useNavigate();
  React.useEffect(() => {
  if (!props.token){
    return navigate("/login");
  }
  else {
    props.setLoggedIn(true);
    console.log("home, logged change to True");
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
            family={family} 
            username={username} 
            dishes={dishes}
            setDashboardView={setDashboardView}
            setDishesView={setDishesView}
          /> : "" }
        {dishesView ? 
          <DishesView
            username={username} 
            dishes={dishes}
            setDashboardView={setDashboardView}
            setDishesView={setDishesView}
          /> : "" }
      </div>
    );
}