import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FriendDialog from "./FriendDialog";
// import './Live.css';
import axios from "axios";
import './CombinedComponent.css';

function CombinedComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);// if isDialogOpenis true it will show the dialog bos other not 
  const [userList, setUserList] = useState([]); // Ensure initial state is an array , it store the data from the db 
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');


  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const user = JSON.parse(auth);
        const userId = user._id;

        // Fetch the list of interacted users
        const response = await axios.get(`http://localhost:1000/chatlive/${userId}`);
        
        console.log('Fetched data:', response.data); // Log the data to see its structure

        if (Array.isArray(response.data)) {
          setUserList(response.data); // Set the state only if it's an array
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    if (auth) {
      fetchUserList();
    }
  }, [auth]);

  function LogOut() {
    localStorage.clear();
    navigate('/login');
  }

  function Chat1(userId, userName) {
    navigate('/livechat', { state: { userId, userName } });
  }

  return (
    <div className="container">
      <div className="button-container">
        {/* // onClick={() => setIsDialogOpen(true)}: Correct way to handle an event by passing a function that is executed when the event occurs.
        onClick={setIsDialogOpen(true)}: Incorrect because it executes the function immediately during render, not in response to the event. */}
        <button className="Add" onClick={() => setIsDialogOpen(true)}>Add Friend</button> 
        <button className="Log" onClick={LogOut}>LogOut</button>
      </div>
      <div className="chat-list">
        <h2>Chat List</h2>
        
      </div>
      <div className="chat-list">
        <ul>
          {userList.map(user => (
            <li key={user._id} onClick={() => Chat1(user._id, user.name)}>
              {user.name}
            </li>
          ))}
        </ul>
        </div>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <FriendDialog onClose={() => setIsDialogOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CombinedComponent;
