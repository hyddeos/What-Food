import React from 'react';
import ChoiceDiv from '../components/ChoiceDiv';
import Headertext from '../components/Headertext';
import Button from '../components/Button';
import PreshopView from './PreshopView';


export default function Dashboard(props) {

let dishesCount = Object.keys(props.dishes).length
let chosenDishesCount = Object.keys(props.chosenDishes).length

let ingredientCount = []
let ingredientsAtHomeCount = []
// Get the Count for the ingredientCount and ingredientsAtHomeCount,
// Only get ingredients that is being used in dishes now
const atHomeIds = props.ingredientsAtHome.map(ingredient => ingredient.id)
    props.chosenDishes.map((dish) => (
        dish.ingredients.map(ingredient => (
            ingredientCount.push(ingredient),
            atHomeIds.includes(ingredient.id) ? ingredientsAtHomeCount.push(ingredient) : null
        ))
    ));

return (
    <div>   
        <Headertext />
        <div>
            <p className='text-center'>Hi <strong className='capitalize font-bold'>{props.username}</strong> of the <strong className='capitalize font-bold'>{props.family}</strong></p>
        </div>
        <div className='flex flex-wrap justify-center'>
            <ChoiceDiv 
                title="Choose Dishes"
                text="Pick dishes to eat"
                color="bg-sec-300"
                loadView={props.setDishesView}
                loadDashboard={props.setDashboardView}
                dishesCount={dishesCount}
                chosenDishesCount={chosenDishesCount}
            />
            <ChoiceDiv 
                title="Preshop Check"
                text="Check what you have at home"
                color="bg-sec-300"
                loadView={props.setPreshopView}
                loadDashboard={props.setDashboardView}
                chosenDishes={props.chosenDishes}
                ingredientsAtHome={props.ingredientsAtHome}
                ingredientCount={ingredientCount}
            />
            <ChoiceDiv 
                title="Shopping List"
                text="Manage the shopping list"
                color="bg-sec-300"
                loadView={props.setPreshopView}
                loadDashboard={props.setDashboardView}
            />
        </div>
        <div className='flex justify-center'>
            <Button type="submit" text="Reset Lists" />
        </div>
    </div>
);
}