import React from 'react';
import ChoiceDiv from '../components/ChoiceDiv';
import Headertext from '../components/Headertext';
import Button from '../components/Button';



export default function Dashboard(props) {

let dishesCount = Object.keys(props.dishes).length
let chosenDishesCount = Object.keys(props.chosenDishes).length

let ingredientCount = []
let ingredientsAtHomeCount = []
// Get the Count for the ingredientCount and add it into ingredientsAtHomeCount,
const atHomeIds = props.ingredientsAtHome.map(ingredient => ingredient.id)
console.log("athomIds", atHomeIds)
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
            <ChoiceDiv // CHOSEN DISHES
                // Style & Text
                title="Choose Dishes"
                text="Pick dishes to eat"
                color="bg-sec-300"
                // Data & props
                name="dishes"
                loadView={props.setDishesView}
                loadDashboard={props.setDashboardView}
                dishesCount={dishesCount}
                chosenDishesCount={chosenDishesCount}
            />
            <ChoiceDiv // PRESHOP CHECK
                // Style & Text
                title="Preshop Check"
                text="Check what you have at home"
                color="bg-sec-300"
                // Data & props
                name="preshop"
                loadView={props.setPreshopView}
                loadDashboard={props.setDashboardView}
                chosenDishes={props.chosenDishes}
                ingredientsAtHome={props.ingredientsAtHome}
                ingredientCount={ingredientCount}
            />
            <ChoiceDiv // SHOPPING LIST
                // Style & Text
                title="Shopping List"
                text="Manage the shopping list"
                color="bg-sec-300"
                // Data & props
                name="shoppinglist"
                loadView={props.setShoppinglistView}
                loadDashboard={props.setDashboardView}
            />
        </div>
        <div className='flex justify-center'>
            <Button type="submit" text="Reset Lists" />
        </div>
    </div>
);
}