import React from 'react';

import axios from "axios";

import BackButton from './BackButton';

const baseURL = "http://127.0.0.1:8000/users/data/shoppinglist/";

export default function ShoppinglistView(props) {

    const [selected, setSelected] = React.useState([])
    const [loadedPrev, setLoadedPrev] = React.useState(false)

    return (
        <div className='m-1 inline-block w-full text-center'>   
            List
        </div>
    );
}