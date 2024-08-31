import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function LogIn(){
   const [email,Setemail]=useState("");
   const [pass,SetPass]=useState('');
   const navigate=useNavigate();

   async function Sub(e) {
    e.preventDefault();
    // to check that user enter fields or not 
    if (email.length===0 || pass.length===0){
        alert("Kindly Enter Fields ")
    }
      else{

             }
    try {
        const response = await axios.post("https://chat-backend-1-x16o.onrender.com/user", {email: email,password: pass});

        // console.log(response.data);

        // Ensure the data structure is correct and matches the input
        if (response.data.email === email && response.data.password === pass) {
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/chatapp'); // Navigate to the /a route
           
        } else {
            alert("Enter Wrong ");
        }
    } catch (err) {
        console.log(err);
    }
}


    return(
        <>
         <form onSubmit={Sub}>

         <div className="container">
      <h1>Welcome Back</h1>
      <input type="email"  onChange={(e)=>{Setemail(e.target.value)}} placeholder="Enter Email" />
      <input type="password"  onChange={(e)=>{SetPass(e.target.value)}} placeholder="Enter Password" />
      <button type="submit">Submit</button>
      <h4>Don't have an account? <Link to="/">Sign Up</Link></h4>
    </div>
         </form>
        
        </>
    )
}

export default LogIn;
