import React, { useState } from "react";
import { IoSendOutline } from "react-icons/io5";

const Home = () => {
  const [message, setMessage] = useState("");

  const handleMessage = (data) => {
    data.preventDefault();
    console.log(message);
    setMessage(" ");
  };

  // console.log(message);

  return (
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
        <div className="user_chat bg-[url('https://img.freepik.com/free-photo/simple-tree-sketch-falling-leaves_1379-348.jpg?t=st=1727168902~exp=1727172502~hmac=38dfee6df293a36e0a67d7325aaf7d9f5bd4099f97d05e37be6524f2463bf01e&w=740')] bg-no-repeat bg-cover px-8">
          <div className="flex justify-end pt-4">
            <p className="w-[300px]  p-4 bg-[#005C4B] rounded-md text-white">Hello There</p>
          </div>
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
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="py-4 bg-[#2c2c2c] w-full focus:outline-none text-white"
            />
            <button type="submit" className="text-white">
              <IoSendOutline className="cursor-pointer"></IoSendOutline>
            </button>
          </form>
        </div>
      </section>
    </main>
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
