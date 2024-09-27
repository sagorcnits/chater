import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [socket, setNewSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000/");
    setNewSocket(socket);
    
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

    return () => {
      socket.close();
    };
  }, []);



  const userData = {socket}

  return <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
