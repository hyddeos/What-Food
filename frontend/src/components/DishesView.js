import React from 'react';

import Button from '../components/Button';
import BackButton from './BackButton';

export default function DishesView(props) {

    const [selected, setSelected] = React.useState([])
    
    function SaveDishes() {
        console.log("too python");
        const hej = "hej"
    }

    function DishClick(id) {
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

    function MyDishes() {
        return (
        <ul className=''>
            {props.dishes.map((dish) => (
            <li className='font-semibold cursor-pointer m-1 flex hover:bg-blue-50' 
                onClick={() => DishClick(dish.id)} key={dish.id}>
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
            <h2 className='font-bold'>Choose Dishes</h2>
            <p className='my-2'>Choose from all your <span className='font-bold'>{props.dishes.length}</span> dishes</p>
            <div className='w-80 bg-headline border-stroke border-2 rounded-lg m-auto my-2'>
                {MyDishes()}
            </div>
            <h4 className='text-center'>You have selected <span className='font-bold'>{selected.length}</span> dishes.</h4>
            <div className='justify-center m-auto'>                
                <Button onClick={SaveDishes} text="Save" />              
                <BackButton text="Back" loadDashboard={props.setDashboardView} loadThisView={props.setDishesView} />
            </div>



        </div>
    );
}
