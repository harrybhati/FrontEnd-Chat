import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Chat.css'; // Import your CSS file
import { click } from "@testing-library/user-event/dist/click";

function Chat() {
  const [Mess, SetMess] = useState(''); // Enter value from user 
  const [ChatHistory, SetChatHistory] = useState([]); // used to store the data from the api
  
  const auth = localStorage.getItem('user'); // to check which user is logged in 
  const Location = useLocation(); // it is used to get the user id and name of receiver ,it is used to get the reciver id and name when user click on chat button in the FriendDialog 
  const { userId, userName } = Location.state || {}; // data that was transferred by FriendDialog box 
  
  const SenderUserId = JSON.parse(auth)._id; // to check logged-in user id
  const SenderUserName = JSON.parse(auth).name; // to check user login name 
  
  // we are getting these from the auth 
  const senderId = SenderUserId; 
  const senderName = SenderUserName;
  // we are getting these from the UseLocation hook
  const receiverId = userId;
  const receiverName = userName;
 // it is used when any reciver id or sender id rende the update the chat history 
  useEffect(() => {
    FetchHistory();
  }, [senderId, receiverId]);

  async function FetchHistory() {
    try {
      // it will fetch the only chat history between two users 
      const Resp = await axios.get(`https://chat-backend-1-x16o.onrender.com/${senderId}/${receiverId}`);
      SetChatHistory(Resp.data);
    } catch (err) {
      console.log("Error fetching chat history:", err);
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (Mess.trim() === "") return;// when no mess is enter and user click on send button 

    try {
      const MessSend = await axios.post("https://chat-backend-1-x16o.onrender.com/ChatMess", {senderId,senderName,receiverId,receiverName,message: Mess});
      SetMess("");
      FetchHistory(); // Fetch updated chat history, when user send or receive 
    } catch (err) {
      console.log("Error sending message:", err);
    }
  }
  

  return (
    <div className="chat-container">
      <div className="chat-history">
        <div className="receiver-name">{receiverName}</div>
        <ul>
          {ChatHistory.map((msg, index) => (
            // conditionally Rendering , when user send or Receive any mess 
            <li key={index} className={`message ${msg.senderId === senderId ? 'sent' : 'received'}`}> 
              <div className="message-content">
              {msg.message}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="jai">
        <input  type="text" value={Mess} onChange={(e) => SetMess(e.target.value)} placeholder="Enter Message..." />
        <button id="t" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
