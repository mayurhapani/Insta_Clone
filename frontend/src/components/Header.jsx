import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Header() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className=" bg-white fixed top-0 left-0 right-0">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <img className="w-40" src={logo} alt="" />
          <nav>
            <ul className="flex">
              <Link to="/signin" className={isLoggedIn ? "hidden" : "block"}>
                <li className="py-3 px-6 text-xl font-semibold text-gray-600">SignIn</li>
              </Link>
              <Link to="/signup" className={isLoggedIn ? "hidden" : "block"}>
                <li className="py-3 px-6 text-xl font-semibold text-gray-600">Sign Up</li>
              </Link>
              <Link to="/" className={isLoggedIn ? "block" : "hidden"}>
                <li className="py-3 px-6 text-xl font-semibold text-gray-600">Home</li>
              </Link>
              <Link to="/profile" className={isLoggedIn ? "block" : "hidden"}>
                <li className="py-3 px-6 text-xl font-semibold text-gray-600">Profile</li>
              </Link>
              <Link to="/createPost" className={isLoggedIn ? "block" : "hidden"}>
                <li className="py-3 px-6 text-xl font-semibold text-gray-600">Create Post</li>
              </Link>
              <Link to="/logout" className={isLoggedIn ? "block" : "hidden"}>
                <li className="py-3 px-6 text-xl font-semibold text-gray-600">LogOut</li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
