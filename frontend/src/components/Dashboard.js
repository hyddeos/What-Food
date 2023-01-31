import React from 'react';
import ChoiceDiv from '../components/ChoiceDiv';
import Headertext from '../components/Headertext';
import Button from '../components/Button';
import axios from "axios";
import { BASE_URL } from '../constants';
import LougoutBtn from './LogoutBtn';


export default function Dashboard(props) {

let dishesCount = Object.keys(props.dishes).length;
let chosenDishesCount = Object.keys(props.chosenDishes).length;
let ingredientCount = countIngredients();
let ingredientsAtHomeCount = countIngredientsAtHome();
let shoppinglistCount = ingredientsAtHomeCount - ingredientCount;
let ingredientsInBasketCount = countIngredientsInBasket();

function countIngredients() {
    // Count all ingredients from the Dishes for preshopping list
    let counter = 0;
    props.chosenDishes.map((dish) => (
        dish.ingredients.map(ingredient => (
            counter++
        ))
    ));
    return counter
}

function countIngredientsAtHome() {
    // Get at Home-ids
    const atHomeIds = props.ingredientsAtHome.map(ingredient => ingredient.id);
    let counter = 0;
    // Get ingredients for all the choosen dishes
    props.chosenDishes.map((dish) => (
        dish.ingredients.map(ingredient => (
            atHomeIds.includes(ingredient.id) ? counter++ : null
        ))
    )); 
    return counter
}

function countIngredientsInBasket() {
    const basket = props.ingredientsInBasket.map(ingredient => ingredient.id);
    const atHomeIds = props.ingredientsAtHome.map(ingredient => ingredient.id);    
    const toShop = []
    props.chosenDishes.map((dish) => (
        dish.ingredients.map(ingredient => (
            atHomeIds.includes(ingredient.id) ? null : toShop.push(ingredient.id)
        ))
    ));
    // Compare the filterd out toShop ingreints with what is on the list and count it
    let counter = 0;
    toShop.map((id) => (
        basket.includes(id) ? counter++ : null
    ))    
    return counter
}


async function resetLists(){
    try {
        const response = await axios.post(`${BASE_URL}/users/data/shoppinglist/`, {
        reset:1,
        token:props.token
        }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token' + props.token,
            },
        })
        .then(response => {
            // Reset all clientsided varibles
            props.setChosenDishes([]);
            props.setIngredientsAtHome([]);
            props.setIngredientsInBasket([]);
        });
    } catch (error) {
        console.error(error);
    }
}


return (
    <div>   
        <Headertext  text="Dashboard"/>
        <div>
            <p className='text-center'>Hi <strong className='capitalize font-bold'>{props.username}</strong> of the <strong className='capitalize font-bold'>{props.family}</strong></p>
        </div>
        <div className='flex justify-center'>
            <button onClick={resetLists} type="submit" className="
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
                Rest lists
            </button>
            <a href='/dishes'>
                <Button text={"Edit Dishes"}/>
            </a>
        </div>
        <div className='flex flex-wrap justify-center'>
            <ChoiceDiv // CHOSEN DISHES
                // Style & Text
                title="Choose Dishes"
                text="Pick dishes to eat"
                color="bg-sec-300"
                // View-props
                loadView={props.setDishesView}
                loadDashboard={props.setDashboardView}
                // Data & props
                dishesCount={dishesCount}
                chosenDishesCount={chosenDishesCount}
            />
            <ChoiceDiv // PRESHOP CHECK
                // Style & Text
                title="Preshop Check"
                text="Check what you have at home"
                color="bg-sec-300"
                // View-props
                loadView={props.setPreshopView}
                loadDashboard={props.setDashboardView}
                // Data & props
                chosenDishes={props.chosenDishes}
                ingredientsAtHomeCount={ingredientsAtHomeCount}
                ingredientCount={ingredientCount}
            />
            <ChoiceDiv // SHOPPING LIST
                // Style & Text
                title="Shopping List"
                text="Manage the shopping list"
                color="bg-sec-300"
                // View-props
                loadView={props.setShoppinglistView}
                loadDashboard={props.setDashboardView}
                // Data & props
                ingredientsAtHomeCount={ingredientsAtHomeCount}
                ingredientCount={ingredientCount}
                ingredientsInBasketCount={ingredientsInBasketCount}
                shoppinglistCount={shoppinglistCount}
            />
        </div>
        <div className='flex justify-center'>
            <LougoutBtn token={props.token} setLoggedIn={props.setLoggedIn}/>
        </div>
    </div>
);
}