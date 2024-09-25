import React, { useEffect, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/");

const Home = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [chatActive, setChatActive] = useState(false);

  // useEffect

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

  console.log(messages);

  return (
    <>
      {chatActive ? (
        <main className="flex">
          <div className="w-[25%] bg-[#2C2C2C] h-screen border-r border-[#222222] p-3">
            <div className="pb-4 px-2">
              <input
                type="text"
                placeholder="search or start new chat"
                className="w-full bg-[#454545] py-3 px-4 rounded-md focus:outline-none text-white"
              />
            </div>
            <div className="user_chat overflow-auto px-2">
              {[1, 2, 3, 4, , 5, 6, 7, 8, 1, 2, 3, 4, , 5, 6, 7, 8].map(
                (item, id) => (
                  <UserCard key={id}></UserCard>
                )
              )}
            </div>
          </div>

          <section className="w-[75%] bg-[#2C2C2C] h-screen relative">
            <nav className="px-3 py-2 border-b border-[#222222]">
              <div className="flex gap-3 items-center">
                <div className="size-12 rounded-full overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/a/ACg8ocL-G38YycrNTgadRSctDVoHou9KPcM8OrqlQk9-I03rsqVALHA=s288-c-no"
                    alt="user_img"
                  />
                </div>
                <p className="font-bold text-white">Sagor Hossain</p>
              </div>
              <div>{/* <MdCall></MdCall> */}</div>
            </nav>
            <div className="user_message bg-[url('https://img.freepik.com/free-photo/simple-tree-sketch-falling-leaves_1379-348.jpg?t=st=1727168902~exp=1727172502~hmac=38dfee6df293a36e0a67d7325aaf7d9f5bd4099f97d05e37be6524f2463bf01e&w=740')] bg-no-repeat bg-cover px-8 overflow-auto">
              {messages.length > 0 &&
                messages.map((message, id) => {
                  return (
                    <div key={id} className={`${userName === message.user ? "ml-auto" : ""} w-[300px]`}>
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
          </section>
        </main>
      ) : (
        <form className="w-1/3 mx-auto mt-10">
          <input
            className="focus:outline-none border px-3 py-2"
            type="text"
            placeholder="userName"
            name="userName"
            onChange={(e) => setUserName(e.target.value)}
          />

          <button
            type="submit"
            className="ml-3 px-3 py-2 cursor-pointer bg-green-400"
            onClick={() => setChatActive(true)}
          >
            login
          </button>
        </form>
      )}
    </>
  );
};

export default Home;

const UserCard = () => {
  return (
    <div className="flex gap-4 hover:bg-[#454545] duration-500 p-3 rounded-md cursor-pointer">
      <div className="size-12 rounded-full overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocL-G38YycrNTgadRSctDVoHou9KPcM8OrqlQk9-I03rsqVALHA=s288-c-no"
          alt="user_img"
        />
      </div>
      <p className="font-bold text-white">Sagor Hossain</p>
    </div>
  );
};
