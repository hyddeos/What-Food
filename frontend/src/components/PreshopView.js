import React from 'react';

import axios from "axios";

import Button from '../components/Button';
import BackButton from './BackButton';


export default function PreshopView(props) {

    console.log("inside Preshop", props)

    return (
        <div className='m-1 inline-block w-full text-center'>   
            <h2 className='font-bold'>Preshop</h2>
            <p className='my-2'>Check what you have at home<span className='font-bold'></span> dishes</p>
            <div className='w-80 bg-headline border-stroke border-2 rounded-lg m-auto my-2'>
                
            </div>
            <h4 className='text-center'>You have selected <span className='font-bold'></span> dishes.</h4>
            <div className='justify-center m-auto'>
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
                    text-stroke" >
                    Save</button>    
                <BackButton text="Back" loadDashboard={props.setDashboardView} loadThisView={props.setPreshopView} />
            </div>
        </div>
    );
}