import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [socket, setNewSocket] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const axiosPublic = useAxios();
  useEffect(() => {
    const socket = io("http://localhost:5000/");
    setNewSocket(socket);

    socket.on("connect", () => {
      // console.log(socket.id);
      axiosPublic
        .put("/api/users/users", { socketId: socket.id, userId: user._id })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

     

    });

    return () => {
      socket.close();
    };
  }, []);

  console.log(user?._id);

  const userData = { socket };

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
