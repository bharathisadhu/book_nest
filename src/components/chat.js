"use client";
import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import io from "socket.io-client";
import { useSession } from "next-auth/react";
import { MdSupportAgent } from "react-icons/md";

// Initialize socket connection
const socket = io("https://booknest-socketio-server.onrender.com"); // Change to your production URL when deployed

export default function Chat() {
  const { data: session } = useSession();
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Ref for scrolling

  useEffect(() => {
    if (session) {
      socket.emit("register", session.user.name);
      socket.emit("load-messages");

      socket.on("registered", (username) => {
        console.log(`${username} successfully registered`);
      });

      socket.on("chat-history", (history) => {
        setMessages(history);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the bottom
      });

      socket.on("message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the bottom
      });

      socket.on("user-connected", (msg) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: msg, sender: "System" },
        ]);
      });

      socket.on("user-disconnected", (msg) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: msg, sender: "System" },
        ]);
      });
    }

    return () => {
      socket.off("message");
      socket.off("chat-history");
      socket.off("user-connected");
      socket.off("user-disconnected");
    };
  }, [session]);

  const sendMessage = () => {
    if (message.trim() && receiver.trim()) {
      socket.emit("private-message", { receiver, text: message });
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold md:text-5xl text-center lg:mt-5 md:mt-5 mt-5">
        Chat with Agent
      </h1>
      <h1 className="text-3xl font-bold md:text-5xl flex justify-center items-center mb-5">
        <MdSupportAgent />
      </h1>
      <div className="flex flex-col h-[80vh] w-[75vw] sm:h-[40vh] sm:w-[40vw] md:h-[70vh] md:w-[40vw] lg:h-[70vh] lg:w-[25vw] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow p-4 overflow-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              <strong>{msg.sender}: </strong> {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Scroll target */}
        </div>
        <div className="flex flex-col p-4 border-t border-gray-200">
          <input
            type="text"
            placeholder="Receiver's username"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            className="p-2 mt-2 bg-blue-500 text-white rounded-lg flex justify-center items-center gap-2"
            onClick={sendMessage}
          >
            Send <IoMdSend />
          </button>
        </div>
      </div>
    </>
  );
}
