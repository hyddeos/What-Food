
export default function Button(props) {

return (
    <button className="
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
        text-stroke" 
        type={props.type}>
        {props.text}
    </button>
);
}