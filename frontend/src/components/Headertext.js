export default function Headertext(props) {

    return (
        <div>
            <h1 className='text-center font-extrabold'>WhatFood!?</h1>
            <h3 className='text-center'>{props.text}</h3>
        </div>

    );
    }