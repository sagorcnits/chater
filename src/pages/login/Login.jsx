import React from "react";

const Login = () => {
  const handleUserName = (data) => {
    data.preventDefault();
    const userName = data.target.userName.value;
    const userId = data.target.userId.value;

    // localStorage.setItem("user", JSON.stringify({ userName, userId }));
  };

  return (
    <form onSubmit={handleUserName} className="w-1/3 mx-auto mt-10">
      <input
        className="focus:outline-none border px-3 py-2"
        type="text"
        placeholder="userName"
        name="userName"
      />
      <input
        className="focus:outline-none border px-3 py-2"
        type="text"
        placeholder="userId"
        name="userId"
      />
      <button type="submit" className="ml-3 px-3 py-2 cursor-pointer bg-green-400">
        login
      </button>
    </form>
  );
};

export default Login;
