import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 p-10 rounded-md text-center">
        <img className="w-40 mx-auto" src={logo} alt="" />
        <h1 className="mb-5 text-xl font-semibold text-gray-600">
          Sign up to see photos and videos <br /> from your friends.
        </h1>
        <form className="flex flex-col gap-2" action="">
          <input className="mb-3 p-2 rounded-sm" type="text" placeholder="Name" />
          <input className="mb-3 p-2 rounded-sm" type="text" placeholder="Username" />
          <input className="mb-3 p-2 rounded-sm" type="email" placeholder="Email" />
          <input className="mb-3 p-2 rounded-sm" type="password" placeholder="Password" />
          <button className=" bg-blue-500 text-white rounded-md py-1 my-4" type="submit">
            Sign up
          </button>
          <p>
            Already have an account?{" "}
            <Link className="text-blue-600" to="/signin">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
