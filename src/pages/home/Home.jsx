import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import useAxios from "../../hooks/useAxios";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const { socket } = useContext(AuthContext);

  const axiosPublic = useAxios();

  useEffect(() => {
    axiosPublic
      .get("/api/users/users")
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          const filterUser = res.data.filter((item) => item._id !== user._id);
          setUserData(filterUser);
          setUsers(filterUser);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchUser = (data) => {
    setUserName(data.target.value);

    if (data.target.value === "") {
      setUserData(users);
    } else {
      const filterData = userData.filter((item) =>
        item.name.toLowerCase().includes(data.target.value)
      );
      setUserData(filterData);
    }

    console.log(data.target.value);
  };

  return (
    <>
      <main className="flex">
        <section className="w-full md:w-[25%] bg-[#2C2C2C] h-screen border-r border-[#222222] p-3">
          <div className="pb-4 px-2">
            <input
              onChange={handleSearchUser}
              type="text"
              placeholder="search or start new chat"
              className="w-full bg-[#454545] py-3 px-4 rounded-md focus:outline-none text-white"
              name="userName"
              value={userName}
            />
          </div>
          <div className="user_chat overflow-auto px-2">
            {userData.length > 0 ? (
              userData.map((item, id) => (
                <Link to={`/chat-home/chat-user/${item._id}`} key={id}>
                  <div>
                    <UserCard item={item}></UserCard>
                  </div>
                </Link>
              ))
            ) : (
              <h1 className="font-bold text-center mt-10 text-white">No Matching Data</h1>
            )}
          </div>
        </section>
        <section className="w-[75%] bg-[#2C2C2C] h-screen relative hidden md:block">
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
