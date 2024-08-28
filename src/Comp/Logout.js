import React from "react";
import { useNavigate ,Link} from "react-router-dom";
import './CombinedComponent.css'

function Logout(){
    const navigate=useNavigate();

    const auth=localStorage.getItem('user');

    function LogOut(){
        localStorage.clear();
        navigate('/login');


    }
    return(
        <>
    

{auth ? (
    <ul class="logout-container">
    <li><button onClick={LogOut}>LogOut</button></li>
</ul>
):
(
   <>
   
    </>
)
}
 </>
    )
}
export default Logout;