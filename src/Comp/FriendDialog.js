import React, { useState } from "react";
import './FriendDialog.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FriendDialog({ onClose }) { // onClose comes from the CombinedComponets about the dailogs box 
  const [SearchValue, SetSearchValue] = useState(""); // Value entered in the search field
  const [ApiData, SetApiData] = useState([]); // Data from the DB
  const [Result, SetResult] = useState(""); // Message if no desired data is found
  const navigate = useNavigate();

  const auth = localStorage.getItem('user'); // to get the current user 
  const user = JSON.parse(auth); // convert string into object 
  const currentID = user._id;// get current user _id

  async function HandleSearch(e) {
    const key = e.target.value; // enter value in field 
    SetSearchValue(key); // set the enter value to SearchValue
    e.preventDefault(); // prevent the default behaviour of submit button 

    if (key) { // here key means that if key value match any value from DB
      try {
        const searchApi = await axios.get(`http://localhost:1000/user-search/${key}`);
        const filteredData = searchApi.data.filter(user => user._id !== currentID); // is used to filter out the current user from the list of users returned by the search API

        if (filteredData.length === 0) {
          SetResult("No Result Found");
          SetApiData([]);
        } else {
          SetResult("");
          SetApiData(filteredData);
        }
      } catch (err) {
        console.log(err);
        SetResult("Error occurred while searching");
      }
    } else {
      SetResult("");
      SetApiData([]);
    }
  }

  function Chat1(userId, userName) {
    //  This allows you to send data from one component to another without using global state or URL parameters.
    //{ state: { userId, userName } }: An options object where you specify the state to pass to the destination route.
    //state: The state property in the options object allows you to pass arbitrary data to the new route. This data is accessible within the new route component.
    navigate('/livechat', { state: { userId, userName } });
  }

  return (
    
      
        <>
        
        
        <div className="dialog-header">
          <h2>Search for Friends</h2>
          {/* \\ that means that if i click on this the dailog box will be close */}
          <div>  <button className="close-btn" onClick={onClose}>&times;</button> </div>
          
        </div>

        <div className="search-container">
          <input type="text" value={SearchValue} onChange={HandleSearch} placeholder="Search users..." />
          {Result && <p className="result-message">{Result}</p>}
        </div>

        <div>
        <ul className="user-list">
          {ApiData.length > 0 ? (
            ApiData.map((user) => (
              <li key={user._id}>
                {user.name}
                {/* // Here the user._id and user.name are value of other user(Connected user) */}
                <button onClick={() => Chat1(user._id, user.name)}>Chat</button>
              </li>
            ))
          ) : (
            <li></li>
          )}
        </ul>
        </div></>
      
    
  );
}

export default FriendDialog;
