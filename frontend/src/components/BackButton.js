
export default function BackButton(props) {

function changeView(){
    props.loadThisView(false);
    props.loadDashboard(true);
}  

return (
    <button onClick={changeView} className="
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
        text-stroke" 
        type={props.type}>
        {props.text}
    </button>
);
}