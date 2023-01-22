import React from 'react';

import axios from "axios";

import BackButton from './BackButton';
import SavedNotifier from './SavedNotifier';

const baseURL = "http://127.0.0.1:8000/users/data/shoppinglist/";

export default function ShoppinglistView(props) {

    const [selected, setSelected] = React.useState([]);
    const [loadedPrev, setLoadedPrev] = React.useState(false);
    const [ingredients, setIngredients] = React.useState([]);
    const [saved, setSaved] = React.useState(false)
    console.log("list", props)
    console.log("sel", selected)

    async function SaveList() {
        try {
            const response = await axios.post(baseURL, {
            ingredients_added:selected,
            token:props.token
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token' + props.token,
                },
            })
            .then(response => {
                // update the list clientsided 
                UpdateShoppinglist();
                setSaved(true);
            });
        } catch (error) {
            console.error(error);
        }
    }

    function UpdateShoppinglist(){
        // Update the choosen dishes at the clientside. The POST request is already saved
        // For jumping in and out of components with out refreshing and making new Post-reqs
        let temp = []
        ingredients.map((ingredient) => {
            if (selected.includes(ingredient.id)) {
                temp = [...temp, ingredient];
            }
        });
        props.setIngredientsInBasket(temp);
    }

    function filterShoppinglist() {
        // Filters out what already is at home.
        const atHomeIds = props.ingredientsAtHome.map(ingredient => ingredient.id)
        let temp = []
        props.chosenDishes.map((dish) => (
            dish.ingredients.map(ingredient => (
                atHomeIds.includes(ingredient.id) ? null : temp.push(ingredient)
                ))
        ));
        setIngredients(temp);
    }

    function ingredientsClick(id) {
        // Remove IF already added
        if (selected.includes(id)) {
            const removeId = selected.filter(number => number !== id);
            setSelected(removeId);
        }
        // Else Add to selected
        else {
            setSelected([...selected, id]);
        }
    }

    function MyShoppinglist() {
        // First time load already picked items.
        // Exclude the ingredients that is already at home.        
        if (!loadedPrev) {
            filterShoppinglist() // Filters out what already is at home.
            const atHomeIds = props.ingredientsAtHome.map(ingredient => ingredient.id)
            console.log("at homes", atHomeIds)
            let temp = []
            props.chosenDishes.map((dish) => (
                dish.ingredients.map(ingredient => (
                    atHomeIds.includes(ingredient.id) ? null : temp.push(ingredient.id)
                    ))
            ));
            setSelected(temp);
            setLoadedPrev(true);
        }
        // Render all dishes
        return (
            <ul className=''>
                {ingredients.map((dish) => ( 
                <li className='font-semibold cursor-pointer m-1 flex hover:bg-blue-50' 
                    onClick={() => ingredientsClick(dish.id)} key={dish.id}>
                    {selected.includes(dish.id) ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>                  
                    :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="pink" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        }
                    <p className='mx-1 text-stroke'>{dish.name}</p>
                </li>
                ))}
            </ul>
            );
        }

    return (
        <div className='m-1 inline-block w-full text-center'>   
            <h2 className='font-bold'>Shoppinglist</h2>
            <p className='my-2'>Find them and buy them!</p>
            <div className='w-80 bg-headline border-stroke border-2 rounded-lg m-auto my-2'>
                {MyShoppinglist()}
            </div>
            <h4 className='text-center'>You have found <span className='font-bold'>{selected.length}</span> items</h4>
            <div className='justify-center m-auto'>
                <button onClick={SaveList} className="
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
                    text-stroke" >
                    Save</button>    
                <BackButton text="Back" loadDashboard={props.setDashboardView} loadThisView={props.setShoppinglistView} />
            </div>
            <SavedNotifier text="Saved!" saved={saved} setSaved={setSaved} />
        </div>
    );
}