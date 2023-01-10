export default function ChoiceDiv(props) {
    console.log("load", props) 
    function changeView(){      
        props.loadView(true);
        console.log("load", props)
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
        {props.dishesCount ? 
            <h4 className="text-stroke">{props.chosenDishesCount}/{props.dishesCount}</h4>
        : null }
        {props.ingredientsAtHome ? 
            <h4 className="text-stroke">{props.ingredientsAtHome.length}/{props.ingredientCount.length}</h4>
        : null }
    </button>
);
}