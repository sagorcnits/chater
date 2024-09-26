import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useAllUser = () => {
  const axiosPublic = useAxios();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axiosPublic
      .get("/api/users/users")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return userData;
};

export default useAllUser;
