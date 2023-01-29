import React, { useState } from 'react';
import axios from "axios";

import { BASE_URL } from '../constants';

export default function AddDish(props) {

    const [addDishname, setAddDishname] = React.useState("")
    const [addIngredient, setAddIngredient] = React.useState("")
    const [addedIngredients, setAddedIngredients] = React.useState([])

    async function saveDish() {
        try {
            const response = await axios.post(`${BASE_URL}/users/data/adddish/`, {
            token:props.token,
            name:addDishname,
            ingredients:addedIngredients,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token' + props.token,
                },
            })
            .then(response => {

            });
        } catch (error) {
            console.error(error);
        }
    }
    
    function addItem(e) {
        e.preventDefault();        
        setAddedIngredients([...addedIngredients, addIngredient]);
    } 

    function listIngredients() {
        return (
            <ul>
            {addedIngredients.map((ingredient) => ( 
                <li className='font-semibold cursor-pointer m-1 flex hover:bg-blue-50' >
                    <p className='mx-1 text-stroke'>{ingredient}</p>
                </li>
            ))}
        </ul>
       )
    }

    return (
        <div>
            <div>
            <form>
                <label>
                    <p>Dish Name</p>
                    <input autoFocus type="text" placeholder='Name of the dish' value={addDishname} 
                    onChange={(e) => setAddDishname(e.target.value)} ></input>
                </label>
            </form>
                <form onSubmit={addItem}>
                    <label>
                        <p>Add ingredient </p>
                        <input autoFocus type="text" placeholder='Name of the ingredient' value={addIngredient} onChange={(e) => setAddIngredient(e.target.value)} ></input>
                        <button>Add</button>
                    </label>
                </form>
            </div>
            <div>
                {listIngredients()}
            </div>
            <button onClick={saveDish} className="
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
                    Save Dish</button>    
        </div>
    )
}   