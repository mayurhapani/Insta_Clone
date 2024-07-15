import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Signin() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 p-10 rounded-md text-center">
        <img className="w-40 mx-auto mb-5" src={logo} alt="" />

        <form className="flex flex-col gap-2" action="">
          <input className="mb-3 p-2 rounded-sm" type="email" placeholder="Email" />
          <input className="mb-3 p-2 rounded-sm" type="password" placeholder="Password" />
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
