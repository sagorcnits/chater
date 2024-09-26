import React from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const axiosPublic = useAxios();

  const handleUser = (data) => {
    data.preventDefault();
    const email = data.target.email.value;
    const password = data.target.password.value;
    const userData = { email, password };

    axiosPublic
      .get("/api/users/users", userData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleUser} className="w-[400px] box-shadow mx-auto p-4">
        <h1 className="font-bold text-center text-2xl">Sign in Your Account</h1>
        <div className="mt-4">
          <label className="font-bold">email :</label> <br />
          <input
            className="border focus:outline-none px-3 py-[7px] w-full"
            type="email"
            placeholder="email"
            name="email"
          />
        </div>

        <div className="mt-4">
          <label className="font-bold">password :</label> <br />
          <input
            className="border focus:outline-none px-3 py-[7px] w-full"
            type="password"
            placeholder="*****"
            name="password"
          />
        </div>
        <button
          type="submit"
          className="py-3 bg-green-500 text-white cursor-pointer w-full mt-4 font-semibold hover:bg-black duration-500"
        >
          Sign In
        </button>
        <p className="mt-2 text-center">
          You Have Register an account?{" "}
          <Link to="/register" className="text-green-500 font-semibold">
            sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
