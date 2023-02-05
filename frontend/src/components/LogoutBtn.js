import axios from 'axios';
import { BASE_URL } from '../constants';
import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";



export default function LogoutBtn(props) {

    console.log("token:", props.token, props)

    function logoutUser() {
        try {
            const response = axios.post(`${BASE_URL}/users/logout/`, {
            token:props.token
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token' + props.token,
                },
            })
            .then(response => {

            });
        } catch (error) {
            console.error(error);
        }
        Cookies.remove('token');
        props.setLoggedIn(false);
        window.location.href = '/login';
    }

    


    return (
        <button onClick={logoutUser} className="
            inline-block
            m-3 
            px-2
            py-1
            bg-error
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
            text-stroke">
            Log Out
        </button>
    );
    }