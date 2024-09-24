import React from "react";

const Home = () => {
  return (
    <main className="flex">
      <div className="w-[25%] bg-[#2C2C2C] h-screen border-r border-[#222222] p-4 overflow-y-auto">
       {[1,2,3,4,,5,6,7,8].map((item,id) => <UserCard></UserCard>) }
      </div>

      <div className="w-[75%] bg-[#2C2C2C] h-screen"></div>
    </main>
  );
};

export default Home;


const UserCard = () => {
    return (
        <div className="flex gap-4 hover:bg-[#454545] duration-500 p-3 rounded-md cursor-pointer">
              <div className="size-12 rounded-full overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/a/ACg8ocL-G38YycrNTgadRSctDVoHou9KPcM8OrqlQk9-I03rsqVALHA=s288-c-no" alt="user_img" />
              </div>
              <p className="font-bold text-white">Sagor Hossain</p>
        </div>
    )
}
