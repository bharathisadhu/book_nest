'use client'

import { IoMdSend } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";

import { useState } from "react";


export default function Chatbox (){
    
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
  
    const handleSendMessage = () => {
      if (newMessage.trim()) {
        setMessages([...messages, { text: newMessage, sender: "You" }]);
        setNewMessage("");
      }
    };

    return(
        <>
         <h1 className="text-xl font-bold md:text-5xl text-center mt-5">Chat with Agent</h1>
         <h1 className="text-3xl font-bold md:text-5xl flex justify-center items-center mb-5" ><MdSupportAgent /></h1>
        <div className="flex flex-col h-full mt-10 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col flex-grow p-4 overflow-auto h-96">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              message.sender === "You"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            {message.text}
          </div>
        ))}

      </div>
      <div className="flex p-4 border-t border-gray-200">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg flex justify-center items-center gap-2"
          onClick={handleSendMessage}
        >
          Send <IoMdSend />
        </button>
      </div>
    </div>
        </>
    )
}