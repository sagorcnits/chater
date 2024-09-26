import React, { useEffect, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import { useLoaderData, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000/");
const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
    // const { id } = useParams();
  const userData = useLoaderData()[0];
  console.log(userData)

  useEffect(() => {
    socket.on("welcome", (message) => {
      console.log(message, "welcome message");
    });

    socket.on("recived-message", (message) => {
      setMessages((prevMessage) => [...prevMessage, message]);
    });

    return () => {
      socket.off("welcome");
      socket.off("recived-message");
    };
  }, []);

  const handleMessage = (data) => {
    data.preventDefault();
    const messageData = {
      message: newMessage,
      user: userName,
    };

    socket.emit("send-message", messageData);
    setNewMessage(" ");
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <nav className="px-3 py-2 border-b border-[#222222] flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="size-12 rounded-full overflow-hidden">
            <img
              src={userData.photo_url}
              alt="user_img"
            />
          </div>
          <p className="font-bold text-white">{userData.name}</p>
        </div>
        <div className="flex items-center text-white gap-10">
          <p>{user?.name}</p>
          <button onClick={logout} className="font-bold  ">
            Log out
          </button>
        </div>
      </nav>
      <div className="user_message bg-[url('https://img.freepik.com/free-photo/simple-tree-sketch-falling-leaves_1379-348.jpg?t=st=1727168902~exp=1727172502~hmac=38dfee6df293a36e0a67d7325aaf7d9f5bd4099f97d05e37be6524f2463bf01e&w=740')] bg-no-repeat bg-cover px-8 overflow-auto">
        {messages.length > 0 &&
          messages.map((message, id) => {
            return (
              <div
                key={id}
                className={`${
                  userName === message.user ? "ml-auto mt-2" : "mt-2"
                } w-[300px]`}
              >
                <div>
                  <p className="text-white font-bold">{message.user}</p>
                </div>
                <div className="  p-4 bg-[#005C4B] rounded-md text-white">
                  <p>{message?.message}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="border-t border-[#222222] absolute bottom-0 left-0 right-0 bg-[#2c2c2c] ">
        <form
          onSubmit={handleMessage}
          className="flex items-center justify-between px-10"
        >
          <input
            type="text"
            placeholder="text"
            name="message"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="py-4 bg-[#2c2c2c] w-full focus:outline-none text-white"
          />
          <button type="submit" className="text-white">
            <IoSendOutline className="cursor-pointer"></IoSendOutline>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
