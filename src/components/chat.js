"use client";
import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import io from "socket.io-client";
import { useSession, signIn } from "next-auth/react";
import { MdSupportAgent } from "react-icons/md";

const socket = io("https://booknest-socketio-server.onrender.com");

// List of predefined agents
const agents = [
  "Abul Monsur Mohammad Kachru",
  "Md Fahim Hossain",
  "Mohammad Azad",
];

export default function Chat() {
  const { data: session } = useSession();
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (session) {
      socket.emit("register", session?.user?.name);
      socket.emit("load-messages");

      socket.on("registered", (username) => {
        console.log(`${username} successfully registered`);
      });

      socket.on("chat-history", (history) => {
        setMessages((prevMessages) => [...prevMessages, ...history]);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });

      socket.on("message", (msg) => {
        console.log("Received message:", msg); // Debug log
        setMessages((prevMessages) => [...prevMessages, msg]);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });

      socket.on("update-user-list", (users) => {
        setActiveUsers(users);
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
      socket.off("update-user-list");
      socket.off("user-connected");
      socket.off("user-disconnected");
    };
  }, [session]);

  const sendMessage = () => {
    if (message.trim()) {
      const receiver = selectedRecipient || "all";
      const newMessage = {
        sender: session.user.name,
        receiver,
        text: message,
      };

      // Update the messages state immediately
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit message to the server
      socket.emit("private-message", newMessage);
      console.log("Sent message:", newMessage); // Debug log

      setMessage(""); // Clear the input after sending
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] w-[75vw] sm:h-[40vh] sm:w-[40vw] md:h-[70vh] md:w-[40vw] lg:h-[70vh] lg:w-[25vw] mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8">
        <h2 className="text-center text-lg font-semibold mb-4">
          Please log in to access the chat.
        </h2>
        <button
          onClick={() => signIn()}
          className="p-2 bg-[#F65D4E] text-white rounded-lg"
        >
          Log In / Register
        </button>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold md:text-4xl text-center lg:mt-5 md:mt-5 mt-5 text-[#F65D4E]">
        Chat with Agent
      </h1>
      <h1 className="text-3xl font-bold md:text-5xl flex justify-center items-center mb-5 text-[#F65D4E]">
        <MdSupportAgent />
      </h1>
      <div className="flex flex-col h-[80vh] w-[75vw] sm:h-[40vh] sm:w-[40vw] md:h-[70vh] md:w-[40vw] lg:h-[70vh] lg:w-[45vw] xl:w-[25vw] mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
        <div className="flex flex-col flex-grow p-4 overflow-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.sender === session?.user?.name
                  ? "bg-[#F65D4E] text-white self-end"
                  : agents.includes(msg.sender)
                  ? "bg-orange-500 text-gray-800 self-start"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              <strong>
                {msg.sender}
                {agents.includes(msg.sender) && " : (agent)"}
              </strong>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex flex-col p-4 border-t border-gray-200">
          {session?.user?.name && (
            <select
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded focus:outline-none"
            >
              <option value="">
                Send to {agents.includes(session?.user?.name) ? "User" : "Agent"}
              </option>
              {agents.includes(session?.user?.name)
                ? activeUsers
                    .filter((user) => user !== session?.user?.name)
                    .map((user) => (
                      <option key={user} value={user}>
                        {user}
                      </option>
                    ))
                : agents.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
            </select>
          )}
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            className="p-2 mt-2 bg-[#F65D4E] text-white rounded-lg flex justify-center items-center gap-2"
            onClick={sendMessage}
          >
            Send <IoMdSend />
          </button>
        </div>
      </div>
    </>
  );
}
