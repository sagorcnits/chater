import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const axiosPublic = useAxios();

  const handleUser = (data) => {
    data.preventDefault();
    const form = data.target;

    const name = form.name.value;
    const email = form.email.value;
    const photo_url = form.photo_url.value;
    const password = form.password.value;

    const userData = { name, email, photo_url, password };

    axiosPublic
      .post("/api/users/users", userData)
      .then((res) => {
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Your register has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleUser} className="w-[400px] box-shadow mx-auto p-4">
        <h1 className="font-bold text-center text-2xl">Create An Account</h1>
        <div className="mt-4">
          <label className="font-bold">Name :</label> <br />
          <input
            className="border focus:outline-none px-3 py-[7px] w-full"
            type="text"
            placeholder="name"
            name="name"
          />
        </div>
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
          <label className="font-bold">photo URL :</label> <br />
          <input
            className="border focus:outline-none px-3 py-[7px] w-full"
            type="text"
            placeholder="photo URL"
            name="photo_url"
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
          Register Now
        </button>
        <p className="mt-2 text-center">
          Already have an acount?{" "}
          <Link to="/login" className="text-green-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
