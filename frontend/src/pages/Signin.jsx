import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notify1 = (msg) => toast.error(msg);
  const notify2 = (msg) => toast.success(msg);

  const loginData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8001/signin", {
        email,
        password,
      });

      console.log(response);
      if (response) {
        notify2(response.data.message);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        notify1(error.response.data.message);
      } else {
        notify1(error.message);
      }
      navigate("/signin");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 p-10 rounded-md text-center">
        <img className="w-40 mx-auto mb-5" src={logo} alt="" />

        <form className="flex flex-col gap-2" action="" onSubmit={loginData}>
          <input
            className="mb-3 p-2 rounded-sm"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="mb-3 p-2 rounded-sm"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className=" bg-blue-500 text-white rounded-md py-1 my-4" type="submit">
            Sign in
          </button>
          <p>
            Already have not an account?{" "}
            <Link className="text-blue-600" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
