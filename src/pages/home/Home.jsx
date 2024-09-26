import { Link, Outlet } from "react-router-dom";
import useAllUser from "../../hooks/useAllUser";

const Home = () => {
  const userData = useAllUser();

  // console.log(userData);
  return (
    <>
      <main className="flex">
        <section className="w-[25%] bg-[#2C2C2C] h-screen border-r border-[#222222] p-3">
          <div className="pb-4 px-2">
            <input
              type="text"
              placeholder="search or start new chat"
              className="w-full bg-[#454545] py-3 px-4 rounded-md focus:outline-none text-white"
            />
          </div>
          <div className="user_chat overflow-auto px-2">
            {userData.map((item, id) => (
              <Link to={`/chat-home/chat-user/${item._id}`} key={id}>
                <UserCard item={item} ></UserCard>
              </Link>
            ))}
          </div>
        </section>

        <section className="w-[75%] bg-[#2C2C2C] h-screen relative">
          <Outlet></Outlet>
        </section>
      </main>
    </>
  );
};

export default Home;

const UserCard = ({ item }) => {
  const { name, email, photo_url } = item;

  return (
    <div className="flex gap-4 hover:bg-[#454545] duration-500 p-3 rounded-md cursor-pointer">
      <div className="size-12 rounded-full overflow-hidden">
        <img src={photo_url} alt="user_img" />
      </div>
      <p className="font-bold text-white">{name}</p>
    </div>
  );
};
