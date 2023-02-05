import React, { useState } from 'react';
import axios from "axios";

import BackButton from './BackButton';

import { BASE_URL } from '../constants';

export default function AddDish(props) {

    const [addDishname, setAddDishname] = React.useState("")
    const [addIngredient, setAddIngredient] = React.useState("")
    const [addedIngredients, setAddedIngredients] = React.useState([])
    const [errorInfo, setErrorInfo] = React.useState("")

    async function saveDish() {
        // Check so there is a dish name and at least one ingredient
        if (addedIngredients.length && addDishname) {
            // Remove Error-msg if there is one
            setErrorInfo("")
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
                    // Reload fo update with the new dish added.
                    window.location.reload(false);
                });
            } catch (error) {
                console.error(error);
            }
        }
        else {
            setErrorInfo("Oops!, The dish needs a name and at least one ingredent")
        }

    }
    
    function addItem(e) {
        // Prevent reload 
        e.preventDefault();

        if (addIngredient.length > 0){
            setAddedIngredients([...addedIngredients, addIngredient]);
            setAddIngredient("");
        }           
    }

    const removeItem = (index) => {
        setAddedIngredients(prevIngredients => {
          return prevIngredients.filter((ingredient, i) => i !== index);
        });
      };


    function listIngredients() {
        return (
            <ul>
                {addedIngredients.map((ingredient, index) => ( 
                    <li key={index}  onClick={() => removeItem(index)}
                        className="hover:after:content-['\00a0\00a0Remove'] hover:text-error font-semibold cursor-pointer m-1 flex hover:bg-blue-50 " >
                        <p className="mx-1 text-stroke">{ingredient}</p>
                    </li>
                ))}
            </ul>
       )
    }

    function closeAddDish() {
        props.setAddingDish(false);
    }

    return (
        <div className='m-auto inline-block w-full text-left bg-blue-100 rounded-md p-2'>
            <div>
                <h4 className='font-bold text-stroke mx-1'>Add a New Dish</h4>
            <form>
                <label>
                    <p className='text-stroke mx-1'>Dish Name</p>
                    <input autoFocus type="text" placeholder='Name of the dish' value={addDishname} 
                    onChange={(e) => setAddDishname(e.target.value)} 
                    className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border-4 border-solid border-blue-100
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-prim-300 focus:outline-none" /> 
                </label>
            </form>
                <form onSubmit={addItem}>
                    <label>
                        <p className='text-stroke mx-1'>Add ingredient </p>
                        <div className='flex'>
                        <input autoFocus type="text" placeholder='Name of the ingredient' value={addIngredient} onChange={(e) => setAddIngredient(e.target.value)} 
                            className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border-4 border-solid border-blue-100
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-prim-300 focus:outline-none" />
                        {addIngredient && <button className='                
                            inline-block
                            w-full
                            m-1
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
                            text-stroke"'>
                            Add</button>} 
                        </div>


                    </label>
                </form>
            </div>
            <div>
                <p className='text-left text-stroke mx-1'>Ingredients added</p>
                {listIngredients()}
            </div>
            {errorInfo && <p className='text-error'>{errorInfo}</p>}
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
                <button onClick={closeAddDish} className="
                    inline-block
                    m-3 
                    px-7
                    py-1
                    bg-sec-300
                    font-bold
                    text-lX
                    leading-snug
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-sec-200 
                    hover:shadow-lg
                    focus:outline-none
                    focus:ring-0
                    active:shadow-lg
                    transition
                    duration-300
                    ease-in-out
                    text-stroke" >
                    Close
                </button>
        </div>
    )
}   