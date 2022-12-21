
export default function ChoiceDiv(props) {

return (
    <>
        <button className={`
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
                <h3 className="text-stroke text-center align-middle underline underline-offset-4">{props.title}</h3>
                <p className="text-blue-100 capitalize text-center align-middle font-thin">{props.text}</p>
        </button>
    </>
);
}