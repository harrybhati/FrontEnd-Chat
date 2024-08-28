import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SingIn.css';

function SingIn() {
  const [name, setName] = useState(""); // enter name value by user 
  const [email, SetEmail] = useState("");// enter email value by user 
  const [pass, SetPass] = useState(""); // // enter password  value by user 
  const [mess, setErrorMessage]=useState("")
  const navigate = useNavigate();


  async function Sub(e) {
    e.preventDefault();
    if (name.length === 0 || email.length === 0 || pass.length === 0) { // to check that user enter value in these fields or not 
      alert("Enter All Fields");
    } else {
      console.log(name, email, pass);
    }

    try {
      const Resp = await axios.post("http://localhost:1000/register", {name: name,email: email,password: pass}); // post request to add data in db
       console.log(Resp);
      // store data in local storage
      localStorage.setItem("user", JSON.stringify(Resp.data)); // Local storage only stores strings, so you need to serialize your data using JSON.stringify() before storing it.
      navigate("/chatapp");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data);
        alert(mess)
      } else {
        setErrorMessage("An error occurred during registration.");
      }
    }
  }
  return (
    <>
      <form onSubmit={Sub}><div className="container">
          <h1>Sign In</h1>
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Enter Name"></input>
          <input type="email" value={email} onChange={(e) => {SetEmail(e.target.value)}} placeholder="Enter E-mail"></input>
          <input type="password" value={pass} onChange={(e) => {SetPass(e.target.value)}} placeholder="Enter Password"></input>
          <button type="submit"> Submit</button>
          
          

          <h4>
            Already Registered? <Link to="/login">Log In</Link>
          </h4>
        </div>
      </form>
    </>
  );
}

export default SingIn;
