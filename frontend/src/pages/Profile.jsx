import { useEffect, useState, useContext } from "react";
import img1 from "../assets/images/demo_user.png";
import axios from "axios";
import { toast } from "react-toastify";
import { loginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState([]);
  const { isLoggedIn } = useContext(loginContext);
  const navigate = useNavigate();

  // console.log(user);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8001/getUser", {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUser(response.data.user);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    };

    fetchUser();
  }, [navigate, isLoggedIn]);

  return (
    <div className="container mx-auto ">
      <div className="pt-32 flex flex-col items-center w-1/2 mx-auto">
        {/* header */}
        <div className="w-full">
          <div className="flex items-center">
            <img
              className="rounded-full w-32 h-32"
              src={user.image}
              alt="https://via.placeholder.com/150"
            />
            <div className="ps-5">
              <h1 className="text-3xl font-bold text-center mb-5 ">{user.username}</h1>
              <div className="flex items-center">
                <p className="text-sm text-gray-600 font-semibold me-4">
                  <span>40</span> Posts
                </p>
                <p className="text-sm text-gray-600 font-semibold me-4">
                  <span>40</span> Followers
                </p>
                <p className="text-sm text-gray-600 font-semibold">
                  <span>40</span> Following
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="w-full mx-auto mt-2 mb-10" />

        {/* posts */}
        <div className=" flex flex-wrap">
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
