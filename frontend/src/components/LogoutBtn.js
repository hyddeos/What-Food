import axios from 'axios';
import { BASE_URL } from '../constants';

export default function LougoutBtn(props) {

    console.log("token:",props.token)

    async function logoutUser() {
        try {
            const response = await axios.post(`${BASE_URL}/users/logout/`, {
            token:props.token
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token' + props.token,
                },
            })
            .then(response => {
                // update the list clientsided 
                props.setLoggedIn(false);
            });
        } catch (error) {
            console.error(error);
        }
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