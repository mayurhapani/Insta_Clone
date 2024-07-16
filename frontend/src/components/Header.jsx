import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Header() {
  return (
    <div className=" bg-transparent fixed top-0 left-0 right-0">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <img className="w-40" src={logo} alt="" />
          <nav>
            <ul className="flex">
              <Link to="/signin">
                <li className="py-3 px-10 text-xl font-semibold text-gray-600">SignIn</li>
              </Link>
              <Link to="/signup">
                <li className="py-3 px-10 text-xl font-semibold text-gray-600">Sign Up</li>
              </Link>
              <Link to="/profile">
                <li className="py-3 px-10 text-xl font-semibold text-gray-600">Profile</li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
