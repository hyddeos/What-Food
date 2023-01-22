export default function ChoiceDiv(props) {

    function changeView(){      
        props.loadView(true);
        props.loadDashboard(false)
    }

return (
    <button onClick={changeView} className={`
        flex flex-col justify-center items-center
        m-3
        w-80
        h-24
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
        border-2
        relative
        ${props.color}
    `}> 
        <h3 className="text-stroke text-center align-middle">{props.title}</h3>
        <p className="text-blue-100 capitalize text-center align-middle font-thin">{props.text}</p>
        {props.title == "Choose Dishes" && 
            <h4 className="text-stroke">{props.chosenDishesCount}/{props.dishesCount}</h4>
        }
        {props.title == "Preshop Check" &&
            <h4 className="text-stroke">{props.ingredientsAtHomeCount}/{props.ingredientCount}</h4>
        }
        {props.title == "Shopping List" && 
            <h4 className="text-stroke">{props.ingredientsInBasketCount}/{props.ingredientCount - props.ingredientsAtHomeCount}</h4>
        }
    </button>
);
}