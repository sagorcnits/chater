import React, { useContext, useEffect, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import useAxios from "../../hooks/useAxios";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [receviedMessages, setReceivedMessages] = useState([]);
  // const [saveMessages, setSaveMessages] = useState([])
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const receiverData = useLoaderData()[0];
  const { socket } = useContext(AuthContext);

  // get the user from localstorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    socket.on(
      "receive-private-message",
      ({ senderId, messages, receiverId }) => {
        setReceivedMessages((prevMessage) => [...prevMessage, messages

        ]);
        console.log(messages);
      }
    );
    // console.log("ok", user._id, receiverData._id);
    axiosPublic
      .get("/api/messages", {
        params: {
          senderId: user._id,
          receiverId: receiverData._id,
        },
      })
      .then((res) => {
        setReceivedMessages(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      socket.off("receive-private-message");
    };
  }, [socket, receiverData]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const sendPrivateMessage = (data) => {
    data.preventDefault();

    axiosPublic
      .get(`/api/users/users/${receiverData._id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data[0].socketId) {
          socket.emit("private-message", {
            senderId: socket.id,
            messages: {
              message: newMessage,
              senderId: user._id,
              receiverId: receiverData._id,
            },
            receiverId: res.data[0].socketId,
          });

          axiosPublic
            .post("/api/messages", {
              senderId: user._id,
              receiverId: receiverData._id,
              message: newMessage,
            })
            .then((res) => {
              // console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
          setNewMessage(" ");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(receviedMessages);

  return (
    <div>
      <nav className="px-3 py-2 border-b border-[#222222] flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="size-12 rounded-full overflow-hidden">
            <img src={receiverData.photo_url} alt="user_img" />
          </div>
          <p className="font-bold text-white">{receiverData.name}</p>
        </div>
        <div className="flex items-center text-white gap-10">
          <p>{user?.name}</p>
          <button onClick={logout} className="font-bold  ">
            Log out
          </button>
        </div>
      </nav>
      <div className="user_message bg-[url('https://img.freepik.com/free-photo/simple-tree-sketch-falling-leaves_1379-348.jpg?t=st=1727168902~exp=1727172502~hmac=38dfee6df293a36e0a67d7325aaf7d9f5bd4099f97d05e37be6524f2463bf01e&w=740')] bg-no-repeat bg-cover px-8 overflow-auto">
        {receviedMessages.length > 0 &&
          receviedMessages.map((message, id) => {
            // console.log(message);
            return (
              <div key={id}>
                <div
                  className={`p-4 bg-[#005C4B] w-[300px] mt-2 text-white text-center ${
                    message?.senderId === user?._id
                      ? "ml-auto  rounded-md"
                      : "rounded-full"
                  }`}
                >
                  <p>{message?.message}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="border-t border-[#222222] absolute bottom-0 left-0 right-0 bg-[#2c2c2c] ">
        <form
          onSubmit={sendPrivateMessage}
          className="flex items-center justify-between px-10"
        >
          <input
            type="text"
            placeholder="text"
            name="message"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="py-4 bg-[#2c2c2c] w-full focus:outline-none text-white"
          />
          <button type="submit" className="text-white">
            <IoSendOutline className="cursor-pointer"></IoSendOutline>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
