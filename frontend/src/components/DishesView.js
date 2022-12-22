import React from 'react';

import Button from '../components/Button';
import BackButton from './BackButton';

export default function DishesView(props) {

function MyDishes() {
    return (
      <ul>
        {props.dishes.map((dish) => (
          <li key={dish.id}>{dish.name}</li>
        ))}
      </ul>
    );
  }

return (
    <div>   
        <h2>Choose Dishes</h2>
        <h4>You have selected xx of <span className='font-bold'>{props.dishes.length}</span></h4>
        {MyDishes()}
        <Button type="submit" text="Done"></Button>
        <p>Back without saving</p>
        <BackButton text="Back" loadDashboard={props.setDashboardView} loadThisView={props.setDishesView} />

    </div>
);
}
